import FavoriteIcon from "@mui/icons-material/Favorite"
import { Box, Divider, Stack, Tooltip, Typography } from "@mui/material"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardMedia from "@mui/material/CardMedia"
import IconButton from "@mui/material/IconButton"

interface Props {}

export default function ArticleCard(props: Props) {
  return (
    <Card sx={{ maxWidth: 160 }}>
      <CardMedia component="img" height="194" image="/Bild4.jpg" alt="Paella dish" />
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Tooltip title={"Wishlist"}>
            <FavoriteIcon fontSize="small" style={{ fill: "" }} />
          </Tooltip>
        </IconButton>
      </CardActions>
      <Divider />
      <Box p={1.5} mt={-1}>
        <Stack mt={1} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Typography variant="button" fontSize={"small"}>
            Hugo Boss
          </Typography>
          <Typography variant="button" fontSize={"small"}>
            99€
          </Typography>
        </Stack>
        <Typography variant="subtitle2" fontSize={"small"}>
          Anzugshose - grau
        </Typography>
      </Box>
    </Card>
  )
}
