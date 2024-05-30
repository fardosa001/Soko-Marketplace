import React, { useState } from 'react';
import '../elements/styles/product.css';

const ProductView = () => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (amount) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + amount;
      return newQuantity > 0 ? newQuantity : 1;
    });
  };

  return (
    <div className="product-view">
      <div className="product-content">
        <div className="product-image-gallery">
         <div className="main-image">
         </div>
          <div className="thumbnail-images">
            <img src="../elements/img/product2.png" alt="Thumbnail" />
            <img src="../elements/img/product2.png" alt="Thumbnail" />
            <img src="../elements/img/product2.png" alt="Thumbnail" />
          </div>
        </div>
        <div className="product-details">
          <h2>MacBook Pro 2020</h2>
          <p>Lorem ipsum dolor sit ame consectetur adipiscing elit.</p>
          <div className="price">$90.00</div>
          <div className="size-options">
            <button className="size-button">2kg</button>
            <button className="size-button">4kg</button>
          </div>
          <div className="stock-status">In stock (15 units) ready to be shipped</div>
          <div className="quantity">
            <button onClick={() => handleQuantityChange(-1)}>-</button>
            <input type="text" value={quantity} readOnly />
            <button onClick={() => handleQuantityChange(1)}>+</button>
          </div>
          <div className="action-buttons">
            <button className="add-to-cart">Add To Cart</button>
            <button className="buy-it-now">Buy It Now</button>
          </div>
        </div>
      </div>
      <div className="attribution">Soko | MarketPlace</div>
    </div>
  );
};

export default ProductView;