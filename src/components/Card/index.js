import React from "react";
import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import AppContext from "../../context";

function Card({
  id,
  title,
  imageUrl,
  price,
  onFavorite,
  onPlus,
  favorited = false,
  added = false,
  loading = false,
}) {
  const { isItemAdded } = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const obj = {id, parentId: id, title, imageUrl, price}

  const onClickPlus = () => {
    onPlus(obj);
  };

  const onClickFavorite = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={150}
          height={250}
          viewBox="0 0 150 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          // {...props}
        >
          <rect x="-1" y="-1" rx="10" ry="10" width="150" height="155" />
          <rect x="0" y="165" rx="5" ry="5" width="150" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="80" height="15" />
          <rect x="0" y="223" rx="5" ry="5" width="80" height="25" />
          <rect x="118" y="216" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className={styles.favorite} onClick={onClickFavorite}>
            <img
              src={
                isFavorite ? "/img/heard-liked.svg" : "/img/heard-unliked.svg"
              }
              alt="Unliked"
            />
          </div>
          <img width={133} height={112} src={imageUrl} alt="Sneakers" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} сум.</b>
            </div>
           { onPlus && (<img
              className={styles.plus}
              onClick={onClickPlus}
              src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
              alt="plus"
            />)}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
