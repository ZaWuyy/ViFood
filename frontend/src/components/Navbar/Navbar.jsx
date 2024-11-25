import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import LoginPopup from "../LoginPopup/LoginPopup";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [search, setSearch] = useState("");
  const {
    getTotalCartCount,
    token,
    setToken,
    fetchFoodList,
    searchSuggestions,
    state,
  } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value) {
      await fetchFoodList(value);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const handleSearchSubmit = () => {
    navigate("/");
    fetchFoodList(search);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (id) => {
    navigate(`/product/${id}`);
    setShowSuggestions(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const handleCartClick = () => {
    if (!token) {
      setShowLoginPopup(true);
    } else {
      navigate("/cart");
    }
  };

  return (
    <>
      <div className="navbar-top">
        <div className="navbar-left">
          <Link to="/">
            <img src={assets.logo} alt="Logo" className="logo" />
          </Link>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
              value={search}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
            />
            {search && showSuggestions && searchSuggestions.length > 0 && (
              <ul className="search-suggestions active">
                {searchSuggestions.map((item) => (
                  <li key={item.id} onClick={() => handleSuggestionClick(item.id)}>
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
            <img
              src={assets.search_icon}
              alt="Search"
              className="search-icon"
              onClick={handleSearchSubmit}
            />
          </div>
        </div>

        <div className="navbar-right">
          <img src={assets.phone_icon} alt="" className="nav-right-icon" />
          <div className="navbar-phone-text">
            <p>Tư vấn trực tiếp</p>
            <a href="tel:0899330803" className="phone-number">
              0899330803
            </a>
          </div>
          <div className="navbar-fav-icon">
            <img src={assets.fav_icon} alt="Favorite" />
          </div>
          <div className="navbar-cart-icon" onClick={handleCartClick}>
            <img src={assets.basket_icon} alt="Cart" />
            {getTotalCartCount() > 0 && (
              <div className="cart-badge">{getTotalCartCount()}</div>
            )}
          </div>
          {!token ? (
            <button onClick={() => setShowLogin(true)}>Sign in</button>
          ) : (
            <div className="navbar-profile">
              <img src={assets.profile_icon} alt="Profile" />
              <ul className="nav-profile-dropdown">
                <li className="nav-item">
                  <Link to="/view-order" className="nav-link">
                    <img src={assets.bag_icon} alt="Orders" className="nav-icon" />
                    <p className="nav-text">Orders</p>
                  </Link>
                </li>
                <hr />
                <li className="nav-item"> 
                  <Link to="/profile" className="nav-link">
                    <img src={assets.profile_icon} alt="Profile" className="nav-icon"/>
                    <p className="nav-text">Profile</p>
                  </Link>
                </li>
                <hr />
                <li className="nav-item" onClick={logout} >
                  <img src={assets.logout_icon} alt="Logout" className="nav-icon" />
                  <p className="nav-text">Logout</p>
                </li>
              </ul>
            </div>
          )}
        </div>
        {showLoginPopup && <LoginPopup setShowLogin={setShowLoginPopup} />}
      </div>
      <div className="navbar-bottom">
        <ul className="navbar-menu">
          <span className="title_">〢Danh mục sản phẩm</span>
          <p>|</p>
          <Link
            to="/"
            onClick={() => setMenu("home")}
            className={menu === "home" ? "active" : ""}
          >
            Trang chủ
          </Link>
          <a
            href="#explore-menu"
            onClick={() => setMenu("menu")}
            className={menu === "menu" ? "active" : ""}
          >
            Menu
          </a>
          <a
            href="#app-download"
            onClick={() => setMenu("mobile-app")}
            className={menu === "mobile-app" ? "active" : ""}
          >
            Tin tức
          </a>
          <a
            href="#footer"
            onClick={() => setMenu("contact-us")}
            className={menu === "contact-us" ? "active" : ""}
          >
            Liên hệ
          </a>
        </ul>
      </div>
    </>
  );
};

export default Navbar;