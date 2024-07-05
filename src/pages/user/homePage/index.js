import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { get_products_async } from "../../../api/product";
import Content from "../theme/content";

const HomePage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    fetchData();
    async function fetchData() {
      const _response = await get_products_async();
      console.log(_response.data);
      setData(_response.data.data);
    }
  }, []);

  const goToDetail = (id) => {
    navigate("/san-pham/" + id);
  };

  if (!data) return <div>Loading...</div>;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(data.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const productElements = currentProducts.map((product) => (
    <div
      key={product.id}
      style={{ cursor: "pointer" }}
      className="col mb-5"
      onClick={() => goToDetail(product.id)}
    >
      <div className="card h-100">
        <img className="card-img-top" src={product.image} alt={product.id} />
        <div className="card-body p-4">
          <div className="text-center">
            <h5 className="fw-bolder">{product.product_name}</h5>
            {product.price}
          </div>
        </div>
        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div className="row">
            <div className="col">
              <a className="btn btn-outline-dark btn-sm mt-auto" href="#">
                Chi tiết
              </a>
            </div>
            <div className="col">
              <a className="btn btn-outline-dark btn-sm mt-auto" href="#">
                Giỏ hàng
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      <header className="bg-dark py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="text-center text-white">
            <h1 className="display-4 fw-bolder">Shop in style</h1>
            <p className="lead fw-normal text-white-50 mb-0">
              With this shop homepage template
            </p>
          </div>
        </div>
      </header>
      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {productElements}
          </div>
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-outline-primary"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              &larr; Trước
            </button>
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`btn ${
                    currentPage === index + 1
                      ? "btn-primary"
                      : "btn-outline-primary"
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              className="btn btn-outline-primary"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Sau &rarr;
            </button>
          </div>
        </div>
      </section>
      <Content />
    </div>
  );
};

export default HomePage;
