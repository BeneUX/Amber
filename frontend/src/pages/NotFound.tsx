import { Box, Button, Grid, Typography } from "@mui/material"
import { Link } from "react-router-dom"

export default function NotFoundPage() {
  return (
    <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: "90vh" }}>
      <Box
        component="img"
        sx={{
          height: 400,
        }}
        alt="404 - page not found"
        src={"/404.jpg"}
      />
      <br />
      <Typography variant="h4">Oops, look's like you are in a wrong place</Typography>
      <br />
      <Link style={{ textDecoration: "none" }} to="/">
        <Button variant="contained">Home </Button>
      </Link>
    </Grid>
  )
}
