import ReviewForm from '../reviews-form/reviews-form';
import CommentsList from '../comments-list/comments-list';
import { CommentType } from '../../types/comment-type';
import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';

type ReviewsProps = {
  reviews: CommentType[],
  roomId: number,
};

function Reviews({ reviews, roomId }: ReviewsProps): JSX.Element {

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isCommentsFormAvailable = authorizationStatus === AuthorizationStatus.Auth;

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <CommentsList reviewsItem={reviews} />
      {isCommentsFormAvailable && <ReviewForm roomId={roomId}/>}
    </section>
  );
}

export default Reviews;
