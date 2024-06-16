import React from 'react'
import { Skeleton } from 'antd'
import "./styles/card.css"

const Card = ({loading,booksdata}) => {
  return (
      <div className="books_renderer">
      {loading
            ? new Array(12).fill(null).map((_, index) => (
                <div className="book_card" key={index}>
                  <Skeleton
                    className="book_image"
                    style={{ objectFit: "contain", height: "200px" }}
                  ></Skeleton>
                </div>
              ))
            :booksdata.length>0&& booksdata.map((book) => (
                <div className="book_card" key={book?.id}>
                  <img
                    className="book_image"
                    style={{ objectFit: "contain" }}
                    width={150}
                    src={book?.thumbnail}
                    alt={book?.title}
                  />
                  <div className="details">
                    <label>{book.title}</label>
                  </div>
                  <button className="card-button">Favourite</button>
                </div>
              ))}
              </div>
  )
}

export default Card