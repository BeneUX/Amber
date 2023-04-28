import MenuIcon from "@mui/icons-material/Menu"
import SearchIcon from "@mui/icons-material/Search"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
import { Badge } from "@mui/material"
import AppBar from "@mui/material/AppBar"
import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import IconButton from "@mui/material/IconButton"
import InputBase from "@mui/material/InputBase"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Toolbar from "@mui/material/Toolbar"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import { alpha, styled } from "@mui/material/styles"
import * as React from "react"
import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"

import { v4 } from "uuid"

// const pages = ["Schuhe", "Bekleidung", "Accessoires", "Sales", "Marken", "Topseller", "Neuheit"]
const pages = ["Shoes", "Clothing", "Accessories", "Sales", "Brands", "Bestsellers", "New Arrivals"]

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
  const [profileData, setProfileData] = useState<{
    id: string
    firstname: string
    lastname: string
    phonenumber: string
    birthdate: string
    address: string
  } | null>(null)
  const phoneNumber = localStorage.getItem("phoneNumber")

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
    console.log("clicked: handleOpenNavMenu")
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
    console.log("clicked: handleOpenUserMenu")
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
    console.log("clicked: handleCloseNavMenu")
  }

  // This function is used to close the user menu.
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
    console.log("clicked: handleCloseUserMenu")
  }

  const logoutUser = () => {
    setAnchorElUser(null)
    console.log("clicked: handleCloseUserMenu")
    localStorage.removeItem("phoneNumber")
  }

  // Animated Indicator Style

  const isActiveStyle = {
    color: "#ffffff",
    textDecoration: "underline",
    textDecorationColor: "white",
    textDecorationThickness: "0.2rem",
    textUnderlineOffset: "0.35rem",
  }

  const isNotActiveStyle = {
    color: "#ffffff",
    textDecoration: "none",
  }

  // End Animated Indicator Style

  // Search Bar

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    marginRight: "5em",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }))

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }))

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }))

  // End Search Bar

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const response = await fetch(`http://localhost:8082/profiles/read?phonenumber=${phoneNumber}`)
        const data = await response.json()
        setProfileData(data)
      } catch (error) {
        console.error(error)
      }
    }

    if (phoneNumber) {
      fetchProfileData()
    }
  }, [phoneNumber])
  if (profileData != null) {
    localStorage.setItem("profileId", profileData.id)
  }
  useEffect(() => {}, [profileData])

  return (
    // style={{ background: "linear-gradient(to right, #cf022b 50%, #ef7d00)" }}
    <AppBar position="static" style={{ background: "grey" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to={"/"}>
            <Box component="img" sx={{ display: { xs: "none", md: "flex" }, mr: 1, width: "50px", height: "auto" }} alt="Logo" src="/AmberLogo.png" />
          </Link>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {/* LOGO */}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <Link to={"/" + page.toLowerCase()} style={{ textDecoration: "none" }} key={v4()}>
                  <MenuItem key={v4()} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Box component="img" sx={{ display: { xs: "flex", md: "none" }, mr: 1, width: "50px", height: "auto" }} alt="Logo" src="/AmberLogo.png" />

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {/* LOGO */}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <NavLink to={"/" + page.toLowerCase()} style={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)} key={v4()}>
                <Button key={v4()} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
                  {page}
                </Button>
              </NavLink>
            ))}
          </Box>

          <Search sx={{ display: { xs: "none", md: "flex" }, mr: "1.5em" }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
          </Search>

          <Box sx={{ flexGrow: 0, mr: 2.5 }}>
            <IconButton>
              <Badge badgeContent={2} color="error">
                <ShoppingCartOutlinedIcon style={{ color: "white" }} />
              </Badge>
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Not available" src="/avatar_placeholder2.png" />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <div>
                <Link to="/profile" style={{ textDecoration: "none" }}>
                  <MenuItem key={v4()} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                </Link>

                <Link to="/login" style={{ textDecoration: "none" }}>
                  <MenuItem key={v4()} onClick={logoutUser}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Link>
              </div>
            </Menu>
          </Box>

          <Box marginLeft={"1em"}>
            {profileData && (
              <Typography variant="subtitle1" display="block" style={{ marginBottom: -8 }}>
                {profileData.firstname}
              </Typography>
            )}
            {profileData?.firstname === "Benedikt" || profileData?.firstname === "Robin" ? (
              <Typography variant="caption">Commercial Account</Typography>
            ) : (
              <Typography variant="caption">Customer Account</Typography>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar
