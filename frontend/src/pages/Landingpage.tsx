import { createTheme, ThemeProvider } from "@mui/material/styles"
import Overview from "./overview/Overview"

const theme = createTheme()

export default function Landingpage() {
  return (
    <ThemeProvider theme={theme}>
      <Overview />
    </ThemeProvider>
  )
}
