import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"
import FormControlLabel from "@mui/material/FormControlLabel"
import Grid from "@mui/material/Grid"
import Link from "@mui/material/Link"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import * as React from "react"
import { toast, ToastContainer } from "react-toastify"

const theme = createTheme()

import { Alert, Tooltip } from "@mui/material"
import { useState } from "react"
import { Navigate } from "react-router-dom"

type FormValues = {
  firstName: string
  lastName: string
  birthdate: string
  phonenumber: string
  password: string
  allowExtraEmails: boolean
  [key: string]: string | boolean // index signature for any additional string key
}

export default function SignUp() {
  const [status, setStatus] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [redirectToLogin, setRedirectToLogin] = useState(false)
  const [formValues, setFormValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    birthdate: "",
    phonenumber: "",
    password: "",
    allowExtraEmails: true,
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const params = {
      firstname: data.get("firstName")?.toString() ?? "",
      lastname: data.get("lastName")?.toString() ?? "",
      password: data.get("password")?.toString() ?? "",
      birthdate: data.get("birthdate")?.toString() ?? "",
      phonenumber: data.get("phonenumber")?.toString() ?? "",
      // allowExtraEmails: formValues.allowExtraEmails.toString(),
    }

    const urlSearchParams = new URLSearchParams(params)
    const url = `http://localhost:8082/profiles/create?${urlSearchParams.toString()}`

    const response = await fetch(url, {
      method: "POST",
    })

    if (response.ok) {
      setStatus("success")
      setRedirectToLogin(true)
    } else {
      toast.error("Check the form!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
      setStatus("error")
      setErrorMessage("Signup failed. Please check your information and try again.")
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target
    const newValue = type === "checkbox" ? checked : value
    setFormValues({ ...formValues, [name]: newValue })
  }

  const requiredFields = ["firstName", "lastName", "password", "phonenumber", "birthdate"]

  const isFormValid = () => {
    return requiredFields.every((field) => Boolean(formValues[field]))
  }

  if (redirectToLogin) {
    return <Navigate to="/login" />
  }

  return (
    <ThemeProvider theme={theme}>
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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {status === "error" && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errorMessage}
              </Alert>
            )}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={formValues.firstName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formValues.lastName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Tooltip title="Birthdate">
                  <TextField
                    required
                    fullWidth
                    name="birthdate"
                    // label="Birthdate"
                    type="date"
                    id="birthdate"
                    autoComplete="bday"
                    value={formValues.birthdate}
                    onChange={handleInputChange}
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phonenumber"
                  label="Phone Number"
                  type="tel"
                  id="phonenumber"
                  autoComplete="tel"
                  value={formValues.phonenumber}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formValues.password}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox name="allowExtraEmails" color="primary" checked={formValues.allowExtraEmails} onChange={handleInputChange} />}
                  label="I want to receive inspiration, marketing promotions and updates via phone."
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={!isFormValid()}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
