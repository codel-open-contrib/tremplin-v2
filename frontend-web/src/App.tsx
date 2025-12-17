import "./styles/global.scss";
import "./assets/icons/css/all.min.css"
import { Badge, Box, Button, IconButton, Typography } from "@mui/material";
import { Help, Notifications, School, Menu, Email } from "@mui/icons-material";
import RoutesCollection from "./routes/Routes";
import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import hat from "./assets/images/graduation-hat.png";

function App() {
  const [showNotification, setShowNotification] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [data, setData] = useState({
      "uid": 0,
      "profile": hat,
      "nom": "",
      "prenoms": "",
      "tel": "",
      "email": ""
  })
  useEffect(() => {
    setInterval(() => {
      const local = localStorage.getItem("client");
      if(local) {
          setData(JSON.parse(local));
      }
      // console.log(`Data: ${local}`);
    }, 1000)
  }, [])

  return (
    <div className="container">
      <Box className="header">
        <Box className="logo" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
          <School className="logo-tr" /> <p>Tremplin</p>
        </Box>
        {/* <Box className="logo"><i className="fa-solid fa-graduation-cap"></i> Tremplin</Box> */}
        {/* <Box className="client">{data.nom} {data.prenoms}</Box> */}
        <Box className="control">
          <ul>
            <li>
              <IconButton className="icon-btn" onClick={() => setShowNotification(true)}>
                <Badge badgeContent={0} color="primary">
                  <Notifications className="icon" />
                </Badge>
              </IconButton>
            </li>
            <li><IconButton className="icon-btn" onClick={() => setShowMessage(true)}>
              <Badge badgeContent={0} color="primary">
                  <Email className="icon" />
              </Badge></IconButton></li>
            <li><IconButton className="icon-btn"><Help className="icon" /></IconButton></li>
            <li>
                <img style={{ 
                  display: data.profile == "empty" ? "none" : "block-inline",
                  width: "40px",
                  borderRadius: "100px"
                }}  src={data.profile == "empty" ? hat : data.profile} alt="profile" className="profile-img"/>
                <div className="name-as-a-profile" style={{ display: data.profile == "empty" ? "inherit" : "none" }}>{data.nom.toUpperCase()[0]}</div>
            </li>
          </ul>
        </Box>
      </Box>
      <BrowserRouter>
        <RoutesCollection />
      </BrowserRouter>
      <Notification showNotification={showNotification} setShowNotification={setShowNotification}/>
      <Message showMessage={showMessage} setShowMessage={setShowMessage}/>
    </div>
  );
}

function GetHelp() {
  // TODO
}

function Notification({showNotification, setShowNotification}: any) {
  return (
    <Box sx={{
      display: showNotification ? "inline": "none",
      position: "fixed",
      right: "5%",
      top: "10%",
      zIndex: 100,
      backgroundColor: "#FFFFFF",
      padding: "16px",
      width: "300px",
      boxShadow: "5px 5px 20px 0px rgba(0,0,0,0.5), -5px -5px 20px 0px rgba(0,0,0,0.5)",
      fontFamily: "sans-serif",
      color: "#292a2bff",
      borderRadius: "8px",
      height: '100vh'
    }} className="notification">
      <Typography variant="h5" className="n-heading">Notification</Typography>
      <Button onClick={() => setShowNotification(false)}>Lue</Button>
      {/* TODO */}
    </Box>
  );
}

function Message({showMessage, setShowMessage}: any) {
  return (
    <Box sx={{
      display: showMessage ? "inline": "none",
      position: "fixed",
      right: "5%",
      top: "10%",
      zIndex: 100,
      backgroundColor: "#FFFFFF",
      padding: "16px",
      width: "300px",
      boxShadow: "15px 15px 50px 0px rgba(0,0,0,0.5), -15px -15px 50px 0px rgba(0,0,0,0.5)",
      fontFamily: "sans-serif",
      color: "#292a2bff",
      borderRadius: "8px",
      height: '100vh'
    }} className="message">
      <Typography variant="h5" className="n-heading">Vos email</Typography>
      <Button onClick={() => setShowMessage(false)}>Lue</Button>
      {/* TODO */}
    </Box>
  );
}

export default App;
