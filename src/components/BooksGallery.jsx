import React from "react";
import "../styles/BooksGallery.css";
import FadeInSection from "./FadeInSection";
import { Link } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

const BooksGallery = () => {
  const allBooks = [
    { src: "/assets/books/a_little_life.png", title: "A Little Life" },
    { src: "/assets/books/pride_and_prejudice.png", title: "Pride and Prejudice" },
    { src: "/assets/books/dracula.jpg", title: "Dracula" },
    { src: "/assets/books/jane_eyre.png", title: "Jane Eyre" },
    { src: "/assets/books/harry_potter.jpg", title: "Harry Potter and the Philosopher's Stone" },
    { src: "/assets/books/goodnight_punpun.jpg", title: "Goodnight Punpun" },
    { src: "/assets/books/hunger_games.png", title: "The Hunger Games" },
    { src: "/assets/books/a_thousand_splendid_suns.png", title: "A Thousand Splendid Suns" },
    { src: "/assets/books/a_man_called_ove.jpg", title: "A Man Called Ove" },
    { src: "/assets/books/she_wore_red_trainers.png", title: "She Wore Red Trainers" }
  ];

  return (
    <div className="books-gallery-page">
      <div className="section-header">
        <Link to="/" className="back-button">
          <ArrowBackRoundedIcon />
        </Link>
        <span className="section-title">/ reading list</span>
      </div>
      <FadeInSection delay="200ms">
        <div className="gallery-description">
          A running list of what I've read: literary fiction, mangas and some occasional marketing deep-dives.
        </div>
      </FadeInSection>
      <div className="gallery-grid">
        {allBooks.map((book, i) => (
          <FadeInSection key={i} delay={(i + 1) * 100 + "ms"}>
            <div className="gallery-card">
              <div className="book-container">
                <div className="book">
                  <div className="book-cover">
                    <div className="book-cover-front">
                      <img src={book.src} alt={book.title} className="gallery-image book-image" />
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
  );
};

export default BooksGallery;
