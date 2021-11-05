import React from 'react';

function Footer(props) {
    return (
        <div>
            <div className="footer">
  <div className="container">
    <div className="row">
      <div className="col-md-6 col-lg-3">
        <div className="footer-about">
          <h3>About Us</h3>
          <p>
            Lorem ipsum dolor sit amet elit. Quisque eu lectus a leo dictum nec non quam. Tortor eu placerat rhoncus, lorem quam iaculis felis, sed lacus neque id eros
          </p>
          <div className="footer-social">
            <a href><i className="fab fa-twitter" /></a>
            <a href><i className="fab fa-facebook-f" /></a>
            <a href><i className="fab fa-youtube" /></a>
            <a href><i className="fab fa-instagram" /></a>
            <a href><i className="fab fa-linkedin-in" /></a>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-3">
        <div className="footer-contact">
          <h3>Get In Touch</h3>
          <p><i className="fa fa-map-marker-alt" />123 Street, New York, USA</p>
          <p><i className="fa fa-phone-alt" />+012 345 67890</p>
          <p><i className="fa fa-envelope" />info@example.com</p>
          <p><i className="far fa-clock" />Mon - Fri, 9AM - 10PM</p>
        </div>
      </div>
      <div className="col-md-6 col-lg-3">
        <div className="footer-links">
          <h3>Useful Links</h3>
          <a href>Lorem ipsum</a>
          <a href>tempus posuere </a>
          <a href>velit id accumsan</a>
          <a href>ut porttitor</a>
          <a href>Nam pretium</a>
          <a href>accumsan</a>
        </div>
      </div>
      <div className="col-md-6 col-lg-3">
        <div className="footer-project">
          <h3>Latest Projects</h3>
          <a href><img src="img/img-1.jpg" alt="Image" /></a>
          <a href><img src="img/img-2.jpg" alt="Image" /></a>
          <a href><img src="img/img-3.jpg" alt="Image" /></a>
          <a href><img src="img/img-4.jpg" alt="Image" /></a>
          <a href><img src="img/img-5.jpg" alt="Image" /></a>
          <a href><img src="img/img-6.jpg" alt="Image" /></a>
        </div>
      </div>
    </div>
  </div>
  <div className="container footer-newsletter">
    <p>
      Lorem ipsum dolor sit amet elit. Quisque eu lectus a leo dictum nec non quam. Tortor eu placerat rhoncus, lorem quam iaculis felis, sed lacus neque id eros 
    </p>
    <div className="row form">
      <div className="col-sm-4">
        <input className="form-control" placeholder="Your Name" />
      </div>
      <div className="col-sm-4">
        <input className="form-control" placeholder="Your Email" />
      </div>
      <div className="col-sm-4">
        <button className="btn">Subscribe</button>
      </div>
    </div>
  </div>
  <div className="copyright">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-6">
          <div className="copy-text">
            <p>© <a href="#">Foolish Developer</a>. All Rights Reserved</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="copy-menu">
            <a href>About</a>
            <a href>Terms</a>
            <a href>Privacy</a>
            <a href>Contact</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        </div>
    );
}

export default Footer;