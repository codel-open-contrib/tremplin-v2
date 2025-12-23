import { Box, Button, Container, Grid, IconButton, Paper, TextareaAutosize, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { Share, Close, Clear, Delete, School, ShareRounded } from "@mui/icons-material";
import { Utilisateur } from "../../axios/Roles";
import axios from "axios";
import app from "../../axios/Api";
import { useNavigate } from "react-router-dom";

function Publication() {
    const [open, setOpen] = useState(false);
    const [catalogueList, setCatalogueList] = useState([]);
    const handleOpen = () => setOpen(true);
    const navigate = useNavigate();
    const [limit, setLimit] = useState(2);

    useEffect(() => {
        const data = localStorage.getItem("client");
        if(data) {
            getData();
            setInterval(() => {
                getData();
            }, 3000)
        } else {
            navigate("/sign");
        }
    }, [limit])

    async function getData() {
        const u = await axios.get(app.url + `catalogue`);
        // setCatalogueList(u.data.slice(0, limit).filter((c: any) => c.moduleCours.length == 0));
        setCatalogueList(u.data.filter((c: any) => c.moduleCours.length == 0));
    }

    // window.onscroll = () => {
    //     // alert("scroll detected");
    //     // console.log(`window.innerHeight: ${window.innerHeight}`);
    //     // console.log(`window.scrollY: ${window.innerHeight}`);
    //     // console.log(`document.body.offsetHeight: ${document.body.offsetHeight}`);
    //     if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
    //         setLimit(limit + 1);
    //     }
    // }

    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
        }}>
            {/* 
            // <Box sx={{ textAlign: 'left' }}><input type="text" className="search-field"/></Box> 
            // TODO: motera de resersa
            */}
            {catalogueList.map((c: any) => <CatalogueList key={c.ref} catalogue={c} />)}
            <div className="add-catalogue">
                <IconButton className="add-catalogue-btn" onClick={handleOpen}><ShareRounded /><p>Catalogue</p></IconButton>
            </div>
            <PublicationForm open={open} setOpen={setOpen} />
        </Container>
    );
}

function CatalogueList({catalogue}: any) {
    const [open, setOpen] = useState(false);
    const [uid, setUid] = useState(0);

    useEffect(() => {
        const local = localStorage.getItem("client");
        if(local) {
            setUid(JSON.parse(local).uid);
        }
    }, [])
    
    return (
        <Container className="catalogue" sx={{ position: 'relative' }}>
            <div className="box-heading">
                <div className="default-profile" style={{ display: catalogue.utilisateur.profile == "empty" ? "inherit" : "none" }}>{catalogue.utilisateur.nom[0]}</div>
                <img style={{ display: catalogue.utilisateur.profile == "empty" ? "none" : "inherit" }} src={catalogue.utilisateur.profile} alt="profile" className="profile-image" />
                <p className="profile" style={{ display: catalogue.utilisateur.profile == "null" ? "inherit" : "none"}}></p>
                <div className="profile-name">
                    <p className="name">{catalogue.utilisateur.nom} {catalogue.utilisateur.prenoms}</p>
                    <p className="date-time"><small>{catalogue.date.split('-').reverse().join('/')}, {catalogue.temps}</small></p>
                </div>
            </div>
            <div className="box-content">
                <div className="description">
                    <div dangerouslySetInnerHTML={{ __html: catalogue.description}}></div>
                </div>
                <div className="image" style={{ display: catalogue.lienAffichage != "empty" ? "inherit" : "none" }}>
                    <img src={catalogue.lienAffichage} alt="image" />
                </div>
                <div className="reaction">
                    <Button variant="outlined" className="react-btn" sx={{ zIndex: 1 }}>
                        <School />
                        <p> 0</p>
                    </Button>
                    {/* <Button variant="contained" className="sign-up-btn" sx={{ zIndex: -1 }}><small>S'inscrire</small></Button> */}
                </div>
            </div>
            <IconButton sx={{ 
                position: 'absolute',
                top: "0%",
                right: "0%",
                color: "red",
                display: catalogue.utilisateur.uid == uid ? "flex" : "none"
            }} onClick={() => setOpen(true)}><Delete /></IconButton>
            <ConfirmDetelePublication open={open} setOpen={setOpen} ref={catalogue.ref} />
        </Container>
    );
}

function ConfirmDetelePublication({open, setOpen, ref}: any) {
    async function supprimerCatalogue(ref: number) {
        const u = new Utilisateur();
        const res = await u.supprimerCatalogue(ref);
        console.log(res.data);
        if(res.data) {
            setOpen(false);
        }
    }
    
    return (
        <Modal
            open={open}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Container className="modal-container">
                <Box className="delete-modal">
                    <Box className="heading">
                        <IconButton><Delete sx={{ fontSize: '3rem', color: 'red' }} /></IconButton>
                        <h3>Supprimer une publication ?</h3>
                    </Box>
                    <Box className="content"><p>La suppression est irreversible</p></Box>
                    <Box className="confirm">
                        <Button onClick={() => supprimerCatalogue(ref)} className="delete-btn"><Delete /> Confirmer</Button>
                        <Button onClick={() => setOpen(false)} className="exit-modal"><Clear /> Annuler</Button>
                    </Box>
                </Box>
            </Container>
        </Modal>
    );
}

function PublicationForm({open, setOpen}: any) {
    const setDateFormat = (day: string, month: string, year: string) => {
        day = day.length < 2 ? "0" + day : day;
        month = month.length < 2 ? "0" + month : month;
        return `${year}-${month}-${day}`;
    }

    const getTime = () => {
        const date = new Date();
        let hours = date.getHours().toString();
        let minutes = date.getMinutes().toString();
        hours = hours.length < 2 ? "0" + hours : hours;
        minutes = minutes.length < 2 ? "0" + minutes : minutes;
        return `${hours}:${minutes}`;
    }

    const currentISO = () => {
        const date = new Date();
        const currentDate = setDateFormat(date.getDate().toString(), (date.getMonth() + 1).toString(), date.getFullYear().toString());
        return currentDate;
    }
    const [catalogueImage, setCatalogueImage] = useState("null");
    const [uid, setUid] = useState(0);
    const [catalogue, setCatalogue] = useState({
        "description": "",
        "lienAffichage": "",
        "formatAffichage": "image",
        "date": currentISO(),
        "temps": getTime()
    })

    const [file, setFile] = useState("");

    const handleClose = () => setOpen(false);

    const handleCatalogueImage = (e: any) => {
        const file = e.target.files[0];
        setCatalogueImage(URL.createObjectURL(file));
        setFile(e.target.files[0]);
    }

    useEffect(() => {
        const local = localStorage.getItem("client");
        if(local) {
            setUid(JSON.parse(local).uid);
        }
    }, [])

    useEffect(() => {
        if(catalogue.lienAffichage != "") {
            envoyerCatalogue();
        }
    }, [catalogue.lienAffichage])

    const effacer = () => {
        setCatalogueImage("null");
        setFile("");
        setCatalogue({
            "description": "",
            "lienAffichage": "",
            "formatAffichage": "image",
            "date": "",
            "temps": ""
        });
    }

    async function envoyerCatalogue() {
        const u = new Utilisateur();
        await u.publierCatalogue(uid, catalogue);
        effacer();
        setOpen(false);
    }

    async function getUrl(file: any) {
        const formData = new FormData();
        formData.append('file', file);

        const result = await axios.post(app.url + "files", formData);
        setCatalogue((c) => ({ ...c, ["lienAffichage"]: result.data.url }));
    }

    const publier = () => {
        setCatalogue((c) => ({ ...c, ["date"]: currentISO() }));
        setCatalogue((c) => ({ ...c, ["temps"]: getTime() }));
        setCatalogue((c) => ({ ...c, ["description"]: catalogue.description.replace(/\n/g, '<br/>') }));
        if(file == "") {
            setCatalogue((c) => ({ ...c, ["lienAffichage"]: "empty" }));
        } else {
            getUrl(file);
        }
        // console.log(`setFile: ${file}`);
        // console.log(`catalogue: ${JSON.stringify(catalogue)}`);
    }
    return (
        <Modal open={open} onClose={handleClose}>
            <Grid container className="add-catalogue-form-container">
                <Paper className="add-catalogue-form-paper" sx={{ width: "500px", margin: "8px"}}>
                    <Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Typography variant="h5" align="left" className="add-catalogue-heading">Effectuer une publication</Typography>
                            <TextareaAutosize value={catalogue.description} onChange={(e) => {
                                setCatalogue((att) => ({ ...att, ["description"]: e.target.value }))
                            }} placeholder="Ecriver une description" className="catalogue-description" minRows={4}></TextareaAutosize>
                            {/* <Box>Module: {module.length}</Box>
                            <Box>{module}</Box>
                            <TextField variant="outlined" label="Module"/> 
                            <Button variant="contained"><ArrowCircleUp /></Button> */}
                            <Box sx={{ display: catalogueImage == "null" ? "none" : "inline" }}>
                                <img src={catalogueImage} className="catalogue-img" alt="catalogue" />
                            </Box>
                            <Box className="media-file">
                                <label htmlFor="catalogue-img"><i className="fa-solid fa-image"></i></label>
                                <input type="file" accept="image/*" id="catalogue-img" onChange={handleCatalogueImage}/>
                                {/* <label htmlFor="profile-img"><i className="fa-solid fa-video"></i></label>
                                <input type="file" name="profile-img" /> */}
                            </Box>
                        <Button variant="contained" className="publier-btn" onClick={publier} disabled={catalogue.description == "" ? true : false}><Share /> Publier</Button>
                        <Button variant="outlined" className="clear-catalogue-btn" onClick={effacer}><Clear /> <p>Effacer</p></Button>
                        </Box>
                        <Box className="exit-catalogue" sx={{
                            position: 'absolute',
                            right: '0px',
                            top: '0px'
                        }}>
                            <IconButton onClick={() => {
                                effacer();
                                handleClose()
                            }} sx={{ backgroundColor: '#f5f5f5ff' }}><Close /></IconButton>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
        </Modal>
    );
}

export default Publication;