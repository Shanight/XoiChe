import React, { useState, useEffect } from 'react';
import './ChiTiet.css'; // Thêm file CSS

const NoiDung = ({ product }) => {
  const [images, setImages] = useState([]);
  const [fullscreenImage, setFullscreenImage] = useState(null); // State cho ảnh phóng to

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

        {/* Cột phải: Hiển thị tên, giá, và nút đặt */}
        <div className="col-6">
          <h3>{product.name}</h3>
          <p className="price">{formatPrice(product.price)} VND</p>
          <p>{product.description}</p>
          <ul>
            {product.details && product.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
          <button className="order-button">Đặt Mâm Xôi</button>
        </div>
      </div>

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
