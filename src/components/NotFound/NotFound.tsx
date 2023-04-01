import { Box } from "@mui/material";

export default function ErrorPage() {
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