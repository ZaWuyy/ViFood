import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './PlaceOrder.css';

const PlaceOrder = () => {
    const { cartItems, getTotalCartAmount, createOrder, setCartItems } = useContext(StoreContext);
    const [address, setAddress] = useState({ street: '', city: '', country: '', phone: '' });
    const navigate = useNavigate();

    const handlePlaceOrder = async () => {
        const products = Object.keys(cartItems).map(itemId => ({
            product: itemId,
            quantity: cartItems[itemId]
        }));
        const totalPrice = getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2);
        await createOrder(address, products, totalPrice);
        setCartItems({}); // Clear the cart
        navigate('/'); // Navigate back to home page
    };

    return (
        <div className="place-order-container">
            <div className="place-order-left">
                <h2>Shipping Address</h2>
                <input
                    type="text"
                    placeholder="Street"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="City"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Country"
                    value={address.country}
                    onChange={(e) => setAddress({ ...address, country: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Phone"
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Total</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                        </div>
                    </div>
                    <button onClick={handlePlaceOrder}>Place Order</button>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrder;