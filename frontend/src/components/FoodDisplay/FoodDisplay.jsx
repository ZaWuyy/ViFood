import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);

    // Hàm rút gọn tên sản phẩm
    const truncateName = (name) => {
        const words = name.split(' ');
        return words.length > 7 ? words.slice(0, 7).join(' ') + '...' : name;
    };
    const truncateDescription = (description) => {
      const words = description.split(' ');
      return words.length > 7 ? words.slice(0, 7).join(' ') + '...' : description;
  };

    return (
        <div className='food-display' id='food-display'>
            <h2>Bán chạy</h2>
            <div className="food-display-list">
                {food_list.map((item, index) => {
                    if (category === "All" || category === item.category) {
                        return (
                            <FoodItem 
                                key={index} 
                                id={item._id} 
                                name={truncateName(item.name)}
                                description={truncateDescription(item.description)} 
                                price={item.price} 
                                image={item.image} 
                            /> 
                        );
                    }
                    return null; 
                })}
            </div>
        </div>
    );
}

export default FoodDisplay;
