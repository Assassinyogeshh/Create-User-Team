import React from 'react';

function Loading() {
  return (
    <div
        className="inline-block xs:h-[4rem] xs:w-[4rem]  xm:h-[7rem] xm:w-[7rem]  sm:h-[10rem] sm:w-[10rem] animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
        <span
          className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span>
      </div>
      
  );
}

export default Loading;