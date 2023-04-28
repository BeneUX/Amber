import { Box, Grid } from "@mui/material"
import ArticleCard from "../../components/ArticleCard"

export default function Marketplace() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ padding: "1rem" }}>
          <Grid item xs={12} sm={4} md={3} lg={2} xl={1.5}>
            <Box sx={{ minWidth: 275 }}>
              <ArticleCard />
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2} xl={1.5}>
            <Box sx={{ minWidth: 275 }}>
              <ArticleCard />
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2} xl={1.5}>
            <Box sx={{ minWidth: 275 }}>
              <ArticleCard />
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2} xl={1.5}>
            <Box sx={{ minWidth: 275 }}>
              <ArticleCard />
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2} xl={1.5}>
            <Box sx={{ minWidth: 275 }}>
              <ArticleCard />
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2} xl={1.5}>
            <Box sx={{ minWidth: 275 }}>
              <ArticleCard />
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2} xl={1.5}>
            <Box sx={{ minWidth: 275 }}>
              <ArticleCard />
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={2} xl={1.5}>
            <Box sx={{ minWidth: 275 }}>
              <ArticleCard />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
