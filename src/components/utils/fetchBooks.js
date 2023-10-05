import axios from "axios";
import { getAuthToken } from "../auth/AuthVerify";

const fetchBooks = async function ({
  pageIndex,
  pageSize,
  sortBy,
  sortAuthor = false,
}) {
  console.log("---- FETCHING BOOKS ----");
  const token = getAuthToken();

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

  try {
    const res = await axios(
      `${process.env.REACT_APP_API_URL}${"/books"}${
        sortAuthor ? "/sortAuthor" : ""
      }` + queryString,
      {
        method: "get",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const books = res.data.data.books.map((book, i) => {
      book.author = book.author?.name;
      book.isAvailable = book.isAvailable ? "No" : "Sí";
      book.id = i + 1;
      return book;
    });

    return books;
  } catch (err) {
    console.error("Error fetching books: ", err);
  }

  return false;
};

export default fetchBooks;
