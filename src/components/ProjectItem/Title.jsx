import React from 'react';

const Title = ({ title, handleMouseEnter, handleMouseLeave }) => {
  return (
    <div
      className='title-item'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h1 className='menu-title'>{title}</h1>
      <h1 className='menu-title clone'>{title}</h1>
    </div>
  );
};

export default Title;
