import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { auth } from '../firebase';
import Alert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import { fetchProducts } from '../redux/products/productsActions';
import {
    CircularProgress,
    CardContent,
    Typography,
    CardMedia,
    Card,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    CardActions
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 340,
        minWidth: 330,
        margin: theme.spacing(2),
        boxShadow: "0 8px 20px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 40px -12.125px rgba(0,0,0,0.3)"
        }
    },
    media: {
        height: 400,
    },
    name: {
        color: 'grey',
        textDecoration: 'none'
    }

}));


function ProductsComponent({ productsFetched, fetchProducts }) {
    const classes = useStyles();
    const [userInfos, setUserInfos] = useState();
    const [error, setError] = useState('');
    const [size, setSize] = useState([]);


    useEffect(() => {
        fetchProducts();
        auth.onAuthStateChanged(user => {
            setUserInfos(user)
        });
    }, [])

    const addToCart = (product, size) => {
        if (!userInfos) {
            return setError('Vous devez vous connecter pour ajouter au panier');
        }
        else if (!size.length) {
            return setError('Veuillez choisir une taille');
        }
        axios.post('/api/productToCart/add', { id: userInfos.uid, product, size })
            .then(() => {
                setError()
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleChangeSize = (event) => {
        setSize(event.target.value);
    };

    return (
        <div>
            {productsFetched && productsFetched.length ?
                <Grid container justify="center" alignItems="center">
                    <Grid item xs={12}>
                        {error && <Alert severity="error">{error}</Alert>}
                    </Grid>
                    {productsFetched.map(product =>
                        <Grid item key={product.name} >
                            <Card className={classes.root}>
                                <CardContent>
                                    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }} key={product.name}>
                                        <CardMedia
                                            component="img"
                                            className={classes.media}
                                            image={product.imgUrl}
                                        />
                                    </Link>

                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {product.name}
                                        </Typography>
                                        <Typography gutterBottom className={classes.name} variant="h6" component="h6">
                                            {product.prix && product.prix.toFixed(2)}€
                                            </Typography>
                                        <FormControl className={classes.formControl} >
                                            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                                Taille
                                        </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-placeholder-label-label"
                                                id="demo-simple-select-placeholder-label"
                                                value={size}
                                                onChange={handleChangeSize}
                                                displayEmpty
                                                className={classes.selectEmpty}
                                            >
                                                <MenuItem value="">
                                                    <em>Veuillez choisir</em>
                                                </MenuItem>
                                                <MenuItem value={'40'}>EU 40</MenuItem>
                                                <MenuItem value={'40.5'}>EU 40.5</MenuItem>
                                                <MenuItem value={'41'}>EU 41</MenuItem>
                                                <MenuItem value={'41.5'}>EU 41.5</MenuItem>
                                                <MenuItem value={'42'}>EU 42</MenuItem>
                                                <MenuItem value={'42.5'}>EU 42.5</MenuItem>
                                                <MenuItem value={'43'}>EU 43</MenuItem>
                                                <MenuItem value={'43.5'}>EU 43.5</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <IconButton aria-label="add to favorites" onClick={() => addToCart(product, size)}>
                                            <AddShoppingCartIcon />
                                        </IconButton>
                                    </CardActions>
                                </CardContent>
                            </Card>
                        </Grid>

                    )}
                </Grid>


                : <CircularProgress />
            }
        </div >
    );
}

const mapStateToProps = (state) => {
    return {
        productsFetched: state.products.productsFetched,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchProducts: () => dispatch(fetchProducts())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductsComponent);
