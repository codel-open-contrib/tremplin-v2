import { Box, TextField, Button, Grid, Paper, Typography, IconButton, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Utilisateur } from "../../axios/Roles";
import { CloseSharp, Google, School } from "@mui/icons-material";
import { Modal } from "@mui/material";
import axios from "axios";
import { z } from 'zod';
import app from "../../axios/Api";
import { style } from '../menu/Theme';

function Form() {
    const [signInForm, setSignInForm] = useState(true);
    const [signUpForm, setSignUpForm] = useState(false);
    const navigate = useNavigate();
    // const [open, setOpen] = useState(true);
    // const handleClose = () => setOpen(false);
    
    useEffect(() => {
        const local =  localStorage.getItem("client");
        if(local) {
            navigate("/user");
        }
    }, [])

    useEffect(() => {
        signInForm ? setSignUpForm(false) : setSignUpForm(true) ;
    }, [signInForm])

    useEffect(() => {
        signUpForm ? setSignInForm(false) : setSignInForm(true) ;
    }, [signUpForm])
    
    return (
        <Modal 
            open={true}
            // onClose={handleClose}
            sx={{ overflowY: 'scroll' }}
        >
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <SignIn signInForm={signInForm} setSignInForm={setSignInForm} />
                <SignUp signUpForm={signUpForm} setSignUpForm={setSignUpForm} />
            </Box>
        </Modal>
    );
}
const min = 1;
const max = 50;
const schema = z.object({
    email: z.email("Correcte email: example@gmail.com"),
    mdp: z.string().min(8, `8 caractères au minimum`),
    nom: z.string().min(min, `Veuillez saisir votre nom, `).max(max, `${max} caractères au maximum, `).regex(/^[a-zA-Z ]+$/, `Entrer un nom sans autres caractères que des lettres`),
    prenoms: z.string().min(min, `Veuillez saisir votre prenoms, `).max(max, `${max} caractères au maximum, `).regex(/^[a-zA-Z ]+$/, `Entrer un prenom(s) sans autres caractères que des lettres`),
    tel: z.string().min(10, `10 caractères au minimum, `).max(13, `13 caractère maximum`).regex(/^[+]{1}[0-9]+$/, `Entrer votre numero téléphone`),
    date: z.string().regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)
})

function SignIn({signInForm, setSignInForm}: any) {
    const [login, setLogin] = useState({email: "", mdp: ""});
    const [checker, updateChecker] = useState({
        email: schema.shape.email.safeParse("example@gmail.com"), 
        mdp: schema.shape.mdp.safeParse("thierry12345678")
    });
    const [errors, setErrors] = useState({
        "email": false,
        "mdp": false
    })
    const navigate = useNavigate();
    const validateForm = () => {
        const u = new Utilisateur();
        u.seConnecter(login.email, login)
        .then((r) => {
            if(!r.data.errors.email && !r.data.errors.mdp) {
                // console.log(r.data.data);
                localStorage.setItem("client", JSON.stringify(r.data.data));
                navigate("/user");
            } else {
                setErrors(r.data.errors)
            }
        })
        .catch((e) => console.log(e))
    };
    const getErrorMessage = (field: any) =>  {
        return field.error.flatten().formErrors;
    };

    return (
        <Grid container display={signInForm ? "inherit" : "none"} justifyContent={"center"} alignItems={"center"} className="form sign-in">
            <Paper sx={{ width: '400px', padding: '24px 16px', borderRadius: '20px', boxShadow: "none", position: 'relative' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h5" align="center" className="form-heading" sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                    }}><School sx={{ fontSize: '3rem'}} /> Connexion</Typography>
                    <TextField label="Email" type="email" variant="outlined" required color="primary"
                        // sx={{
                        //     '& .MuiOutlinedInput-root': {
                        //         '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        //             // borderColor: ,
                        //         },
                        //     }
                        // }}
                        value={login.email}
                        slotProps={{ htmlInput: { maxLength: 50 } }}
                        onChange={(e) => {
                            setLogin({
                                email: e.target.value,
                                mdp: login.mdp
                            });
                            updateChecker({
                                email: schema.shape.email.safeParse(e.target.value),
                                mdp: checker.mdp
                            });
                        }}
                        error={checker.email.success == false ? true : false}
                        helperText={
                        checker.email.success == false 
                            ? <><i className="fa-solid fa-exclamation-circle" style={{ paddingRight: '4px' }}></i>{ getErrorMessage(checker.email) }</>
                            : ""
                        }
                    />
                    <p style={{ color: '#c90e0eff', display: errors.email ? "inherit" : "none" }}><small><i className="fa-solid fa-exclamation-circle" style={{ paddingRight: '4px' }}></i>Compte introuvable</small></p>
                    <TextField label="Mots de passe" type="password" variant="outlined" required color="primary"
                        value={login.mdp}
                        slotProps={{ htmlInput: { maxLength: 50 } }}
                        onChange={(e) => {
                            updateChecker({
                                email: checker.email,
                                mdp: schema.shape.mdp.safeParse(e.target.value)
                            });
                            setLogin({
                                email: login.email,
                                mdp: e.target.value
                            });
                        }}
                        error={checker.mdp.success == false ? true : false}
                        helperText={
                        checker.mdp.success == false 
                            ? <><i className="fa-solid fa-exclamation-circle" style={{ paddingRight: '4px' }}></i>{ getErrorMessage(checker.mdp) }</>
                            : ""
                        }
                    />
                    <p style={{ color: '#b82323ff', display: (!errors.email && errors.mdp) ? "inherit" : "none" }}><small><i className="fa-solid fa-exclamation-circle" style={{ paddingRight: '4px' }}></i>Mots de passe incorrectes pour <i>{login.email}</i></small></p>
                    <Button type="submit" disabled={
                        checker.email.success == checker.mdp.success && checker.mdp.success &&
                        login.email.length != 0 && login.mdp.length != 0
                        ? false
                        : true
                    } onClick={validateForm} variant="contained" sx={{ padding: '12px' }} className="submit-btn" color="primary"><i className="fa-solid fa-sign-in" style={{ padding: '8px' }}></i> Se connecter</Button>
                    <div className="form-footer"><p>Pas de compte ?</p> <button onClick={() => setSignInForm(false)}>S'inscrire</button></div>
                </Box>
                <Box sx={{ 
                    position: 'absolute',
                    right: '0px',
                    top: '0px',
                }}>
                    <Link to={"/"}><IconButton sx={{ color: '#495959', backgroundColor: '#f5f5f5ff' }}><CloseSharp sx={{ color: style.primaryColor }}/></IconButton></Link>
                </Box>
            </Paper>
        </Grid>
    );
}

function SignUp({signUpForm, setSignUpForm}: any) {
    const setDateFormat = (day:string, month:string, year:string) => {
        day = day.length < 2 ? "0" + day : day;
        month = month.length < 2 ? "0" + month : month;
        return `${year}-${month}-${day}`;
    }

    const currentISO = () => {
        let date = new Date();
        let currentDate = setDateFormat(date.getDate().toString(), (date.getMonth() + 1).toString(), date.getFullYear().toString());
        return currentDate;
    }

    const [utilisateur, setUtilisateur] = useState({
        "uid": 0,
        "nom": "",
        "prenoms": "",
        "tel": "",
        "email": "",
        "dateNaissance": currentISO(), // yyyy-MM-dd #ohatra: 28/09/2004 => 2004-09-28
        "mdp": "",
        "role": "Etudiant",
        "profile": "",
    })

    const [dateError, setDateError] = useState(false);

    useEffect(() => {
        // console.log(`USER: ${utilisateur.dateNaissance} CURR_ISO: ${currentISO()}`);
        utilisateur.dateNaissance < currentISO() ? setDateError(false) : setDateError(true)
    }, [utilisateur])
    
    const getErrorMessage = (field: any) =>  {
        return field.error.flatten().formErrors;
    };
    
    const [checker, updateChecker] = useState({
        "nom": schema.shape.nom.safeParse("Koto"),
        "prenoms": schema.shape.prenoms.safeParse("Kely"),
        "tel": schema.shape.tel.safeParse("+2610000000"),
        "email": schema.shape.email.safeParse("exemple@gmail.com"),
        "mdp": schema.shape.mdp.safeParse("gjadsdksa7"),
        "date": schema.shape.date.safeParse(utilisateur.dateNaissance)
    });
    
    // const [age, setAge] = useState();
    const [mdpConfirmation, setMdpConfirmation] = useState("");
    const [profilePicture, setProfilePicture] = useState("null");
    const [step, setStep] = useState(1);
    const [isDuplicate, setIsDuplicate] = useState({
        email: utilisateur.email,
        duplicate: false
    });
    const navigate = useNavigate();
    
    // const signUp = () => {
    //     const u = new Utilisateur();
    //     u.creerCompte(utilisateur)
    //     .then((r) => { console.log(r.data) })
    //     .catch((e) => console.log(e))
    // }
    
    const [file, setFile] = useState("");
    const handleProfilePicture = (e: any) => {
        setFile(e.target.files[0]);
        setProfilePicture(URL.createObjectURL(e.target.files[0]));
    }
    useEffect(() => {
        if(utilisateur.profile != "") {
            signUp();
        }
    }, [utilisateur.profile])

    async function signUp() {
        const u = new Utilisateur();
        const result =  await u.creerCompte(utilisateur);
        const singIn = {
            "email": result.data.email,
            "mdp": result.data.mdp
        }
        const userInfo = await u.seConnecter(result.data.email, singIn);
        // console.log(`inscrit ${JSON.stringify(result.data)}`);
        // console.log(`connect ${JSON.stringify(userInfo.data.data)}`);
        localStorage.setItem("client", JSON.stringify(userInfo.data.data));
        navigate("/user");
    }

    async function getUrl(file: any) {
        const formData = new FormData();
        formData.append('file', file);

        const result = await axios.post(app.url + "files", formData);

        setUtilisateur((att) => ({ ...att, ["profile"]: result.data.url }));
    }

    const uploadFile = () => {
        if(file != "") {
            getUrl(file);
        } else {
            // console.log(utilisateur);
            setUtilisateur((att) => ({ ...att, ["profile"]: "empty" }));
        }
    }

    const checkExistingEmail = () => {
        const u = new Utilisateur();
        u.existe(utilisateur.email)
        .then((r) => {
            setIsDuplicate({
                email: utilisateur.email,
                duplicate: r.data
            });
            if(!r.data) {
                setStep(2);
            }
        })
        .catch((e) => console.log())
    }

    return (
        <Grid display={signUpForm ? "inherit" : "none"} container justifyContent={"center"} alignItems={"start"} className="form sign-up">
            <Paper sx={{ position: 'relative', width: '400px', padding: '24px 16px', borderRadius: '20px', boxShadow: "none" }}>
                <Box sx={{ display: step == 1 ? "flex": "none", flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h5" align="center" className="form-heading" sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                    }}><School sx={{ fontSize: '3rem'}} /> Inscription</Typography>
                    <Box>
                        <Button variant="contained" sx={{ width: '33.3%' }} className="progress-btn current"></Button>
                        <Button variant="outlined" sx={{ width: '33.3%' }} className="progress-next"></Button>
                        <Button variant="outlined" sx={{ width: '33.3%' }} className="progress-next"></Button>
                    </Box>
                    <TextField label="Nom" required color="primary"
                        type="text"
                        value={utilisateur.nom}
                        slotProps={{ htmlInput: { minLength: {min}, maxLength: {max} } }}
                        onChange={(e) => {
                            setUtilisateur((att) => ({ ...att, ["nom"]: e.target.value[e.target.value.length - 1] == e.target.value[e.target.value.length - 2] && e.target.value[e.target.value.length - 1] == ' ' ? utilisateur.nom : e.target.value}));
                            updateChecker((ch) => ({ ...ch, ["nom"]: schema.shape.nom.safeParse(e.target.value) }));
                            // console.log(utilisateur.nom);
                        }}
                        error={checker.nom.success == false ? true : false}
                        helperText={
                        checker.nom.success == false 
                            ? <><i className="fa-solid fa-exclamation-circle" style={{ paddingRight: '4px' }}></i>{ getErrorMessage(checker.nom) }</>
                            : ""
                        }
                    />
                    <TextField label="Prenoms" required color="primary"
                        type="text"
                        value={utilisateur.prenoms}
                        slotProps={{ htmlInput: { minLength: {min}, maxLength: {max} } }}
                        onChange={(e) => {
                            setUtilisateur(att => ({ ...att, ["prenoms"]: e.target.value }));
                            updateChecker((ch) => ({ ...ch, ["prenoms"]: schema.shape.nom.safeParse(e.target.value) }));
                        }}
                        error={checker.prenoms.success == false ? true : false}
                        helperText={
                        checker.prenoms.success == false 
                            ? <><i className="fa-solid fa-exclamation-circle" style={{ paddingRight: '4px' }}></i>{ getErrorMessage(checker.prenoms) }</>
                            : ""
                        }
                    />
                    <label htmlFor="date">Entrer votre date de naissance</label>
                    <TextField required color="primary"
                        type="date"
                        value={utilisateur.dateNaissance}
                        onChange={(e) => {
                            setUtilisateur(att => ({ ...att, ["dateNaissance"]: e.target.value }));
                        }}
                        helperText={
                            (dateError)
                            ? <><span style={{ color: 'green' }}><i className="fa-solid fa-info-circle"></i> Entrer une date de naissance exacte</span></>
                            : ""
                        }
                        id="date"
                    />
                    <TextField label="Téléphone" required color="primary"
                        type="tel"
                        slotProps={{ htmlInput: { minLength: 10, maxLength: 13 } }}
                        value={utilisateur.tel}
                        onChange={(e) => {
                            setUtilisateur(att => ({ ...att, ["tel"]: e.target.value.trim() }));
                            updateChecker((ch) => ({ ...ch, ["tel"]: schema.shape.tel.safeParse(e.target.value.trim()) }));
                        }}
                        error={checker.tel.success == false ? true : false}
                        helperText={
                        checker.tel.success == false 
                            ? <><i className="fa-solid fa-exclamation-circle" style={{ paddingRight: '4px' }}></i>{ getErrorMessage(checker.tel) }</>
                            : ""
                        }
                    />
                    <TextField label="Email" required color="primary"
                        type="email"
                        value={utilisateur.email}
                        onChange={(e) => {
                            setUtilisateur(att => ({ ...att, ["email"]: e.target.value.trim() }));
                            updateChecker((ch) => ({ ...ch, ["email"]: schema.shape.email.safeParse(e.target.value) }));
                        }}
                        error={checker.email.success == false ? true : false}
                        helperText={
                        checker.email.success == false 
                            ? <><i className="fa-solid fa-exclamation-circle" style={{ paddingRight: '4px' }}></i>{ getErrorMessage(checker.email) }</>
                            : ""
                        }
                    />
                    <p style={{ color: '#b82323ff', display: isDuplicate.duplicate ? "inline" : "none" }}><small><i className="fa-solid fa-exclamation-circle" style={{ paddingRight: '4px' }}></i><i>{isDuplicate.email}</i> appartient déjà à un autre utilisateur, veuillez entrer un autre</small></p>
                    <Button type="submit"
                        disabled={
                            checker.nom.success == checker.prenoms.success && checker.prenoms.success == checker.tel.success && checker.tel.success == checker.email.success && 
                            dateError == false &&
                            utilisateur.nom.length > 0 && utilisateur.prenoms.length > 0 && utilisateur.tel.length > 0 && utilisateur.email.length > 0
                            ? false
                            : true
                        } onClick={() => checkExistingEmail()} variant="contained" sx={{ padding: '12px' }} className="submit-btn">Suivant <i className="fa-solid fa-angle-right" style={{ padding: '8px' }}></i></Button>
                    <Button type="submit" variant="outlined" sx={{ padding: '12px' }} className="prev-btn"><Google /></Button>
                    <div className="form-footer"><p>Vous avez déjà un compte ?</p> <button onClick={() => setSignUpForm(false)}>Se connecter</button></div>
                </Box>
                <Box sx={{ display: step == 2 ? "flex": "none", flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h5" align="center" className="form-heading" sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                    }}><School sx={{ fontSize: '3rem'}} /> Inscription</Typography>
                    <Box>
                        <Button variant="contained" sx={{ width: '33.3%' }} className="progress-btn"></Button>
                        <Button variant="contained" sx={{ width: '33.3%' }} className="progress-btn current"></Button>
                        <Button variant="outlined" sx={{ width: '33.3%' }} className="progress-next"></Button>
                    </Box>
                    <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select label={"Status"}
                            value={utilisateur.role}
                            onChange={(e) => {
                                setUtilisateur(att => ({ ...att, ["role"]: e.target.value }));
                            }}>
                            <MenuItem value={"Etudiant"}>Etudiant</MenuItem>
                            <MenuItem value={"Enseignant"}>Enseignant</MenuItem>
                            <MenuItem value={"Autre"}>Autre</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField label="Mots de passe" type="password" required 
                        value={utilisateur.mdp}
                        slotProps={{ htmlInput: { minLength:8, maxLength: 50 } }}
                        onChange={(e) => {
                            setUtilisateur(att => ({ ...att, ["mdp"]: e.target.value }));
                            updateChecker((ch) => ({ ...ch, ["mdp"]: schema.shape.mdp.safeParse(e.target.value) }));
                            // console.log(checker.mdp);
                        }}
                        error={checker.mdp.success == false ? true : false}
                        helperText={
                            checker.mdp.success == false 
                            ? <><i className="fa-solid fa-exclamation-circle" style={{ paddingRight: '4px' }}></i>{ getErrorMessage(checker.mdp) }</>
                            : ""
                        }
                    />
                    <TextField label="Confirmer mots de passe" type="password" required
                        value={mdpConfirmation}
                        onChange={(e) => setMdpConfirmation(e.target.value)}
                        error={utilisateur.mdp != mdpConfirmation ? true : false}
                        helperText={
                            utilisateur.mdp != mdpConfirmation 
                            ? <><i className="fa-solid fa-exclamation-circle" style={{ paddingRight: '4px' }}></i>Confirmation incorrecte</>
                            : ""
                        }
                    />
                    <Button type="submit" onClick={() => setStep(1)} variant="outlined" sx={{ padding: '12px' }} className="prev-btn"><i className="fa-solid fa-angle-left" style={{ padding: '8px' }}></i>Précédent</Button>
                    <Button type="submit" disabled={
                        utilisateur.mdp == mdpConfirmation && utilisateur.mdp.length > 0 && checker.mdp.success
                        ? false
                        : true
                    } onClick={() => { setStep(3) }} variant="contained" sx={{ padding: '12px' }} className="submit-btn">Suivant<i className="fa-solid fa-angle-right" style={{ padding: '8px' }}></i></Button>
                    <div className="form-footer"><p>Vous avez déjà un compte ?</p> <button onClick={() => setSignUpForm(false)}>Se connecter</button></div></Box>
                <Box sx={{ display: step == 3 ? "flex": "none", flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h5" align="center" className="form-heading" sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                    }}><School sx={{ fontSize: '3rem'}} /> Inscription</Typography>
                    <Box>
                        <Button variant="contained" sx={{ width: '33.3%' }} className="progress-btn"></Button>
                        <Button variant="contained" sx={{ width: '33.3%' }} className="progress-btn"></Button>
                        <Button variant="contained" sx={{ width: '33.3%' }} className="progress-btn current"></Button>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className="profile-by-default" style={{ textAlign: 'center', display: profilePicture == "null" ? "inherit" : "none" }}><h1>{utilisateur.nom.toUpperCase()[0]}</h1></div>
                        <img className="profile-image" src={profilePicture} style={{ textAlign: 'center', display: profilePicture != "null" ? "inline" : "none" }} alt="profile" />
                    </Box>
                    <label style={{ textAlign: 'center' }}>{utilisateur.nom} {utilisateur.prenoms}</label>
                    <label style={{ textAlign: 'center' }}>Choisir un profile</label>
                    <div className="profile-img">
                        <label htmlFor="profile-img"><i className="fa-solid fa-image"></i></label>
                        <input type="file" name="profile-img"
                            onChange={(e) => { handleProfilePicture(e) }}
                            id="profile-img"
                        />
                    </div>
                    <Button type="submit" onClick={() => setStep(2)} variant="outlined" sx={{ padding: '12px' }} className="prev-btn"><i className="fa-solid fa-angle-left" style={{ padding: '8px' }}></i>Précédent</Button>
                    <Button type="submit" onClick={() => { uploadFile() }} variant="contained" sx={{ padding: '12px' }} className="submit-btn">S'inscrire</Button>
                    <div className="form-footer"><p>Vous avez déjà un compte ?</p> <button onClick={() => setSignUpForm(false)}>Se connecter</button></div></Box>
                <Box sx={{ 
                    position: 'absolute',
                    right: '0px',
                    top: '0px'
                }}>
                    <Link to={"/"}><IconButton sx={{ color: '#495959', backgroundColor: '#f5f5f5ff' }}><CloseSharp sx={{ color: style.primaryColor }}/></IconButton></Link>
                </Box>
            </Paper>
        </Grid>
    );
}
export default Form;