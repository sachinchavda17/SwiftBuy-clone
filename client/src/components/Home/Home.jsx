import Category from "./Category/Category";
import Products from "../Products/Products";
import Banner from "./Banner/Banner";
import "./Home.scss";
import { useContext, useEffect } from "react";
import { fecthDataFromApi } from "../../utils/api";
import { Context } from "../../utils/context";

const Home = () => {
  const { categories, setCategories, products, setProducts } =
    useContext(Context);
  useEffect(() => {
    getCategory();
    getProducts();
  }, []);
  const getCategory = () => {
    fecthDataFromApi("/api/categories?populate=*").then((res) => {
      console.log(res);
      setCategories(res);
    });
  };
  const getProducts = () => {
    fecthDataFromApi("/api/products?populate=*").then((res) => {
      console.log(res);
      setProducts(res);
    });
  };
  return (
    <div>
      <Banner />
      <div className="main-content">
        <div className="layout">
          <Category categories={categories} />
          <Products headingText={"Popular Products"} products={products} />
        </div>
      </div>
    </div>
  );
};

export default Home;
