import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(4),
        margin: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    paper: {
        padding: theme.spacing(4),
        margin: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    img: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 200,
        height: 'auto'
    }
}));


function ProductsComponent() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/products/')
            .then(response => {
                setProducts(response.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    const classes = useStyles();

    return (
        <Router>
            <div className={classes.root}>
                Hello
            </div >
        </Router>
    );
}

export default ProductsComponent;
