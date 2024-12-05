import React, { useState } from "react";
import { firestore, storage } from "../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./Products.css";

const Products = () => {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    category: "Mâm Cúng Việt", // Giá trị mặc định
    images: [], // Mảng lưu tất cả các ảnh
    mainImage: null, // Ảnh chính
    details: "", // Chi tiết sản phẩm (mô tả)
  });

  const [isLoading, setIsLoading] = useState(false);

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
      // Chọn nhiều ảnh
      setProductData((prev) => ({
        ...prev,
        images: [...prev.images, ...files], // Thêm các ảnh vào mảng images
      }));
    } else if (name === "mainImage") {
      // Chọn ảnh chính
      setProductData((prev) => ({
        ...prev,
        mainImage: files[0], // Lưu ảnh chính
      }));
    } else if (name === "price") {
      // Khi thay đổi giá, định dạng lại giá tiền
      setProductData((prev) => ({
        ...prev,
        price: formatPrice(value), // Áp dụng hàm formatPrice
      }));
    } else {
      setProductData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productData.mainImage || productData.images.length === 0) {
      alert("Vui lòng chọn ít nhất một ảnh chính và các ảnh khác!");
      return;
    }

    setIsLoading(true);

    try {
      // Upload ảnh chính lên Firebase Storage
      const mainImageRef = ref(storage, `products/${productData.mainImage.name}`);
      await uploadBytes(mainImageRef, productData.mainImage);

      // Lấy URL ảnh chính sau khi upload
      const mainImageUrl = await getDownloadURL(mainImageRef);

      // Upload các ảnh phụ lên Firebase Storage
      const imageUrls = await Promise.all(
        productData.images.map(async (image) => {
          const imageRef = ref(storage, `products/${image.name}`);
          await uploadBytes(imageRef, image);
          return getDownloadURL(imageRef); // Trả về URL của từng ảnh
        })
      );

      // Thêm sản phẩm vào Firestore
      const productsCollection = collection(firestore, "products");
      await addDoc(productsCollection, {
        name: productData.name,
        price: parseFloat(productData.price.replace(/\./g, "")), // Loại bỏ dấu chấm và chuyển thành số
        category: productData.category,
        mainImageUrl: mainImageUrl, // Lưu ảnh chính
        imageUrls: imageUrls, // Lưu các ảnh phụ
        details: productData.details, // Lưu chi tiết sản phẩm
        timestamp: new Date(),
      });

      alert("Mâm xôi được tạo thành công!");
      setProductData({
        name: "",
        price: "",
        category: "Mâm Cúng Việt",
        images: [],
        mainImage: null,
        details: "", // Reset chi tiết sản phẩm
      });
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="products-container">
      <h2 className="products-title">Thêm sản phẩm</h2>
      <form className="products-form" onSubmit={handleSubmit}>
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
            type="text" // Sử dụng text thay vì number để có thể thêm dấu chấm
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
        <label className="products-label">
          Hình ảnh chính:
          <input
            type="file"
            name="mainImage"
            onChange={handleChange}
            accept="image/*"
            required
            className="products-file-input"
          />
        </label>
        <label className="products-label">
          Các hình ảnh khác:
          <input
            type="file"
            name="images"
            onChange={handleChange}
            accept="image/*"
            multiple // Cho phép chọn nhiều ảnh
            className="products-file-input"
          />
        </label>
        <button type="submit" className="products-submit-btn" disabled={isLoading}>
          {isLoading ? "Đang xử lý..." : "Tạo Mâm Xôi"}
        </button>
      </form>
    </div>
  );
};

export default Products;
