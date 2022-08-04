import {Link} from 'react-router-dom';
import { MouseEvent } from 'react';
import { placeType, AppRoute } from '../../const';
import { OfferType } from '../../types/offer-type';
import { getRatingStars } from '../../utils';

type CitiesCardProps = {
  offer: OfferType;
  setClickOffer: (offer: OfferType) => void;
  isTextClassName: boolean;
};

function CitiesCard({offer, setClickOffer, isTextClassName}: CitiesCardProps): JSX.Element {
  const {previewImage, price, title, type, rating, isPremium, isFavorite, id} = offer;
  const handleMouseOver = (evt: MouseEvent<HTMLElement>) => setClickOffer(offer);

  return (
    <article className={`${isTextClassName ? 'cities' : 'near-places'}__card place-card`} onMouseOver={handleMouseOver}>
      {isPremium ? <div className="place-card__mark"><span>Premium</span></div> : ''}
      <div className={`${isTextClassName ? 'cities' : 'near-places'}__image-wrapper place-card__image-wrapper`}>
        <a href="#">
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: getRatingStars(rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Room}/${id}`}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{placeType[type]}</p>
      </div>
    </article>
  );
}

export default CitiesCard;

