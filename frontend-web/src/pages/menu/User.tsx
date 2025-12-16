import { Box, Container } from "@mui/material";
import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import hat from "../../assets/images/graduation-hat.png";
import { ShareOutlined, HomeWorkOutlined, PostAddOutlined, CardGiftcardOutlined, SchoolOutlined, LibraryBooksOutlined, LogoutOutlined, CrisisAlertOutlined, PaidOutlined } from "@mui/icons-material";

function User() {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);
    const cpStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'left',
    }
    const [data, setData] = useState({
        "uid": 0,
        "profile": hat,
        "nom": "",
        "prenoms": "",
        "tel": "",
        "email": ""
    });

    useEffect(() => {
        persoData();
        setInterval(() => {
            persoData();
        }, 1000)
    }, [])

    const persoData = () => {
        const local = localStorage.getItem("client");
        if(local) {
            setData(JSON.parse(local));
        }
    }
    
    return (
        <Container className="app">
            <div className="menu">
                <div className="ambony-menu">
                    <div className="user-info">
                        <img style={{ display: data.profile == "empty" ? "none" : "block-inline" }}  src={data.profile == "empty" ? hat : data.profile} alt="profile"/>
                        <div className="name-as-a-profile" style={{ display: data.profile == "empty" ? "inherit" : "none" }}>{data.nom.toUpperCase()[0]}</div>
                        <p className="name">{data.nom} {data.prenoms}</p>
                        {/* <IconButton><EditSharp /></IconButton> */}
                    </div>
                </div>
                <Link className={currentPath == "/user" ? "nav-menu current" : "nav-menu"} onClick={() => setCurrentPath("/user")} to={"/user"}><HomeWorkOutlined /><p>Accueil</p></Link>
                <Link className={currentPath == "/user/publication" ? "nav-menu current" : "nav-menu"} onClick={() => setCurrentPath("/user/publication")} to={"/user/publication"}><ShareOutlined /><p>Publication</p></Link>
                <Link className={currentPath == "/user/catalogue" ? "nav-menu current" : "nav-menu"} onClick={() => setCurrentPath("/user/catalogue")} to={"/user/catalogue"}><PaidOutlined /><p>Catalogue</p></Link>
                <Link className={currentPath == "/user/annonce" ? "nav-menu current" : "nav-menu"} onClick={() => setCurrentPath("/user/annonce")} to={"/user/annonce"}><CrisisAlertOutlined /><p>Annonce</p></Link>
                <Link className={currentPath == "/user/cours" ? "nav-menu current" : "nav-menu"} onClick={() => setCurrentPath("/user/cours")} to={"/user/cours"}><LibraryBooksOutlined /><p>Mes cours</p></Link>
                <Link className={currentPath == "/user/offre" ? "nav-menu current" : "nav-menu"} onClick={() => setCurrentPath("/user/offre")} to={"/user/offre"}><CardGiftcardOutlined /><p>Offre</p></Link>
                <Link className={currentPath == "/user/cp" ? "nav-menu current" : "nav-menu"} onClick={() => setCurrentPath("/user/cp")} to={"/user/cp"}><SchoolOutlined /><p>Centre préparatoire</p></Link>
                <Link className={"nav-menu log-out"} to={"/"} onClick={() => localStorage.clear()} style={{ marginTop: '32px' }}><LogoutOutlined /> Se déconnecter</Link>
            </div>
            <Container className="outlet">
                <Outlet />
            </Container>
            <Box className="cp" sx={{
                position: 'fixed',
                right: '1%',
                justifyContent: 'start',
                alignItems: 'left',
                display: 'flex',
                flexDirection: 'column',
                width: '250px',
                bgcolor: '#FFFFFF',
                height: '100vh',
                zIndex: -1,
                borderRadius: '8px'
            }}>
                <Box sx={cpStyle} className="cp-list">
                    <img src={hat} alt="" style={{ width: '50px', borderRadius: '100px', margin: '8px' }} />
                    <p className="cp-name">Centre Prepa 2.0</p>
                </Box>
                <Box sx={cpStyle} className="cp-list">
                    <img src={hat} alt="" style={{ width: '50px' ,borderRadius: '100px', margin: '8px' }} />
                    <p className="cp-name">Centre Prepa</p>
                </Box>
                <Box sx={cpStyle} className="cp-list">
                    <img src={hat} alt="" style={{ width: '50px' ,borderRadius: '100px', margin: '8px' }} />
                    <p className="cp-name">Centre Prepa Rapide</p>
                </Box>
            </Box>
        </Container>
    );
}
export default User;