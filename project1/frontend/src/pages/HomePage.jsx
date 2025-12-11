import Carousel from 'react-bootstrap/Carousel';
import run1 from "../assets/run1.jpg";
import run2 from "../assets/run2.jpg";
import run3 from "../assets/run3.jpg";
import "../css/HomeCarousel.css";

/**
 * This is the homepage of my application that just displays
 * A carousel with 3 different images and has no other function
 * rather than just making the application look a little 
 * more professional
 */
export default function HomeCarousel() {
  return (
    <Carousel>
      <Carousel.Item interval={3000}> 
        <img
          className="d-block w-100 carousel-image"
          src={run1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Welcome to My Inventory Tracker</h3>
          <p>Find your favorite products here</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={3000}>
        <img
          className="d-block w-100 carousel-image"
          src={run2}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>New Arrivals</h3>
          <p>Fresh inventory updated daily</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={3000}>
        <img
          className="d-block w-100 carousel-image"
          src={run3}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Fast & Reliable</h3>
          <p>Delivering the best experience</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
