import React, { useEffect, useCallback, useState, useRef } from "react";
import "./styles/home.css";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import {
  Dropdown,
  Input,
  Select,
  Skeleton,
  Pagination,
  message,
  Result,
} from "antd";
import { IoMdArrowDropdown } from "react-icons/io";
import Card from "../components/Card";
import { getrequest } from "../services/requesthandler";
const { Search } = Input;
const Home = () => {
  const timeId = useRef(null);
  const [totalPages, setTotalPages] = useState(0);
  const [booksdata, setBooksData] = useState([]);
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useSearchParams();

  const fetcher = useCallback(async (query, page) => {
    try {
      const search = query || params.get("search");
      const pageno = page || Number(params.get("page"));

      let response = await getrequest(
        `/books/searchbooks/8cb7097d-67d1-48aa-88dc-f648264f69f2?search=${
          search || "*"
        }&pageNumber=${pageno || 1}`
      );

      setLoading(false);
      if (response.status === 200) {
        setBooksData(response.data.books);
        setTotalPages(response.data.totalpages);
      }
    } catch (err) {
      setLoading(false);

      console.log(err.response.data);
    }
  }, []);

  useEffect(() => {
    fetcher();
  }, []);

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
              style={{ width: "350px" }}
              onChange={(e) => {
                setSearching(true);
                debouncedHandleInputChange(e.target.value);
              }}
            />
          </div>
          <div>
            {" "}
            <span>
              <label className="search_title">Authors :</label>
              <Select
                size="small"
                variant="borderless"
                style={{ width: "150px" }}
                placeholder="Authors"
                options={[{ label: "one", value: "one" }]}
              />
            </span>
            <span>
              <label className="search_title">Category :</label>
              <Select
                size="small"
                variant="borderless"
                style={{ width: "150px" }}
                allowClear
                placeholder="Category"
                options={[{ label: "one", value: "one" }]}
              />
            </span>
          </div>
        </section>

        <span>
          <Dropdown
            menu={{
              items: [
                {
                  key: 1,
                  label: "Latest",
                },
                {
                  key: 2,
                  label: "Oldest",
                },
              ],
            }}
          >
            <span className="sort_by">
              <label className="search_title">sort by </label>{" "}
              <IoMdArrowDropdown />
            </span>
          </Dropdown>
        </span>
      </section>
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
      <center>
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
