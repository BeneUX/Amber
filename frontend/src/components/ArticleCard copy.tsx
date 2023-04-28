import FavoriteIcon from "@mui/icons-material/Favorite"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import ShareIcon from "@mui/icons-material/Share"
import { Tooltip } from "@mui/material"
import Avatar from "@mui/material/Avatar"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardHeader from "@mui/material/CardHeader"
import CardMedia from "@mui/material/CardMedia"
import { red } from "@mui/material/colors"
import IconButton from "@mui/material/IconButton"

interface Props {
  userName: string
  userFirstLetter: string
  createDate: string
}

export default function ArticleCard(props: Props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {props.userFirstLetter}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.userName}
        subheader={props.createDate}
      />
      <CardMedia component="img" height="194" image="/Bild3.jpg" alt="Paella dish" />
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Tooltip title={"Wishlist"}>
            <FavoriteIcon />
          </Tooltip>
        </IconButton>
        <IconButton aria-label="share">
          <Tooltip title={"Share"}>
            <ShareIcon />
          </Tooltip>
        </IconButton>
      </CardActions>
    </Card>
  )
}
