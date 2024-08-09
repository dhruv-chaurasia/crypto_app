import axios from "axios";

export const fetchPrices = (symbol) => async (dispatch) => {
  try {
    const { data } = await axios.get(`http://localhost:3001/api/prices/${symbol}`);
    dispatch({
      type: "FETCH_PRICES",
      payload: data.length===0?JSON.parse(localStorage.getItem(`data${symbol}`)):data,
    });
    if (data.length > 0) {
      localStorage.setItem(`data$${symbol}`, JSON.stringify(data));
    }
  }
  catch (e) {
    dispatch({
      type: "FETCH_PRICES",
      payload: JSON.parse(localStorage.getItem(`data${symbol}`))|| [],
    });
  }
};
