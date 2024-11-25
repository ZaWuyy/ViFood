import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './ViewOrder.css';

const ViewOrders = () => {
    const { fetchOrders } = useContext(StoreContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            const fetchedOrders = await fetchOrders();
            setOrders(fetchedOrders);
        };
        getOrders();
    }, [fetchOrders]);

    return (
        <div className="view-orders-container">
            <h1 className="title">My Orders</h1>
            {orders.length > 0 ? (
                <div className="orders-grid">
                    {orders.map(order => (
                        <div key={order._id} className="order-card">
                            <p><b>Order ID:</b> {order._id}</p>
                            <p><b>Total Price:</b> ${order.totalPrice}</p>
                            <p><b>Address:</b> {order.address.street}, {order.address.city}, {order.address.country}</p>
                            <p><b>Phone:</b> {order.address.phone}</p>
                            <div className="order-foods">
                                <b>Foods:</b>
                                <ul>
                                    {order.foods.map(food => (
                                        <li key={food.product._id}>
                                            {food.product.name} - Quantity: {food.quantity}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-orders">No orders found.</p>
            )}
        </div>
    );
};

export default ViewOrders;
