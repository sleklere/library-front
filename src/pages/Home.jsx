import { useSelector } from "react-redux";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import BookMosaic from "../components/BookMosaic";
import BooksTable from "../components/BooksTable";

function Home() {
  const viewState = useSelector((state) => state.view.view);
  const [books, setBooks] = useState("");
  const [booksLoading, setBooksLoading] = useState(true);
  console.log(books);

  useEffect(() => {
    async function fetchBooks() {
      return await axios("http://localhost:5000/api/v1/books", {
        method: "get",
      });
    }
    fetchBooks()
      .then((res) => {
        setBooks(res.data.data.books);
        setBooksLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header />
      <main>
        <div className="home__containers">
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
              {booksLoading ? "LOADING BOOKS" : <BooksTable books={books} />}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default Home;
