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

import { keyframes } from "@mui/system";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useData, getData, deleteData, putData } from "../util/api";
import dayjs, { Dayjs } from "dayjs";

const rainbowAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

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

function ActualToxicFinal(): JSX.Element {
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
      const response = await getData("toxicreal/all");
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
      await deleteData(`toxicreal/delete/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const [id, setId] = useState<string>("");

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

  const getImage = (name: string) => {
    if (name == "AJ") {
      return "https://i.ibb.co/n0Vw0KD/aj.jpg";
    } else if (name == "Edward") {
      return "https://i.ibb.co/Gp1TRb9/ed.png";
    } else if (name == "Anjalee") {
      return "https://i.ibb.co/L969Tbs/anjalee.jpg";
    } else if (name == "Grace") {
      return "https://i.ibb.co/1nhBxKD/grace.jpg";
    }
    let num = Math.random();
    if (num > 0.66) {
      return "https://i.ibb.co/m0kQD80/dhruv.jpg";
    } else if (num > 0.33) {
      return "https://images.ctfassets.net/dz50cburkkql/6NiGvUink9o7g98SjB1r4r/5e40bd1fb6ca4e94b8665cf5c82efa56/1701456936624__3_.jpg";
    }
    return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX42tSid-ytL_Ao0y64seDpsePcAjmSZta_Q&s";
  };

  const getContent = (user: any) => {
    console.log(user);
    if (user._id != id) {
      return (
        <div onClick={() => setId(user._id)}>
          <CardMedia
            component="img"
            height="250"
            image={getImage(user.firstName)}
            alt={`${user.firstName} ${user.lastName}`}
            sx={{ borderRadius: "24px" }}
          />
          <Typography
            variant="h5"
            sx={{ textAlign: "center", mt: 2, fontWeight: "bold" }}
            color="white"
          >
            {user.firstName} {user.lastName} {user.favoriteEmoji}
          </Typography>

          <Typography sx={{ textAlign: "center", color: "#D3D3D3" }}>
            🎂 Birthday: {user.birthday || "not provided"}
          </Typography>

          <Typography sx={{ textAlign: "center", color: "#D3D3D3" }}>
            🏠 Hometown: {user.hometown || "not provided"}
          </Typography>
          <Button
            variant="contained"
            color="error"
            sx={{
              mt: 2,
              borderRadius: 100,
              width: 50, // Increased the width for better visibility
              mx: "auto", // Centers the button horizontally
              display: "block",
              // color: "black", // Required for `mx: auto` to work
            }}
            onClick={() => deleteUser(user._id)}
            style={{ backgroundColor: "#8f578f" }} // Darker shade of blue #8a3e83
          >
            x
          </Button>
        </div>
      );
    }
    return (
      <div>
        <div>
          <Typography>
            <Box
              fontWeight="fontWeightMedium"
              display="inline"
              sx={{
                background: "linear-gradient(120deg, #a6c0fe 0%, #f68084 100%)",
                backgroundSize: "300%",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
                fontWeight: "bold",
                marginLeft: "1rem",
                animation: `${rainbowAnimation} 10s linear infinite`,
                fontSize: "1.5rem",
              }}
            >
              {user.firstName}'s Toxic Traits
            </Box>
          </Typography>

          {user.toxicTraits.map((trait: any, index: number) => (
            <Typography
              key={index}
              sx={{
                textAlign: "left",
                fontSize: "1rem",
                marginLeft: "0.5rem",
                marginRight: "0.5rem",
                mt: "1rem",
                mb: "-0.5rem",
              }}
              color="white"
            >
              ◦ {trait}
            </Typography>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg">
      <div style={{ padding: "2rem", width: "100vw", marginLeft: "21rem" }}>
        <Typography variant="h3" component="div">
          <Box
            fontWeight="fontWeightMedium"
            display="inline"
            sx={{
              background: "linear-gradient(135deg, #4b6cb7 0%, #c94b4b 100%)",
              backgroundSize: "300%",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
              fontWeight: "bold",
              animation: `${rainbowAnimation} 10s linear infinite`,
              fontSize: "4rem",
            }}
          >
            Hack4Impact Toxic Traits{" "}
          </Box>
        </Typography>
      </div>

      <div>
        <div style={{ marginLeft: "18.5rem" }}>
          <MUICard
            className="card"
            variant="outlined"
            sx={{
              width: 1000,
              height: 300,
              borderRadius: 8,
              mt: 2,
              mb: 2,
              mx: 3,
            }}
          >
            <Box
              component="form"
              sx={{
                display: "flex",
                flexWrap: "wrap",
                "& > :not(style)": { m: 3, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                label="First Name"
                variant="outlined"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "30px",
                  width: "300px",
                  height: "50px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px",
                  },
                }}
              />

              <TextField
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "30px",
                  width: "300px",
                  height: "50px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px",
                  },
                }}
              />

              <TextField
                id="outlined-basic"
                label="Hometown"
                variant="outlined"
                value={hometown}
                onChange={(e) => setHometown(e.target.value)}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "30px",
                  width: "300px",
                  height: "50px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px",
                  },
                }}
              />

              <TextField
                id="outlined-basic"
                label="Social Security Number"
                variant="outlined"
                value={favoriteEmoji}
                onChange={(e) => setFavoriteEmoji(e.target.value)}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "30px",
                  width: "300px",
                  height: "50px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px",
                  },
                }}
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Birthday"
                  value={birthday}
                  onChange={(newValue) =>
                    setBirthday(newValue ? dayjs(newValue) : null)
                  }
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "30px",
                    width: "300px",
                    height: "50px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "50px",
                    },
                  }}
                />
              </LocalizationProvider>

              <TextField
                id="outlined-basic"
                label="Toxic Traits (Split By Comma)"
                value={toxicTraits}
                onChange={(e) => setToxicTraits(e.target.value)}
                variant="outlined"
                sx={{
                  backgroundColor: "white",
                  borderRadius: "30px",
                  width: "800px",
                  height: "50px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px",
                  },
                }}
              />

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#0069ca",
                  mt: 2,
                  borderRadius: "30px",
                  width: "300px",
                  height: "50px",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Box>
          </MUICard>
        </div>

        <div style={{ minHeight: "100vh", padding: "2rem" }}>
          <Box
            sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
          >
            {users.length > 0 ? (
              users.map((user) => (
                <MUICard
                  key={user._id}
                  variant="outlined"
                  sx={{
                    width: 350,
                    height: 450,
                    margin: 2,
                    backgroundColor: "#383838",
                    borderRadius: 9,
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 6px 10px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  <CardContent>{getContent(user)}</CardContent>
                </MUICard>
              ))
            ) : (
              <Typography variant="h6" sx={{ color: "gray" }}>
                No users found.
              </Typography>
            )}
          </Box>
        </div>
      </div>
    </div>
  );
}

export default ActualToxicFinal;
