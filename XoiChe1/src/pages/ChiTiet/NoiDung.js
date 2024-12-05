import React, { useState, useEffect } from 'react';
import './ChiTiet.css'; // Thêm file CSS
import OrderForm from "../Home/OrderForm"; // Import OrderForm

const NoiDung = ({ product }) => {
  const [images, setImages] = useState([]);
  const [fullscreenImage, setFullscreenImage] = useState(null); // State cho ảnh phóng to
  const [showOrderForm, setShowOrderForm] = useState(false); // State để hiển thị form đặt hàng

  // Hàm định dạng số tiền với dấu chấm
  const formatPrice = (price) => {
    return price
      .toString()
      .replace(/\D/g, "") // Loại bỏ tất cả ký tự không phải số
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") // Thêm dấu chấm sau mỗi 3 chữ số
      .replace(/^\./, ""); // Loại bỏ dấu chấm đầu tiên nếu có
  };

  useEffect(() => {
    if (product) {
      // Tạo mảng ảnh chỉ chứa ảnh phụ
      const allImages = [];

      // Kiểm tra nếu có ảnh chính
      if (product.mainImageUrl) {
        allImages.push({
          url: product.mainImageUrl,
          alt: product.name,
          title: `${product.name} - Main Image`,
        });
      }

      // Kiểm tra nếu có ảnh phụ và là mảng
      if (Array.isArray(product.imageUrls) && product.imageUrls.length > 0) {
        product.imageUrls.forEach((img) => {
          allImages.push({
            url: img,
            alt: product.name,
            title: `${product.name} - Additional Image`,
          });
        });
      }

      // Cập nhật lại state images với ảnh chính và phụ
      setImages(allImages);
    }
  }, [product]);

  // Hàm mở chế độ phóng to
  const openFullscreen = (image) => {
    setFullscreenImage(image);
  };

  // Hàm đóng chế độ phóng to
  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  // Kiểm tra nếu `product.details` là chuỗi, chuyển thành mảng
  const detailsArray = typeof product.details === 'string' ? [product.details] : product.details;

  // Hàm để mở form đặt hàng
  const handleOrderNow = () => {
    setShowOrderForm(true); // Hiển thị form khi nhấn vào nút
  };

  return (
    <div className="container">
      <div className="row">
        {/* Cột trái: Hiển thị ảnh chính và ảnh phụ */}
        <div className="col-6">
          <div className="main-image">
            {images.length > 0 && (
              <img
                src={images[0].url}
                alt={images[0].alt}
                className="main-img"
                onClick={() => openFullscreen(images[0])} // Phóng to ảnh chính khi nhấn
              />
            )}
          </div>
          <div className="additional-images">
            {images.slice(1).map((image, index) => (
              <div key={index} className="additional-img-container">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="additional-img"
                  onClick={() => openFullscreen(image)} // Phóng to ảnh phụ khi nhấn
                />
              </div>
            ))}
          </div>
        </div>

        {/* Cột phải: Hiển thị tên, giá, và chi tiết sản phẩm */}
        <div className="col-6">
          <h3>{product.name}</h3>
          <p className="price">{formatPrice(product.price)} VND</p>
          <p>{product.description}</p> {/* Mô tả sản phẩm */}
          
          {/* Render chi tiết sản phẩm nếu là mảng */}
          {Array.isArray(detailsArray) && detailsArray.length > 0 ? (
            <div className="product-details">
              <ul>
                {detailsArray.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Không có chi tiết sản phẩm</p> // Thông báo nếu không có chi tiết
          )}

          {/* Nút "Đặt Mâm Xôi" */}
          <button className="order-button" onClick={handleOrderNow}>Đặt Mâm Xôi</button>
        </div>
      </div>

      {/* Hiển thị form đặt hàng khi showOrderForm là true */}
      {showOrderForm && <OrderForm item={product} onClose={() => setShowOrderForm(false)} />}

      {/* Phóng to ảnh */}
      {fullscreenImage && (
        <div className="fullscreen-overlay" onClick={closeFullscreen}>
          <img
            src={fullscreenImage.url}
            alt={fullscreenImage.alt}
            className="fullscreen-image"
          />
        </div>
      )}
    </div>
  );
};

export default NoiDung;
