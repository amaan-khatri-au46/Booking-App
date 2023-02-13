// Here we are going to use createcontext for creating a context api
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  city: undefined,
  dates: [],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};

export const SearchContext = createContext(INITIAL_STATE);

// payload will be destination date range and option ....
const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

// this children are our component which we want to reatc the data 
// we are going to warap or application 
export const SearchContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);
  
    return (
      <SearchContext.Provider
        value={{
          city: state.city,
          dates: state.dates,
          options: state.options,
          dispatch,
        }}
      >
        {children}
      </SearchContext.Provider>
    );
  };

//   we are passing a dispatch because when ever we are updating the search bar we need dispatch 