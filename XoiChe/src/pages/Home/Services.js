import React from 'react';
import './Services.css'; // Thêm CSS cho phần này
import hinh1 from '../../img/giao-hang-nhanh-chong.png';
import hinh2 from '../../img/chinh-sach-doi-tra-hang-tai.png';
import hinh3 from '../../img/pngtree-quality-check-certified-badge-icon-png-image_6583296.png';

const Services = () => {
  return (
    <section className="services">
      <h2 className="services-title">Những Hỗ trợ Của Chúng Tôi</h2>
      <div className="services-container">
        <div className="service-item">
          <img src={hinh1} alt="Mâm Xôi 1" className="service-img" />
          <h3 className="service-title">Hỗ Trợ Vận Chuyển</h3>
          <p className="service-description">
          Cung cấp thông tin về dịch vụ giao mâm xôi, bao gồm thời gian giao hàng, khu vực phục vụ và các phương thức vận chuyển.
          </p>
        </div>
        <div className="service-item">
          <img src={hinh2} alt="Mâm Xôi 2" className="service-img" />
          <h3 className="service-title">Hỗ Trợ Đổi Trả</h3>
          <p className="service-description">
          Cam kết đổi trả nhanh chóng nếu mâm xôi bị lỗi hoặc không đúng yêu cầu. Cung cấp thông tin về điều kiện và quy trình đổi trả.
          </p>
        </div>
        <div className="service-item">
          <img src={hinh3} alt="Mâm Xôi 3" className="service-img" />
          <h3 className="service-title">Hỗ Trợ Bảo Quản</h3>
          <p className="service-description">
          Cung cấp hướng dẫn về cách bảo quản mâm xôi sau khi nhận hàng để đảm bảo độ tươi ngon. Cam kết chất lượng sản phẩm.          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
