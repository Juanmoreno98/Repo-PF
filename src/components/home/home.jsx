import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";

import { getAllBooks, setPage } from "../../redux/actions";
import Card from "../card/card";

import s from "./home.module.css";
import Paginated from "../paginado/Paginated";
import SearchBar from "../searchBar/SearchBar";

export default function Home() {
  const dispatch = useDispatch();
  const allBooks = useSelector((state) => state.books);
  const [currentPage, setCurrentPage] = useState(1);
  // let currentPageGlobal = useSelector((state) => state.currentPage);
  const [booksPerPage, setBooksPerPage] = useState(12);
  const [order, setOrder] = useState("");
  const indexOfLastBooks = currentPage * booksPerPage;
  const IndexOfFirstBooks = indexOfLastBooks - booksPerPage;
  const currentBooks = allBooks.slice(IndexOfFirstBooks, indexOfLastBooks);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    dispatch(setPage(pageNumber));
    // setOrder("")
  };

  useEffect(() => {
    dispatch(getAllBooks());
    setCurrentPage(1);
    dispatch(setPage(1));
  }, [dispatch]);

  return (
    <>
      <SearchBar />
      <h1>HOME</h1>
      <Link to={`/createproduct`} className={s.det}>
        Create
      </Link>
      <div className={s.cards}>
        {currentBooks?.map((b) => {
          return (
            <div key={b._id} className={s.card}>
              <button className={s.favorite}>
                <FiHeart />
              </button>
              <Card
                id={b._id}
                title={b.title}
                image={b.image}
                typebook={b.typebook}
                price={b.price}
                author={b.author}
                type={b.typebook}
              />
            </div>
          );
        })}
        <Paginated
          booksPerPage={booksPerPage}
          allBooks={allBooks.length}
          paginate={paginate}
        />
      </div>
    </>
  );
}
