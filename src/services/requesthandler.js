import axios from "axios";

const url = import.meta.env.VITE_API_URL;

async function getrequest(suburl) {
  let res = await axios.get(url + suburl);

  return res;
}

async function postrequest(suburl, data) {
  let res = await axios.post(url + suburl, data);
  return res;
}

export { getrequest, postrequest };
