import { useEffect, useMemo, useState } from "react";
import { useTable, useSortBy } from "react-table";
import fetchBooks from "./utils/fetchBooks";

const COLUMNS = [
  { accessor: "id", Header: "Nº" },
  { accessor: "title", Header: "Título" },
  { accessor: "author", Header: "Autor" },
  { accessor: "isAvailable", Header: "Prestado" },
];

function BooksTable({ books, setBooks }) {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => books, [books]);
  const [firstRender, setFirstRender] = useState(true);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { pageIndex, pageSize, sortBy },
  } = useTable(
    {
      columns,
      data,
      manualSortBy: true,
      // manualPagination: true,
      initialState: { pageIndex: 0, pageSize: 20, sortBy: [""] },
    },
    useSortBy
    // usePagination
  );

  useEffect(() => {
    // prevent unnecessary calls to the hook
    if (firstRender) return;

    // console.log(
    //   `fetching books in BooksTable.jsx\nSORT BY ---------- ${sortBy[0]?.id} - desc(${sortBy[0]?.desc})`
    // );

    if (sortBy[0]?.id === "author") {
      fetchBooks({ pageIndex, pageSize, sortBy, sortAuthor: true }).then(
        (books) => {
          setBooks(books);
        }
      );
    } else {
      fetchBooks({ pageIndex, pageSize, sortBy }).then((books) => {
        setBooks(books);
      });
    }
  }, [pageIndex, pageSize, sortBy, setBooks, firstRender]);

  useEffect(() => setFirstRender(false), []);

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((hg) => (
          <tr {...hg.getFooterGroupProps()}>
            {hg.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? "🔽" : "🔼") : ""}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
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
  );
}

export default BooksTable;
