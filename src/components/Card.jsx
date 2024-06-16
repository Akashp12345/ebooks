import React from "react";
import { Skeleton, message } from "antd";
import "./styles/card.css";
import axios from "axios";
import { isAuthenticated } from "../utils/auth";
import { useDispatch } from "react-redux";
import { enableLogin } from "../utils/store/reducer";
import { FaRegHeart, FaHeart, FaCheck, FaCheckDouble } from "react-icons/fa";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { postrequest } from "../services/requesthandler";
const Card = ({ loading, booksdata ,fetcher}) => {
  const dispatch = useDispatch();
  const AddToFavourite = async (book) => {
    try {
      if (!isAuthenticated()) {
        dispatch(enableLogin(true));
        return;
      }
      await postrequest(`/books/favourite/8cb7097d-67d1-48aa-88dc-f648264f69f2`,book)
      fetcher()
    } catch (err) {
      console.log(err.message);
    }
  };

  const MarkasRead = async (book) => {
    try {
      if (!isAuthenticated()) {
        dispatch(enableLogin(true));
        return;
      }

      await postrequest(`/books/markasread/8cb7097d-67d1-48aa-88dc-f648264f69f2`,book)
      fetcher()
      message.success({

      })
    } catch (err) {
      console.log(err.message);
    }
  };

  const readBook = (link, e) => {
    if(!isAuthenticated()){
      dispatch(enableLogin(true));
      return;
    }
    e.preventDefault();
    window.open(link, "_blank");
  };

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
        : booksdata.length > 0 &&
          booksdata.map((book) => (
            <div className="book_card" key={book?.id}>
              <div
                id="card_details"
                onClick={(e) => readBook(book?.previewLink, e)}
              >
                <img
                  className="book_image"
                  style={{ objectFit: "contain" }}
                  width={150}
                  src={book?.thumbnail}
                  alt={book?.title}
                />
                <div className="card_description">
                  <span className="book_title">{book?.title}</span>
                  <br />
                  <span className="book_authors">
                    {book?.authors && book?.authors.join(",")}
                  </span>
                </div>
              </div>

              <div className="card-button">
                <span>
                  {!book?.favourite ? (
                    <FaRegHeart
                      title="Add to Favourite"
                      size={20}
                      onClick={() => AddToFavourite(book)}
                    />
                  ) : (
                    <FaHeart
                      title="Remove from Favourite"
                      color="red"
                      size={20}
                      onClick={() => AddToFavourite(book)}
                    />
                  )}
                </span>
                |
                <span>
                  {book?.readstatus ? (
                    <IoCheckmarkDoneOutline
                      color="green"
                      size={20}
                      onClick={() => MarkasRead(book)}
                      title="Mark as unRead"
                    />
                  ) : (
                    <FaCheck
                      title="Mark as read"
                      onClick={() => MarkasRead(book)}
                    />
                  )}
                </span>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Card;
