import React, { useEffect } from 'react';
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Box,
    Typography,
    Container
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import Axios from 'axios';
import { useHistory, useLocation } from "react-router-dom";
import { Link as LinkRouter } from 'react-router-dom';
import { auth } from '../firebase';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://naoufelmaazouzi.fr/">
                Naoufel
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}



const handleChange = (e, setIdentifierState) => {
    const value = e.target.value;
    setIdentifierState(value);
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    let history = useHistory();
    let location = useLocation();
    const [signUp, setSignUp] = useState(location.state)

    const handleAuthMethod = (e) => {
        setSignUp(e);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (signUp) {
            await Axios.post('http://localhost:5000/signUp', { name, email, password })
                .then((e) => {
                    const token = e.data;
                    auth.signInWithCustomToken(token)
                        .then((user) => {
                            console.log('User loged in:', user)
                            history.push("/dashboard");
                        })
                        .catch((error) => {
                            console.log('error', error.message)
                        });
                    setError('');
                })
                .catch(err => setError(err.response.data))
        } else {
            auth.signInWithEmailAndPassword(email, password)
                .then((user) => {
                    console.log('User loged in:', user)
                    history.push("/dashboard");
                })
                .catch((err) => {
                    setError(err.message)
                });
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {signUp ? 'Inscription' : 'Connexion'}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    {error && <Alert severity="error">{error}</Alert>}
                    {signUp && <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Nom"
                        name="name"
                        autoFocus
                        onChange={e => handleChange(e, setName)}
                    />
                    }
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Adresse email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={e => handleChange(e, setEmail)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Mot de passe"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={e => handleChange(e, setPassword)}
                    />
                    {!signUp &&
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                    }
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {signUp ? "S'inscrire" : "Se connecter"}
                    </Button>

                    {signUp ?
                        <Grid container>
                            <Grid item>
                                <LinkRouter to="/signUp" onClick={() => handleAuthMethod(!signUp)}>
                                    Déjà inscrit ? Se connecter
                                </LinkRouter>
                            </Grid>
                        </Grid> :
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Mot de passe oublié ?
                                </Link>
                            </Grid>
                            <Grid item>
                                <LinkRouter to="/signUp" onClick={() => handleAuthMethod(!signUp)}>
                                    Vous n'avez pas de compte ? S'inscrire
                                </LinkRouter>
                            </Grid>
                        </Grid>
                    }
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container >
    );
}