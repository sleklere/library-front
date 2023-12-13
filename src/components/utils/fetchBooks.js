import axios from "axios";
import { getAuthToken } from "../auth/AuthVerify";

const fetchBooks = async function ({ pageIndex, pageSize, sortBy, sortAuthor = false, filter }) {
  console.log("---- FETCHING BOOKS ----");
  const token = getAuthToken();

  console.log(token);

  let sort = "";

  if (sortBy && sortBy[0]?.id) {
    sort = `${sortBy[0].desc ? "-" : ""}${sortBy[0].id}`;
  }

  let queryString = `?`;
  if (pageIndex) {
    queryString += `page=${pageIndex}&`;
  }
  if (sort) {
    queryString += `sort=${sort}&`;
  }
  if (pageSize) {
    queryString += `limit=${pageSize}&`;
  }
  if (filter) {
    queryString += `${filter.field}=${filter.value}`;
  }

  try {
    const res = await axios(
      `${process.env.REACT_APP_API_URL}${"/books"}${sortAuthor ? "/sortAuthor" : ""}` + queryString,
      {
        method: "get",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const books = res?.data.data.books.map((book, i) => {
      book.authorId = book.author?.id;
      book.author = book.author?.name;
      book.borrowed = book.isAvailable ? "No" : "Sí";
      book.id = i + 1;
      book.categoriesString = book.categories.join(" - ");
      return book;
    });

    return books;
  } catch (err) {
    console.error("Error fetching books: ", err);
  }

  return false;
};

export default fetchBooks;
