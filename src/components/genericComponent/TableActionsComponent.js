import { TbListDetails } from 'react-icons/tb';
import { BiSolidEdit } from 'react-icons/bi';
import { MdDeleteForever } from 'react-icons/md';

const TableActionsComponent = ({
  detailsActionFunction,
  editActionFunction,
  deleteActionFunction,
  itemId,
}) => {
  const handleClick = (action) => {
    switch (action) {
      case 'details':
        if (detailsActionFunction !== undefined) {
          detailsActionFunction(itemId);
        }
        break;

      case 'edit':
        if (editActionFunction !== undefined) {
          editActionFunction(itemId);
        }

        break;
      case 'delete':
        if (deleteActionFunction !== undefined) {
          deleteActionFunction(itemId);
        }
        break;

      default:
        console.log(`Action ${action} not recognized`);
        break;
    }
  };
  return (
    <div className=' d-flex align-items-center justify-content-evenly'>
      <TbListDetails
        onClick={() => handleClick('details')}
        size={30}
        className=' text-info icon'
      />
      <BiSolidEdit
        onClick={() => handleClick('edit')}
        size={30}
        className=' text-warning icon'
      />
      <MdDeleteForever
        onClick={() => handleClick('delete')}
        size={30}
        className=' text-danger icon'
      />
    </div>
  );
};

export default TableActionsComponent;
