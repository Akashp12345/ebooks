import React, { useEffect, useState, useCallback } from "react";
import { Result } from "antd";
import "./styles/favourite.css";
import axios from "axios";
import Card from "../components/Card";
const Favourite = () => {
  const [loading, setLoading] = useState(true);
  const [booksdata, setBooksData] = useState([]);

  const Fetcher = useCallback(async () => {
    try {
      let response = await axios.get(
        "http://127.0.0.1:5002/api/v1/books/myfavourite/8cb7097d-67d1-48aa-88dc-f648264f69f2"
      );
      setBooksData(response.data.books);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    Fetcher();
  }, []);

  return (
    <div id="book_render">
      <section>
        <label>My Favourite</label>
      </section>
      <section>
        {!loading && booksdata.length === 0 && (
          <center>
            <Result status="404" subTitle="Sorry,no favourite book added." />
          </center>
        )}
        <Card loading={loading} booksdata={booksdata} fetcher={Fetcher} />
      </section>
    </div>
  );
};

export default Favourite;
