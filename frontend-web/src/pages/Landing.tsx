import { Button, Container } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import target from "../assets/images/target.png";
import note from "../assets/images/notebook.png";
import { Login } from "@mui/icons-material";

function Landing() {
    return (
        <Container className="landing-page">
            <div className="hero">
                <div className="greeting"><h1>Bienvenue sur Tremplin</h1></div>
                <div className="short-description"><p>Une plateforme d'apprentissage en ligne et de partage de contenu educatif</p></div>
                <Link to="/sign"><div className="sign-btn"><Button variant="contained" className="link-btn"><Login sx={{ marginRight: '8px' }} /> Se connecter</Button></div></Link>
                <div className="target-icon"><img src={target} alt="target" /></div>
                <div className="calendar-icon"><img src={note} alt="calendar" /></div>
            </div>
            <Outlet />
            {/* <Presentation /> */}
        </Container>
    );
}

function Presentation() {
    return (
        <Container className="presentation">
            <div className="block">
                {/* <img src={target} alt="image" /> */}
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, saepe dignissimos</p>
            </div>
            <div className="block">
                {/* <img src={target} alt="image" /> */}
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, saepe dignissimos</p>
            </div>
            <div className="block">
                {/* <img src={target} alt="image" /> */}
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, saepe dignissimos</p>
            </div>
        </Container>
    );
}

export default Landing;