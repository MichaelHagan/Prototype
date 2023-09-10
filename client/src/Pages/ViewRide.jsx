import React, { useState } from 'react'
import Hero from "../images/hero/main-car.png"
import Car from "../images/hero/car.png"
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import BookCar from './BookCar';
import Modal from '../components/Modal';


const ViewRide = () => {
    const location = useLocation();
    const { carDetails } = location.state;

    const [selectedImage, setSelectedImage] = useState(Hero);
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleImageChange = (image) => {
        setSelectedImage(image);
    };

    return (
        <section>
            <div className='products'>
            <div className='product-detail-container'>
                    <div className='product-images'>
                        <div className='small-images-container'>
                            <img src={Hero} alt="" className='small-image' onClick={() => handleImageChange(Hero)} onMouseEnter={() => handleImageChange(Hero)} />
                            <img src={Car} alt="" className='small-image' onClick={() => handleImageChange(Car)} onMouseEnter={() => handleImageChange(Car)} />
                            {/* {image?.map((item, ind) => (
                            <img 
                            key={ind}
                            src={urlFor(item)} 
                            className='small-image' 
                            onMouseEnter={() => setIndex(ind)} />
                        ))} */}
                        </div>
                        <div className='big-image-container'>
                            <img src={selectedImage} alt="" className='small-image'
                            />

                            {/* <img src={urlFor(image && image[index])} /> */}
                        </div>
                    </div>
                    <div className='product-details'>
                        <div className='name-and-category'>
                            <h1>{carDetails.name}</h1>
                            <span>Gh₵{carDetails.price} per day</span>
                        </div>
                        <div className='size'>
                            <p>{carDetails.description}</p>
                        </div>
                        <div className='quantity-desc'>
                            <h4>{`${carDetails.available ? "Available" : "Not available"}`}</h4>
                            <div>
                                {/* <span className='minus' onClick={decQty}><AiOutlineMinus /></span>
                            <span className='num' onClick=''>{qty}</span>
                            <span className='plus' onClick={incQty}><AiOutlinePlus /></span> */}
                            </div>
                        </div>
                        <div className='add-to-cart'>
                            <button className='navbar__buttons__register' type='button' onClick={openModal}>Book Ride</button>
                            {/* <p className='price'>${price}.00</p>   */}
                        </div>
                    </div>
                </div>

                <div className='product-desc-container'>
                    <div className='desc-title'>
                        <div className="desc-background">
                            Overview
                        </div>
                        <h2>Product Information</h2>
                    </div>
                    <div className='desc-details'>
                        <h4>PRODUCT DETAILS</h4>
                        {/* <p>{details[0].children[0].text}</p>   */}
                    </div>
                    <div className='desc-care'>
                        <h4>PRODUCT CARE</h4>
                        <ul>
                            {/* {careList.map(list => (
                        <li>{list}</li>
                    ))} */}
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <BookCar carDetails={carDetails} />
            </Modal>
        </section>
    )
}

export default ViewRide
