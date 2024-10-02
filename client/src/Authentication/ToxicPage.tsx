/* prettier-ignore-start */
/* eslint-disable */

import React, { useState } from 'react';
import MUICard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';
import 'client/src/index.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

let toxic_bitches = ["John Wharton", "AJ", "Grace", "Ed", "John WHarton"]


function ToxicPage(props: any): JSX.Element {
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
      <div className="body">
        <div className="search-head">
          <input className="search" type="text" placeholder="" value={search} onChange={(e) => handleType(e)} ></input>
          <button className="search-button" onClick={handleSearch}>Search</button>
        </div>
        {toxic_bitches.map((name) => {
        return (          
          <MUICard className="card" variant="outlined"
            sx={{
              width: 600,
              height: 400,
              borderRadius: 8,
              mt: 6,
              mx: 4,

            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                {name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This is the card content for {name}
              </Typography>
            </CardContent>
          </MUICard>
        )
      })}
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