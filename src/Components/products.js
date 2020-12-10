import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 340,
        minWidth: 330,
        margin: theme.spacing(1)
    },
    media: {
        height: 400,
    },
    name: {
        color: 'grey',
        textDecoration: 'none'
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
        <div>
            {products.length ?
                <Grid container justify="center" alignItems="center">
                    {products.map(product =>
                        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }} key={product.name}>
                            <Grid item >
                                <Card className={classes.root}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            className={classes.media}
                                            image={product.imgUrl}
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {product.name}
                                            </Typography>
                                            <Typography gutterBottom className={classes.name} variant="h6" component="h6">
                                                {product.prix && product.prix.toFixed(2)}€
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        </Link>
                    )}
                </Grid>


                : <CircularProgress />
            }
        </div >
    );
}

export default ProductsComponent;
