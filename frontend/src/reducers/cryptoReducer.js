const initialState = {
  prices: [],
};

export const cryptoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PRICES":
      return {
        ...state,
        prices: action.payload,
      };
    default:
      return state; 
  }
};
