import AddIcon from "@mui/icons-material/Add"
import ClearIcon from "@mui/icons-material/Clear"
import CloseIcon from "@mui/icons-material/Close"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined"
import PublicIcon from "@mui/icons-material/Public"
import PublicOffIcon from "@mui/icons-material/PublicOff"
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined"
import UnpublishedOutlinedIcon from "@mui/icons-material/UnpublishedOutlined"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Input,
  InputLabel,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import { createImageBase64 } from "../../utils/createImageBase64"
import { escape } from "querystring"

interface Product {
  id: string
  name: string
  title: string
  description: string
  price: number
  category: string
  image: string
  published: boolean
  sold: boolean
}

export default function MyProducts() {
  const profileId = localStorage.getItem("profileId")
  const [products, setProducts] = useState<Product[]>([])
  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [filterPublished, setFilterPublished] = useState<boolean | null>(null)
  const [anchorElFilter, setAnchorElFilter] = useState<null | HTMLElement>(null)
  const openFilter = Boolean(anchorElFilter)

  const handleClickFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElFilter(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorElFilter(null)
  }

  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    category: "",
    price: 0,
    image: "",
  })
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch(`http://localhost:8083/products/read?profileId=${profileId}`)
      const data = await response.json()
      setProducts(data)
    }
    fetchProducts()
  }, [])

  // useEffect(() => {
  //   console.log("Product Published", products[0]?.published)
  // }, [products])

  console.log("Products", products)

  async function handleCreate() {
    const response = await fetch("http://localhost:8083/products/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // id,
        profile: profileId,
        title: newProduct.title,
        description: newProduct.description,
        category: [newProduct.category],
        price: newProduct.price,
        image: newProduct.image,
      }),
    })
    const data = await response.json()
    setProducts([...products, data])
    setOpen(false)
    setNewProduct({
      title: "",
      description: "",
      category: "",
      price: 0,
      image: "",
    })
  }

  async function handleDelete(id: string) {
    setDeleteProductId(id)
    setOpenDelete(true)
  }

  async function handleConfirmDelete() {
    if (deleteProductId) {
      await fetch(`http://localhost:8083/products/delete?productId=${deleteProductId}`, {
        method: "DELETE",
      })
      setProducts(products.filter((product) => product.id !== deleteProductId))
      setOpenDelete(false)
      setDeleteProductId(null)
      toast.info("Product deleted!", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setNewProduct({
      ...newProduct,
      [name]: value,
    })
  }

  function handleCancel() {
    setOpen(false)
    setDeleteProductId(null)
  }
  const theme = useTheme()

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"))

  async function handlePublish(id: string) {
    const productToPublish = products.find((product) => product.id === id)
    console.log("Produkt zum publishen", productToPublish)
    if (!productToPublish) return

    try {
      const response = await axios.post("http://localhost:8083/products/update", productToPublish.image, {
        // Pass the image as the request body
        params: {
          productId: id,
          published: !productToPublish.published,
        },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })

      const updatedProduct = response.data
      const updatedProducts = products.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))

      setProducts(updatedProducts)
      toast.success("Product status updated!", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    } catch (error) {
      toast.error("Failed to update the product's published status!", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    }
  }

  async function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      const imageBase64 = await createImageBase64(event.target.files[0])
      setNewProduct({
        ...newProduct,
        image: imageBase64,
      })
    }
  }

  const [openImageDialog, setOpenImageDialog] = useState(false)
  const [selectedImage, setSelectedImage] = useState("")

  function openImage(imageSrc: any) {
    setSelectedImage(imageSrc)
    setOpenImageDialog(true)
  }

  function closeImage() {
    setOpenImageDialog(false)
    setSelectedImage("")
  }

  console.log("Kaputt", products[16]?.image.slice(1, -1))
  console.log("ganz", products[18]?.image)
  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5">My Products</Typography>

        <div>
          <Button
            startIcon={<FilterAltOutlinedIcon />}
            variant="contained"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClickFilter}
            style={{ marginRight: 20 }}
          >
            Filter
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorElFilter}
            open={openFilter}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => setFilterPublished(true)}>
              <PublicIcon color="primary" />
              &nbsp; Published
            </MenuItem>
            <MenuItem onClick={() => setFilterPublished(false)}>
              <PublicOffIcon color="primary" />
              &nbsp; Unpublished
            </MenuItem>
            <Divider variant="middle" />
            <MenuItem onClick={() => setFilterPublished(null)}>
              <ClearIcon color="error" />
              &nbsp; Reset
            </MenuItem>
          </Menu>

          <Tooltip title="Add product">
            <Button variant="contained" onClick={() => setOpen(true)}>
              <AddIcon />
            </Button>
          </Tooltip>
        </div>
      </Stack>

      <Paper elevation={10} sx={{ padding: 2, marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>

              <TableCell sx={{ fontWeight: "bold" }}>Image</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Published</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Quick Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {products.map((product) => ( */}

            {products
              .filter((product) => product.sold === false) // Add this line to filter only sold products
              .filter((product) => (filterPublished === null ? true : product.published === filterPublished))
              .map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.price}$</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <img
                      src={product?.image?.startsWith('"') ? product.image.slice(1, -1) : product.image}
                      alt={product?.title}
                      width="50"
                      height="50"
                      style={{ cursor: "pointer" }}
                      onClick={() => openImage(product?.image?.startsWith('"') ? product.image.slice(1, -1) : product.image)}
                    />
                  </TableCell>
                  {product.published == false && <TableCell>No</TableCell>}
                  {product.published == true && <TableCell>Yes</TableCell>}

                  {/* {product.published == true && <TableCell>Yes</TableCell>} */}

                  <TableCell>
                    {product.published == false && (
                      <IconButton color="primary" aria-label="publish product" onClick={() => handlePublish(product.id)}>
                        <Tooltip title="Publish">
                          <PublishOutlinedIcon />
                        </Tooltip>
                      </IconButton>
                    )}

                    {product.published == true && (
                      <IconButton color="primary" aria-label="publish product" onClick={() => handlePublish(product.id)}>
                        <Tooltip title="Unpublish">
                          <UnpublishedOutlinedIcon />
                        </Tooltip>
                      </IconButton>
                    )}

                    <IconButton color="error" aria-label="upload picture" component="label" onClick={() => handleDelete(product.id)}>
                      <Tooltip title="Delete">
                        <DeleteForeverIcon />
                      </Tooltip>
                    </IconButton>
                  </TableCell>
                </TableRow>
                // UnpublishedOutlinedIcon
              ))}
          </TableBody>
        </Table>

        <Dialog open={openImageDialog} onClose={closeImage} maxWidth="md" fullWidth>
          <IconButton
            edge="end"
            color="inherit"
            onClick={closeImage}
            aria-label="close"
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 1301,
            }}
          >
            <CloseIcon />
          </IconButton>
          <img src={selectedImage} alt="Full Size" style={{ width: "100%", height: "auto" }} />
        </Dialog>

        <Dialog open={open} onClose={handleCancel} fullScreen={fullScreen}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <DialogTitle>Create new Product</DialogTitle>
            <Button color="error" onClick={handleCancel}>
              <ClearIcon fontSize="small" />
            </Button>
          </Stack>
          <Divider variant="middle" />

          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              name="title"
              value={newProduct.title}
              onChange={handleInputChange}
              fullWidth
              style={{ marginBottom: 15 }}
            />

            <TextField
              margin="dense"
              label="Description"
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              fullWidth
              style={{ marginBottom: 15 }}
            />
            <TextField
              margin="dense"
              label="Category"
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              fullWidth
              style={{ marginBottom: 15 }}
            />
            <TextField
              margin="dense"
              label="Price $"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={handleInputChange}
              fullWidth
              style={{ marginBottom: 15 }}
            />
            <InputLabel htmlFor="image" style={{ marginBottom: 10 }}>
              Image
            </InputLabel>
            <Input id="image" name="image" type="file" onChange={handleImageChange} fullWidth style={{ marginBottom: 15 }} />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={handleCreate}>
              <AddIcon />
              &nbsp;Create
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={Boolean(deleteProductId)} onClose={handleCancel}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>Are you sure you want to delete this product?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </>
  )
}
