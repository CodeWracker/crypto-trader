import api from "../../configs/axios.config";

const getTicker = async (callback, currency) => {
  return await api.data(`/${currency}/ticker`).then((resp) => {
    callback(resp.data.ticker);
  });
};

export default { getTicker };
