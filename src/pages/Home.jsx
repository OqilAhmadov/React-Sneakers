import Card from "../components/Card";

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddFavorite,
  onAddToCart,
}) {
  <div className=" content p-40">
    <div className="d-flex align-center justify-between mb-40">
      <h1>
        {searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}
      </h1>
      <div className="search-block d-flex">
        <img src="/img/search.svg" alt="Search" />
        {searchValue && (
          <img
            onClick={() => setSearchValue("")}
            className="clear removeBtn cu-p"
            src="/img/btn-remove.svg"
            alt="clear"
          />
        )}
        <input
          onChange={onChangeSearchInput}
          value={searchValue}
          type="text"
          placeholder="Поиск..."
        />
      </div>
    </div>

    <div className="d-flex flex-wrap">
      {items
        .filter((item) =>
          item.title.toLowerCase().includes(searchValue.toLowerCase())
        )
        .map((obj, index) => (
          <Card
            key={index}
            title={obj.title}
            price={obj.price}
            imageUrl={obj.imageUrl}
            onFavorite={(obj) => onAddFavorite(obj)}
            onPlus={(obj) => onAddToCart(obj)}
          />
        ))}
    </div>
  </div>;
}

export default Home;
