import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import TableComponent from './TableComponent';

const TabsComponent = ({
  dataTabs,
  excludedKeys = [],
  detailsActionFunction = undefined,
  editActionFunction = undefined,
  deleteActionFunction = undefined,
}) => {
  return (
    <>
      {dataTabs.length > 0 && (
        <Tabs defaultActiveKey='0' id='data-tabs' justify>
          {dataTabs.map((tabItem, index) => (
            <Tab title={tabItem.title} eventKey={index.toString()} key={index}>
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
