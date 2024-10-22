/* prettier-ignore-start */
/* eslint-disable */

import React, { useState, useEffect } from "react";
import MUICard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography, TextField } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import "client/src/index.css";
import { keyframes } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { postData, putData, useData, deleteData } from "../util/api";
const rainbowAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

function timeout(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
}

let ajTraits = [
  "Has ties to the mafia",
  "Once caused a federal investigation",
  "Lit high school on fire",
  "From New Jersey",
  "Doesn't eat breakfast or lunch",
  "Deaf",
  "Diversity hire",
];

let graceTraits = [
  "Uses Instagram Webapp",
  "Does not know how to snap her fingers",
  "Eats apples even though she’s allergic",
  "Can’t drive (passenger princess)",
  "Will send practice word hunts to herself but still lost to Edward",
  "BeReal & CAVA kids meal's #1 fan",
];

let anjaleeTraits = ["is Canadian", "🇨🇦🍁", "Syrup"];

let edwardTraits = [
  "Mechanical keyboard user",
  "Played too much monkeytype",
  "Talks British sometimes",
  "Sometimes listens to music on Youtube",
  "Plays GamePigeon basketball with AT&T",
  "Watched all of Breaking Bad in four days",
];

let toxic_bitches = [
  {
    name: "AJ 🔞",
    name2: "AJ",
    photo: require("../toxicImages/AJReal.JPG"),
    location: "📍 Rajiv's Basement",
    birthday: "🎂 August 23, 2006",
    id: 0,
    toxictraits: ajTraits,
  },
  {
    name: "Grace 🚭",
    name2: "Grace",
    photo: require("../toxicImages/GraceREAL.JPG"),
    hometown: "📍 Kiwi Yogurt",
    birthday: "🎂 Sept. 26, 2006",
    id: 1,
    toxictraits: graceTraits,
  },
  {
    name: "Edward 🚾",
    name2: "Edward",
    photo: require("../toxicImages/EdwardREAL.png"),
    hometown: "📍 McDonalds",
    birthday: "🎂 May 16, 2006",
    id: 2,
    toxictraits: edwardTraits,
  },
  {
    name: "Anjalee 🍁",
    name2: "Anjalee",
    photo: require("../toxicImages/AnjaleeREAL.jpeg"),
    hometown: "📍 Canada",
    birthday: "🎂 Sept. 16, 2002",
    id: 3,
    toxictraits: anjaleeTraits,
  },
];

const names = toxic_bitches.map((person) => person.name);

function ActualToxic(props: any): JSX.Element {
  const navigate = useNavigate();

  const { name } = props;
  const [search, setSearch] = useState<string>("");
  const [active, setActive] = useState<number>(-1);
  const [users, setUsers] = useState<any[]>([]);
  const [containerStyle, setContainerStyle] = useState<object>({
    opacity: 1,
    transition: "opacity 500ms",
  });
  const [toxicStyle, setToxicStyle] = useState<object>({
    opacity: 0,
    transition: "opacity 500ms",
  });

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [hometown, setHometown] = useState<string>("");
  const [favoriteEmoji, setFavoriteEmoji] = useState<string>("");
  const [birthday, setBirthday] = useState<Dayjs | null>(null);
  const [toxicTraits, setToxicTraits] = useState<string>("");

  const handleSubmit = async () => {
    const newUser = {
      firstName,
      lastName,
      hometown,
      favoriteEmoji,
      birthday,
      toxicTraits: toxicTraits.split(",").map((trait: string) => trait.trim()),
    };

    try {
      const response = await putData("toxicreal/add", newUser);

      if (response.error) {
        console.error("Failed to add user:", response.error.message);
        alert(`Failed to add user: ${response.error.message}`);
      } else {
        console.log("User added successfully:", response.data);
        alert("User added successfully!");
        setFirstName("");
        setLastName("");
        setHometown("");
        setFavoriteEmoji("");
        setBirthday(null);
        setToxicTraits("");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      alert("An error occurred while adding the user. Please try again.");
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await useData("/users/all");
      if (response == null) {
        console.error("Dhruv");
      } else {
        setUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
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

  useEffect(() => {
    fetchUsers();
    console.log(users);
  }, []);
  const handleType = (e: any) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    console.log("search button clicked");
  };

  const cardSwitchFrom = async (id: number) => {
    setContainerStyle({ opacity: 0, transition: "opacity 500ms" });
    await timeout(500);
    setActive(id);
    setToxicStyle({ opacity: 1, transition: "opacity 500ms" });
    await timeout(500);
  };
  const cardSwitchTo = async (id: number) => {
    setToxicStyle({ opacity: 0, transition: "opacity 500ms" });
    await timeout(500);
    setActive(id);
    setContainerStyle({ opacity: 1, transition: "opacity 500ms" });
    await timeout(500);
  };

  const getReturn = () => {
    if (active == -1) {
      return (
        <div className="cards-container" style={containerStyle}>
          {toxic_bitches.map((person, index) => (
            <MUICard
              className="card"
              variant="outlined"
              key={index}
              sx={{
                width: 325,
                height: 420,
                borderRadius: 8,
                mt: 6,
                mx: 3,
                border: "1px solid #ccc",
                backgroundColor: "white",
                outlinecolor: "gray",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  cursor: "pointer",
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <div className="card-style" onClick={() => cardSwitchFrom(index)}>
                {/* <p
                  style={{
                    color: "black",
                    fontSize: "2rem",
                    marginTop: "0.5rem",
                    marginLeft: "17.5rem",
                  }}
                >
                  x
                </p> */}
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "5px",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{ height: 245, width: 245, borderRadius: "100%" }}
                      image={person.photo} // Update this field to match your user object
                      alt={`Image of ${person.name}`} // Adjust for firstName and lastName
                    />
                  </Box>
                </CardContent>
              </div>

              <Typography variant="h5" component="div">
                <Box
                  fontWeight="fontWeightMedium"
                  sx={{
                    ml: 1,
                    mt: 1,
                    display: "flex",
                    justifyContent: "center",
                    color: "black",
                  }}
                >
                  {`${person.name}`}
                </Box>
              </Typography>

              <Typography component="div">
                <Box
                  sx={{
                    ml: 1,
                    mt: 1.5,
                    display: "flex",
                    justifyContent: "center",
                    color: "black",
                  }}
                >
                  {person.hometown || "Location not available"}
                </Box>
              </Typography>
            </MUICard>
          ))}
        </div>
      );
    } else if (active == -2) {
      return (
        <div>
          <div style={{ marginLeft: "1rem" }}>
            <MUICard
              className="card"
              variant="outlined"
              sx={{
                width: 1000,
                height: 420,
                borderRadius: 8,
                mt: 6,
                mx: 3,
                //   border: '1px solid #ccc',
                //   backgroundColor: "black",
                //   outlinecolor: "gray",
                //   transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                // '&:hover': {
                //   transform: 'scale(1.05)',
                //   cursor: 'pointer',
                //   boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
                // }
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
                  required
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
                  required
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
                  label="Favorite Emoji"
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
        </div>
      );
    } else if (active == -3) {
      return (
        <div className="cards-container" style={containerStyle}>
          {users.map((person, index) => (
            <MUICard
              className="card"
              variant="outlined"
              sx={{
                width: 1000,
                height: 420,
                borderRadius: 8,
                mt: 6,
                mx: 3,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  cursor: "pointer",
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
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
                {`${person.firstName} ${person.lastName}`}
              </Button>
            </MUICard>
          ))}
        </div>
      );
    } else {
      const activePerson = toxic_bitches[active];
      return (
        <div
          onClick={() => {
            cardSwitchTo(-1);
          }}
          style={toxicStyle}
        >
          return (
          <div style={{ marginLeft: "1rem" }}>
            <MUICard
              className="card"
              variant="outlined"
              sx={{
                width: 1000,
                height: 420,
                borderRadius: 8,
                mt: 6,
                mx: 3,
                border: "1px solid #ccc",
                backgroundColor: "white",
                outlinecolor: "gray",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  cursor: "pointer",
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <Typography
                variant="h4"
                component="div"
                fontWeight="650"
                color="black"
              >
                <Box
                  sx={{
                    ml: 1,
                    mt: 5,
                    display: "flex",
                    justifyContent: "center",
                    color: "#db3c2e",
                  }}
                >
                  ⚠️ {activePerson.name2}'s Toxic Traits ⚠️{" "}
                </Box>
              </Typography>
              <CardContent>
                <Box sx={{ color: "white", mt: 2 }}>
                  <div
                    style={{
                      display: "flex",
                      paddingLeft: "30px",
                      flexDirection: "row",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{ height: 245, width: 245, borderRadius: "100%" }}
                      image={activePerson.photo}
                    />
                    <ul
                      style={{ paddingLeft: "50px", margin: 0, color: "black" }}
                    >
                      {toxic_bitches[active].toxictraits.map((trait, index) => (
                        <li key={index} style={{ marginBottom: "10px" }}>
                          <Typography variant="h6">{trait}</Typography>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Box>
              </CardContent>
            </MUICard>
          </div>
          )
        </div>
      );
    }
  };

  return (
    <>
      <div
        className="body"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(120deg, red, #001f3f, #001020, #000000)",
          backgroundSize: "200% 200%",
          backgroundPosition: "0% 50%",
          animation: `${rainbowAnimation} 10s linear infinite`,
        }}
      >
        <Typography
          variant="h3"
          component="div"

          // sx={{
          //   background: "linear-gradient(90deg, #ff5f6d, #ffc371, #fffc00, #7bed9f, #00bcd4, #8e44ad)",
          //   backgroundClip: "text",
          //   WebkitBackgroundClip: "text",
          //   color: "transparent",
          //   WebkitTextFillColor: "transparent",
          //   fontWeight: "bold"
          // }}
        >
          <Box
            fontWeight="fontWeightMedium"
            display="inline"
            sx={{
              background:
                "linear-gradient(90deg, #ff5f6d, #ffc371,#ffcd36, #7bed9f, #00bcd4, #8e44ad)",
              backgroundSize: "300%",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
              fontWeight: "bold",
              animation: `${rainbowAnimation} 10s linear infinite`,
            }}
          >
            Hack4Impact Toxic Traits{" "}
          </Box>

          <Box
            fontWeight="fontWeightMedium"
            display="inline"
            sx={{ ml: 0.75 }}
          ></Box>
        </Typography>
        {/* { <div className="search-head">
          <input className="search" type="text" placeholder="" value={search} onChange={(e) => handleType(e)} ></input>
          <Button variant="contained" onClick={handleSearch}>Search </Button>
        
        </div> } */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h5" component="div">
              <Box sx={{ mt: 2, fontWeight: 600, color: "white" }}>
                Change Modes
              </Box>
            </Typography>
            <Switch
              defaultChecked
              sx={{
                mt: 2,
                ml: 1,
                transform: "scale(1.5)",
              }}
              onChange={() => navigate("/toxic")}
            />
          </Box>
        </Box>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ mr: 2 }}
          onClick={() => cardSwitchTo(-2)}
        >
          Add Person
        </Button>
        {getReturn()}
      </div>
    </>
  );
}
// <Box

// sx={{
//   display: 'flex',
//   gap: 4, // Adds space between input and button
//   mb: 4  // Adds bottom margin for spacing below the search bar area
// }}
// >
// <div className="head">
//   <input className="search" type="text" placeholder="" value={search} onChange={(e) => handleType(e)} ></input>
// <Button
//     variant="contained"
//     onClick={handleSearch}
//   >
//     Search
//   </Button>
// </div>

// </Box>

//

// /* prettier-ignore-end */

export default ActualToxic;
