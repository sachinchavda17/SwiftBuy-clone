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
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Context } from "../../utils/context";

const SingleProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const { data } = useFetch(`/api/products?populate=*&[filters][id]=${id}`);

  const { handleAddToCart } = useContext(Context);

  if (!data) return;
  const product = data?.data[0]?.attributes;

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const descrementQuantity = () => {
    setQuantity((prevState) => {
      if (prevState === 1) return 1;
      else return prevState - 1;
    });
  };
  return (
    <div className="single-product-main-content">
      <div className="layout">
        <div className="single-product-page">
          <div className="left">
            <img
              src={
                process.env.REACT_APP_DEV_URL +
                product?.img?.data[0]?.attributes.url
              }
              alt=""
            />
          </div>
          <div className="right">
            <span className="name">{product?.title}</span>
            <span className="price">&#8377; {product?.price}</span>
            <span className="desc">{product?.desc}</span>
            <div className="cart-buttons">
              <div className="quantity-buttons">
                <span onClick={descrementQuantity}>-</span>
                <span>{quantity}</span>
                <span onClick={incrementQuantity}>+</span>
              </div>
              <button
                className="add-to-cart-button"
                onClick={() => {
                  handleAddToCart(data.data[0], quantity);
                  setQuantity(1);
                }}
              >
                <FaCartPlus size={20} /> ADD TO CART
              </button>
            </div>

            <span className="divider" />

            <div className="info-item">
              <div className="text-bold">
                Category :{" "}
                <span>{product?.categories?.data[0]?.attributes?.title}</span>
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
        <RelatedProducts
          productId={id}
          categoryId={product?.categories?.data[0]?.id}
        />
      </div>
    </div>
  );
};

export default SingleProduct;
