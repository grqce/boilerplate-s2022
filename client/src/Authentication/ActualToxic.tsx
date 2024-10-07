/* prettier-ignore-start */
/* eslint-disable */

import React,{useState} from 'react';
import MUICard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Typography}from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import 'client/src/index.css';
import { keyframes } from '@mui/system';

const rainbowAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

let toxic_bitches = 
  [{name: "AJ 🌙", image: require("../toxicImages/AJ.png")},
  {name: "Grace 🪐", image: require("../toxicImages/Grace.jpeg"), location: "📍 Lexington, MA", birthday: "🎂 Sept. 26, 2006"}, 
  {name: "Edward ☄️", image: "", location: "📍 Hong Kong", birthday: "🎂 May 16, 2006"},
  {name: "Anjalee 🌟", image: "", location: "📍 Canada", birthday: "🎂 Sept. 16, 200?"},
  ]

const names = toxic_bitches.map(person => person.name);

function ActualToxic(props: any): JSX.Element {
  const { name } = props;
  const [search, setSearch] = useState<string>("")
  const handleType = (e: any) => {
    setSearch(e.target.value);
  }
  const handleSearch = () => {
    console.log("search button clicked")
  }

  return (
    <>
      <div className="body" style={{ backgroundColor: 'black', minHeight: '100vh' }}>

      <Typography variant="h3" component="div"
      
      
      // sx={{
      //   background: "linear-gradient(90deg, #ff5f6d, #ffc371, #fffc00, #7bed9f, #00bcd4, #8e44ad)",
      //   backgroundClip: "text",
      //   WebkitBackgroundClip: "text",
      //   color: "transparent",
      //   WebkitTextFillColor: "transparent",
      //   fontWeight: "bold"
      // }}

      >
      
      
      <Box fontWeight='fontWeightMedium' display='inline'

        sx={{
        background: "linear-gradient(90deg, #ff5f6d, #ffc371,#ffcd36, #7bed9f, #00bcd4, #8e44ad)",
        backgroundSize: "300%",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent",
        WebkitTextFillColor: "transparent",
        fontWeight: "bold",
        animation: `${rainbowAnimation} 20s linear infinite`,

      }}
      >
        
        Hack4Impact Toxic Traits </Box>

        <Box fontWeight='fontWeightMedium' display='inline' sx = {{ml: 0.75}} >
         🌎 
      </Box>
       </Typography>

      


        {/* { <div className="search-head">
          <input className="search" type="text" placeholder="" value={search} onChange={(e) => handleType(e)} ></input>
          <Button variant="contained" onClick={handleSearch}>Search </Button>
        
        </div> } */}

       <Box sx={{ display: 'flex'}}> 

        <Typography variant="h5" component="div">
         <Box sx={{ mt: 2, display: 'flex', fontWeight: 600, color: "white"}}> Change Modes </Box>
       </Typography>

       <Switch 
        defaultChecked
          sx={{
            mt: 2,
            ml: 1,
            transform: 'scale(1.5)'
          }} 
          />


      </Box>

        <div className="cards-container">
        {toxic_bitches.map((person, index) => {
        return (          
          <MUICard className="card" variant="outlined" 
            sx={{
              width: 325,
              height: 420,
              borderRadius: 8,
              mt: 6,
              mx: 3,
              border: '1px solid #ccc',
              backgroundColor: "black",
              outlinecolor: "gray",
              transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
              '&:hover': {
                transform: 'scale(1.05)', 
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)', 
              }
            }}
          >
            <CardContent>
              {/* <Typography variant="body2" color="text.secondary">
                This is the card content for {person.name}
              </Typography> */}
              
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5px'
              }}>
              <CardMedia
                  component="img"
                  sx={{ height: 245, width: 245, borderRadius:"100%" }}
                  image={person.image}
                  alt={`Image of ${person.name}`}
                />
             </Box>
            </CardContent>

            <Typography variant="h5" component="div">
              <Box fontWeight='fontWeightMedium' sx={{ ml: 1, mt: 1, display: 'flex', justifyContent: 'center', color: "white" }}> 
                {person.name} </Box>
              </Typography>

              <Typography component="div">
              <Box sx={{ ml: 1, mt: 1.5, display: 'flex', justifyContent: 'center', color: "white" }}>
                 {person.location ? person.location : "Location not available"} </Box>
              </Typography>

              <Typography component="div">
              <Box sx={{ ml: 1, display: 'flex', justifyContent: 'center', color: "white" }}> 
                {person.birthday ? person.birthday : "Birthday not available"} </Box>
              </Typography>


          </MUICard>
        )
      })}
      </div>
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
//   <Button
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