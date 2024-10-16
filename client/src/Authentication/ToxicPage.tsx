import React, { useState, useEffect } from 'react';
import MUICard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import { keyframes } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { grey } from '@mui/material/colors';

const rainbowAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

function ToxicPage(): JSX.Element {
  const [toxicBitches, setToxicBitches] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");

const navigate = useNavigate();

    useEffect(() => {
      fetch('/users/all') 
        .then((response) => response.json())
        .then((data) => {
          setToxicBitches(data);
        })
        .catch((error) => {
          console.error('Error fetching users:', error);
        });
    }, []);

  const handleType = (e: any) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    console.log('search button clicked');
  };

  return (
    <>
      <div className="body">
        <Typography
          variant="h3"
          component="div"
          sx={{ fontWeight: 700, color: 'gray' }}
          display="inline"
        >
          <Box display="inline">Hack4Impact Profiles </Box>
          <Box display="inline" sx={{ ml: 1 }}>
            🌎
          </Box>
        </Typography>

        <Box sx={{ display: 'flex' }}>
          <Typography variant="h5" component="div">
            <Box sx={{ mt: 2, display: 'flex', fontWeight: 600 }}>
              Change Modes
            </Box>
          </Typography>

          <Switch
            sx={{
              mt: 2,
              ml: 1,
              transform: 'scale(1.5)',
            }}
            onChange={() => navigate('/toxicreal')}
          />
        </Box>

        <div className="cards-container">
          {toxicBitches.length > 0 ? (
            toxicBitches.map((person) => {
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
                    border: '1.5px solid #ccc',
                    transition:
                      'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow:
                        '0 6px 20px rgba(0, 0, 0, 0.2)',
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '5px',
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{ height: 245, width: 245, borderRadius: '100%' }}
                        image={person.photo}
                        alt={`Image of ${person.firstName} ${person.lastName}`}
                      />
                    </Box>
                  </CardContent>

                  <Typography variant="h5" component="div">
                    <Box
                      fontWeight="fontWeightMedium"
                      sx={{
                        ml: 1,
                        mt: 1,
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      {`${person.firstName} ${person.lastName}`}
                    </Box>
                  </Typography>

                  <Typography component="div">
                    <Box
                      sx={{
                        ml: 1,
                        mt: 1.5,
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      {person.hometown || 'Location not available'}
                    </Box>
                  </Typography>

                  <Typography component="div">
                    <Box
                      sx={{
                        ml: 1,
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      {person.birthday || 'Birthday not available'}
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
