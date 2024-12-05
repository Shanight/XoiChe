import React, { useState, useEffect } from "react";
import { firestore, storage } from "../../lib/firebase";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./Update.css";

const Update = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    category: "Mâm Cúng Việt",
    images: [],
    mainImage: null,
    details: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(firestore, "products");
      const querySnapshot = await getDocs(productsCollection);
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  // Hàm định dạng số tiền
  const formatPrice = (value) => {
    return value
      .replace(/\D/g, "") // Loại bỏ tất cả ký tự không phải số
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") // Thêm dấu chấm sau mỗi 3 chữ số
      .replace(/^\./, ""); // Loại bỏ dấu chấm đầu tiên nếu có
  };

  // Handle thay đổi các giá trị input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setProductData((prev) => ({
        ...prev,
        images: [...prev.images, ...files],
      }));
    } else if (name === "mainImage") {
      // Nếu không chọn ảnh mới, giữ lại ảnh cũ
      setProductData((prev) => ({
        ...prev,
        mainImage: files[0] || prev.mainImage,
      }));
    } else if (name === "price") {
      setProductData((prev) => ({
        ...prev,
        price: formatPrice(value),
      }));
    } else {
      setProductData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle cập nhật sản phẩm
  const handleUpdate = async (e) => {
    e.preventDefault();
  
    setIsLoading(true);
  
    try {
      // Nếu có ảnh mới, upload ảnh chính lên Firebase Storage
      let mainImageUrl = editingProduct.mainImageUrl;
      if (productData.mainImage) {
        const mainImageRef = ref(storage, `products/${productData.mainImage.name}`);
        await uploadBytes(mainImageRef, productData.mainImage);
        mainImageUrl = await getDownloadURL(mainImageRef);
      }
  
      // Nếu có ảnh phụ mới, upload và lấy URL
      const imageUrls = productData.images.length > 0
        ? await Promise.all(
            productData.images.map(async (image) => {
              const imageRef = ref(storage, `products/${image.name}`);
              await uploadBytes(imageRef, image);
              return getDownloadURL(imageRef);
            })
          )
        : editingProduct.imageUrls; // Nếu không có ảnh phụ mới, giữ ảnh cũ
  
      // Cập nhật sản phẩm trong Firestore
      const productDoc = doc(firestore, "products", editingProduct.id);
      await updateDoc(productDoc, {
        name: productData.name,
        price: parseFloat(productData.price.replace(/\./g, "")),
        category: productData.category,
        mainImageUrl: mainImageUrl,
        imageUrls: imageUrls,
        details: productData.details,
      });
  
      // Cập nhật lại sản phẩm trong state
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === editingProduct.id ? { ...product, ...productData, mainImageUrl, imageUrls } : product
        )
      );
  
      setEditingProduct(null);
      setProductData({
        name: "",
        price: "",
        category: "Mâm Cúng Việt",
        images: [],
        mainImage: null,
        details: "",
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle xóa sản phẩm
  const handleDelete = async (id) => {
    try {
      const productDoc = doc(firestore, "products", id);
      await deleteDoc(productDoc);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      alert("Có lỗi xảy ra khi xóa sản phẩm.");
    }
  };

  return (
    <div className="products-container">
      <h2 className="products-title">Quản Lý Sản Phẩm</h2>
      {editingProduct ? (
        <form className="products-form" onSubmit={handleUpdate}>
          <h3>Sửa sản phẩm</h3>
          <label className="products-label">
            Tên sản phẩm:
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              required
              className="products-input"
            />
          </label>
          <label className="products-label">
            Giá:
            <input
              type="text"
              name="price"
              value={productData.price}
              onChange={handleChange}
              required
              className="products-input"
            />
          </label>
          <label className="products-label">
            Danh mục:
            <select
              name="category"
              value={productData.category}
              onChange={handleChange}
              className="products-select"
            >
              <option value="Mâm Cúng Việt">Mâm Cúng Việt</option>
              <option value="Mâm Cúng Đầy Tháng">Mâm Cúng Đầy Tháng</option>
              <option value="Mâm Cúng Thôi Nôi">Mâm Cúng Thôi Nôi</option>
              <option value="Mâm Cúng Khai Trương - Động Thổ - Khởi Công">
                Mâm Cúng Khai Trương - Động Thổ - Khởi Công
              </option>
              <option value="Mâm Cúng Nhà Mới">Mâm Cúng Nhà Mới</option>
            </select>
          </label>
          <label className="products-label">
            Chi tiết sản phẩm:
            <textarea
              name="details"
              value={productData.details}
              onChange={handleChange}
              required
              className="products-textarea"
            />
          </label>

          {/* Hiển thị ảnh chính đã có */}
          {editingProduct.mainImageUrl && (
            <div className="product-image-preview">
              <h4>Ảnh chính cũ:</h4>
              <img
                src={editingProduct.mainImageUrl}
                alt="Ảnh chính"
                className="product-image-preview-img"
              />
            </div>
          )}
          <label className="products-label">
            Hình ảnh chính:
            <input
              type="file"
              name="mainImage"
              onChange={handleChange}
              accept="image/*"
              className="products-file-input"
            />
          </label>

          {/* Hiển thị các ảnh phụ đã có */}
          {editingProduct.imageUrls && editingProduct.imageUrls.length > 0 && (
            <div className="product-image-preview">
              <h4>Ảnh phụ cũ:</h4>
              {editingProduct.imageUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Ảnh phụ ${index + 1}`}
                  className="product-image-preview-img"
                />
              ))}
            </div>
          )}
          <label className="products-label">
            Các hình ảnh khác:
            <input
              type="file"
              name="images"
              onChange={handleChange}
              accept="image/*"
              multiple
              className="products-file-input"
            />
          </label>

          <button type="submit" className="products-submit-btn" disabled={isLoading}>
            {isLoading ? "Đang xử lý..." : "Cập Nhật Sản Phẩm"}
          </button>
        </form>
      ) : (
        <div className="products-list">
          <h3>Danh sách sản phẩm</h3>
          <table>
            <thead>
              <tr>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Danh mục</th>
                <th>Ảnh chính</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>
                    <img src={product.mainImageUrl} alt="Ảnh chính" width="100" />
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setEditingProduct(product);
                        setProductData({
                          name: product.name,
                          price: product.price.toString(),
                          category: product.category,
                          images: [],
                          mainImage: null,
                          details: product.details,
                        });
                      }}
                    >
                      Sửa
                    </button>
                    <button onClick={() => handleDelete(product.id)}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Update;
