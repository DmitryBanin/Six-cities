import { getRatingStars } from '../../utils';
import { CommentType } from '../../types/comment-type';
import dayjs from 'dayjs';

type CommentProps = {
  review: CommentType;
};

function Comment({ review }: CommentProps): JSX.Element {
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={review.user.avatarUrl}
            width="54"
            height="54"
            alt={`Reviews avatar ${review.user.name}`}
          />
        </div>
        <span className="reviews__user-name">{review.user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: getRatingStars(review.rating) }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{review.comment}</p>
        <time className="reviews__time" dateTime="2019-04-24">
          {dayjs(review.date).format('MMMM YYYY')}
        </time>
      </div>
    </li>
  );
}

export default Comment;
