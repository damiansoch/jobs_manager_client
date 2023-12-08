import { TbListDetails } from 'react-icons/tb';
import { BiSolidEdit } from 'react-icons/bi';
import { MdDeleteForever } from 'react-icons/md';

const TableActionsComponent = () => {
  return (
    <div className=' d-flex align-items-center justify-content-evenly'>
      <TbListDetails size={30} className=' text-info icon' />
      <BiSolidEdit size={30} className=' text-warning icon' />
      <MdDeleteForever size={30} className=' text-danger icon' />
    </div>
  );
};

export default TableActionsComponent;
