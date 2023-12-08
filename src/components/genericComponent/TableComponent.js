import { Table } from 'react-bootstrap';
import {
  convertToLabel,
  convertDateForTable,
} from '../../genericFunctions/converters';
import TableActionsComponent from './TableActionsComponent';

const TableComponent = ({
  data,
  excludedKeys = [],
  showActions = true,
  detailsActionFunction = undefined,
  editActionFunction = undefined,
  deleteActionFunction = undefined,
}) => {
  //Function to generate the table headers
  const renderTableHeader = () => {
    if (data.length === 0) return null;
    return (
      <tr>
        {Object.keys(data[0])
          .filter((key) => !excludedKeys.includes(key))
          .map((key) => (
            <th className=' text-center' key={key}>
              {convertToLabel(key)}
            </th>
          ))}
        {showActions && <th className=' text-center'>Actions</th>}
      </tr>
    );
  };

  //Function to generate the table rows

  const renderTableRows = () => {
    return data.map((item, index) => (
      <tr key={index}>
        {Object.entries(item)
          .filter(([key]) => !excludedKeys.includes(key))
          .map(([key, val], idx) => (
            <td key={idx}>{convertDateForTable(val)}</td>
          ))}
        {showActions && (
          <td>
            <TableActionsComponent
              detailsActionFunction={detailsActionFunction}
              editActionFunction={editActionFunction}
              deleteActionFunction={deleteActionFunction}
              itemId={item.id}
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
