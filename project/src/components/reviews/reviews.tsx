import ReviewForm from '../reviews-form/reviews-form';
import CommentsList from '../comments-list/comments-list';
import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { memo } from 'react';
import { getComments } from '../../store/data-process/selectors';
import { prepareComments } from '../../utils';

type ReviewsProps = {
  roomId: number,
};

function Reviews({ roomId }: ReviewsProps): JSX.Element {

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const comments = useAppSelector(getComments);
  const isCommentsFormAvailable = authorizationStatus === AuthorizationStatus.Auth;

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot;
        <span className="reviews__amount">
          {prepareComments(comments).length}
        </span>
      </h2>
      <CommentsList reviewsItem={prepareComments(comments)} />
      {isCommentsFormAvailable && <ReviewForm roomId={roomId}/>}
    </section>
  );
}

export default memo(Reviews);
