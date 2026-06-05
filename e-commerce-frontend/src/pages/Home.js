import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import categories from "../categories";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";
import axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../features/productSlice";
import ProductPreview from "../components/ProductPreview";

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const lastProducts = products.slice(0, 8);
  useEffect(() => {
    axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
  }, []);
  return (
    <div>
      <section className="hero-section container mt-4">
        <div className="hero-copy">
          <span className="hero-badge">Premium rides for every road</span>
          <h1>Find your next bike with style, speed, and confidence.</h1>
          <p>
            Explore our curated selection of city, mountain, and leisure bikes with
            smart checkout and fast delivery. Ready to ride? Your new bike is one
            click away.
          </p>
          <div className="hero-actions">
            <Link to="/category/all" className="btn btn-primary hero-btn">
              Browse all bikes
            </Link>
            <Link to="/orders" className="hero-link">
              Track your orders
            </Link>
          </div>
        </div>
        <div className="hero-media">
          <div className="hero-card">
            <img
              src="https://res.cloudinary.com/dvmarheuq/image/upload/v1682618552/qx1jpmq7fsyaps2s8d8i.png"
              alt="Bike on the road"
              className="home-banner"
            />
            <div className="hero-card-meta">
              <div>
                <strong>Weekend Sale</strong>
                <p>Up to 15% off on premium bikes.</p>
              </div>
              <span>Shop now</span>
            </div>
          </div>
        </div>
      </section>

      <div className="featured-products-container container mt-4">
        <h2>Last Products</h2>
        <div className="d-flex justify-content-center flex-wrap">
          {lastProducts.map((product) => (
            <ProductPreview {...product} />
          ))}
        </div>
      </div>
      <div className="home-actions">
        <Link to="/category/all" className="home-action-link">
          See all products &rarr;
        </Link>
      </div>
      {/* sale banner */}
      <div className="sale__banner--container mt-4">
        <img
          src="https://res.cloudinary.com/dvmarheuq/image/upload/v1682615999/sfn0vpwd4qzqb5vvxdcf.png"
          alt="banner"
        />
      </div>

      <div className="recent-products-container container mt-4">
        <h3>Categories</h3>
        <Row>
          {categories.map((cat) => (
            <LinkContainer
              key={cat.name}
              to={`/category/${cat.name.toLocaleLowerCase()}`}
            >
              <Col md={4}>
                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.48), rgba(0, 0, 0, 0.42)), url(${cat.img})`,
                    gap: "10px",
                  }}
                  className="category-title"
                >
                  {cat.name}
                </div>
              </Col>
            </LinkContainer>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Home;
