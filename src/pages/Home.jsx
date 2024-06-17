import React, { useEffect, useCallback, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Input, Pagination, Result } from "antd";
import { jwtDecode } from "jwt-decode";    //decode the token
import Card from "../components/Card";
import { getrequest } from "../services/requesthandler";
import "./styles/home.css";
const { Search } = Input;
const Home = () => {
  const timeId = useRef(null);
  const [totalPages, setTotalPages] = useState(0);
  const [booksdata, setBooksData] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useSearchParams();
  const { isloggedin } = useSelector((state) => state.bookstore);

  // Fetch all books
  const fetcher = useCallback(async (query, page) => {
    try {
      let decode = "";
      if (sessionStorage.getItem("token")) {
        let token = sessionStorage.getItem("token");
        decode = jwtDecode(token);
      }

      const search = query || params.get("search");
      const pageno = page || Number(params.get("page"));

      let response = await getrequest(
        `/api/v1/books/searchbooks/${decode?.userid}?search=${
          search || "*"
        }&pageNumber=${pageno || 1}`
      );

      setLoading(false);
      if (response.status === 200) {
        setRecommended(response?.data?.recommended);
        setBooksData(response.data.books);
        setTotalPages(response.data.totalpages);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetcher();
  }, [isloggedin]);

  // Debounce function
  const debounce = (func, delay) => {
    return (...args) => {
      clearTimeout(timeId.current);
      timeId.current = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const updateSearchParams = (newParams) => {
    const updatedParams = new URLSearchParams(params);

    Object.keys(newParams).forEach((key) => {
      if (newParams[key] <= 1 || newParams[key].length <= 0) {
        updatedParams.delete(key);
      } else {
        updatedParams.set(key, newParams[key]);
      }
    });

    setParams(updatedParams);
  };

  // Function to handle input change
  const handleInputChange = (val) => {
    fetcher(val);
    setSearching(false);
    updateSearchParams({ search: val });
  };

  // Debounced version of the input change handler
  const debouncedHandleInputChange = debounce(handleInputChange, 500);

  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  };

  // handle page changes
  const HandlePages = (val) => {
    updateSearchParams({ page: val });

    fetcher(null, val);
  };

  return (
    <div>
      {/* Search and filter section*/}
      <section id="search_filter_home">
        <section id="search_filter_left">
          <div>
            <Search
              loading={searching}
              defaultValue={params.get("search")}
              placeholder="Search by title, author or category"
              className="search_input"
              onChange={(e) => {
                setSearching(true);
                debouncedHandleInputChange(e.target.value);
              }}
            />
          </div>
        </section>
      </section>

      {/* Recommended books */}
      {recommended.length > 0 && (
        <section id="book_render">
          <label className="books_heading">Recommended Books</label>

          <Card loading={loading} booksdata={recommended} fetcher={fetcher} />
        </section>
      )}

      {/* Render books */}
      <section id="book_render">
        <label className="books_heading">All Books</label>
        {!loading && booksdata.length === 0 && (
          <center>
            <Result
              status="404"
              subTitle="Sorry,no books available for read."
            />
          </center>
        )}
        <Card loading={loading} booksdata={booksdata} fetcher={fetcher} />
      </section>
      {/* pagination */}
      <center style={{ marginBottom: "20px" }}>
        {" "}
        <Pagination
          current={params.get("page") || 1}
          onChange={(page) => HandlePages(page)}
          total={totalPages}
          showSizeChanger={false}
          itemRender={itemRender}
          pageSize={12}
        />
      </center>
    </div>
  );
};

export default Home;
