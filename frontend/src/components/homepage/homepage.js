import React from 'react';
import './homepage.css'
// import { useNavigate } from 'react-router-dom';
import photo from './book_free_stock_photo.jpeg';


const Homepage = () => {
    // let navigate = useNavigate();

    return (
        <div className="homepage">
            <div className='background-img'>
                <img src={photo} width="100%" height="50%" alt="books-background"/>
            </div>
            <br></br>
            <p>Our Book exchange app established in the year 2022, is an online book exchange system is a web platform which is used to exchange books online. It offers an inexpensive way for people to exchange books, find out about new books and obtain a new book to read without having to pay.</p>
        </div>
    )
};

export default Homepage;