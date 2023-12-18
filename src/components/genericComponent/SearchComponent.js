import React, { useContext } from 'react';
import { Button, Card, CardBody, Col, Form, Row } from 'react-bootstrap';
import AppContext from '../../Context/context';

const SearchComponent = () => {
  const { searchVisible } = useContext(AppContext);
  return (
    <>
      {searchVisible && (
        <Card className=' my-2'>
          <CardBody>
            <Form>
              <Row>
                <Col>
                  <Form.Control type='text' placeholder='Search' />
                  <div className=' col-1 mx-auto'>
                    <Button type='submit' className=' my-4'>
                      Search
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default SearchComponent;
