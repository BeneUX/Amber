import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import "./App.css"
import Landingpage from "./pages/Landingpage"
import NotFoundPage from "./pages/NotFound"
import ResponsiveAppBar from "./pages/ResponsiveAppBar"
import SignIn from "./pages/login/SignIn"
import Marketplace from "./pages/marketplace/Marketplace"
import Overview from "./pages/overview/Overview"
import Profile from "./pages/profile/Profile"
import SignUp from "./pages/register/SignUp"

function App() {
  const location = useLocation()
  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup"

  const phoneNumber = localStorage.getItem("phoneNumber")

  if (!phoneNumber && location.pathname !== "/login" && location.pathname !== "/signup") {
    return <Navigate to="/login" replace />
  }

  const darkOrLightTheme = createTheme({
    palette: {
      mode: "light",
    },
  })

  return (
    <>
      <ThemeProvider theme={darkOrLightTheme}>
        <CssBaseline />

        <Container maxWidth="xl">
          {!hideNavbar && <ResponsiveAppBar />}
          <br />
          <Routes>
            <Route path="/" element={<Landingpage />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </>
  )
}

export default App
