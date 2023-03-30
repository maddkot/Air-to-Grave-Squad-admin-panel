import Footer from "components/Footer/Footer"
import Header from "components/Header/Header"
import { Navigate, Outlet,  } from "react-router-dom"

const Main = () => {
    
  const useAuth = () => {
    const user = localStorage.getItem('userData')
      if (user) {        
      return true
    } else {        
      return false
    }
  }

  const  ProtectedRoutes=() =>{

    const auth = useAuth();    
    return auth ? <Outlet/> : <Navigate to="/login"/>
  }
    return (
        <>
            <Header />
                <ProtectedRoutes />
            <Footer />
        </>
    )
};

export default Main;