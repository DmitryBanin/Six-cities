import './loading.css';

function Loading(): JSX.Element {
  return (
    <div className='lds-container'>
      <div className="lds-hourglass"></div>
    </div>
  );
}

export default Loading;
