import Spinner from 'react-bootstrap/Spinner';

const SpinnerComponent = () => {
  return (
    <div
      style={{ width: '100%' }}
      className=' d-flex justify-content-center align-items-center my-5'
    >
      <Spinner animation='grow' variant='info' />
    </div>
  );
};

export default SpinnerComponent;
