import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import NoiDung from "./NoiDung";

const ChiTiet = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(firestore, "products", id); // Truy vấn Firestore với ID
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
          setProduct(productSnap.data());
        } else {
          console.log("Không tìm thấy sản phẩm");
        }
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Đang tải thông tin sản phẩm...</div>;
  }

  return (
    <div>
      <NoiDung product={product} />
    </div>
  );
};

export default ChiTiet;
