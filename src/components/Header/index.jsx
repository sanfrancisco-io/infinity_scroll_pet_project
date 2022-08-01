import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { Hash } from 'react-feather';
import { CursorContext } from '../CustomCursor/CursosManager';
import './style.scss';

const Header = () => {
  const { setSize } = useContext(CursorContext);
  const [opened, setOpen] = useState(false);
  const handleMouseEnter = () => {
    setSize('medium');
  };
  const handleMouseLeave = () => {
    setSize('small');
  };

  const toggleBurger = () => {
    setOpen(!opened);
  };

  return (
    <>
      <div className='overlay-nav'>
        <div className='header-container'>
          <h1 onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            collab
          </h1>
          <h1 onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            studio
          </h1>
        </div>
      </div>
    </>
  );
};

export default Header;
