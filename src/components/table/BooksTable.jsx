import { useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter, usePagination, useRowSelect } from "react-table";
import BookActions from "../BookActions";
import Checkbox from "./TableCheckbox";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const COLUMNS = [
  { accessor: "id", Header: "Nº" },
  { accessor: "title", Header: "Título" },
  { accessor: "author", Header: "Autor" },
  { accessor: "categoriesString", Header: "Categories" },
  { accessor: "borrowed", Header: "Prestado" },
  { accessor: "borrower", Header: "Prestador" },
];

function BooksTable({ books }) {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => books, [books]);

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

  return (
    <>
      <BookActions
        tableFilter={globalFilter}
        tableSetFilter={setGlobalFilter}
        selectedRows={selectedFlatRows}
      />
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
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
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
