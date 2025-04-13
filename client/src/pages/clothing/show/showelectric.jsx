import React, { useState, useEffect } from 'react';

const ClothDetail = ({ clothInfo, currUser }) => {
  const [review, setReview] = useState({
    rating: 1,
    comment: '',
  });

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // Replace with your backend API for submitting reviews
    fetch(`/listings/${clothInfo.id}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rating: review.rating,
        comment: review.comment,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle successful review submission (e.g., show a success message or update the reviews list)
        alert('Review submitted successfully!');
      })
      .catch((error) => console.error('Error submitting review:', error));
  };

  const handleAddToCart = () => {
    // Add to cart logic (e.g., update the cart via backend)
    fetch('/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cloth: {
          image: clothInfo.image,
          name: clothInfo.name,
          description: clothInfo.description,
          price: clothInfo.price,
          stock: clothInfo.stock,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Item added to cart!');
      })
      .catch((error) => console.error('Error adding to cart:', error));
  };

  return (
    <div className="card mt-4 showCloth" style={{ border: 'none', width: 'auto' }}>
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
            <p className="card-text">Category: {clothInfo.category}</p>
            <p className="card-text">Brand: {clothInfo.brand}</p>
            {currUser && (
              <button onClick={handleAddToCart} className="btn btn-info">
                Add to Cart
              </button>
            )}
          </div>
          <p className="card-text">
            <small className="text-body-secondary">Kaira's Trend!</small>
          </p>

          {currUser && (
            <>
              <hr />
              <h4>Leave a Review</h4>
              <form onSubmit={handleReviewSubmit} className="needs-validation">
                <div className="mb-3 mt-3">
                  <fieldset className="starability-slot">
                    <legend>Rating:</legend>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <React.Fragment key={rating}>
                        <input
                          type="radio"
                          id={`rate${rating}`}
                          name="rating"
                          value={rating}
                          checked={review.rating === rating}
                          onChange={handleReviewChange}
                        />
                        <label htmlFor={`rate${rating}`} title={`Rating ${rating}`}>
                          {rating} star{rating > 1 ? 's' : ''}
                        </label>
                      </React.Fragment>
                    ))}
                  </fieldset>
                </div>
                <div className="mb-3 mt-3">
                  <label htmlFor="comment" className="form-label">
                    Comment
                  </label>
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
                <button className="btn btn-outline-dark">Submit</button>
              </form>
              <hr />
            </>
          )}

          {clothInfo.reviews.length > 0 && (
            <div className="row">
              <h4>
                <b>All Reviews</b>
              </h4>
              {clothInfo.reviews.map((review) => (
                <div key={review._id} className="card col-4" style={{ padding: 0, border: 0 }}>
                  <div className="card mb-1" style={{ padding: 0, border: 0 }}>
                    <div className="card-body">
                      <p className="card-text">
                        <b>@{review.author.username}</b>
                      </p>
                      <p className="starability-result card-text" data-rating={review.rating}></p>
                      <p className="card-text">{review.comment}</p>
                    </div>
                    {currUser && review.author._id === currUser._id && (
                      <form
                        className="mt-3"
                        method="post"
                        action={`/listings/${clothInfo._id}/review/${review._id}?_method=delete`}
                      >
                        <button className="btn btn-sm btn-dark">Delete</button>
                      </form>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClothDetail;
