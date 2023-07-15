import React, {useState} from 'react'

function Pagination(props) {
let {pageNum,onNext,onPrev}=props;
  return (
    <div className='flex justify-center my-8'>
        <div className='border-2 p-2 border-r-0 rounded-l-xl border-blue-400 hover:bg-blue-200 active:bg-blue-300' onClick={onPrev}>Previous</div>
        <div className='border-2 p-2 border-r-0 border-blue-400'>{pageNum}</div>
        <div className='border-2 p-2 rounded-r-xl border-blue-400 hover:bg-blue-200 active:bg-blue-300' onClick={onNext}>Next</div>
    </div>
  )
}

export default Pagination;