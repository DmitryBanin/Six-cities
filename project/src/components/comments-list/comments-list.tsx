import { CommentType } from '../../types/comment-type';
import Comment from '../comment/comment';
import { Count } from '../../const';

type CommentsListProps = {
    reviewsItem: CommentType[];
  }

function CommentsList({reviewsItem}: CommentsListProps): JSX.Element {

  return (
    <ul className="reviews__list">
      {reviewsItem.map((review) => <Comment key={review.id} review={review}/>).slice(0, Count.COMMENTS_COUNT)}
    </ul>
  );
}

export default CommentsList;
