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
import { useNavigate } from 'react-router-dom';
import { grey } from '@mui/material/colors';


const rainbowAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

let toxic_bitches = 
  [{name: "AJ 🌙", image: require("../toxicImages/AJ.png"), location: "📍 New Providence, NJ", birthday: "🎂 August 23, 2006", id: 0},
  {name: "Grace 🪐", image: require("../toxicImages/Grace.jpeg"), location: "📍 Lexington, MA", birthday: "🎂 Sept. 26, 2006"}, 
  {name: "Edward ☄️", image: require("../toxicImages/Edward.png"),  location: "📍 Hong Kong", birthday: "🎂 May 16, 2006"},
  {name: "Anjalee 🌟", image: require("../toxicImages/Anjalee.png"), location: "📍 Canada", birthday: "🎂 Sept. 16, 2002"},
  ]

const names = toxic_bitches.map(person => person.name);

function ToxicPage(props: any): JSX.Element {
  const { name } = props;
  const [search, setSearch] = useState<string>("")
  const handleType = (e: any) => {
    setSearch(e.target.value);
  }
  const handleSearch = () => {
    console.log("search button clicked")
  }

  let navigate = useNavigate(); 

  return (
    <>
      <div className="body">
      <Typography variant="h3" component="div" sx={{fontWeight: 700, color: 'gray'}} display='inline'>
  
      <Box display='inline'>Hack4Impact Profiles </Box>
      <Box display='inline' sx = {{ml: 1}} > 🌎 </Box>
       </Typography>

      


        {/* { <div className="search-head">
          <input className="search" type="text" placeholder="" value={search} onChange={(e) => handleType(e)} ></input>
          <Button variant="contained" onClick={handleSearch}>Search </Button>
        
        </div> } */}

        

       <Box sx={{ display: 'flex'}}> 

        <Typography variant="h5" component="div">
         <Box sx={{ mt: 2, display: 'flex', fontWeight: 600}}> Change Modes </Box>
       </Typography>

       <Switch 
          sx={{
            mt: 2,
            ml: 1,
            transform: 'scale(1.5)'
          }} 
         onChange={() => navigate("/toxicreal")}
         
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
              border: '1.5px solid #ccc',
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
              <Box fontWeight='fontWeightMedium' sx={{ ml: 1, mt: 1, display: 'flex', justifyContent: 'center'}}> {person.name} </Box>
              </Typography>

              <Typography component="div">
              <Box sx={{ ml: 1, mt: 1.5, display: 'flex', justifyContent: 'center'}}> {person.location ? person.location : "Location not available"} </Box>
              </Typography>

              <Typography component="div">
              <Box sx={{ ml: 1, display: 'flex', justifyContent: 'center'}}> {person.birthday ? person.birthday : "Birthday not available"} </Box>
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

export default ToxicPage;