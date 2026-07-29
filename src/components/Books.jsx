import React from "react";
import "../styles/Books.css";
import FadeInSection from "./FadeInSection";
import TiltCard from "./TiltCard";
import { Link } from "react-router-dom";

const Books = () => {
  const topBooks = [
    { src: "/assets/books/a_little_life.png", title: "A Little Life" },
    { src: "/assets/books/pride_and_prejudice.png", title: "Pride and Prejudice" },
    { src: "/assets/books/dracula.jpg", title: "Dracula" },
    { src: "/assets/books/jane_eyre.png", title: "Jane Eyre" },
    { src: "/assets/books/harry_potter.jpg", title: "Harry Potter" },
    { src: "/assets/books/goodnight_punpun.jpg", title: "Goodnight Punpun" },
  ];

  return (
    <section className="books section" id="books">
      <FadeInSection>
        <div className="section-heading">
          <div>
            <span className="kicker">05 / Favorite Reads</span>
            <h2>
              Literary fiction, manga &<br />
              <em>marketing deep-dives.</em>
            </h2>
          </div>
          <p>
            A running library of books and mangas that shape my perspective, storytelling intuition, and editorial voice.
          </p>
        </div>

        <div className="books-grid">
          {topBooks.map((book, i) => (
            <TiltCard key={i} className="book-card">
              <div className="book-image-wrapper">
                <img src={book.src} alt={book.title} className="book-cover-img" />
              </div>
              <div className="book-title">{book.title}</div>
            </TiltCard>
          ))}
        </div>
      </FadeInSection>
    </section>
  );
};

export default Books;
