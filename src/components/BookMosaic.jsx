function BookMosaic(props) {
  const { book } = props;

  return (
    <div className="bookMosaic">
      <img
        className="bookMosaic__img"
        src="book_default.png"
        alt="Default book"
      />
      <h2 className="bookMosaic__title">{book.title}</h2>
      <h3 className="bookMosaic__author">{book.author?.name}</h3>
      {/* <h4 className="bookMosaic__categories">
        {book.categories?.map((c) => `- ${c} `)}
      </h4> */}
    </div>
  );
}

export default BookMosaic;
