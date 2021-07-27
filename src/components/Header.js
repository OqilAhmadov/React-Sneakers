import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Hooks/useCart";

function Header(props) {
  const { totalPrice } = useCart();

  return (
    <header className="d-flex justify-between	align-center p-40">
      <Link to="/">
        <div className="d-flex align-center">
          <img width={40} height={40} src="/img/imageLogo.png" alt="img" />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li onClick={props.onClickCart} className="mr-30 cu-p">
          <img width={18} height={18} src="/img/card.svg" alt="korzina" />
          <span>{totalPrice} сум.</span>
        </li>
        <li className="mr-20 cu-p">
          <Link to="/favorites">
            <img
              width={18}
              height={18}
              src="/img/favorite.svg"
              alt="favorite"
            />
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <img
              width={18}
              height={18}
              src="/img/user.svg"
              alt="user"
            />
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
