import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MenClothing = ({ currUser }) => {
  const [men, setMen] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  // Fetch men's clothing data when the component mounts
  useEffect(() => {
    const fetchClothing = async () => {
      try {
        const response = await axios.get('/api/clothing/men');
        setMen(response.data);
      } catch (error) {
        console.error("Error fetching men's clothing data:", error);
      }
    };
    fetchClothing();
  }, []);

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    setSelectedCategories((prevCategories) =>
      checked ? [...prevCategories, value] : prevCategories.filter((cat) => cat !== value)
    );
  };

  const handleAddToCart = async (mens) => {
    if (!currUser) {
      alert('Please log in to add items to your cart.');
      return;
    }

    try {
      const response = await axios.post('/api/cart', {
        cloth: {
          image: mens.image,
          name: mens.name,
          description: mens.description,
          price: mens.price,
          stock: mens.stock,
          color: mens.color,
        },
      });
      alert('Item added to cart!');
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  // Filter the clothing items based on selected categories
  const filteredMenClothing = men.filter((mens) =>
    selectedCategories.length === 0 || selectedCategories.includes(mens.category)
  );

  return (
    <div>
      <Navbar />

      {/* Offcanvas for Categories */}
      <button
        className="btn btn-primary mt-3"
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
          <p>Discover the perfect outfit with our curated selection of men’s clothing. Browse by category to find essentials and trending styles, from tailored suits and casual shirts to jeans, shorts, and activewear. Choose from a variety of colors, fits, and fabrics designed to elevate your wardrobe for any occasion. With top brands and exclusive collections, we’ve got everything you need—whether you’re dressing up for work, keeping it casual, or gearing up for a workout. Start exploring to find your new favorites!</p>
          <h5>Categories</h5><br />
          <ul>
            {['Shirts', 'Jeans', 'Jackets', 'Shorts', 'Pants', 'T-Shirts', 'Blazers'].map((category) => (
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

      {/* Display Men’s Clothing Items */}
      <div className="container-fluid row">
        {filteredMenClothing.map((mens) => (
          <div key={mens._id} className="col-12 col-lg-3 col-md-4 col-sm-12 mt-4">
            <a href={`/clothing/${mens.person}/${mens._id}`} className="all-men text-decoration-none">
              <div className="card h-100 all">
                <img src={mens.image} className="card-img-top" alt={mens.name} />
                <div className="card-body">
                  <p className="card-text"><b>{mens.name}</b></p>
                  <p className="card-text">${mens.price}</p>
                  {currUser && (
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={() => handleAddToCart(mens)}
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

export default MenClothing;
