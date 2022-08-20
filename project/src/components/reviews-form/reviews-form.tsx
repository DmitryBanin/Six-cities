import { useState, ChangeEvent, Fragment, FormEvent } from 'react';
import { SettingCount, ratingTitle } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { sendNewComment } from '../../store/api-actions';

type ReviewFormProps = {
  roomId: number;
};

type NewReview = {
  rating: number;
  comment: string;
};

const NOT_ACTIVE_STAR = '#c7c7c7';

function ReviewsForm({ roomId }: ReviewFormProps): JSX.Element {

  const dispatch = useAppDispatch();
  const { isNewCommentSending } = useAppSelector((state) => state);

  const [newComment, setNewComment] = useState<NewReview>({ rating: 0, comment: '' });

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>): void => setNewComment({ ...newComment, rating: Number(evt.target.value) });
  const handleTextChange = (evt: ChangeEvent<HTMLTextAreaElement>): void => setNewComment({ ...newComment, comment: evt.target.value });
  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    dispatch(sendNewComment({ roomId, comment: newComment.comment, rating: newComment.rating }));
    setNewComment({ rating: 0, comment: '' });
  };

  const isNewCommentLengthValid = newComment.comment.length <= SettingCount.MAX_COMMENTS_LENGTH && newComment.comment.length >= SettingCount.MIN_COMMENTS_LENGTH;
  const isSubmitAvailable = (newComment.rating && isNewCommentLengthValid) || isNewCommentSending;

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleFormSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {
          [...new Array(SettingCount.MAX_COMMENTS_LENGTH)].map((_, index) => {
            const starNumber = SettingCount.MAX_COMMENTS_LENGTH - index;
            return (
              <Fragment key={starNumber}>
                <input
                  className="form__rating-input visually-hidden"
                  name="rating"
                  value={starNumber}
                  id={`${starNumber}-stars`}
                  type="radio"
                  onChange={handleRatingChange}
                  disabled={isNewCommentSending}
                />
                <label
                  htmlFor={`${starNumber}-stars`}
                  className="reviews__rating-label form__rating-label"
                  title={ratingTitle[starNumber]}
                >
                  <svg
                    className="form__star-image"
                    width="37"
                    height="33"
                    style={newComment.rating === 0 ? { fill: `${NOT_ACTIVE_STAR}` } : {}}
                  >
                    <use xlinkHref="#icon-star"></use>
                  </svg>
                </label>
              </Fragment>
            );
          })
        }
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={newComment.comment}
        maxLength={SettingCount.MAX_COMMENTS_LENGTH}
        onChange={handleTextChange}
        disabled={isNewCommentSending}
      >
      </textarea>

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">{SettingCount.MIN_COMMENTS_LENGTH} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isSubmitAvailable}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewsForm;
