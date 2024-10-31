/* prettier-ignore-start */
/* eslint-disable */

import React, { useState, useEffect } from "react";
import MUICard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import { keyframes } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";

const rainbowAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

let ajTraits = [
  "Has ties to the mafia",
  "Once caused a federal investigation",
  "Lit high school on fire",
  "From New Jersey",
  "Doesn't eat breakfast or lunch",
  "Deaf but too lazy to wear hearing aid",
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
    photo: require("../toxicImages/AJ.png"),
    location: "📍 Rajiv's Basement",
    birthday: "🎂 August 23, 2006",
    id: 0,
    toxictraits: ajTraits,
  },
  {
    name: "Grace 🚭",
    name2: "Grace",
    photo: require("../toxicImages/Grace.jpeg"),
    hometown: "📍 Kiwi Yogurt",
    birthday: "🎂 Sept. 26, 2006",
    id: 1,
    toxictraits: graceTraits,
  },
  {
    name: "Edward 🚾",
    name2: "Edward",
    photo: require("../toxicImages/Edward.png"),
    hometown: "📍 McDonalds",
    birthday: "🎂 May 16, 2006",
    id: 2,
    toxictraits: edwardTraits,
  },
  {
    name: "Anjalee 🍁",
    name2: "Anjalee",
    photo: require("../toxicImages/Anjalee.png"),
    hometown: "📍 Canada",
    birthday: "🎂 Sept. 16, 2002",
    id: 3,
    toxictraits: anjaleeTraits,
  },
];

function ToxicPage(): JSX.Element {
  const [toxicBitches, setToxicBitches] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/users/all")
      .then((response) => response.json())
      .then((data) => {
        setToxicBitches(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleType = (e: any) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    console.log("search button clicked");
  };

  return (
    <>
      <div className="body">
        <Typography
          variant="h3"
          component="div"
          sx={{ fontWeight: 700, color: "gray" }}
          display="inline"
        >
          <Box display="inline">Hack4Impact Profiles </Box>
          <Box display="inline" sx={{ ml: 1 }}>
            🌎
          </Box>
        </Typography>

        <Box sx={{ display: "flex" }}>
          <Typography variant="h5" component="div">
            <Box sx={{ mt: 2, display: "flex", fontWeight: 600 }}>
              Change Modes
            </Box>
          </Typography>

          <Switch
            sx={{
              mt: 2,
              ml: 1,
              transform: "scale(1.5)",
            }}
            onChange={() => navigate("/toxicfinal")}
          />
        </Box>

        <div className="cards-container">
          {toxic_bitches.length > 0 ? (
            toxic_bitches.map((person) => {
              return (
                <MUICard
                  className="card"
                  variant="outlined"
                  key={person.id}
                  sx={{
                    width: 325,
                    height: 420,
                    borderRadius: 8,
                    mt: 6,
                    mx: 3,
                    border: "1.5px solid #ccc",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
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
                        image={person.photo}
                        alt={`Image of ${person.name} `}
                      />
                    </Box>
                  </CardContent>

                  <Typography variant="h5" component="div">
                    <Box
                      fontWeight="fontWeightMedium"
                      sx={{
                        ml: 1,
                        mt: 1,
                        display: "flex",
                        justifyContent: "center",
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
                      }}
                    >
                      {person.hometown || "Location not available"}
                    </Box>
                  </Typography>

                  <Typography component="div">
                    <Box
                      sx={{
                        ml: 1,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {person.birthday || "Birthday not available"}
                    </Box>
                  </Typography>
                </MUICard>
              );
            })
          ) : (
            <Typography>No users available</Typography>
          )}
        </div>
      </div>
    </>
  );
}

export default ToxicPage;
