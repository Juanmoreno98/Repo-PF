import jwt from "jwt-decode";
import {
  CHANGE_PAGE,
  GET_ALL_BOOKS,
  GET_ALL_USERS,
  GET_BOOKS_BY_NAME,
  GET_BOOK_DETAILS,
  GET_CATEGORIES,
  GET_GENDERS,
  GET_LANGUAGES,
  GET_ALL_AUTHOR,
  GET_ALL_SAGA,
  GET_ALL_EDITORIAL,
  FILTER_BOOKS,
  FILTER_PRICE,
  ORDER_BOOKS,
  GET_SAGA,
  GET_EDITORIAL,
  GET_AUTHOR,
  GET_USER_STRIPE,
  GET_TOKEN,
  CLEAR_STORAGE,
  GET_USER_DETAIL,
} from "./actions";

const initialState = {
  users: [],
  userDetail: [],
  allbooks: [],
  books: [],
  detailsBook: {},
  categories: [],
  languages: [],
  genders: [],
  allAuthor: [],
  allSaga: [],
  allEditorial: [],
  currentPage: 1,
  images: [],
  auxState: [],
  sessionState: [],
  stripeState: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_BOOKS:
      const auxBooks = payload.filter((e) => e.available === true);
      console.log(state.stripeState);
      return {
        ...state,
        auxState: payload,
        allbooks: auxBooks,
        books: auxBooks,
      };
    case CLEAR_STORAGE:
      return {
        ...state,
      };
    case GET_GENDERS:
      return {
        ...state,
        genders: payload.map((elm) => {
          return elm.name;
        }),
      };
    case GET_TOKEN:
      let currentToken = jwt(payload);
      console.log("token", currentToken);
      return {
        ...state,
        sessionState: currentToken,
      };
    case GET_USER_STRIPE:
      console.log("payload", payload);
      return {
        ...state,
        stripeState: payload,
      };
    case GET_CATEGORIES:
      let categories = payload.map((el) => el.name);
      return {
        ...state,
        categories: categories,
      };
    case GET_LANGUAGES:
      return {
        ...state,
        languages: payload.map((elm) => {
          return elm.name;
        }),
      };
    case GET_ALL_USERS:
      return {
        ...state,
        users: payload,
      };
    case GET_USER_DETAIL:
      return {
        ...state,
        userDetail: [payload],
      };
    case GET_ALL_AUTHOR:
      return {
        ...state,
        allAuthor: payload,
      };

    case GET_ALL_SAGA:
      return {
        ...state,
        allSaga: payload,
      };

    case GET_ALL_EDITORIAL:
      return {
        ...state,
        allEditorial: payload,
      };

    case GET_BOOKS_BY_NAME:
      state.books = state.allbooks;

      return {
        ...state,
        books: payload,
      };

    case GET_BOOK_DETAILS:
      return {
        ...state,
        detailsBook: payload,
      };
    case CHANGE_PAGE:
      return {
        ...state,
        currentPage: payload,
      };
    case FILTER_BOOKS:
      let filterType = payload.name;
      let filterElement = payload.value;
      let booksFiltered = state.allbooks[0];
      if (filterType === "gender") {
        booksFiltered = state.books.filter((el) =>
          el.gender.some((el) => el === filterElement)
        );
      } else if (filterType) {
        booksFiltered = state.books.filter(
          (el) => el[filterType] === filterElement
        );
      }
      return {
        ...state,
        books: booksFiltered,
      };

    case FILTER_PRICE:
      let max_or_min = payload.name;
      let filterPrice = payload.value;
      let booksFiltered1 = state.books.slice();

      if (max_or_min === "Min") {
        let booksFiltered2 = state.books
          .slice()
          .filter((el) => parseInt(el.price) >= parseInt(filterPrice));
        if (booksFiltered2.length > 0) booksFiltered1 = booksFiltered2;
      } else if (max_or_min === "Max") {
        let booksFiltered2 = state.books
          .slice()
          .filter((el) => parseInt(el.price) <= parseInt(filterPrice));
        if (booksFiltered2.length > 0) booksFiltered1 = booksFiltered2;
      }

      return {
        ...state,
        books: booksFiltered1,
      };

    case ORDER_BOOKS:
      const order = payload;
      let booksOrdered = state.books.slice();

      if (order === "AZ") {
        booksOrdered = booksOrdered.sort(function (a, b) {
          if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1;
          }
          if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
          }
          return 0;
        });
      } else if (order === "ZA") {
        booksOrdered = booksOrdered.sort(function (a, b) {
          if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return 1;
          }
          if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return -1;
          }
          return 0;
        });
      } else if (order === "LP") {
        booksOrdered = booksOrdered.sort(function (a, b) {
          if (a.price > b.price) {
            return 1;
          }
          if (a.price < b.price) {
            return -1;
          }
          return 0;
        });
      } else if (order === "HP") {
        booksOrdered = booksOrdered.sort(function (a, b) {
          if (a.price < b.price) {
            return 1;
          }
          if (a.price > b.price) {
            return -1;
          }
          return 0;
        });
      }

      return {
        ...state,
        books: booksOrdered,
      };
    case GET_SAGA:
      return {
        ...state,
        books: payload,
      };
    case GET_EDITORIAL:
      return {
        ...state,
        books: payload,
      };
    case GET_AUTHOR:
      return {
        ...state,
        books: payload,
      };
    case "IMAGE":
      return {
        ...state,
        images: payload,
      };
    default:
      return state;
  }
};
export default rootReducer;
