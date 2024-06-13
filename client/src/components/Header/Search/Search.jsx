import { MdClose } from "react-icons/md";
import "./Search.scss";
import prod from "../../../assets/products/earbuds-prod-1.webp";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
const Search = ({ setShowSearch }) => {

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  let { data } = useFetch(
    `/api/products?populate=*&filters[title][$contains]=${query}`
  );
  if (!query.length) data = null;
  return (
    <div className="search-modal">
      <div className="form-field">
        <input
          type="text"
          autoFocus
          placeholder="Search for Products"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <MdClose onClick={() => setShowSearch(false)} />
      </div>
      <div className="search-result-content">
        <div className="search-results">
          {data?.data?.map((item) => (
            <div
              key={item.id}
              className="search-result-item"
              onClick={() => {
                navigate("/product/" + item.id);
                setShowSearch(false);
              }}
            >
              <div className="img-container">
                <img
                  src={
                    process.env.REACT_APP_DEV_URL +
                    item?.attributes?.img?.data[0]?.attributes.url
                  }
                  alt=""
                />
              </div>
              <div className="prod-details">
                <span className="name">{item?.attributes?.title}</span>
                <span className="desc">{item?.attributes?.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
