import { Box, Grid, Paper, Typography } from "@mui/material"
import { Stack } from "@mui/system"
import { Link } from "react-router-dom"

export default function PrimaryCard800() {
  return (
    <Link to={"/"} style={{ textDecoration: "none" }}>
      <Paper elevation={6} sx={{ width: 980 }} style={{ padding: 20, background: "linear-gradient(to right, #fc9162 60%, #eeeee4" }}>
        <Stack direction="row" justifyContent="space-around" alignItems="center" spacing={20}>
          <Box>
            <Typography variant="h5" color={"white"} mb={1} sx={{ fontWeight: "bold" }}>
              Woman Collection
            </Typography>

            <Typography variant="h6" color={"white"} sx={{ fontWeight: "bold" }}>
              Business Look
            </Typography>
            <br />
            <Typography variant="button" sx={{ fontWeight: "bold" }}>
              10% discount
            </Typography>
            <br />
            <Typography variant="button" sx={{ fontWeight: "bold" }}>
              Hugo Boss
            </Typography>
          </Box>

          <img height={150} width={150} src="/womanclothes.png" alt="green iguana" />
        </Stack>
      </Paper>
    </Link>
  )
}
