import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
  setData: React.Dispatch<React.SetStateAction<TableData>>;
  draft: TableData;
};

export function SaveButton({ draft, setData }: Props) {
  const handleClick = () => {
    setData(draft);
    toast('Data saved! 🎉');
  };

  return (
    <>
      <button
        className="mt-10 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}>
        Save
      </button>
      <ToastContainer />
    </>
  );
}
