import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import BookMosaic from "../components/BookMosaic";
import BooksTable from "../components/BooksTable";
import useSetPageTitle from "../hooks/useSetPageTitle";
import LoaderSpinner from "../components/LoaderSpinner";
import fetchBooks from "../components/utils/fetchBooks";
import { viewActions } from "../store/view-slice";

function Home(props) {
  useSetPageTitle(props.pageTitle);

  const dispatch = useDispatch();
  const viewState = useSelector((state) => state.view.view);
  const [books, setBooks] = useState("");
  const [booksLoading, setBooksLoading] = useState(true);

  useEffect(() => {
    fetchBooks({}).then((books) => {
      setBooks(books);
      setBooksLoading(false);
    });
  }, []);

  const openNewBookModal = () =>
    dispatch(viewActions.toggleNewBookModalState(true));

  const openEditBookModal = () =>
    dispatch(viewActions.toggleEditBookModalState(true));

  return (
    <>
      <Header />
      <main>
        <div className="home__containers">
          <button className="edit-book-btn" onClick={openEditBookModal}>
            Editar Libro
          </button>
          <button className="new-book-btn" onClick={openNewBookModal}>
            Nuevo Libro
          </button>
          <div className="home__filters-container">FILTERS</div>
          {viewState === "Mosaic" && (
            <div className="home__mosaic-container">
              <div className="home__mosaic-items">
                <p className="home__title">Todos los libros</p>
                {booksLoading
                  ? "LOADING BOOKS"
                  : books.map((book, i) => <BookMosaic key={i} book={book} />)}
              </div>
            </div>
          )}
          {viewState === "Table" && (
            <div className="home__table-container">
              <p className="home__title">Todos los libros</p>
              {booksLoading ? (
                <LoaderSpinner />
              ) : (
                <BooksTable books={books} setBooks={setBooks} />
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default Home;
