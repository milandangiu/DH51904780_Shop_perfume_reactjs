import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { get_product_detail_async } from "../../../api/product";
import axios from "axios";
import "./Product.scss";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [message, setMessage] = useState(""); // State for message

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get_product_detail_async(id);
        setProduct(response.data);

        // Dummy related products for testing
        setRelatedProducts([
          {
            id: 1,
            product_name: "Related Product 1",
            price: 100000,
            image: "related1.jpg",
          },
          {
            id: 2,
            product_name: "Related Product 2",
            price: 150000,
            image: "related2.jpg",
          },
          {
            id: 3,
            product_name: "Related Product 3",
            price: 200000,
            image: "related3.jpg",
          },
        ]);
      } catch (error) {
        console.error("Error fetching product detail:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleQuantityChange = (event) => {
    const value = Math.max(1, Number(event.target.value));
    setQuantity(value);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleAddToCart = async () => {
    if (!product) {
      console.error("Không có sản phẩm để thêm vào giỏ hàng.");
      return;
    }

    try {
      const userData = localStorage.getItem("userData");
      if (!userData) {
        console.error("Không có thông tin người dùng trong localStorage.");
        return;
      }

      const userInfo = JSON.parse(userData);
      const user_id = userInfo.id;

      const response = await axios.post("http://127.0.0.1:8000/api/cart/add", {
        product_id: product.id,
        quantity: quantity,
        user_id: user_id,
      });

      console.log("Thêm vào giỏ hàng thành công:", response.data);
      setMessage("Sản phẩm đã được thêm vào giỏ hàng thành công!"); // Set success message

      // Xóa thông báo sau 3 giây
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      setMessage("Lỗi khi thêm sản phẩm vào giỏ hàng."); // Set error message
    }
  };

  const renderRelatedProducts = () => {
    const filteredProducts = relatedProducts.filter(
      (relatedProduct) => relatedProduct.brand_name === product.brand_name
    );

    const limitedProducts = filteredProducts.slice(0, 3);
    return limitedProducts.map((relatedProduct) => (
      <div key={relatedProduct.id} className="col mb-5">
        <div className="card h-100">
          <img
            className="card-img-top"
            src={relatedProduct.image}
            alt={relatedProduct.product_name}
          />
          <div className="card-body p-4">
            <div className="text-center">
              <h5 className="fw-bolder">{relatedProduct.product_name}</h5>
              <span className="text-success fw-bold">
                {formatPrice(relatedProduct.price)}
              </span>
            </div>
          </div>
          <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div className="text-center">
              <a className="btn btn-outline-dark mt-auto" href="#">
                Chi tiết sản phẩm
              </a>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <section className="py-5 pt-0">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-lg-6">
              <div className="mb-5 mb-lg-0">
                <img
                  className="img-fluid rounded"
                  src={product.image}
                  alt={product.product_name}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="small mb-1">
                Số lượng còn lại: {product.quantity}
              </div>
              <h1 className="display-6 fw-bolder mb-4">
                {product.product_name}
              </h1>
              <div className="fs-5 mb-5">
                <span className="product-info">
                  {formatPrice(product.price)}
                </span>
              </div>
              <div>
                <span className="product-info">Thương hiệu: {product.brand_name}</span>
              </div>
              <div>
                <span className="product-info">Xuất xứ: {product.origin}</span>
              </div>
              <div>
                <span className="product-info">Mùi hương: {product.smell}</span>
              </div>    
              <div>
                <span className="product-info">
                  Dung tích: {product.capacity}
                </span>
              </div>
              

              <div className="d-flex align-items-center mt-4">
                <input
                  className="form-control text-center mx-2"
                  id="inputQuantity"
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                />
                <button
                  className="btn btn-outline-dark flex-shrink-0 ms-3"
                  onClick={handleAddToCart}
                >
                  <i className="bi-cart-fill me-1"></i>
                  Thêm vào giỏ hàng
                </button>
              </div>
              {message && <div className="alert alert-info mt-3">{message}</div>}
            </div>
          </div>
          <div className="mt-4">
            <h4 className="fw-bold mb-3">Mô tả sản phẩm</h4>
            <p>{product.des}</p>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container px-4 px-lg-5 mt-5">
          {/* <h2 className="fw-bolder mb-4">Cùng thương hiệu</h2>
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {renderRelatedProducts()}
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
