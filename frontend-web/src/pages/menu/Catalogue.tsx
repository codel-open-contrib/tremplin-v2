import { Box, Button, Container, Grid, IconButton, Paper, TextareaAutosize, TextField, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { Share, Close, Clear, Delete, School, ArrowCircleUp, Paid } from "@mui/icons-material";
import { Utilisateur } from "../../axios/Roles";
import axios from "axios";
import app from "../../axios/Api";
import { useNavigate } from "react-router-dom";

function Catalogue() {
    const [open, setOpen] = useState(false);
    const [catalogueList, setCatalogueList] = useState([]);
    const handleOpen = () => setOpen(true);
    const navigate = useNavigate();

    useEffect(() => {
        const data = localStorage.getItem("client");
        if(data) {
            getData();
            setInterval(() => {
                getData();
            }, 5000)
        } else {
            navigate("/sign");
        }
    }, [])

    // TODO: atao batch
    async function getData() {
        const u = new Utilisateur();
        const result = await u.obtenirListeCatalogue();
        setCatalogueList(result.data.slice(0, 3).filter((c: any) => c.moduleCours.length > 0));
    }

    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
        }}>
            {/*
            // <Box sx={{ textAlign: 'left' }}><input type="text" className="search-field"/></Box>
            // TODO: motera de resersa
            */}
            {catalogueList.map((c: any) => <CatalogueList key={c.ref} catalogue={c} />)}
            <div className="add-catalogue">
                <IconButton className="add-catalogue-btn" onClick={handleOpen}><Paid /><p>Catalogue</p></IconButton>
            </div>
            <CatalogueForm open={open} setOpen={setOpen} />
        </Container>
    );
}

export function CatalogueList({catalogue}: any) {
    // console.log("user: " + catalogue.utilisateur.profile);
    // console.log("catalogue.lienAffichage: " + catalogue.lienAffichage);
    // console.log(`catalogue: ${JSON.stringify(catalogue)}`);
    const [open, setOpen] = useState(false);
    const [uid, setUid] = useState(0);
    const [openModuleForm, setOpenModuleForm] = useState(false);

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
                <Box className="Module" sx={{
                    textAlign: 'left',
                    display: 'flex'
                }}>
                    {catalogue.moduleCours.map((module: any) => <ModuleInCatalogue key={module.idModule} module={module} />)}
                </Box>
                <div className="image" style={{ display: catalogue.lienAffichage != "empty" ? "inherit" : "none" }}>
                    <img src={catalogue.lienAffichage} alt="image" />
                </div>
                <div className="reaction">
                    <Button variant="outlined" className="react-btn" sx={{ zIndex: 1 }}>
                        <School />
                        <p> 0</p>
                    </Button>
                    <Button variant="contained" className="react-btn" sx={{ zIndex: 1 }} onClick={() => setOpenModuleForm(true)}>S'inscrire</Button>
                </div>
            </div>
            <IconButton sx={{
                position: 'absolute',
                top: "0%",
                right: "0%",
                color: "red",
                display: catalogue.utilisateur.uid == uid ? "flex" : "none"
            }} onClick={() => setOpen(true)}><Delete /></IconButton>
            <ConfirmDeteleCatalogue open={open} setOpen={setOpen} ref={catalogue.ref} />
            <SignModule openModuleForm={openModuleForm} setOpenModuleForm={setOpenModuleForm} module={catalogue.moduleCours} />
        </Container>
    );
}

function SignModule({openModuleForm, setOpenModuleForm, module}: any) {
    const setDateFormat = (day: string, month: string, year: string) => {
        day = day.length < 2 ? "0" + day : day;
        month = month.length < 2 ? "0" + month : month;
        return `${year}-${month}-${day}`;
    }

    const currentISO = () => {
        let date = new Date();
        let currentDate = setDateFormat(date.getDate().toString(), (date.getMonth() + 1).toString(), date.getFullYear().toString());
        return currentDate;
    };

    const [inscription, setInscription] = useState({
        "dateInscription": currentISO(),
        "montant": 0,
        "estPayee": false
    });

    const [choosed, setChoosed] = useState([{}]);
    const [montant, setMontant] = useState(0);

    const validerInscription = () => {
        setInscription({
            "dateInscription": currentISO(),
            "montant": montant,
            "estPayee": false
        })
    }

    useEffect(() => {
        // console.log(inscription);
        choosed.slice(1).forEach((module: any) => {
            inscrireModule(module.idModule);
        })
        setOpenModuleForm(false);
    }, [inscription])

    async function inscrireModule(idModule: number) {
        const local = localStorage.getItem("client");
        if(local) {
            // console.log(`local ${JSON.parse(local).uid}`);
            const result = await axios.post(`${app.url}inscription/${JSON.parse(local).uid}/${idModule}`, inscription);
            console.log(`inscription: ${result.data}`);
        }
        setMontant(0);
        setChoosed([{}]);
    }

    return (
        <Modal open={openModuleForm}>
            <Grid container justifyContent={"center"} flexBasis={"column"} alignItems={"center"} height={"100vh"}>
                <Paper sx={{ width: '400px', padding: '16px 16px', borderRadius: '16px', position: 'relative'}} className="module">
                    <Typography className="module-heading" variant="h5" align="left">S'inscrire à cet catalogue</Typography>
                    <Box>Choisir module: </Box>
                    <Box sx={{ padding: '0px 0px 16px 0px', lineHeight: '2rem' }}>
                        {module.map((m: any) => <ChooseModule key={m.idModule} module={m} choosed={choosed} setMontant={setMontant} />)}
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '100%' }}>
                        <TextField type="number" label={"Montant à payer"} sx={{ width: '100%' }} value={montant} slotProps={{ htmlInput: { readOnly: true } }} />
                        <TextField type="password" label={"Entrer votre mots de passe"} sx={{ width: '100%' }} />
                        <Button variant="contained" sx={{
                            width: '100%',
                            textTransform: 'unset',
                            padding: '8px',
                            borderRadius: '8px'
                        }} onClick={() => {
                            validerInscription();
                        }} disabled={choosed.length <= 1}>S'inscrire</Button>
                    </Box>
                    <Box sx={{
                        position: 'absolute',
                        right: '0px',
                        top: '0px',
                    }}>
                        <IconButton onClick={() => {
                            setChoosed([{}]);
                            setOpenModuleForm(false);
                            setMontant(0);
                        }} sx={{ backgroundColor: '#f5f5f5ff' }}><Close /></IconButton>
                    </Box>
                </Paper>
            </Grid>
        </Modal>
    );
}

function ChooseModule({module, choosed, setMontant}: any) {
    const [checked, setChecked] = useState(false);

    const chooseModule = (e: any) => {
        let selected = e.target.checked;
        if(selected) {
            choosed.push(module);
        } else {
            let i = 0;
            while(i < choosed.length) {
                if(choosed[i].idModule == module.idModule) {
                    move(i);
                    choosed.pop();
                    break;
                }
                i++;
            }
        }
        calculerMontant();
        setChecked(selected);
    }

    const move = (i: number) => {
        let j = i;
        while(j < choosed.length) {
            choosed[j] = choosed[j + 1];
            j++;
        }
    }

    const calculerMontant = () => {
        let total = 0;
        let i = 1;
        while(i < choosed.length) {
            total += choosed[i].frais;
            i++;
        }
        setMontant(total);
    }

    return (
        <Box>
            <input type="checkbox" checked={checked} onChange={chooseModule} name="module" /> <label htmlFor="module">{module.nomModule.toUpperCase()}</label>
        </Box>
    );
}

export function ConfirmDeteleCatalogue({open, setOpen, ref}: any) {
    async function supprimerCatalogue(ref: number) {
        const u = new Utilisateur();
        const res = await u.supprimerCatalogue(ref);
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
                        <h3>Supprimer cet catalogue ?</h3>
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

function CatalogueForm({open, setOpen}: any) {
    const setDateFormat = (day: string, month: string, year: string) => {
        day = day.length < 2 ? "0" + day : day;
        month = month.length < 2 ? "0" + month : month;
        return `${year}-${month}-${day}`;
    }

    const getTime = () => {
        let date = new Date();
        let hours = date.getHours().toString();
        let minutes = date.getMinutes().toString();
        hours = hours.length < 2 ? "0" + hours : hours;
        minutes = minutes.length < 2 ? "0" + minutes : minutes;
        return `${hours}:${minutes}`;
    }

    const currentISO = () => {
        let date = new Date();
        let currentDate = setDateFormat(date.getDate().toString(), (date.getMonth() + 1).toString(), date.getFullYear().toString());
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
    const [module, setModule] = useState([{ "nomModule": "" }]);
    const [tempModule, setTempModule] = useState({
        "nomModule": "",
        "frais": 0,
        "matiere": "empty"
    });
    const [isModuleDuplicate, setIsModuleDuplicate] = useState(false); // to check if a module is already exist

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
        setModule([{"nomModule": ""}]);
        setTempModule({
            "nomModule": "",
            "frais": 0,
            "matiere": tempModule.matiere
        });
    }

    async function envoyerCatalogue() {
        const u = new Utilisateur();
        // post catalogue then use its ref to post module
        const result = await u.publierCatalogue(uid, catalogue);
        // to post each module in one catalogue
        for(let i = 1; i < module.length; i++) {
            await axios.post(`${app.url}module/${result.data.ref}`, module[i]);
        }
        effacer();
        setOpen(false);
    }

    const pushModule = () => {
        module.push(tempModule);
        setTempModule({
            "nomModule": "",
            "frais": tempModule.frais,
            "matiere": tempModule.matiere
        });
        // console.log(`module: ${JSON.stringify(module)}`);
        // console.log(`tempModule: ${JSON.stringify(tempModule)}`);
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
        // console.log(`catalogue: ${JSON.stringify(catalogue)}`);
        // console.log(`module: ${JSON.stringify(module)}`);

        file == "" ? setCatalogue((c) => ({ ...c, ["lienAffichage"]: "empty" })) : getUrl(file);
    }

    const find = (nomModule: string) => {
        for(let i = 0; i < module.length; i++) {
            if(module[i].nomModule == nomModule) {
                return true;
            }
        }
        return false;
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Grid container className="add-catalogue-form-container">
                <Paper className="add-catalogue-form-paper" sx={{ width: "500px", margin: "8px"}}>
                    <Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <Typography variant="h5" align="left" className="add-catalogue-heading">Publier catalogue</Typography>
                            <TextareaAutosize value={catalogue.description} aria-label="fff" onChange={(e) => {
                                setCatalogue((att) => ({ ...att, ["description"]: e.target.value }))
                            }} placeholder="Ecriver une description" className="catalogue-description" minRows={4}></TextareaAutosize>
                            <Box>Module: {module.length - 1}</Box>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                gap: '1rem'
                            }}>
                                {module.slice(1).map((item: any) => <ModuleList module={item} key={item.nomModule} listModule={module} />)}
                            </Box>
                            <TextField variant="outlined" label="Module(Nom de l'université)"
                                value={tempModule.nomModule}
                                slotProps={{ htmlInput: { maxLength: 10 } }}
                                onChange={(e) => {
                                    if(find(e.target.value)) {
                                        setIsModuleDuplicate(true);
                                        setTempModule((t) => ({ ...t, ["nomModule"]: e.target.value}));
                                    } else {
                                        setIsModuleDuplicate(false);
                                        setTempModule((t) => ({ ...t, ["nomModule"]: e.target.value}));
                                    }
                                }}
                                error={isModuleDuplicate}
                                helperText={
                                    isModuleDuplicate 
                                        ? <><i className="fa-solid fa-exclamation-circle" style={{ paddingRight: '4px' }}></i>Le module que vous avez saisi existe déjà</>
                                        : ""
                                }
                            />
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '0.5rem',
                                width: '100%'
                             }}>
                                <TextField variant="outlined" label="Frais d'inscription"
                                    value={tempModule.frais}
                                    type="number"
                                    slotProps={{ htmlInput: { maxLength: 10 } }}
                                    onChange={(e) => {
                                        if(parseInt(e.target.value)) {
                                            setTempModule((t) => ({ ...t, ["frais"]: parseInt(e.target.value)}));
                                        } else {
                                            setTempModule((t) => ({ ...t, ["frais"]: 0}));
                                        }
                                    }}
                                    disabled={tempModule.nomModule == "" || isModuleDuplicate ? true : false }
                                    sx={{ textAlign: 'right', width: '90%' }}
                                />
                                <TextField variant="outlined"
                                    value={"Ariary"}
                                    type="text"
                                    disabled={true}
                                />
                            </Box>
                            <Button disabled={tempModule.nomModule == "" ? true : false} variant="contained" onClick={() => { pushModule() }} sx={{ padding: '8px', borderRadius: '8px' }} className="pushUp"><ArrowCircleUp /></Button>
                            <Box sx={{ display: catalogueImage == "null" ? "none" : "inline" }}>
                                <img src={catalogueImage} className="catalogue-img" alt="catalogue" />
                            </Box>
                            <Box className="media-file">
                                <label htmlFor="catalogue-img"><i className="fa-solid fa-image"></i></label>
                                <input type="file" accept="image/*" id="catalogue-img" onChange={handleCatalogueImage}/>
                                {/* TODO: raha ilaina ny video
                                <label htmlFor="catalogue-video"><i className="fa-solid fa-video"></i></label>
                                <input type="file" name="profile-img" /> 
                                */}
                            </Box>
                            <Button variant="contained" className="publier-btn" onClick={publier} disabled={
                                catalogue.description == "" ||
                                module.length <= 1
                                ? true
                                : false
                            }><Share sx={{ marginRight: '4px' }}/> Publier</Button>
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

export function ModuleInCatalogue({module}: any) {
    return (
        <Box>
            <Button color="primary">{module.nomModule}</Button>
        </Box>
    );
}

function ModuleList({module, listModule}: any) {
    const removeModule = (moduleToDelete: any) => {
        let i = 1;
        while(i < listModule.length) {
            if(listModule[i].nomModule == moduleToDelete.nomModule) {
                move(i);
                listModule.pop();
                break;
            }
            i++;
        }
    }

    const move = (i: number) => {
        let j = i;
        while(j < module.length) {
            module[j] = module[j + 1];
            j++;
        }
    }

    return (
        <Box sx={{
            border: '1px solid rgba(0,0,0,0.5)',
            margin: '2px',
            padding: '8px',
            width: '100%',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between'
        }}>
            <Button color="secondary">{module.nomModule}</Button>
            {/* <Button color="secondary">{module.matiere}</Button> */}
            <Button color="secondary">{module.frais} <p>Ar</p></Button>
            <IconButton color="secondary" onClick={() => { removeModule(module) }}><Delete /></IconButton>
        </Box>
    );
}

export default Catalogue;