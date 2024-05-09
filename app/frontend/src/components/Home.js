import React, {useEffect, useState} from "react";
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {Box, DialogTitle, Grid} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";

const drawerWidth = "33.33%";

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(1),
    marginTop: '2%',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}`,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

  const Home = () =>  {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [text, setText] = useState("");
  const [analysing, setAnalysing] = useState(false);
  const [analysingDone, setAnalysingDone] = useState(false);
  const [result, setResult] = useState("")

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleTextFieldChange = (value) => {
    console.log(value);
    setText(value)
    setAnalysingDone(false);
  };

  const handleSettingsSave = () => {
    setAnalysing(true);

    if (text !== ""){
      console.log(text);
      setAnalysing(false);
      setAnalysingDone(true);
      const encodedSelectedTest = btoa(text);
      const url = `http://127.0.0.1:8000/propaganda-analysis/get/result/${encodedSelectedTest}/`;
      console.log('Requesting URL:', url);
      axios.get(url).then((response) => {
          console.log("Devices for test", response.data);
          setResult(response.data);
      }).catch(error => {
        console.log(error.response.data);
        alert(error.response.data["message"]); 
      });   
    } else {
      alert("No text"); 
      setAnalysing(false);
    };
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* <Button
        color="primary"
        onClick={handleDrawerOpen}
        sx={{
          width: '8%',
          height: '36px',
          borderRadius: '8px', 
          backgroundColor: '#1e88e5',
          '&:hover': {
            backgroundColor: '#1e7be5',
          },
          color: 'white',
          padding:'15px 32px',
          margin: '10px 10px',
          marginTop: "80px"
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '14px',
          }}
        >
          <Typography>Tests</Typography>
          <ChevronRightIcon />
        </div>
      </Button> */}
      
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            boxSizing: 'border-box',
            position: 'fixed',
            top: 0,
            left: 0,
            marginTop: '46px',
            height: '100%',
            backgroundColor: '#fff',
            overflowY: 'auto',
            borderRight: '1px solid #ddd', 
            zIndex: 100
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader style={{backgroundColor: "#B9D9EB" }}>
          <div style={{ display: 'flex', alignItems: 'center', color: "#00008B", flex: 1}}>
            <Typography style={{ fontWeight: 'bold', fontSize: '20px' }}>Tests: </Typography>
          </div>          
          <IconButton onClick={handleDrawerClose} style={{ display: 'flex', color: "#00008B"}}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Grid item xs={4}>
        </Grid>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
          <Box sx={{ alignItems: "center", marginLeft: '10%', marginRight: '10%' }}>
            <TextField
              onChange={(e) => handleTextFieldChange(e.target.value)}
              margin="normal"
              variant="outlined"
              fullWidth
              label={'Enter your text for analysys...'}
            />
            <LoadingButton
                onClick={handleSettingsSave}
                loading={analysing}
                variant="contained"
                fullWidth
                disabled={analysing || analysingDone}
            >
                {analysing ? "Analysing..." : analysingDone ? "Analysing Done" : "Analyse"}
            </LoadingButton>
            <Typography sx={{marginTop: "5%", fontStyle: "italic"}}>Results: {result}</Typography>
          </Box>
          
        <Grid>
        </Grid>
      </Main>
    </Box>
  );
}

export default Home;
