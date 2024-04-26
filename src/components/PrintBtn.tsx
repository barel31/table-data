import { memo } from 'react';

export function PrintBtn({

  
  return (
    <div className="text-center m-12">
      <button className="border p-5" onClick={handleClick}>
        PRINT DATA
      </button>
    </div>
  );
}

export const MemoPrintBtn = memo(PrintBtn);
