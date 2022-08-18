import { OfferTypes } from '../../types/offer-type';
import Logo from '../../components/logo/logo';
import { useParams, Navigate } from 'react-router-dom';
import { AppRoute, SettingCount, PlaceType } from '../../const';
import { getRatingStars } from '../../utils';
import CommentsList from '../../components/comments-list/comments-list';
import { comments } from '../../mocks/comments';
import ReviewsForm from '../../components/reviews-form/reviews-form';
import { MapHocProps } from '../../hocs/with-map';
import Nav from '../../components/nav/nav';

type RoomScreenProps = {
  offers: OfferTypes;
}

function RoomScreen({offers, renderMap, renderOffersList}: RoomScreenProps & MapHocProps): JSX.Element {

  const { id } = useParams();
  const roomOffer = offers.find((offer) => offer.id === Number(id));
  const otherPlaces: OfferTypes = [];

  offers.forEach((offer) => {
    if (offer.id !== Number(id)) {
      otherPlaces.push(offer);
    }});

  if (!roomOffer) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  const propertyImageElements = roomOffer.images.map((img) => (
    <div key={img} className="property__image-wrapper">
      <img className="property__image" src={img} alt={`Room ${roomOffer.id}`} />
    </div>
  )).slice(0, SettingCount.IMAGE_COUNT);

  const propertyInsideListElements = roomOffer.goods.map(
    (element) => <li key={element} className="property__inside-item">{element}</li>
  );

  // const reviewsItem = comments.filter((comment) => comment.id === Number(id)); // нужен ли id отдельно

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <Nav />
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">

              {/* вынести в отдельный компонент <property-gallery/> и <property-image/> */}
              {propertyImageElements}

            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">

              {roomOffer.isPremium ? <div className="property__mark"><span>Premium</span></div> : ''}

              <div className="property__name-wrapper">
                <h1 className="property__name">

                  {roomOffer.title}

                </h1>
                <button className={`property__bookmark-button ${roomOffer.isFavorite ? 'place-card__bookmark-button--active' : ''} button`} type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: getRatingStars(roomOffer.rating) }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{roomOffer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {roomOffer.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {`${roomOffer.bedrooms} Bedrooms`}
                </li>
                <li className="property__feature property__feature--adults">
                  {`Max ${roomOffer.maxAdults} adults`}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{roomOffer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">

                  {propertyInsideListElements}

                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper ${roomOffer.host.isPro ? 'property__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                    <img className="property__avatar user__avatar" src={roomOffer.host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">
                    {roomOffer.host.name}
                  </span>
                  <span className="property__user-status">
                    {roomOffer.host.isPro ? 'Pro' : ''}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {roomOffer.description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>

                <CommentsList reviewsItem={comments}/>

                <ReviewsForm />

              </section>
            </div>
          </div>

          {renderMap(offers.slice(0, 3), offers[0].city, PlaceType.Property)}

        </section>
        <div className="container">

          {renderOffersList(offers.slice(0, 3), PlaceType.NearPlaces)}

        </div>
      </main>
    </div>
  );
}

export default RoomScreen;
