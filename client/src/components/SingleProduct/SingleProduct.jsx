import { useContext, useState } from "react";

import RelatedProducts from "./RelatedProducts/RelatedProducts";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPinterest,
  FaCartPlus,
} from "react-icons/fa";
import "./SingleProduct.scss";
import prod from "../../assets/products/earbuds-prod-1.webp";
const SingleProduct = () => {
  return (
    <div className="single-product-main-content">
      <div className="layout">
        <div className="single-product-page">
          <div className="left">
            <img src={prod} alt="" />
          </div>
          <div className="right">
            <span className="name">Boat</span>
            <span className="price">&#8877;4000</span>
            <span className="desc">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. A amet
              ullam dolor! Omnis voluptatibus nemo blanditiis fugit, mollitia
              vero iste ab numquam amet tempora nam laudantium asperiores magnam
              animi quisquam.
            </span>
            <div className="cart-buttons">
              <div className="quantity-buttons">
                <span>-</span>
                <span>5</span>
                <span>+</span>
              </div>
              <button className="add-to-cart-button">
                <FaCartPlus size={20} /> ADD TO CART
              </button>
            </div>

            <span className="divider" />

            <div className="info-item">
              <div className="text-bold">
                Category : <span>Headphones</span>
              </div>
              <div className="text-bold">
                Share :
                <span className="social-icons">
                  <FaFacebookF size={16} />
                  <FaTwitter size={16} />
                  <FaInstagram size={16} />
                  <FaLinkedinIn size={16} />
                  <FaPinterest size={16} />
                </span>
              </div>
            </div>
          </div>
        </div>
        <RelatedProducts />
      </div>
    </div>
  );
};

export default SingleProduct;
