import React from 'react';

function Loader() {
  return (
    <div className="absolute bg-slate-200/20 flex items-center justify-center backdrop-blur-sm inset-0 ">
      <div className="loader"></div>

    </div>
  );
}

export default Loader;