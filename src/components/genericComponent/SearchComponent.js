import React, { useContext } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Form,
  Row,
} from 'react-bootstrap';
import AppContext from '../../Context/context';
import { convertToLabel } from '../../genericFunctions/converters';

const SearchComponent = () => {
  const { searchVisible, updateSearchText, searchText, searchBy } =
    useContext(AppContext);

  const changeHandler = (text) => {
    updateSearchText(text);
  };

  return (
    <>
      {searchVisible && (
        <Card className=' my-2'>
          <CardBody>
            <Form>
              <Row>
                <Col>
                  <Form.Control
                    type='text'
                    placeholder='Search'
                    onChange={(e) => {
                      changeHandler(e.target.value);
                    }}
                    value={searchText}
                  />
                  <div className=' col-1 mx-auto'>
                    <Button
                      disabled={searchBy === ''}
                      type='submit'
                      className=' my-4'
                    >
                      Search
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </CardBody>
          <CardFooter className=' text-center'>
            {searchBy === '' ? (
              <small>Click the label to select</small>
            ) : (
              <small>
                Searching by:{' '}
                <span className=' text-warning'>
                  {convertToLabel(searchBy)}
                </span>
              </small>
            )}
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default SearchComponent;
