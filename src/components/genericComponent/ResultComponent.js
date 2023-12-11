import Alert from 'react-bootstrap/Alert';

const ResultComponent = ({ variant, data }) => {
  return (
    <div className=' d-flex justify-content-center align-items-center my-3'>
      <Alert key={variant} variant={variant} className=' text-center'>
        {Array.isArray(data)
          ? data.map((item, index) => <div key={index}>{item}</div>)
          : data}
      </Alert>
    </div>
  );
};

export default ResultComponent;
