import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  
  // Fetch cart items when the component mounts
  useEffect(() => {
    axios.get('/api/cart')
      .then((response) => {
        setCartItems(response.data); // Assuming the response contains the cart items
      })
      .catch((error) => {
        console.error('Error fetching cart items:', error);
      });
  }, []);

  // Handle item removal
  const handleRemove = (id) => {
    axios.delete('/api/cart', { data: { id } })
      .then((response) => {
        setCartItems(cartItems.filter(item => item._id !== id)); // Remove the item from the state
      })
      .catch((error) => {
        console.error('Error removing item:', error);
      });
  };

  return (
    <div className="container-fluid row">
      <h1 className="col-6 offset-3 mb-3">
        <i className="fa-solid fa-cart-shopping"></i> Your Cart
      </h1>
      
      {cartItems.map(cart => (
        <div className="col-12 col-lg-3 col-md-4 col-sm-12 mt-4" key={cart._id}>
          <div className="card h-100">
            <img src={cart.image} className="card-img-top" alt={cart.name} />
            <div className="card-body">
              <p className="card-text"><b>{cart.name}</b></p>
              <p className="card-text">${cart.price}</p>
              <div className="button">
                <button type="button" className="btn btn-success" style={{ marginRight: '10px' }}>
                  Buy Now
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger" 
                  onClick={() => handleRemove(cart._id)}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
