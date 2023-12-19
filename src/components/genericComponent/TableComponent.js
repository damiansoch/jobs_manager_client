import { Form, Table } from 'react-bootstrap';
import {
  convertToLabel,
  convertDateForTable,
} from '../../genericFunctions/converters';
import TableActionsComponent from './TableActionsComponent';
import { useContext } from 'react';
import AppContext from '../../Context/context';
import { BiSortAlt2 } from 'react-icons/bi';

const TableComponent = ({
  excludedKeys = [],
  showActions = true,
  detailsActionFunction = undefined,
  editActionFunction = undefined,
  deleteActionFunction = undefined,
  markCompletedAction = undefined,
  areTabs = false,
}) => {
  const { updateSearchBy, resultArray, updateOrder } = useContext(AppContext);

  const clickHandler = (key) => {
    updateSearchBy(key);
  };
  const sortHandler = (key) => {
    updateOrder(key);
  };

  const checkboxChanngeHandler = (completed, id) => {
    markCompletedAction(!completed, id);
  };

  //Function to generate the table headers
  const renderTableHeader = () => {
    if (resultArray.length === 0) return null;
    return (
      <>
        <tr>
          {Object.keys(resultArray[0])
            .filter((key) => !excludedKeys.includes(key))
            .map((key) => (
              <th
                style={{ cursor: 'pointer' }}
                className=' text-center'
                key={key}
                onClick={() => clickHandler(key)}
              >
                {convertToLabel(key)}
              </th>
            ))}
          {showActions && <th className=' text-center'>Actions</th>}
        </tr>
        <tr>
          {Object.keys(resultArray[0])
            .filter((key) => !excludedKeys.includes(key))
            .map((key) => (
              <td
                style={{ cursor: 'pointer' }}
                className=' text-center'
                key={key}
                onClick={() => sortHandler(key)}
              >
                <BiSortAlt2 className=' text-info' />
              </td>
            ))}
          {showActions && <th className=' text-center'> - </th>}
        </tr>
      </>
    );
  };

  const renderTableRows = () => {
    return resultArray.map((item, index) => (
      <tr key={index}>
        {Object.entries(item)
          .filter(([key]) => !excludedKeys.includes(key))
          .map(([key, val], idx) => {
            if (typeof val === 'boolean') {
              return (
                <td key={idx} className=' text-center'>
                  <Form.Check
                    type='checkbox'
                    checked={val}
                    onChange={() => checkboxChanngeHandler(val, item.id)}
                  />
                </td>
              );
            } else {
              return <td key={idx}>{convertDateForTable(val)}</td>;
            }
          })}
        {showActions && (
          <td>
            <TableActionsComponent
              detailsActionFunction={detailsActionFunction}
              editActionFunction={editActionFunction}
              deleteActionFunction={deleteActionFunction}
              itemId={item.id}
              isContactTab={item.email !== undefined ? true : false}
              areTabs={areTabs}
            />
          </td>
        )}
      </tr>
    ));
  };
  return (
    <Table className=' my-5' variant='success' striped bordered hover>
      <thead>{renderTableHeader()}</thead>
      <tbody>{renderTableRows()}</tbody>
    </Table>
  );
};

export default TableComponent;
