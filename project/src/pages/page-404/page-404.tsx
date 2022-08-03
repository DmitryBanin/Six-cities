import {Link} from 'react-router-dom';

function Page404(): JSX.Element {
  return (
    <div className="screen__404">
      <h1>
        404
        <br />
        <small>Not Found</small>
      </h1>
      <Link to="/">Go to main page</Link>
    </div>
  );
}

export default Page404;
