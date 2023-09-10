import Footer from "../components/Footer";
import HeroPages from "../components/HeroPages";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


function Models() {
  const navigate = useNavigate()

  const bookBtn = () => {
    navigate("/view-ride-details")
  };

  const baseURL = "http://localhost:5000";
  const [cars, setCars] = useState([])

  useEffect(() => {

    axios.get(baseURL + "/cars").then((response) => {
      setCars(response.data);
    });

  }, []);

  console.log(cars, "hj")

  return (
    <>
      <section className="models-section">
        <HeroPages name="Vehicle Models" />
        <div className="container">
          <div className="models-div">
            {
              cars.map((car) => {
                return (
                  <div className="models-div__box">
                  <div className="models-div__box__img">
                    <img src={car.imageUrl} alt="car_img" />
                    <div className="models-div__box__descr">
                      <div className="models-div__box__descr__name-price">
                        <div className="models-div__box__descr__name-price__name">
                          <p >{car.name}</p>
                          <p style={{fontSize:"1.5rem"}}>Gh₵{car.price} per day</p>
                        </div>
                      </div>
                      <div className="models-div__box__descr__name-price__details">
                        <p style={{fonSize:"1.2rem"}}>{car.description}</p>
                      </div>
                      <div className="models-div__box__descr__name-price__btn" style={{color:"#ffffff"}} onClick={bookBtn}>
                          More Details
                      </div>
                    </div>
                  </div>
                </div>
                )
              })
            }
         

          </div>
        </div>
        <div className="book-banner">
          <div className="book-banner__overlay"></div>
          <div className="container">
            <div className="text-content">
              <h2>Book a car by getting in touch with us</h2>
              <span>
                <i className="fa-solid fa-phone"></i>
                <h3>(123) 456-7869</h3>
              </span>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}

export default Models;
