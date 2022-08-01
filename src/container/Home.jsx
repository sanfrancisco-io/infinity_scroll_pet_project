import React, { useEffect, useRef } from 'react';
import CustomCursor from '../components/CustomCursor';
import CursorManager from '../components/CustomCursor/CursosManager';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProjectItem from '../components/ProjectItem';
import { pageData } from '../data';

const WindowSize = { width: window.innerWidth, height: window.innerHeight };

const Home = () => {
  const menuItems = useRef(null);
  const [renderItems, setRenderItems] = React.useState(pageData);

  const cloneItems = () => {
    const itemHeight = menuItems.current.childNodes[0].offsetHeight;
    const fitMax = Math.ceil(WindowSize.height / itemHeight);

    const clonedItems = [...renderItems]
      .filter((_, index) => index < fitMax)
      .map((item) => item);

    setRenderItems([...renderItems, ...clonedItems]);
    return clonedItems.length * itemHeight;
  };

  const getScrollPosition = () => {
    return (
      (menuItems.current.pageYOffset || menuItems.current.scrollTop) -
      (menuItems.current.clientTop || 0)
    );
  };

  const setScrollPosition = (position) => {
    menuItems.current.scrollTop = position;
  };

  const initScroll = () => {
    const scrollPosition = getScrollPosition();
    if (scrollPosition <= 0) {
      setScrollPosition(1);
    }
  };

  useEffect(() => {
    const clonesHeight = cloneItems();

    initScroll();
    menuItems.current.style.scrollBehavior = 'unset';

    const handleScroll = () => {
      const scrollPosition = getScrollPosition();

      if (clonesHeight + scrollPosition >= menuItems.current.scrollHeight) {
        setScrollPosition(1);
      } else if (scrollPosition <= 0) {
        setScrollPosition(menuItems.current.scrollHeight - clonesHeight);
      }
    };

    menuItems.current.addEventListener('scroll', handleScroll);

    return () => {
      menuItems.current.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <CursorManager>
      <CustomCursor />

      <Header />
      <div className='main-container' id='main-container'>
        <ul ref={menuItems}>
          {renderItems.map((project, index) => (
            <ProjectItem key={index} project={project} itemIndex={index} />
          ))}
        </ul>
      </div>
      <Footer />
    </CursorManager>
  );
};

export default Home;
