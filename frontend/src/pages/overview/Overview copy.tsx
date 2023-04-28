import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
import { Box, Button, Card, CardActions, CardContent, CardHeader, Chip, Divider, Grid, IconButton, Stack, Tooltip, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import PrimaryCard400 from "../../components/card/PrimaryCard400"
import PrimaryCard800 from "../../components/card/PrimaryCard800"
import CategoryIcon from "@mui/icons-material/Category"

interface Product {
  id: number
  title: string
  subtitle: string
  description: string
  profile: string
  price: number
  category: string[]
}

const Overview = () => {
  const [data, setData] = useState<Product[]>([])
  const [size, setSize] = useState(10)

  useEffect(() => {
    fetchData()
  }, [size])

  const handleButtonClick = () => {
    setSize(size + 10)
  }

  console.log(data)

  const fetchData = async () => {
    try {
      const result = await axios(`http://localhost:8083/products/read/published?page=0&size=${size}`)
      setData(result.data)
      if (result.data.length < size) {
        toast.warn("No more data to load", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }
    } catch (error) {
      toast.error("Error loading data", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
  }

  const handleBuy = async (id: string) => {
    try {
      const response = await axios.post(`http://localhost:8083/products/update`, null, {
        params: {
          productId: id,
          sold: true,
        },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })

      const updatedProduct = response.data
      setData(data.filter((product) => product.id !== updatedProduct.id))
      toast.success("Product bought!", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    } catch (error) {
      toast.error("Failed to mark the product as sold!", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
  }

  const profileId = localStorage.getItem("profileId")

  return (
    <>
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={12} sm={12} md={6} lg={8}>
          <PrimaryCard800 />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <PrimaryCard400 />
        </Grid>
      </Grid>

      <Grid container spacing={4} mt={1}>
        {data.map((item: Product) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardHeader title={item.title} subheader={item.subtitle} />
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                  <Typography variant="button">{item.price}$</Typography>
                </Stack>
              </CardContent>
              <Divider variant="middle" />

              <CardActions disableSpacing>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                  <Box padding={1}>
                    {item.category &&
                      item.category.map((category) => (
                        <Typography variant="caption" sx={{ mr: 2 }} key={category}>
                          <Chip label={category} />
                        </Typography>
                      ))}
                  </Box>
                  {item.profile == profileId ? (
                    <Tooltip title="you cannot buy your own product">
                      <span>
                        <IconButton aria-label="buy" disabled>
                          <ShoppingCartOutlinedIcon color="error" />
                        </IconButton>
                      </span>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Buy 1-Click">
                      <IconButton aria-label="buy" onClick={() => handleBuy(String(item.id))}>
                        <ShoppingCartOutlinedIcon color="info" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ marginTop: 2 }}>
        <Button variant="contained" onClick={handleButtonClick}>
          Load More
        </Button>
      </Box>
      <ToastContainer />
    </>
  )
}

export default Overview
