import "./Category.scss";
import Cat1 from "../../../assets/category/cat-1.jpg"
const Category = () => {
    return <div className="shop-by-category">
        <div className="categories">
            <div className="category">
                <img src={Cat1} alt="" />
            </div>
            <div className="category">
                <img src={Cat1} alt="" />
            </div>
            <div className="category">
                <img src={Cat1} alt="" />
            </div>
            <div className="category">
                <img src={Cat1} alt="" />
            </div>
        </div>
    </div>;
};

export default Category;
