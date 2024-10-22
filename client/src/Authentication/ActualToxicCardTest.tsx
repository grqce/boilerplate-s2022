/* prettier-ignore-start */
/* eslint-disable */

import React, { useState, useEffect } from "react";
import MUICard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Typography,
  TextField,
  Button,
  Box,
  CardMedia,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useData, deleteData, putData } from "../util/api";
import dayjs, { Dayjs } from "dayjs";

// Define a dark theme with light fonts
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212", // Dark background color
    },
    text: {
      primary: "#ffffff", // Light text color
      secondary: "#b0b0b0", // Slightly lighter text for secondary elements
    },
  },
});

function ActualToxicCardTest(): JSX.Element {
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [hometown, setHometown] = useState<string>("");
  const [favoriteEmoji, setFavoriteEmoji] = useState<string>("");
  const [birthday, setBirthday] = useState<Dayjs | null>(null);
  const [toxicTraits, setToxicTraits] = useState<string>("");

  const fetchUsers = async () => {
    try {
      const response = await useData("/toxicreal/all");
      if (response?.data) {
        setUsers(response.data);
      } else {
        console.error("Failed to fetch users: No data in response");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSubmit = async () => {
    const newUser = {
      firstName,
      lastName,
      hometown,
      favoriteEmoji,
      birthday: birthday ? birthday.format("YYYY-MM-DD") : null,
      toxicTraits: toxicTraits.split(",").map((trait) => trait.trim()),
    };

    try {
      const response = await putData("toxicreal/add", newUser);
      if (response.error) {
        console.error("Failed to add user:", response.error.message);
        alert(`Failed to add user: ${response.error.message}`);
      } else {
        alert("User added successfully!");
        resetForm();
        fetchUsers();
      }
    } catch (error) {
      console.error("Error adding user:", error);
      alert("An error occurred while adding the user.");
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      await deleteData(`users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setHometown("");
    setFavoriteEmoji("");
    setBirthday(null);
    setToxicTraits("");
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <div style={{ minHeight: "100vh", padding: "2rem" }}>
        <Typography variant="h3" sx={{ textAlign: "center", marginBottom: 4 }}>
          Hack4Impact Toxic Traits
        </Typography>

        <Box
          component="form"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            mb: 4,
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            sx={{ margin: 2, width: 300 }}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            sx={{ margin: 2, width: 300 }}
          />
          <TextField
            label="Hometown"
            variant="outlined"
            value={hometown}
            onChange={(e) => setHometown(e.target.value)}
            sx={{ margin: 2, width: 300 }}
          />
          <TextField
            label="Favorite Emoji"
            variant="outlined"
            value={favoriteEmoji}
            onChange={(e) => setFavoriteEmoji(e.target.value)}
            sx={{ margin: 2, width: 300 }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Birthday"
              value={birthday}
              onChange={(newValue) => setBirthday(newValue)}
              sx={{ margin: 2, width: 300 }}
            />
          </LocalizationProvider>
          <TextField
            label="Toxic Traits (Comma Separated)"
            variant="outlined"
            value={toxicTraits}
            onChange={(e) => setToxicTraits(e.target.value)}
            sx={{ margin: 2, width: 600 }}
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ margin: 2, width: 300 }}
          >
            Submit
          </Button>
        </Box>

        <Box
          sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        >
          {users.length > 0 ? (
            users.map((user) => (
              <MUICard
                key={user.id}
                variant="outlined"
                sx={{
                  width: 300,
                  height: 400,
                  margin: 2,
                  backgroundColor: "#1e1e1e",
                  borderRadius: 2,
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 6px 10px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <CardContent>
                  <CardMedia
                    component="img"
                    height="200"
                    image={user.photo || ""}
                    alt={`${user.firstName} ${user.lastName}`}
                  />
                  <Typography variant="h5" sx={{ textAlign: "center", mt: 2 }}>
                    {user.firstName} {user.lastName}
                  </Typography>
                  <Typography sx={{ textAlign: "center", color: "gray" }}>
                    {user.hometown || "Hometown not provided"}
                  </Typography>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ mt: 2 }}
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </Button>
                </CardContent>
              </MUICard>
            ))
          ) : (
            <Typography variant="h6" sx={{ color: "gray" }}>
              No users found.
            </Typography>
          )}
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default ActualToxicCardTest;
