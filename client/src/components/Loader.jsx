import React from 'react'
import LoadingGIF from '../Images/loading.gif'

const Loader = () => {
  return (
    <div className='loader'>
      <div className="loader__image">
        <img src={LoadingGIF} alt="" />
      </div>
    </div>
  )
}

export default Loader
