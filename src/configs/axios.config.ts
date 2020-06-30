import axios from "axios";

const data = axios.create({
  baseURL: "https://www.mercadobitcoin.net/api",
});
const negotiation = axios.create({
  baseURL: "https://www.mercadobitcoin.net/tapi/v3",
});
export default { data, negotiation };
