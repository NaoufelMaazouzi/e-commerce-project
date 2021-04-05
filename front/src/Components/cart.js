import { makeStyles } from '@material-ui/core/styles';
import {  useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchProductsInCart } from '../redux/productsInCart/productsInCartActions';
import {
    CircularProgress,
    CardContent,
    Typography,
    Card,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Button,
    Divider,
    CardMedia,
    Grid,
    IconButton
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 340,
        minWidth: 330,
        margin: theme.spacing(1)
    },
    media: {
        height: 200,
        width: 200,
        marginLeft: 30,
    },
    name: {
        color: 'grey',
        textDecoration: 'none'
    },
    divProduct: {
        display: 'flex',
        marginBottom: 30,
        marginTop: 30
    },
    divCardContent: {
        width: '60%',
    },
    cardContentH2: {
       paddingBottom: 0 
    },
    clearProduct: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    container: {
        width: '99%'
    },
    divPrice: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    h2: {
        marginBottom: 30
    },
    divButtonPaiement: {
        display: 'flex',
        justifyContent: 'center'
    }
}));


function Dashboard({ fetchProductsInCart, productsInCartFetched }) {
    const classes = useStyles();
    const [livraisonType, setLivraisonType] = useState([]);

     useEffect(() => {
        fetchProductsInCart()
     }, []);

     const handleChangeLivraison = (event) => {
        setLivraisonType(event.target.value);
    };

    return (
        <div className={classes.container}>
            {productsInCartFetched?.length !== 0 ?
                <div>
                    <Grid container spacing={2} justify="center">
                        {/* <Grid item xs={12}>
                            {error && <Alert severity="error">{error}</Alert>}
                        </Grid> */}
                        <Grid item xs={4} sm={12} xl={4} md={12} lg={5} >
                            <Card>
                                <CardContent className={classes.cardContentH2}>
                                    <Typography variant="h4" component="h2">
                                        Mon panier
                                        <Divider />
                                    </Typography>
                                </CardContent>
                                    {productsInCartFetched?.map(product =>
                                    <>
                                    <div className={classes.divProduct}>
                                        <CardMedia className={classes.media} image={product.imgUrl} />
                                        <CardContent className={classes.divCardContent}>
                                            <div className={classes.clearProduct}>
                                                <Typography gutterBottom variant="h5" component="h3">
                                                    {product.prix}€
                                                </Typography>
                                                <IconButton>
                                                    <ClearIcon/>
                                                </IconButton>
                                            </div>
                                            <Typography gutterBottom variant="subtitle1" component="h3">
                                                {product.name}
                                            </Typography>
                                        </CardContent>
                                    </div>
                                    <Divider />
                                    </>
                                    )}
                            </Card>
                            
                        </Grid>
                        <Grid item xs={12} lg={3} sm={12} xl={4} md={12}>
                            <Card>
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h4" component="h2" className={classes.h2}>
                                        Total
                                        <Divider />
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle1" component="h2" className={classes.h2}>
                                        <div className={classes.divPrice}>
                                            <div>
                                                Sous-Total
                                            </div>
                                            <div>
                                                {productsInCartFetched?.reduce((a, b) => a.prix+b.prix)}€
                                            </div>
                                        </div>
                                        <Divider />
                                    </Typography>
                                    <FormControl className={classes.h2} >
                                        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                            Livraison
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-placeholder-label-label"
                                            id="demo-simple-select-placeholder-label"
                                            value={livraisonType}
                                            onChange={handleChangeLivraison}
                                            displayEmpty
                                            className={classes.selectEmpty}
                                        >
                                            <MenuItem value="">
                                                <em>Veuillez choisir</em>
                                            </MenuItem>
                                            <MenuItem value={'Livraison standard (Gratuit)'}>Livraison standard (Gratuit)</MenuItem>
                                            <MenuItem value={'Livraison 24h en point relais (10.00€)'}>Livraison 24h en point relais (10.00€)</MenuItem>
                                            <MenuItem value={'Livraison standard en point relais (Gratuit)'}>Livraison standard en point relais (Gratuit)</MenuItem>
                                            <MenuItem value={'Jour de livraison (10.00€)'}>Jour de livraison (10.00€)</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Typography className={classes.button}>
                                        <div  className={classes.divButtonPaiement}>
                                            <Button variant="contained" color="success">
                                                Paiement
                                            </Button>
                                        </div>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
                : <CircularProgress />
            }
        </div >
    );
}

const mapStateToProps = (state) => {
    return {
        productsInCartFetched: state.productsInCart.productsInCartFetched,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchProductsInCart: () => dispatch(fetchProductsInCart())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);


