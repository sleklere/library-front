import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import BookMosaic from "../components/BookMosaic";
import BooksTable from "../components/table/BooksTable";
import useSetPageTitle from "../hooks/useSetPageTitle";
import LoaderSpinner from "../components/LoaderSpinner";
import fetchBooks from "../components/utils/fetchBooks";
import { booksActions } from "../store/books-slice";
import useInput from "../hooks/useInput";

function Home(props) {
  useSetPageTitle(props.pageTitle);

  const dispatch = useDispatch();
  const viewState = useSelector((state) => state.view.view);
  const books = useSelector((state) => state.books.books);
  const [booksLoading, setBooksLoading] = useState(true);
  const [, filterProps] = useInput((val) => val.trim() !== "", "Filosofía");

  useEffect(() => {
    fetchBooks({}).then((booksData) => {
      setBooksLoading(false);
      dispatch(booksActions.storeBooks(booksData));
    });
  }, [dispatch]);

  const fetchFilteredBooks = async () => {
    setBooksLoading(true);
    const booksData = await fetchBooks({
      filter: { field: "categories", value: filterProps.value },
    });
    setBooksLoading(false);
    dispatch(booksActions.storeBooks(booksData));
  };

  return (
    <>
      <Header />
      <main>
        <div className="home__containers">
          {/* <button className="edit-book-btn" onClick={openEditBookModal}>
            Editar Libro
          </button>
          <button className="new-book-btn" onClick={openNewBookModal}>
            Nuevo Libro
          </button> */}
          <div className="home__filters-container">
            <label className="label">
              Categoría
              <select
                name="category-select"
                value={filterProps.value}
                onChange={filterProps.onChange}
                onBlur={filterProps.onBlur}
                className={`input ${filterProps.classes}`}
                data-testid="reference-select"
              >
                <option value="Filosofía">Filosofía</option>
                <option value="Ficción">Ficción</option>
                <option value="Distopía">Distopía</option>
              </select>
            </label>
            <button onClick={fetchFilteredBooks}>Filter</button>
          </div>
          {viewState === "Mosaic" && (
            <div className="home__mosaic-container">
              <div className="home__mosaic-items">
                {booksLoading ? (
                  <LoaderSpinner />
                ) : (
                  books.map((book, i) => <BookMosaic key={i} book={book} />)
                )}
              </div>
            </div>
          )}
          {viewState === "Table" && (
            <div className="home__table-container">
              {booksLoading ? <LoaderSpinner /> : <BooksTable books={books} />}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default Home;
