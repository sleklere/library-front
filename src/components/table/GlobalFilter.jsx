import { Search } from "@mui/icons-material";

function GlobalFilter({ filter, setFilter }) {
  // filter is the value of the text input
  return (
    <span className="table-search">
      <input
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Buscar"
      />
      <Search className="table-search__icon" />
    </span>
  );
}

export default GlobalFilter;
