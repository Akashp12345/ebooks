import React, { useEffect, useState, useCallback } from "react";
import { Result } from "antd";
import "./styles/favourite.css";
import Card from "../components/Card";
import { getrequest } from "../services/requesthandler";
import { jwtDecode } from "jwt-decode";
const Favourite = () => {
  const [loading, setLoading] = useState(true);
  const [booksdata, setBooksData] = useState([]);

  // Fetching the favourite books 
  const Fetcher = useCallback(async () => {
    try {
      let decode = "";
      if (sessionStorage.getItem("token")) {
        let token = sessionStorage.getItem("token");
        decode = jwtDecode(token);
      }
      let response = await getrequest(`/api/v1/books/myfavourite/${decode?.userid}`);
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
      {/* Heading */}
      <section>
        <label>My Favourite</label>
      </section>
      {/* Render favourite books */}
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
