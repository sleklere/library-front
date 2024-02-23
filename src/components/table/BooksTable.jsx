import { useEffect, useMemo, useState } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useRowState,
} from "react-table";
import BookActions from "../BookActions";
import Checkbox from "./TableCheckbox";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { DeleteOutline, EditNote } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { viewActions } from "../../store/view-slice";
import axios from "axios";
import fetchBooks from "../utils/fetchBooks";
import { booksActions } from "../../store/books-slice";
import { getAuthToken } from "../auth/AuthVerify";
import ConfirmDeletion from "../ConfirmDeletion";
import { createPortal } from "react-dom";

const overlays = document.getElementById("overlays");

const COLUMNS = [
  { accessor: "id", Header: "Nº" },
  { accessor: "title", Header: "Título" },
  { accessor: "author", Header: "Autor" },
  { accessor: "categoriesString", Header: "Categorías" },
  { accessor: "borrowed", Header: "Prestado" },
  { accessor: "borrower", Header: "Prestado a" },
];

function BooksTable({ books }) {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => books, [books]);
  const dispatch = useDispatch();
  const [hoveredRow, setHoveredRow] = useState(null);
  const [showConfirmDeletion, setShowConfirmDeletion] = useState(false);
  const [confirmationState, setConfirmationState] = useState(false);
  const token = getAuthToken();

  const handleRowHover = (row) => {
    setHoveredRow(row);
  };

  const handleRowLeave = () => {
    setHoveredRow(null);
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    prepareRow,
    selectedFlatRows,
    state: { pageIndex, globalFilter },
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: process.env.REACT_APP_TABLE_PAGE_SIZE,
        sortBy: [],
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    useRowState,

    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
          },
          ...columns,
        ];
      });
    }
  );

  const openEditBookModal = () => {
    dispatch(
      viewActions.toggleEditBookModalState({
        open: true,
        data: hoveredRow.original,
      })
    );
  };

  const handleBookDeletion = async () => {
    // confirm deletion
    setShowConfirmDeletion(true);
  };

  useEffect(() => {
    if (confirmationState) {
      console.log("DELETION CONFIRMED");
      const data = { bookIDs: [] };
      data.bookIDs = selectedFlatRows.map((row) => row.original._id);
      axios(`${process.env.REACT_APP_API_URL}/books/delete`, {
        method: "delete",
        data,
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          console.log(res);
          fetchBooks({}).then((booksData) => {
            dispatch(booksActions.storeBooks(booksData));
          });
          setConfirmationState(false);
        })
        .catch((err) => console.log(err));
    } else {
      console.log("DELETION FALSE");
    }
  }, [confirmationState, dispatch, token]); //eslint-disable-line

  return (
    <>
      <BookActions
        tableFilter={globalFilter}
        tableSetFilter={setGlobalFilter}
        selectedRows={selectedFlatRows}
      />
      {showConfirmDeletion &&
        createPortal(
          <ConfirmDeletion
            confirm={() => setConfirmationState(true)}
            closeModal={() => setShowConfirmDeletion(false)}
          />,
          overlays
        )}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((hg) => (
            <tr {...hg.getFooterGroupProps()}>
              {hg.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>{column.isSorted ? (column.isSortedDesc ? "🔽" : "🔼") : ""}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                onMouseEnter={() => handleRowHover(row)}
                onMouseLeave={handleRowLeave}
              >
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
                <td
                  style={{
                    position: "absolute",
                    top: "0",
                    right: "0",
                    transform: "translateY(1rem)",
                  }}
                >
                  <div className="edit">
                    <button className="edit" onClick={openEditBookModal}>
                      {" "}
                      <EditNote fontSize="large" />
                    </button>
                    <button className="edit" onClick={handleBookDeletion}>
                      <DeleteOutline fontSize="large" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="table-pagination">
        <button disabled={!canPreviousPage} onClick={() => previousPage()}>
          <ArrowBackIosNewIcon fontSize="inherit" />
        </button>
        <span>
          {pageIndex + 1}/{pageOptions.length}
        </span>
        <button disabled={!canNextPage} onClick={() => nextPage()}>
          <ArrowForwardIosIcon fontSize="inherit" />
        </button>
      </div>
    </>
  );
}

export default BooksTable;
