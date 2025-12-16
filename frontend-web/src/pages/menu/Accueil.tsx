import { ArrowCircleRight, Delete, Paid, School, ShareRounded, VerifiedUser } from "@mui/icons-material";
import { Box, Button, Container, IconButton, Typography } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { Utilisateur } from "../../axios/Roles";
import { ConfirmDeteleCatalogue } from "./Catalogue";

function Accueil() {
    const [catalogue, setCatalogue] = useState([]);
    const [catalogueCounter, setCatalogueCounter] = useState(0);
    const [publicationCounter, setPublicationCounter] = useState(0);
    const [inscritCounter, setInscritCounter] = useState(0);
    const [viewCatalogue, setViewCatalogue] = useState(false);
    const [ref, setRef] = useState(0);
    const [catalogueToView, setCatalogueToView] = useState({
        "utilisateur" : {
            "profile": "empty",
            "nom": "",
            "prenoms": "",
        },
        "date": "",
        "temps": "",
        "description": "",
        "lienAffichage": "empty",
    });

    useEffect(() => {
        const local = localStorage.getItem("client");
        if(local != null) {
            getData(JSON.parse(local).uid);
        }
    }, [])

    async function getData(uid: number) {
        const u = new Utilisateur();
        const result = await u.obtenirUtilisateur(uid);
        const mesCatalogues = result.data.catalogues;
        setCatalogue(mesCatalogues);
        setWidgetValue(mesCatalogues);
    }

    async function setWidgetValue(catalogue: any) {
        const u = new Utilisateur();
        let publicationCounter = 0;
        let catalogueCounter = 0;
        for(let i = 0; i < catalogue.length; i++) {
            const result = await u.obtenirCatalogue(catalogue[i].ref);
            result.data.moduleCours.length == 0 ? publicationCounter++ : catalogueCounter++;
        }
        setPublicationCounter(publicationCounter);
        setCatalogueCounter(catalogueCounter);
    }

    useEffect(() => {
        if(ref != 0) {
            getCatalogueToView(ref);
        }
    }, [ref])

    async function getCatalogueToView(ref:number) {
        const u = new Utilisateur();
        const r = await u.obtenirCatalogue(ref);
        setCatalogueToView(r.data);
        setViewCatalogue(true);
    }

    return (
        <Box display={"flex"} flexDirection={"column"} alignItems={"left"} justifyContent={"left"} className="dashboard">
            <Typography variant="h4" className="dashboard-heading" align="left">Bienvenue sur votre tableau de bord</Typography>
            <Box className="dashboard-widgets" display={"flex"} flexDirection={"row"} justifyContent={"center"} alignItems={"center"}>
                <Box className="widget">
                    <p className="widget-title">Publication</p>
                    <h3 className="widget-value"><ShareRounded /> {publicationCounter}</h3>
                </Box>
                <Box className="widget">
                    <p className="widget-title">Catalogue</p>
                    <h3 className="widget-value"><Paid /> {catalogueCounter}</h3>
                </Box>
                <Box className="widget">
                    <p className="widget-title">Inscrit</p>
                    <h3 className="widget-value"><VerifiedUser /> {inscritCounter}</h3>
                </Box>
            </Box>
            <Typography variant="h5" className="dashboard-heading" align="left" marginTop={"8px"}>Vos catalogues</Typography>
            <TableContainer component={Paper} className="table" sx={{ marginTop: '8px', boxShadow: 'none', display: catalogue.length > 0 ? "inherit" : "none" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className="table-heading">Catalogue</TableCell>
                            <TableCell className="table-heading">Date de publication</TableCell>
                            <TableCell className="table-heading">Inscrits</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {catalogue.map((item: any) => <Catalogues key={item.ref} catalogue={item} setRef={setRef} />)}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{display: catalogue.length > 0 ? "none" : "flex"}}>
                <CatalogueVide />
            </Box>
            {/* <Typography variant="h5" className="dashboard-heading" align="left" marginTop={"8px"}>Vos publications</Typography>
            <TableContainer component={Paper} className="table" sx={{ marginTop: '8px', boxShadow: 'none', display: catalogue.length > 0 ? "inherit" : "none" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className="table-heading">Publication</TableCell>
                            <TableCell className="table-heading">Date de publication</TableCell>
                            <TableCell className="table-heading">Réactions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {catalogue.map((item: any) => <Publications key={item.ref} catalogue={item} />)}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{display: catalogue.length > 0 ? "none" : "flex"}} >
                <PublicationVide />
            </Box> */}

            {/* <TableContainer component={Paper} className="table" sx={{ marginTop: '32px', boxShadow: 'none' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className="table-heading">Nom et Prenoms</TableCell>
                            <TableCell className="table-heading">Email</TableCell>
                            <TableCell className="table-heading">Téléphone</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {utilisateur.map((inscrit: any) => <Inscrits key={inscrit.uid} inscrit={inscrit} />)}
                    </TableBody>
                </Table>
            </TableContainer> */}
            <ViewCatalogue catalogue={catalogueToView} viewCatalogue={viewCatalogue} setViewCatalogue={setViewCatalogue} />
        </Box>
    );
}

function CatalogueVide() {
    return (
        <p className="catalogue-vide">Vous n'avez pas encore des catalogues</p>
    );
}

/*
function PublicationVide() {
    return (
        <p className="catalogue-vide">Vous n'avez pas encore des publications</p>
    );
}
*/

function Catalogues({catalogue, setRef}: any) {
    const [isCatalogue, setIsCatalogue] = useState(false);

    useEffect(() => {
        checkCatalogue(catalogue.ref)
    }, [])

    async function checkCatalogue(ref: number) {
        const u = new Utilisateur();
        const result = await u.obtenirCatalogue(ref);
        result.data.moduleCours.length > 0 ? setIsCatalogue(true) : setIsCatalogue(false) ;
    }

    return (
        <TableRow sx={{ display: isCatalogue ? "block-inline" : "none" }}>
            <TableCell>{catalogue.ref}</TableCell>
            <TableCell>{catalogue.date.split('-').reverse().join('/')}</TableCell>
            <TableCell>0</TableCell>
            <TableCell><IconButton onClick={() => setRef(catalogue.ref)}><ArrowCircleRight sx={{ color: 'green' }} /></IconButton></TableCell>
        </TableRow>
    );
}
/*
function Publications({catalogue}: any) {
    const [isPublication, setIsPublication] = useState(false);

    useEffect(() => {
        checkCatalogue(catalogue.ref)
    }, [])

    async function checkCatalogue(ref: number) {
        const u = new Utilisateur();
        const result = await u.obtenirCatalogue(ref);
        result.data.moduleCours.length == 0 ? setIsPublication(true) : setIsPublication(false) ;
    }

    return (
        <TableRow sx={{ display: isPublication ? "block-inline" : "none" }}>
            <TableCell>{catalogue.ref}</TableCell>
            <TableCell>{catalogue.date.split('-').reverse().join('/')}</TableCell>
            <TableCell>0</TableCell>
            <TableCell><IconButton><ArrowCircleRight className="" /></IconButton></TableCell>
        </TableRow>
    );
}
*/

function Inscrits({inscrit}: any) {
    return (
        <TableRow>
            <TableCell>{inscrit.nom} {inscrit.prenom}</TableCell>
            <TableCell>{inscrit.email}</TableCell>
            <TableCell>{inscrit.tel}</TableCell>
            <TableCell><IconButton><ArrowCircleRight /></IconButton></TableCell>
        </TableRow>
    );
}

function ViewCatalogue({catalogue, viewCatalogue, setViewCatalogue}: any) {
    const [open, setOpen] = useState(false);
    return (
        <Container className="catalogue" sx={{ position: 'relative', display: viewCatalogue ? "inline" : "none", marginTop: '36px' }}>
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
                <Box className="Module" sx={{
                    textAlign: 'left',
                    display: 'flex'
                }}>
                    
                </Box>
                <div className="image" style={{ display: catalogue.lienAffichage != "empty" ? "inherit" : "none" }}>
                    <img src={catalogue.lienAffichage} alt="image" />
                </div>
                <div className="reaction">
                    <Button variant="outlined" className="react-btn" sx={{ zIndex: 1 }}>
                        <School />
                        <p> 0</p>
                    </Button>
                </div>
            </div>
            <IconButton sx={{
                position: 'absolute',
                top: "0%",
                right: "0%",
                color: "red",
            }} onClick={() => setOpen(true)}><Delete /></IconButton>
            <ConfirmDeteleCatalogue open={open} setOpen={setOpen} ref={catalogue.ref} />
            {/* <SignModule openModuleForm={openModuleForm} setOpenModuleForm={setOpenModuleForm} module={catalogue.moduleCours} /> */}
        </Container>
    );
}

export default Accueil;