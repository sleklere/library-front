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
import axios from "axios";
import { getAuthToken } from "../components/auth/AuthVerify";

function Home(props) {
  useSetPageTitle(props.pageTitle);

  const dispatch = useDispatch();
  const viewState = useSelector((state) => state.view.view);
  const books = useSelector((state) => state.books.books);
  const booksCopy = useSelector((state) => state.books.booksCopy);
  const [booksLoading, setBooksLoading] = useState(true);
  const [filterInputStates, filterProps] = useInput((val) => val.trim() !== "", "");
  const [categories, setCategories] = useState([]);
  const token = getAuthToken();

  useEffect(() => {
    fetchBooks({}).then((booksData) => {
      setBooksLoading(false);
      dispatch(booksActions.storeBooks(booksData));
      dispatch(booksActions.saveBooksCopy(booksData));
    });
    axios(`${process.env.REACT_APP_API_URL}/books/categories`, {
      method: "get",
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      console.log(res);
      setCategories(res.data.data.categories);
    });
  }, [dispatch, token]);

  const filterBooks = async () => {
    setBooksLoading(true);
    if (filterInputStates.isValid) {
      const booksFiltered = booksCopy
        .slice()
        .filter((book) => book.categories.includes(filterProps.value));
      dispatch(booksActions.saveBooksCopy(books));
      dispatch(booksActions.storeBooks(booksFiltered));
    } else {
      dispatch(booksActions.storeBooks(booksCopy));
    }
    setBooksLoading(false);
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
                <option value="">Todas</option>
                {categories.map((categ, i) => (
                  <option key={i} value={categ.name}>
                    {categ.name}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={filterBooks}>Filtrar</button>
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
