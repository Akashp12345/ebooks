import React from "react";
import { Skeleton, message, Typography } from "antd";
import { isAuthenticated } from "../utils/auth";
import { useDispatch } from "react-redux";
import { enableLogin } from "../utils/store/reducer";
import { postrequest } from "../services/requesthandler";
import { jwtDecode } from "jwt-decode";
// icons
import { FaRegHeart, FaHeart, FaCheck } from "react-icons/fa";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
// Styles
import "./styles/card.css";
const { Text } = Typography;

const Card = ({ loading, booksdata, fetcher }) => {
  const dispatch = useDispatch();
  let decode = "";
  if (sessionStorage.getItem("token")) {
    let token = sessionStorage.getItem("token");
    decode = jwtDecode(token);
  }

  // Adding and removing from favourite
  const AddToFavourite = async (book) => {
    try {
      // Checking is user logged in or not
      if (!isAuthenticated()) {
        dispatch(enableLogin(true));
        return;
      }
      await postrequest(`/api/v1/books/favourite/${decode?.userid}`, book);
      fetcher();
    } catch (err) {
      console.log(err.message);
    }
  };

  // Marking as read and unread
  const MarkasRead = async (book) => {
    try {
      // Checking is user logged in or not
      if (!isAuthenticated()) {
        dispatch(enableLogin(true));
        return;
      }

      await postrequest(`/api/v1/books/markasread/${decode?.userid}`, book);
      fetcher();
      message.success({});
    } catch (err) {
      console.log(err.message);
    }
  };

  // Read the book
  const readBook = (link, e) => {
    // Checking is user logged in or not
    if (!isAuthenticated()) {
      dispatch(enableLogin(true));
      return;
    }
    e.preventDefault();
    window.open(link, "_blank");
  };

  return (
    <div className="books_renderer">
      {loading
        ? // Initial loading
          new Array(12).fill(null).map((_, index) => (
            <div className="book_card" key={index}>
              <Skeleton
                className="book_image"
                style={{ objectFit: "contain", height: "200px" }}
              ></Skeleton>
            </div>
          ))
        : booksdata.length > 0 &&
          // Cards rendering
          booksdata.map((book) => (
            <div className="book_card" key={book?.id}>
              <div
                className="card_details"
                onClick={(e) => readBook(book?.previewLink, e)}
              >
                {/* Card thumbnail */}
                <img
                  className="book_image"
                  style={{ objectFit: "contain" }}
                  width={150}
                  src={book?.thumbnail}
                  alt={book?.title}
                />
                <div className="card_description">
                  {/* Book Title */}
                  <span className="book_title">
                    <Text
                      style={{ width: "150px" }}
                      className="book_title"
                      ellipsis={{ tooltip: book?.title }}
                    >
                      {book?.title}
                    </Text>
                  </span>{" "}
                  <br />
                  {/* Book Authors */}
                  <div className="book_authors">
                    <Text
                      style={{ width: "150px" }}
                      ellipsis={{ tooltip: book?.authors?.join(",") }}
                    >
                      {book?.authors && book?.authors.join(",")}
                    </Text>
                  </div>
                </div>
              </div>
              {/* Add to favourite and mark as read button */}
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
