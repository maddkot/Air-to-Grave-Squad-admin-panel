import { Box } from "@mui/material";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.log(error);  

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
        <div>
          <h1>Oops!</h1>
          <p>Такого адреса не существет!</p>            
      </div>     
    </Box>
    
  );
}