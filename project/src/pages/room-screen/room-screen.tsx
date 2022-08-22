import Logo from '../../components/logo/logo';
import { Settings, TypeClassName } from '../../const';
import { getRatingStars } from '../../utils';
import Reviews from '../../components/reviews/reviews';
import { MapHocProps } from '../../hocs/with-map';
import Nav from '../../components/nav/nav';
import { useAppSelector, useAppDispatch } from '../../hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOneOfferAction } from '../../store/api-actions';
import { OfferType } from '../../types/offer-type';
import { getComments, getNearbyOffers, getIsActiveOfferLoading, getActiveOffer } from '../../store/selectors';

function RoomScreen({renderMap, renderOffersList}: MapHocProps): JSX.Element {

  const activeOffer = useAppSelector(getActiveOffer) as OfferType;
  const isActiveOfferLoading = useAppSelector(getIsActiveOfferLoading);
  const comments = useAppSelector(getComments);
  const nearByOffers = useAppSelector(getNearbyOffers);

  const dispatch = useAppDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchOneOfferAction(id as string));
  }, [dispatch, id]);

  if (isActiveOfferLoading || activeOffer === null) {
    return <LoadingScreen />;
  }

  const currentCity = activeOffer.city;

  const propertyImageElements = activeOffer.images.map((img) => (
    <div key={img} className="property__image-wrapper">
      <img className="property__image" src={img} alt={`Room ${activeOffer.id}`} />
    </div>
  )).slice(0, Settings.IMAGE_COUNT);

  const propertyInsideListElements = activeOffer.goods.map(
    (element) => <li key={element} className="property__inside-item">{element}</li>
  );

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <Nav />
          </div>
        </div>
      </header>
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {propertyImageElements}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {activeOffer.isPremium ? <div className="property__mark"><span>Premium</span></div> : ''}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {activeOffer.title}
                </h1>
                <button className={`property__bookmark-button ${activeOffer.isFavorite ? 'place-card__bookmark-button--active' : ''} button`} type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: getRatingStars(activeOffer.rating) }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{activeOffer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {activeOffer.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {`${activeOffer.bedrooms} Bedrooms`}
                </li>
                <li className="property__feature property__feature--adults">
                  {`Max ${activeOffer.maxAdults} adults`}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{activeOffer.price}</b>
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
                  <div className={`property__avatar-wrapper ${activeOffer.host.isPro ? 'property__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                    <img className="property__avatar user__avatar" src={activeOffer.host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">
                    {activeOffer.host.name}
                  </span>
                  <span className="property__user-status">
                    {activeOffer.host.isPro ? 'Pro' : ''}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {activeOffer.description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
                <Reviews reviews={comments} roomId={activeOffer.id}/>
              </section>
            </div>
          </div>
          {renderMap(nearByOffers.slice(0, 3), currentCity, TypeClassName.Property)}
        </section>
        <div className="container">
          {renderOffersList(nearByOffers.slice(0, 3), TypeClassName.NearPlaces)}
        </div>
      </main>
    </div>
  );
}

export default RoomScreen;
