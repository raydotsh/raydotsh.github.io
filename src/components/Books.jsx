import React from "react";
import "../styles/Books.css";
import FadeInSection from "./FadeInSection";
import { Link } from "react-router-dom";

const Books = () => {
  const topBooks = [
    { src: "/assets/books/a_little_life.png", title: "A Little Life" },
    { src: "/assets/books/pride_and_prejudice.png", title: "Pride and Prejudice" },
    { src: "/assets/books/dracula.jpg", title: "Dracula" },
    { src: "/assets/books/jane_eyre.png", title: "Jane Eyre" },
    { src: "/assets/books/harry_potter.jpg", title: "Harry Potter and the Philosopher's Stone" },
    { src: "/assets/books/goodnight_punpun.jpg", title: "Goodnight Punpun" }
  ];

  return (
    <div id="books">
      <div className="section-header">
        <span className="section-title">/ books</span>
        <Link to="/books" className="explore-link">
          Explore list
        </Link>
      </div>
      <FadeInSection delay="200ms">
        <div className="books-description">
          A running list of what I've read: literary fiction, mangas and some occasional marketing deep-dives.
        </div>
      </FadeInSection>
      <div className="books-container">
        <div className="books-grid">
          {topBooks.map((book, i) => (
            <FadeInSection key={i} delay={(i + 1) * 100 + "ms"}>
              <div className="book-card">
                <div className="book-container">
                  <div className="book">
                    <div className="book-cover">
                      <div className="book-cover-front">
                        <img src={book.src} alt={book.title} className="book-image" />
                      </div>
                      <div className="book-cover-back"></div>
                    </div>
                    <div className="book-pages"></div>
                    <div className="book-spine"></div>
                    <div className="book-back"></div>
                  </div>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Books;
