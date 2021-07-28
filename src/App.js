import React from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import AppContext from "./context";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const cartResponse = await axios.get(
          "https://60eada34daeda900173235c1.mockapi.io/cart"
        );
        const favoritesResponse = await axios.get(
          "https://60eada34daeda900173235c1.mockapi.io/favorites"
        );
        const itemsResponse = await axios.get(
          "https://60eada34daeda900173235c1.mockapi.io/items"
        );
  
        setIsLoading(false);
  
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('Ошибки при запросе данных ;(')
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(obj.id))
      );
        await axios.delete(`/cart/${obj.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        await axios.post("https://60eada34daeda900173235c1.mockapi.io/cart", obj);
      }
    } catch (error) {
      alert('Ошибки при добавлении в корзину')
    }
  };

  const onRemoveItem = (id) => {
   try {
    axios.delete(`https://60eada34daeda900173235c1.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
   } catch (error) {
    alert('Ошибки при удалении из корзины ;(');
   }
  };
  const onAddFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(
          `https://60eada34daeda900173235c1.mockapi.io/favorites/${obj.id}`
        );
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        const { data } = await axios.post(
          "https://60eada34daeda900173235c1.mockapi.io/favorites",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Favorite ga qo'/shib bo'/lmadi.");
    }
  };

  const onChangeSearchInput = (event) => {
    console.log(event.target.value);
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };

  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, onAddToCart, onAddFavorite, setCartOpened, setCartItems }}>
      <div className="wrapper clear">
      <Drawer
            items={cartItems}
            onClose={() => setCartOpened(false)}
            onRemove={onRemoveItem}
            opened={cartOpened}
          />
        <Header onClickCart={() => setCartOpened(true)} />

        <Route path="/" exact>
          <Home
            favorites={favorites}
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddFavorite={onAddFavorite}
            onAddToCart={onAddToCart}
            isLoading={isLoading}
          />
        </Route>

        <Route path="/favorites" exact>
          <Favorites onAddFavorite={onAddFavorite} />
        </Route>

        <Route path="/orders" exact>
          <Orders />
        </Route>
      </div>
    </AppContext.Provider>
  );
}

export default App;
