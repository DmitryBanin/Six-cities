import {Link} from 'react-router-dom';
import { MouseEvent } from 'react';
import { Place, AppRoute, TypeClassName } from '../../const';
import { OfferType } from '../../types/offer-type';
import { getRatingStars } from '../../utils';
import FavoriteButton from '../favorite-button/favorite-button';

type PlaceCardProps = {
  offer: OfferType;
  placeType: TypeClassName;
  onHoverCard?: (id: number | null) => void;
};

function PlaceCard({offer, placeType, onHoverCard}: PlaceCardProps): JSX.Element {

  const handleMouseOver = (evt: MouseEvent<HTMLElement>) => {
    if (onHoverCard !== undefined) {
      return onHoverCard(offer.id);
    }
  };

  const handleMouseLeave = (evt: MouseEvent<HTMLElement>) => {
    if (onHoverCard !== undefined) {
      return onHoverCard(null);
    }
  };

  return (
    <article
      className={`${placeType ? 'cities' : 'near-places'}__card place-card`}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      {offer.isPremium ? <div className="place-card__mark"><span>Premium</span></div> : ''}
      <div className={`${placeType ? 'cities' : 'near-places'}__image-wrapper place-card__image-wrapper`}>
        <Link
          to={`${AppRoute.Room}/${offer.id}`}
        >
          <img
            className="place-card__image"
            src={offer.previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton
            isFavorite={offer.isFavorite}
            screen={TypeClassName.PlaceCard}
            id={offer.id}
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: getRatingStars(offer.rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Room}/${offer.id}`}>
            {offer.title}
          </Link>
        </h2>
        <p className="place-card__type">{Place[offer.type]}</p>
      </div>
    </article>
  );
}

export default PlaceCard;

