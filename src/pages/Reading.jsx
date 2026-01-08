// Reading.jsx

import React from 'react';
import './Reading.css';
// import atomicHabits from '../images/atomic_habits.jpg'; // TODO: Add images
// import richDadPoorDad from '../images/rich_dad_poor_dad.jpg';
// import alchemist from '../images/alchemist.jpg';
// import eatThatFrog from '../images/eat_that_frog.jpg';
// import vijayanikiAidhuMetlu from '../images/vijayaniki_aidu_metlu.jpg';
// import venneloAdapilla from '../images/vennelo_adapilla.jpeg';

const books = [
    {
        title: "The Alchemist",
        author: "Paulo Coelho",
        imgSrc: "https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg",
        description: "A magical journey of following one's dreams.",
    },
];

const Reading = () => {
    return (
        <div className="reading-container">
            <h2 className="reading-title">📚 Books That Shaped My Journey</h2>
            <p className="reading-intro">These books have influenced my perspectives, motivation, and self-growth.</p>
            <div className="books-grid">
                {books.map((book, index) => (
                    <div key={index} className="book-card" style={{ '--delay': `${index * 0.1}s` }}>
                        <img
                            src={book.imgSrc}
                            alt={book.title}
                            className="book-cover"
                            loading="lazy"
                            decoding="async"
                        />
                        <div className="book-info">
                            <h3 className="book-title">{book.title}</h3>
                            <h4 className="book-author">{book.author}</h4>
                            <p className="book-description">{book.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reading;
