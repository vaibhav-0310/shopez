import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ClothDetail = ({ currUser }) => {
  const { id } = useParams(); // Extract the cloth ID from the URL
  const [clothInfo, setClothInfo] = useState(null);
  const [review, setReview] = useState({
    rating: 1,
    comment: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the cloth data from the backend
    axios.get(`/api/clothing/${id}`)
      .then(response => {
        setClothInfo(response.data);
      })
      .catch(error => {
        console.error("Error fetching cloth details:", error);
      });
  }, [id]);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    // Submit the review to the backend
    axios.post(`/api/listings/${id}/review`, { review })
      .then(response => {
        alert("Review submitted!");
        // Refresh the page or re-fetch reviews
        setClothInfo(prevState => ({
          ...prevState,
          reviews: [...prevState.reviews, response.data]  // Update with the new review
        }));
      })
      .catch(error => {
        console.error("Error submitting review:", error);
      });
  };

  const handleAddToCart = () => {
    // Logic to add the item to the cart
    if (currUser) {
      axios.post("/api/cart", {
        cloth: {
          image: clothInfo.image,
          name: clothInfo.name,
          description: clothInfo.description,
          price: clothInfo.price,
          stock: clothInfo.stock,
          color: clothInfo.color,
        },
      })
        .then(response => {
          alert("Item added to cart!");
        })
        .catch(error => {
          console.error("Error adding item to cart:", error);
        });
    } else {
      alert("Please log in to add to cart!");
    }
  };

  if (!clothInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card mt-4 showCloth" style={{ border: "none", width: "auto" }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={clothInfo.image} className="img-fluid rounded-start" alt={clothInfo.name} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h3 className="card-title">{clothInfo.name}</h3>
            <p className="card-text">{clothInfo.description}</p>
            <h5 className="card-title">${clothInfo.price}</h5>
            <p className="card-text">Stock Available: {clothInfo.stock}</p>
            <p className="card-text">Color: {clothInfo.color}</p>

            <div>
              <label>Select Size:</label>
              {clothInfo.sizes.map((size, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    id={size}
                    value={size}
                    name="size"
                    onChange={(e) => handleReviewChange(e)}
                  />
                  {size}
                </label>
              ))}
            </div>

            {currUser && (
              <button onClick={handleAddToCart} className="btn btn-info mt-3">
                Add to Cart
              </button>
            )}

            <p className="card-text"><small className="text-body-secondary">Kaira's Trend!</small></p>

            {/* Review Section */}
            {currUser && (
              <div className="col-8 mb-2">
                <hr />
                <h4>Leave a review</h4>
                <form onSubmit={handleReviewSubmit} className="needs-validation">
                  <fieldset className="starability-slot">
                    <legend>Rating:</legend>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <React.Fragment key={star}>
                        <input
                          type="radio"
                          id={`rate-${star}`}
                          name="rating"
                          value={star}
                          checked={review.rating === star}
                          onChange={handleReviewChange}
                        />
                        <label htmlFor={`rate-${star}`} title={`${star} star`}>{star} star</label>
                      </React.Fragment>
                    ))}
                  </fieldset>
                  <div className="mb-3 mt-3">
                    <label htmlFor="comment" className="form-label">Comment</label>
                    <textarea
                      name="comment"
                      id="comment"
                      cols="30"
                      rows="5"
                      className="form-control"
                      required
                      value={review.comment}
                      onChange={handleReviewChange}
                    />
                    <div className="invalid-feedback">Please add your valuable feedback</div>
                  </div>
                  <button type="submit" className="btn btn-outline-dark">Submit</button>
                </form>
                <hr />
              </div>
            )}

            {/* Display All Reviews */}
            {clothInfo.reviews.length > 0 && (
              <div className="row">
                <h4><b>All Reviews</b></h4>
                {clothInfo.reviews.map((review) => (
                  <div className="card col-4" style={{ padding: 0, border: "0px" }} key={review._id}>
                    <div className="card mb-1" style={{ padding: 0, border: "0px" }}>
                      <div className="card-body">
                        <p className="card-text"><b>@{review.author ? review.author.username : "Unknown"}</b></p>
                        <p className="starability-result card-text" data-rating={review.rating}></p>
                        <p className="card-text">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClothDetail;
