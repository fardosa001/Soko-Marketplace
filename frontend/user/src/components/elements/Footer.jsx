const Footer = () => {

    // var today = new Date();
  
    return (
      <footer className="footer">
      {/* <div className="row justify-content-center mt-3 mb-4">
        <div className="col-8">
          <h5>Soko | MarketPlace - {today.getFullYear()}</h5>
        </div>
      </div> */}
      <div className="newsletter">
        <div className="newsletter-title">Subscribe</div>
        <div className="newsletter-subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</div>
        <div className="newsletter-form">
          <input type="email" placeholder="Enter your email" />
          <button>Subscribe</button>
        </div>
        <div className="footer-logo"></div>
        <div className="catch-phrase">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna <br/> aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </div>  
      </div>
      <div className="links">
          <ul>
            <li>Products</li>
            <li>Trending</li>
            <li>My Account</li>
            <li>Vendors</li>
            <li>Brands</li>
          </ul>
        
          <ul>
            <li>Legals</li>
            <li>License</li>
            <li>Refund Policy</li>
            <li>About Us</li>
            <li>Contacts</li>
          </ul>

          <ul className="contact">
            <li>Contacts</li>
            <li>Feel free get in touch with us via<br/>phone or send us a message</li>
            <li>+1 234 567 89 10</li>
            <li>support@logo.com</li>
          </ul>

      </div>
      
      </footer>
    )
  }
  export default Footer