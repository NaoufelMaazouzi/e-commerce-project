import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    CircularProgress,
    CardContent,
    Typography,
    CardMedia,
    CardActionArea,
    Card,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Button
} from '@material-ui/core';

import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    imgContainer: {
        maxWidth: 480,
        minWidth: 470,
        margin: theme.spacing(1)
    },
    media: {
        height: 600,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    button: {
        marginTop: '5%'
    },
    cardContent: {
        marginTop: '5%'
    }
}));


function ProductsComponent() {
    const [product, setProduct] = useState([])
    const [size, setSize] = useState([])
    let params = useParams();

    const handleChange = (event) => {
        setSize(event.target.value);
    };

    useEffect(() => {
        axios.get(`http://localhost:5000/products/${params.id}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    const classes = useStyles();

    return (
        <div className={classes.container}>
            {product.length !== 0 ?
                // <Grid container justify="center" alignItems="center">
                //     <Grid item="true" xs={3}>
                //         <Card className={classes.root}>
                //             <CardActionArea>
                //                 <CardMedia
                //                     className={classes.media}
                //                     image={product.imgUrl}
                //                     title="Contemplative Reptile"
                //                 />
                //             </CardActionArea>
                //         </Card>
                //     </Grid>
                //     <Grid item="true" xs={3} >
                //         <Paper>
                //             Hello
                //         </Paper>
                //     </Grid>
                // </Grid>

                <div>
                    <Grid container spacing={3} justify="center">
                        <Grid item xs={4} sm={12} xl={4} md={12} lg={4} >
                            <Card className={classes.imgContainer}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image={product.imgUrl}
                                        title="Contemplative Reptile"
                                    />
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs={12} lg={5} sm={12} xl={4} md={12}>
                            <Card className={classes.imgContainer}>
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h4" component="h2">
                                        {product.name}
                                    </Typography>
                                    <Typography gutterBottom variant="h4" component="h6" >
                                        <Box fontWeight="fontWeightBold">
                                            {product.prix && product.prix.toFixed(2)}€
                                        </Box>
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle1" component="h2">
                                        Couleur: {product.couleur}
                                    </Typography>
                                    <FormControl className={classes.formControl} >
                                        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                            Taille
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-placeholder-label-label"
                                            id="demo-simple-select-placeholder-label"
                                            value={size}
                                            onChange={handleChange}
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
                                    <Typography className={classes.button}>
                                        <Button variant="contained" color="primary">
                                            Ajouter au panier
                                    </Button>
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

export default ProductsComponent;
