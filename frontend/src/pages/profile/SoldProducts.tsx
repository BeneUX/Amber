import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"

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

export default function SoldProducts() {
  const profileId = localStorage.getItem("profileId")
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    async function fetchSoldProducts() {
      const response = await fetch(`http://localhost:8083/products/read?profileId=${profileId}`)
      const data = await response.json()
      setProducts(data)
    }
    fetchSoldProducts()
  }, [])

  // useEffect(() => {
  //   console.log("Product Published", products[0]?.published)
  // }, [products])

  console.log("Products", products)

  const totalPrice = products.filter((product) => product.sold === true).reduce((acc, product) => acc + product.price, 0)

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
      <Typography variant="h5">Sold Products</Typography>
      <Typography variant="subtitle1">Total sales value: {totalPrice}$</Typography>

      <Paper elevation={10} sx={{ padding: 2, marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .filter((product) => product.sold === true)
              .map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.price}$</TableCell>
                  <TableCell>{product.category}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  )
}
