import { Box, Grid, Paper, Typography } from "@mui/material"
import { Stack } from "@mui/system"
import { Link } from "react-router-dom"

export default function PrimaryCard400() {
  return (
    <Link to={"/"} style={{ textDecoration: "none" }}>
      <Paper elevation={10} sx={{ width: 482 }} style={{ padding: 20, background: "linear-gradient(to left bottom, #2596be, #eeeee4)" }}>
        <Stack direction="row" justifyContent="space-around" alignItems="center" spacing={0}>
          <img height={150} width={150} src="/schuh_adidas.png" alt="green iguana" />

          <Box>
            <Typography variant="h5" color={"white"} mb={1} sx={{ fontWeight: "bold" }}>
              New In
            </Typography>

            <Typography variant="h6" color={"white"} sx={{ fontWeight: "bold" }}>
              Shoes
            </Typography>
            <br />
            <Typography variant="button" sx={{ fontWeight: "bold" }}>
              Available again
            </Typography>
            <br />
            <Typography variant="button" sx={{ fontWeight: "bold" }}>
              Adidas
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Link>
  )
}
