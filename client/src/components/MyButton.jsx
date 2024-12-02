import React, { useState } from 'react';


const MyButton = () => {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount(count + 1);
    }

  return (
    <button className="btn btn-success" onClick={handleClick}>{`count is ${count}`}</button>
  )
}

export default MyButton