import ReviewForm from '../reviews-form/reviews-form';
import CommentsList from '../comments-list/comments-list';
import { CommentType } from '../../types/comment-type';

type ReviewsProps = {
  reviews: CommentType[],
};

function Reviews({ reviews }: ReviewsProps): JSX.Element {
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <CommentsList reviewsItem={reviews} />
      <ReviewForm />
    </section>
  );
}

export default Reviews;
