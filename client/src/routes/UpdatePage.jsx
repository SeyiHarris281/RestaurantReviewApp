import React from 'react';
import Header from '../components/Header';
import UpdateRestaurant from '../components/UpdateRestaurant';

const UpdatePage = () => {
  
  return (
    <div className='container'>
      <Header text={"Update Restaurant"} />
      <UpdateRestaurant />
    </div>
  )
}

export default UpdatePage