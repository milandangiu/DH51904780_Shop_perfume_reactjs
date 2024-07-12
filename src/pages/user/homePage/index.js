
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { get_products_async } from "../../../api/product";
import Content from "../theme/content";
import "./style.scss"; // Import custom CSS for HomePage

const HomePage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const productsPerPage = 8;

  useEffect(() => {
    fetchData();
    async function fetchData() {
      const _response = await get_products_async();
      setData(_response.data.data);
    }
  }, []);

  const goToDetail = (id) => {
    navigate("/san-pham/" + id);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page when search query changes
  };

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
    setCurrentPage(1); // Reset to first page when brand filter changes
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    setCurrentPage(1); // Reset to first page when sort order changes
  };

  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
  };

  const filteredProducts = data
    ? data.filter((product) => {
        return (
          removeAccents(product.product_name.toLowerCase()).includes(removeAccents(searchQuery.toLowerCase())) &&
          (selectedBrand === "" || product.brand_name === selectedBrand)
        );
      })
    : [];

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOrder === "price-asc") {
      return a.price - b.price;
    } else if (sortOrder === "price-desc") {
      return b.price - a.price;
    }
    return 0;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const productElements = currentProducts.map((product) => (
    <div
      key={product.id}
      className="col mb-4"
      onClick={() => goToDetail(product.id)}
    >
      <div className="card product-card h-100">
        <img className="card-img-top" src={product.image} alt={product.id} />
        <div className="card-body">
          <h5 className="card-title">{product.product_name}</h5>
          <p className="card-text">{formatPrice(product.price)}</p>
        </div>
        <div className="card-footer">
          <button className="btn btn-outline-dark btn-sm">Chi tiết</button>
          <button className="btn btn-outline-dark btn-sm ms-2">Giỏ hàng</button>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="home-page">
      <header className="bg-dark py-5">
        <div className="container px-4 px-lg-5">
          <div className="text-center text-white">
            <h1 className="display-4 fw-bolder">Shop in style</h1>
            <p className="lead fw-normal text-white-50 mb-0">
              With this shop homepage template
            </p>
          </div>
        </div>
      </header>
      <section className="py-5">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 align-items-center mb-4">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control search-input"
                placeholder="Tìm kiếm sản phẩm theo tên..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="col-md-3">
              <select className="form-control" value={selectedBrand} onChange={handleBrandChange}>
                <option value="">Tất cả thương hiệu</option>
                {/* Replace with your dynamic brand options */}
                <option value="Carolina Herrera">Carolina Herrera</option>
                <option value="Gucci">Gucci</option>
                <option value="Paco Rabanne">Paco Rabanne</option>
                <option value="Versace">Versace</option>
                <option value="Calvin Klein">Calvin Klein</option>
                <option value="Creed">Creed</option>
              </select>
            </div>
            <div className="col-md-3">
              <select className="form-control" value={sortOrder} onChange={handleSortChange}>
                <option value="">Sắp xếp theo</option>
                <option value="price-asc">Giá tăng dần</option>
                <option value="price-desc">Giá giảm dần</option>
              </select>
            </div>
          </div>
          <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-2 row-cols-xl-4 justify-content-center">
            {productElements}
          </div>
          <div className="d-flex justify-content-center mt-4">
            <nav aria-label="Page navigation">
              <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    Trước
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Sau
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
      <Content />
    </div>
  );
};

export default HomePage;
