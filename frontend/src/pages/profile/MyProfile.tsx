import CakeIcon from "@mui/icons-material/Cake"
import FingerprintIcon from "@mui/icons-material/Fingerprint"
import PhoneIcon from "@mui/icons-material/Phone"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Stack, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function MyProfile() {
  const [profileData, setProfileData] = useState<{
    id: string
    firstname: string
    lastname: string
    phonenumber: string
    birthdate: string
    address: string
  } | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const phoneNumber = localStorage.getItem("phoneNumber")
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const response = await fetch(`http://localhost:8082/profiles/read?phonenumber=${phoneNumber}`)
        const data = await response.json()
        setProfileData(data)
      } catch (error) {
        console.error(error)
      }
    }

    if (phoneNumber) {
      fetchProfileData()
    }
  }, [phoneNumber])
  if (profileData != null) {
    localStorage.setItem("profileId", profileData.id)
  }
  useEffect(() => {}, [profileData])

  const handleDeleteProfile = async () => {
    setIsDialogOpen(true)
  }

  const handleConfirmDeleteProfile = async () => {
    try {
      const response = await fetch(`http://localhost:8082/profiles/delete?phonenumber=${phoneNumber}`, {
        method: "DELETE",
      })
      if (response.ok) {
        localStorage.removeItem("phoneNumber")
        setProfileData(null)
        navigate("/login")
      } else {
        // Display an error message
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleCancelDeleteProfile = () => {
    setIsDialogOpen(false)
  }

  if (!phoneNumber) {
    return <div>Please log in to view your profile.</div>
  }

  if (!profileData) {
    return <div>Loading profile data...</div>
  }

  function handleSupportClick() {
    window.location.href = "mailto:test@test.de"
  }

  return (
    <div>
      <Typography variant="h5">
        Welcome to your profile {profileData.firstname} {profileData.lastname}
      </Typography>
      <Paper elevation={10} sx={{ padding: 2, marginTop: 3 }}>
        <Box sx={{ display: "flex", alignItems: "flex-end", marginTop: 2 }}>
          <PhoneIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            fullWidth
            label="Phone number"
            variant="standard"
            defaultValue={profileData.phonenumber}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end", marginTop: 4 }}>
          <CakeIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            fullWidth
            label="Birthdate"
            variant="standard"
            defaultValue={profileData.birthdate}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end", marginTop: 4 }}>
          <FingerprintIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            fullWidth
            label="Profile ID"
            variant="standard"
            defaultValue={profileData.id}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>

        <Stack direction="row" justifyContent="flex-end">
          <Button variant="contained" onClick={handleSupportClick} sx={{ marginTop: 4 }}>
            Support
          </Button>
          &nbsp;
          <Button variant="contained" color="error" onClick={handleDeleteProfile} sx={{ marginTop: 4 }}>
            Delete Profile
          </Button>
        </Stack>

        <Dialog open={isDialogOpen} onClose={handleCancelDeleteProfile}>
          <DialogTitle>Delete Profile</DialogTitle>
          <DialogContent>
            <DialogContentText>Are you sure you want to delete your profile?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDeleteProfile}>Cancel</Button>
            <Button onClick={handleConfirmDeleteProfile} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>{" "}
    </div>
  )
}
