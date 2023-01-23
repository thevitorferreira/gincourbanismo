import { Box } from "@mui/material";
import "../../styles/globals.css";
import { seedHolidays } from "./api/carregaferiadojson";
import { ResponsiveAppBar } from "../components/AppBar";

export default function App({ Component, pageProps }) {
   seedHolidays();
   return (
      <Box>
         <ResponsiveAppBar />
         <Component {...pageProps} />
      </Box>
   );
}
