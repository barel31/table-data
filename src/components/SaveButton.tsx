import { memo } from 'react';
import useTableContext from '@/hooks/useTableContext';
import { updateChanges } from '@/services/table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SaveButton() {
  const { changes, setChanges, setData } = useTableContext();

  const handleClick = () => {
    setData(prev => updateChanges(prev, changes));
    toast('Data saved! 🎉');
    setChanges({ columns: [], data: [] });
  };

  return (
    <>
      <button
        className="mt-10 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-sm hover:shadow-md"
        onClick={handleClick}
        title="Save the table data.">
        Save
      </button>
      <ToastContainer />
    </>
  );
}

export const MemoSaveButton = memo(SaveButton);
