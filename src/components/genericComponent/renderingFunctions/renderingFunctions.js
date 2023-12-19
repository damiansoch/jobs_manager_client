import { Form } from 'react-bootstrap';

export const renderFormControl = (
  key,
  value,
  newObject,
  handleChange,
  textareaItems = undefined
) => {
  if (typeof value === 'boolean') {
    return (
      <Form.Check
        type='checkbox'
        id={key}
        name={key}
        checked={value}
        onChange={(e) => {
          handleChange(e);
        }}
      />
    );
  } else if (typeof value === 'number') {
    return (
      <Form.Control
        type='number'
        id={key}
        name={key}
        value={value || ''}
        onChange={(e) => {
          handleChange(e);
        }}
      />
    );
  } else if (
    typeof value === 'string' &&
    value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
  ) {
    const formatedDate = value.split('T')[0];
    return (
      <Form.Control
        type='date'
        id={key}
        name={key}
        value={formatedDate}
        onChange={(e) => {
          handleChange(e);
        }}
      />
    );
  }
  return (
    <>
      {textareaItems !== undefined && textareaItems.includes(key) ? (
        <Form.Control
          as='textarea'
          id={key}
          name={key}
          value={newObject[key] || ''}
          onChange={(e) => {
            handleChange(e);
          }}
        />
      ) : (
        <Form.Control
          type='text'
          id={key}
          name={key}
          value={newObject[key] || ''}
          onChange={(e) => {
            handleChange(e);
          }}
        />
      )}
    </>
  );
};
