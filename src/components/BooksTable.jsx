import { useMemo } from "react";
import { useTable } from "react-table";

const COLUMNS = [
  { accessor: "_id", Header: "Id" },
  { accessor: "title", Header: "Título" },
  { accessor: "authorName", Header: "Autor" },
  { accessor: "isAvailable", Header: "Prestado" },
];

function BooksTable(props) {
  const books = props.books.map((book) => {
    book.authorName = book.author?.name;
    book.isAvailable = book.isAvailable ? "No" : "Sí";
    return book;
  });

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => books, [books]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((hg) => (
          <tr {...hg.getFooterGroupProps()}>
            {hg.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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
