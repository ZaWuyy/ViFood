import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '₫';
    };

    // Hàm rút gọn tên sản phẩm
    const truncateName = (name) => {
        const words = name.split(' ');
        return words.length > 7 ? words.slice(0, 7).join(' ') + '...' : name;
    };
    const truncateDescription = (description) => {
        const words = description.split(' ');
        return words.length > 8 ? words.slice(0, 7).join(' ') + '...' : description;
    };
    

    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                <img className="food-item-img" src={`${url}/images/${image}`} alt="" />
                {!cartItems[id] ? (
                    <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
                ) : (
                    <div className='food-item-counter'>
                        <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                        <p>{cartItems[id]}</p>
                        <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
                    </div>
                )}
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{truncateName(name)}</p>
                    <img src={assets.rating_starts} alt='' />
                </div>
                <p className="food-item-desc">{truncateDescription(description)}</p>
                <p className="food-item-price">{formatPrice(price)}</p>
            </div>
        </div>
    );
};

export default FoodItem;
