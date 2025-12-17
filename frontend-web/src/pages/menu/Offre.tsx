import { CloseSharp } from "@mui/icons-material";
import { Container, Box, Typography, Button, Modal, Grid, Paper, TextField, IconButton } from "@mui/material";
import { useState } from "react";

function Offre() {
    const [abonnement, setAbonnement] = useState(false);
    const [offre, setOffre] = useState({
        "type": "Basique",
        "tarif": 0,
    });

    return (
        <Container className="offre-collection">
            <Typography variant="h3" className="collection-heading">Nos offres</Typography>
            <Box className="box-collection">
                <Box className="basic">
                    <Typography variant="h6" align="center" className="box-heading">Basique</Typography>
                    <Typography variant="h5" align="center" className="tarif">Ar 00000</Typography>
                    <Box className="box-content">
                        <ul>
                            <li><i className="fa-solid fa-check-circle"></i> specification</li>
                            <li><i className="fa-solid fa-check-circle"></i> specification</li>
                            <li><i className="fa-solid fa-check-circle"></i> specification</li>
                            <li><i className="fa-solid fa-times-circle"></i> specification</li>
                            <li><i className="fa-solid fa-times-circle"></i> specification</li>
                        </ul>
                    </Box>
                    <Box className="box-command"><Button variant="contained" className="btn" sx={{ width: '100%' }} onClick={() => {
                        setOffre({
                            "type": "Basique",
                            "tarif": 0
                        });
                        setAbonnement(true);
                    }}>S'abonner</Button></Box>
                </Box>
                <Box className="classic">
                    <Typography variant="h6" align="center" className="box-heading">Classique</Typography>
                    <Typography variant="h5" align="center" className="tarif">Ar 00000</Typography>
                    <Box className="box-content">
                        <ul>
                            <li><i className="fa-solid fa-check-circle"></i> specification</li>
                            <li><i className="fa-solid fa-check-circle"></i> specification</li>
                            <li><i className="fa-solid fa-check-circle"></i> specification</li>
                            <li><i className="fa-solid fa-check-circle"></i> specification</li>
                            <li><i className="fa-solid fa-times-circle"></i> specification</li>
                        </ul>
                    </Box>
                    <Box className="box-command"><Button variant="contained" className="btn" sx={{ width: '100%' }} onClick={() => {
                        setOffre({
                            "type": "Classique",
                            "tarif": 0
                        });
                        setAbonnement(true);
                    }}>S'abonner</Button></Box>
                </Box>
                <Box className="premium">
                    <Typography variant="h6" align="center" className="box-heading">Premium</Typography>
                    <Typography variant="h5" align="center" className="tarif">Ar 00000</Typography>
                    <Box className="box-content">
                        <ul>
                            <li><i className="fa-solid fa-check-circle"></i> specification</li>
                            <li><i className="fa-solid fa-check-circle"></i> specification</li>
                            <li><i className="fa-solid fa-check-circle"></i> specification</li>
                            <li><i className="fa-solid fa-check-circle"></i> specification</li>
                            <li><i className="fa-solid fa-check-circle"></i> specification</li>
                        </ul>
                    </Box>
                    <Box className="box-command"><Button variant="contained" className="btn" sx={{ width: '100%' }} onClick={() => {
                        setOffre({
                            "type": "Premium",
                            "tarif": 0
                        });
                        setAbonnement(true);
                    }}>S'abonner</Button></Box>
                </Box>
            </Box>
            {/* <Box sx={{ textAlign: 'left' }}>
                <h4>Abonnement en cours</h4>
                <h4>Expire le</h4>
            </Box> */}
            <AbonnementForm abonnement={abonnement} setAbonnement={setAbonnement} offre={offre} />
        </Container>
    );
}

function AbonnementForm({abonnement, setAbonnement, offre}: any) {
    // const setDateFormat = (day: string, month: string, year: string) => {
    //     day = day.length < 2 ? "0" + day : day;
    //     month = month.length < 2 ? "0" + month : month;
    //     return `${year}-${month}-${day}`;
    // }

    // const currentISO = () => {
    //     let date = new Date();
    //     let currentDate = setDateFormat(date.getDate().toString(), (date.getMonth() + 1).toString(), date.getFullYear().toString());
    //     return currentDate;
    // };

    const abonner = () => {
        alert("okay");
        setAbonnement(false);
    }

    return (
        <Modal open={abonnement}>
            <Grid container justifyContent={"center"} flexBasis={"column"} alignItems={"center"} height={"100vh"}>
                <Paper sx={{ width: '400px', padding: '16px 16px', borderRadius: '16px', position: 'relative'}} className="module">
                    <Typography className="module-heading" variant="h5" align="left">{offre.type}</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '100%' }}>
                        {/* <TextField type="number" label={"Frais"} sx={{ width: '100%' }} /> */}
                        <TextField type="number" label={"Montant à payer"} sx={{ width: '100%' }} value={offre.tarif} slotProps={{ htmlInput: {readOnly: true} }} />
                        <TextField type="password" label={"Entrer votre mots de passe"} sx={{ width: '100%' }} />
                        <Button variant="contained" sx={{ 
                            width: '100%',
                            textTransform: 'unset',
                            padding: '8px',
                            borderRadius: '8px'
                        }} onClick={() => abonner()}>S'abonner</Button>
                    </Box>
                    <Box sx={{ 
                        position: 'absolute',
                        right: '0px',
                        top: '0px',
                    }}>
                        <IconButton onClick={() => setAbonnement(false)}><CloseSharp sx={{ color: '#495959' }}/></IconButton>
                    </Box>
                    <p style={{ textAlign: 'center', paddingTop: '8px' }}><i className="fa-solid fa-info-circle" style={{ color: 'green' }}></i><small> Vous pouvez effectuer le paiement par mobile money</small></p>
                </Paper>
            </Grid>
        </Modal>
    );
}

export default Offre;