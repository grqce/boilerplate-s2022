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
import { useNavigate } from "react-router-dom";
  

const rainbowAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

function timeout(delay: number) {
  return new Promise( res => setTimeout(res, delay) );
}
let graceTraits = ["Uses instagram Webapp", "Does not know how to snap her fingers", "Eats apples even though she’s technically allergic", "Can’t drive (passenger princess)", "Will send game pigeon word hunts to herself to practice (still lost to edward)",  
"Watched the entire series of the office 10x over"]
let anjaleeTraits = ["is Canadian"]

let edwardTraits = [""]

let ajTraits = [""]

let toxic_bitches = 
  [{name: "AJ 🔞", image: require("../toxicImages/AJReal.JPG"), location: "📍 Rajiv's Basement", birthday: "🎂 August 23, 2006", id: 0, toxictraits: ajTraits},
  {name: "Grace 🚭", image: require("../toxicImages/GraceREAL.JPG"), location: "📍 Kiwi Yogurt", birthday: "🎂 Sept. 26, 2006", id: 1, toxictraits: graceTraits}, 
  {name: "Edward 🚾", image: require("../toxicImages/EdwardREAL.png"), location: "📍 McDonal", birthday: "🎂 May 16, 2006", id: 2, toxictraits: edwardTraits},
  {name: "Anjalee 🍁", image: require("../toxicImages/AnjaleeREAL.jpeg"), location: "📍 Canada", birthday: "🎂 Sept. 16, 2002", id: 3, toxictraits: anjaleeTraits},
  ]

const names = toxic_bitches.map(person => person.name);

function ActualToxic(props: any): JSX.Element {
  const { name } = props;
  const [search, setSearch] = useState<string>("")
  const [active, setActive] = useState<number>(-1)
  const [containerStyle, setContainerStyle] = useState<object>({opacity: 1, transition: "opacity 500ms"})
  const [toxicStyle, setToxicStyle] = useState<object>({opacity: 0, transition: "opacity 500ms"})
  
  let navigate = useNavigate(); 
  const handleType = (e: any) => {
    setSearch(e.target.value);
  }
  const handleSearch = () => {
    console.log("search button clicked")
  }

  const cardSwitchFrom = async (id: number) => {
    setContainerStyle({opacity: 0, transition: "opacity 500ms"})
    await timeout(500); 
    setActive(id)
    setToxicStyle({opacity: 1, transition: "opacity 500ms"})
    await timeout(500); 
  }
  const cardSwitchTo = async (id: number) => {
    setToxicStyle({opacity: 0, transition: "opacity 500ms"})
    await timeout(500); 
    setActive(id)
    setContainerStyle({opacity: 1, transition: "opacity 500ms"})
    await timeout(500); 
  }

  const getReturn = () => {
    if (active == -1){
      return (
        <div className="cards-container" style={containerStyle}>
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
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)', 
              }
            }}
          >
            <div className="card-style" onClick={()=>{cardSwitchFrom(index)}}>
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
            </div>

            <Typography variant="h4" component="div">
              <Box fontWeight='fontWeightMedium' sx={{ ml: 1, mt: 1, display: 'flex', justifyContent: 'center', color: "white" }}> 
                {person.name} </Box>
              </Typography>

              <Typography component="div">
              <Box sx={{ ml: 1, mt: 1.5, display: 'flex', justifyContent: 'center', color: "white" }}>
                {person.location ? person.location : "Location not available"} </Box>
              </Typography>

              {/* <Typography component="div">
              <Box sx={{ ml: 1, display: 'flex', justifyContent: 'center', color: "white" }}> 
                {person.birthday ? person.birthday : "Birthday not available"} </Box>
              </Typography> */}


          </MUICard>
        )
      })}
      </div>
      )
    }
    else {
      return (
      <div onClick={()=>{cardSwitchTo(-1)}} style={toxicStyle}>
        <MUICard className="card" variant="outlined" 
            sx={{
              width: 650,
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
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)', 
              }
            }}
            
          >
        </MUICard>
        
        
          

      </div>
      );

    }

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
        animation: `${rainbowAnimation} 10s linear infinite`,

      }}
      >
        
        Hack4Impact Toxic Traits </Box>

        <Box fontWeight='fontWeightMedium' display='inline' sx = {{ml: 0.75}} >
        😛
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
         onChange={() => navigate("/toxic")}
         
          />

        </Box>

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