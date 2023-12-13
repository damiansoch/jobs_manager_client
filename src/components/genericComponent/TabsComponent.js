import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import TableComponent from './TableComponent';

const TabsComponent = ({ dataTabs }) => {
  return (
    <>
      {dataTabs.length > 0 && (
        <Tabs defaultActiveKey='0' id='data-tabs'>
          {dataTabs.map((tabItem, index) => (
            <Tab title={tabItem.title} eventKey={index.toString()} key={index}>
              {Array.isArray(tabItem.data) ? (
                tabItem.data.map((item, idx) => (
                  <TableComponent data={item} key={idx} />
                ))
              ) : (
                <TableComponent data={tabItem.data} />
              )}
            </Tab>
          ))}
        </Tabs>
      )}
    </>
  );
};

export default TabsComponent;
