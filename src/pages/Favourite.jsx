import React, { useState } from 'react'
import { Result } from 'antd'
import "./styles/favourite.css"
const Favourite = () => {
      const [loading,setLoading]=useState(false)
      const [booksdata,setBooksData]=useState([])
  return (
    <div id='book_render'>
      <section>
            <label>My Favourite</label>
      </section>
      <section>
      {!loading && booksdata.length === 0 && (
            <center>
              <Result
                status="404"
             
                subTitle="Sorry,no favourite book added."
              />
            </center>
          )}
      </section>
       
    </div>
  )
}

export default Favourite