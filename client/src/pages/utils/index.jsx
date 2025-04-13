import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Index = () => {
  // Sample products for trending products section
  const products = [
    { name: "Men's T-shirt", price: 21.99, image: "./images/cat-item1.jpg", link: "/clothing/men" },
    { name: "Women's Overcoat", price: 42.35, image: "./images/post-large-image3.jpg", link: "/clothing/women" },
    { name: "Dresses", price: 36.12, image: "./images/product-item-5.jpg", link: "/clothing/women" },
    { name: "Men's Jolly", price: 36, image: "./images/post-image2.jpg", link: "/clothing/men" },
    { name: "Wollen Sweater", price: 56, image: "./images/banner-image-4.jpg", link: "/clothing/men" },
    { name: "Girl's Fashion", price: 22.6, image: "./images/post-image1.jpg", link: "/clothing/women" },
  ];

  return (
    <div>
      {/* Carousel Section */}
      <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <a href="/clothing/women"><img src="./images/women.jpg" className="d-block w-100" alt="..."/></a>
          </div>
          <div className="carousel-item">
            <a href="/clothing/men"><img src="./images/men.jpg" className="d-block w-100" alt="..."/></a>
          </div>
          <div className="carousel-item">
            <a href="/clothing/children"><img src="./images/children.jpg" className="d-block w-100" alt="..."/></a>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Why Shop With Us Section */}
      <div className="container mt-5 why">
        <p style={{ color: 'gray' }}><b>Why Shop With Us?</b></p><br/>
        <div className="row mt-3">
          <div className="offset-1 col-3 box mt-2">
            <img src="./images/delivery.svg" alt="Fast Delivery"/><br/>
            <span><b>Fast Delivery</b></span><br/>
            Get your item within a week or full refund
          </div>
          <div className="offset-1 col-3 box mt-2">
            <img src="./images/quality.svg" alt="Free Shipping"/><br/>
            <span><b>Free Shipping</b></span><br/>
            Get your item shipped for free with Kiara
          </div>
          <div className="offset-1 col-3 box mt-2">
            <img src="./images/qu.svg" alt="Best Quality"/><br/>
            <span><b>Best Quality</b></span><br/>
            We do not compromise on quality, your satisfaction is our need
          </div>
        </div>
      </div>

      {/* Trending Products Section */}
      <div className="container mt-5 why">
        <p style={{ color: 'red' }}><b>Our Trending Products</b></p><br/>
        <div className="row mt-3">
          {products.map((product, index) => (
            <div key={index} className="offset-1 col-3 box mt-2 product">
              <a href={product.link}><img src={product.image} style={{ height: '80%', width: '100%' }} alt={product.name}/></a>
              <div className="content">
                <p>{product.name}</p>
                <p>&dollar; {product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="container-fluid newsletter mt-5">
        <h1>Subscribe To Get Discount Offers</h1><br/>
        <p>Subscribe now, to receive the latest updates on trending products and much more</p>
        <input type="email" placeholder="Enter Your Email" /><br/><br/>
        <button type="submit" className="btn btn-danger btn-mail">Submit</button>
      </div>

      {/* Testimonials Section */}
      <div className="container mt-5 why">
        <p style={{ color: 'gray' }}><b>Our Customers Love Us</b></p><br/>
        <div className="row mt-3">
          <div className="col-4 mt-2 re" style={{ backgroundColor: 'darksalmon' }}>
            <span><b>"Aenean sollicitudin, quis auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio."</b></span><br/><br/>
            <p>Lauren Munoz</p>
          </div>
          <div className="col-8 mt-2 re" style={{ backgroundColor: 'aquamarine' }}>
            <span><b>“Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio amet nibh cursus a sit amet mauris.”</b></span><br/><br/>
            <p>Ronald Snyder</p>
          </div>
          <div className="col-7 re" style={{ backgroundColor: 'blueviolet' }}>
            <span><b>Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio amet nibh cursus a sit amet mauris."</b></span><br/><br/>
            <p>Jessica Hawkins</p>
          </div>
          <div className="col-5 re" style={{ backgroundColor: 'green' }}>
            <span><b>Aenean sollicitudin, quis auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio.</b></span><br/><br/>
            <p>Sean West</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
