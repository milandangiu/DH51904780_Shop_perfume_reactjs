import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { get_products_async } from "../../../api/product";
import Content from "../theme/content";

const HomePage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
    async function fetchData() {
      const _response = await get_products_async();
      console.log(_response.data);
      setData(_response.data);
    }
  }, []);

  const goToDetail = (id) => {
    navigate("/san-pham/" + id);
  };

  let productElements = data?.map(function (product) {
    return (
      <div
        style={{ cursor: "pointer" }}
        class="col mb-5"
        onClick={() => goToDetail(product.id)}
      >
        <div class="card h-100">
          <img class="card-img-top" src={product.image} alt={product.id} />
          <div class="card-body p-4">
            <div class="text-center">
              <h5 class="fw-bolder">{product.product_name}</h5>
              {product.price}
            </div>
          </div>
          <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="row">
              <div class="col">
                <a class="btn btn-outline-dark btn-sm mt-auto" href="#">
                  Chi tiết
                </a>
              </div>
              <div class="col">
                <a class="btn btn-outline-dark btn-sm mt-auto" href="#">
                  Giỏ hàng
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div>
        <header class="bg-dark py-5">
          <div class="container px-4 px-lg-5 my-5">
            <div class="text-center text-white">
              <h1 class="display-4 fw-bolder">Shop in style</h1>
              <p class="lead fw-normal text-white-50 mb-0">
                With this shop hompeage template
              </p>
            </div>
          </div>
        </header>
      </div>
      <section class="py-5">
        <div class="container px-4 px-lg-5 mt-5">
          <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {productElements}
          </div>
        </div>
      </section>
      <Content />
    </div>
  );
};
export default HomePage;
