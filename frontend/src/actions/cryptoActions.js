import axios from "axios";

export const fetchPrices = (symbol) => async (dispatch) => {
  const { data } = await axios.get(`http://localhost:3001/api/prices/${symbol}`);
  dispatch({
    type: "FETCH_PRICES",
    payload: data,
  });
};
