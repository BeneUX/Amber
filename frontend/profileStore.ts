import { create } from "zustand"
import axios from "axios"

interface Profile {
  id: string
  firstname: string
  lastname: string
  password: string
  birthdate: string
  phonenumber: string
}

interface State {
  data: Profile[] | null
  error: string | null
  loading: boolean
  fetchProfile: () => Promise<void>
  createProfile: (name: string) => Promise<void>
  updateProfile: (id: string, newName: string) => Promise<void>
  deleteProfile: (id: string) => Promise<void>
}

export const useStore = create<State>((set) => ({
  data: null,
  error: null,
  loading: false,
  fetchProfile: async () => {
    // Set loading to true before fetching data
    set({ loading: true, error: null })
    try {
      const response = await axios.get<Profile[]>("http://localhost:8082/profiles/read?phonenumber=1")
      set({ data: response.data, loading: false })
    } catch (error) {
      console.error("Error fetching data:", error)
      set({ data: null, error: "Failed to fetch data", loading: false })
    }
  },
  createProfile: async (name: string) => {
    try {
      const response = await axios.post<Profile>("http://localhost:9000/createTeam", { name })
      set((state) => {
        const { data } = state
        if (!data) throw new Error("Failed to add new team")
        const updatedData = [...data, response.data]
        return { data: updatedData }
      })
    } catch (error) {
      console.error("Error creating team:", error)
      set({ error: "Failed to create team" })
    }
  },
  updateProfile: async (id: string, newName: string) => {
    console.log(`Failed to find team with id=${id} ${newName}`)
    try {
      set((state) => {
        const { data } = state
        if (!data) throw new Error(`Failed to find team with id=${id}`)
        let updatedTeam
        const updatedData = data.map((d) => {
          if (d.id === id) {
            updatedTeam = { ...d, name: newName }
            return updatedTeam
          }
          return d
        })

        if (!updatedTeam) {
          throw new Error(`Failed to find team with id=${id}`)
        }
        axios.post("http://localhost:9000/renameTeam", updatedTeam)
        return { data: updatedData }
      })
    } catch (error) {
      console.error("Error updating data:", error)
      set({ error: "Failed to update data" })
    }
  },
  deleteProfile: async (id: string) => {
    try {
      set((state) => {
        const { data } = state
        if (!data) throw new Error(`Failed to find team with id=${id}`)

        // Filter out the team with the specified id
        const updatedData = data.filter((d) => d.id !== id)

        if (updatedData.length === data.length) {
          throw new Error(`Failed to find team with id=${id}`)
        }

        axios.delete(`http://localhost:9000/deleteTeam/` + id)
        return { data: updatedData }
      })
    } catch (error) {
      console.error("Error deleting team:", error)
      set({ error: "Failed to delete team" })
    }
  },
}))
