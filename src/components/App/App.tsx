import React from 'react';
import styles from './App.module.scss';
import { Outlet } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material'

function App() {

 

/*   useEffect(() => {    
    if (!isLogged) { return navigate('/login') } else { return }
    
  }, [isLogged, navigate]) */



  return (
    <div className={styles.App}>
      <StyledEngineProvider injectFirst>        
          <Outlet />          
      </StyledEngineProvider>
      
    </div>
  );
}

export default App;
