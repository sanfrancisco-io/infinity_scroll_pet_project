import React, { useRef } from 'react';
import Image from './Image';
import Title from './Title';
import { Hash } from 'react-feather';
import animate from './animate';
import cn from 'classnames';

import './style.scss';

const initialState = {
  opacity: 0,
  parralaxPosition: {
    x: 0,
    y: -20,
  },
  scale: 0.8,
  rotationPosition: 0,
  active: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE/OPACITY':
      return {
        ...state,
        opacity: action.payload,
      };
    case 'MOUSE/ENTER':
      return {
        ...state,
        active: true,
      };
    case 'MOUSE/LEAVE':
      return {
        ...state,
        active: false,
      };
    case 'MOUSE/COORDINATES':
      return {
        ...state,
        parralaxPosition: action.payload,
      };
    case 'CHANGE/ROTATION':
      return {
        ...state,
        rotationPosition: action.payload,
      };
    case 'CHANGE/SCALE':
      return {
        ...state,
        scale: action.payload,
      };
    default:
      throw new Error();
  }
}

const ProjectItem = ({ project, itemIndex }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const listItem = useRef(null);
  const easeMethod = 'easeInOutCubic';

  const parralax = (event) => {
    const speed = -5;
    const x = (window.innerWidth - event.pageX * speed) / 100;
    const y = (window.innerHeight - event.pageY * speed) / 100;
    dispatch({ type: 'MOUSE/COORDINATES', payload: { x, y } });
  };

  const handleOpacity = (initialOpacity, newOpacity, duration) => {
    animate({
      fromValue: initialOpacity,
      toValue: newOpacity,
      onUpdate: (newOpacity, callback) => {
        dispatch({ type: 'CHANGE/OPACITY', payload: newOpacity });
        callback();
      },
      onComplete: () => {},
      duration,
      easeMethod,
    });
  };

  const handleScael = (initialScale, newScale, duration) => {
    animate({
      fromValue: initialScale,
      toValue: newScale,
      onUpdate: (newScale, callback) => {
        dispatch({ type: 'CHANGE/SCALE', payload: newScale });
        callback();
      },
      onComplete: () => {},
      duration,
      easeMethod,
    });
  };

  const handleRotation = (duration = 500) => {
    const newRotation =
      Math.random() * 15 * (Math.round(Math.random()) ? 1 : -1);
    animate({
      fromValue: state.rotationPosition,
      toValue: newRotation,
      onUpdate: (newRotation, callback) => {
        dispatch({ type: 'CHANGE/ROTATION', payload: newRotation });
        callback();
      },
      onComplete: () => {},
      duration,
      easeMethod,
    });
  };

  const handleMouseEnter = () => {
    handleScael(0.8, 1, 500);
    handleOpacity(0, 1, 500);
    handleRotation();
    dispatch({ type: 'MOUSE/ENTER' });
    listItem.current.addEventListener('mousemove', parralax);
  };

  const handleMouseLeave = () => {
    listItem.current.removeEventListener('mousemove', parralax);
    dispatch({ type: 'MOUSE/LEAVE' });
    handleOpacity(1, 0, 800);
    handleRotation();
    handleScael(1, initialState.scale, 500);

    dispatch({
      type: 'MOUSE/COORDINATES',
      payload: initialState.parralaxPosition,
    });
  };

  return (
    <li ref={listItem} className='project-item-container'>
      <Title
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        title={project.title}
      />
      <Image
        opacity={state.opacity}
        parallaxPosition={state.parralaxPosition}
        url={project.url}
        scale={state.scale}
        rotationPosition={state.rotationPosition}
      />

      <div className={cn('info-block', { 'as-active': state.active })}>
        <p className='info-block-header'>
          <span>
            <Hash />0{itemIndex + 1}
          </span>
        </p>
        {project.info.map((item) => (
          <p key={item}>
            <span>{item}</span>
          </p>
        ))}
      </div>
    </li>
  );
};

export default ProjectItem;
