import React, { useContext, useEffect } from 'react';
import { Row, Tab, Tabs } from 'react-bootstrap';
import TableComponent from './TableComponent';
import { IoAdd } from 'react-icons/io5';
import pluralize from 'pluralize';
import { useNavigate, useParams } from 'react-router-dom';
import AppContext from '../../Context/context';

const TabsComponent = ({
  dataTabs,
  excludedKeys = [],
  detailsActionFunction = undefined,
  editActionFunction = undefined,
  deleteActionFunction = undefined,
}) => {
  const navigate = useNavigate();
  const { id: customerId } = useParams();
  const { updateInitialSearchArray } = useContext(AppContext);

  const handleClick = (data) => {
    const actionName = `add${pluralize.singular(data)}`;
    navigate(`/addEdit/${actionName}/${customerId}`);
  };

  useEffect(() => {
    if (dataTabs.length > 0) {
      const contactData = dataTabs.filter((entry) => entry.title === 'Contact');
      const contact = contactData[0].data;
      updateInitialSearchArray([contact]);
    }
    // eslint-disable-next-line
  }, [dataTabs]);

  return (
    <>
      {dataTabs.length > 0 && (
        <Tabs defaultActiveKey='0' id='data-tabs' justify>
          {dataTabs.map((tabItem, index) => (
            <Tab title={tabItem.title} eventKey={index.toString()} key={index}>
              <Row>
                {tabItem.title !== 'Contact' && (
                  <IoAdd
                    className=' mt-5 col-1 ms-auto text-info icon'
                    size={30}
                    onClick={() => handleClick(tabItem.title)}
                  />
                )}
              </Row>
              {Array.isArray(tabItem.data) ? (
                <TableComponent
                  data={tabItem.data}
                  excludedKeys={excludedKeys}
                  detailsActionFunction={detailsActionFunction}
                  editActionFunction={editActionFunction}
                  deleteActionFunction={deleteActionFunction}
                  areTabs={true}
                />
              ) : (
                <TableComponent
                  data={[tabItem.data]}
                  excludedKeys={excludedKeys}
                  detailsActionFunction={detailsActionFunction}
                  editActionFunction={editActionFunction}
                  deleteActionFunction={deleteActionFunction}
                  areTabs={true}
                />
              )}
            </Tab>
          ))}
        </Tabs>
      )}
    </>
  );
};

export default TabsComponent;
