import React from 'react';

const Image = ({ url, opacity, parallaxPosition, scale, rotationPosition }) => {
  return (
    <img
      src={url}
      alt=''
      style={{
        opacity: opacity,
        transform: `translate3d(${parallaxPosition.x}px, ${parallaxPosition.y}px , 0px)
        rotate(${rotationPosition}deg)
        scale(${scale})
        `,
      }}
    />
  );
};

export default Image;
