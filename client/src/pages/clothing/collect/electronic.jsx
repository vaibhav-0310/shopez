import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import axios from 'axios';

const ElectronicsList = ({ currentUser }) => {
  const [electronics, setElectronics] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Fetch electronics data when the component mounts
  useEffect(() => {
    const fetchElectronics = async () => {
      try {
        const response = await axios.get('/api/electronics');
        setElectronics(response.data);
      } catch (error) {
        console.error('Error fetching electronics data:', error);
      }
    };
    fetchElectronics();
  }, []);

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    setSelectedCategories((prevCategories) =>
      checked ? [...prevCategories, value] : prevCategories.filter((cat) => cat !== value)
    );
  };

  const handleAddToCart = async (electric) => {
    if (!currentUser) {
      alert('Please log in to add items to your cart.');
      return;
    }

    try {
      const response = await axios.post('/api/cart', {
        electronics: {
          image: electric.image,
          name: electric.name,
          description: electric.description,
          price: electric.price,
          stock: electric.stock,
        },
      });
      alert('Item added to cart!');
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  // Filter the electronics items based on selected categories
  const filteredElectronics = electronics.filter((electric) =>
    selectedCategories.length === 0 || selectedCategories.includes(electric.category)
  );

  return (
    <div>
      <Navbar />

      {/* Offcanvas for Categories */}
      <button
        className="btn btn-primary mt-2"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasScrolling"
        aria-controls="offcanvasScrolling"
      >
        Categories
      </button>

      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabIndex="-1"
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div className="offcanvas-header">
          <h3 className="offcanvas-title" id="offcanvasScrollingLabel" style={{ color: 'blue' }}>
            What's Your Mood?
          </h3>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <p>Upgrade your tech with our top selection of electronics! From the latest smartphones and laptops to high-performance headphones, smart home devices, and more, we have everything to meet your tech needs. Discover cutting-edge gadgets and trusted brands designed to make life easier, more connected, and more enjoyable. Find your next must-have device today!</p>
          <h5>Categories</h5><br />
          <ul>
            {['Laptops', 'Mobile Phones', 'Smart Homes', 'Audio', 'Cameras'].map((category) => (
              <label key={category}>
                <input
                  type="checkbox"
                  name={category}
                  value={category}
                  onChange={handleCategoryChange}
                />{' '}
                {category}
              </label>
            ))}
          </ul>
        </div>
      </div>

      {/* Display Electronics */}
      <div className="container-fluid row">
        {filteredElectronics.map((electric) => (
          <div key={electric._id} className="col-12 col-lg-3 col-md-4 col-sm-12 mt-4">
            <a href={`/electronics/${electric._id}`} className="all-men text-decoration-none">
              <div className="card h-100 all">
                <img src={electric.image} className="card-img-top" alt={electric.name} />
                <div className="card-body">
                  <p className="card-text"><b>{electric.name}</b></p>
                  <p className="card-text">${electric.price}</p>
                  {currentUser && (
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={() => handleAddToCart(electric)}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default ElectronicsList;
