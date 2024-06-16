import axios from "axios";

const url = "http://127.0.0.1:5002/api/v1";

async function getrequest(suburl) {
 
      let res=await axios.get(url+suburl)
     
      return res
}

async function postrequest(suburl,data) {
          let res=await axios.post(url+suburl,data)
          return res
    }


    export{
      getrequest,
      postrequest
    }
