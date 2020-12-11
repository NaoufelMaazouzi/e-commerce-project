import { useState, useEffect } from 'react';
import { auth, firebase } from '../firebase';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { connect } from 'react-redux';
import { fetchProducts } from '../redux/products/productsActions';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from '@material-ui/icons/Delete';
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    deconnexion: {
        marginLeft: '0.1%'
    },
    linkRouter: {
        color: '#FFF',
        textDecoration: 'none'
    },
    linkRouterMobile: {
        color: '#000000',
        textDecoration: 'none'
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    root: {
        maxWidth: 240,
        minWidth: 230,
        margin: theme.spacing(2),
    },
    media: {
        height: 150,
    },
}));

function SearchBar({ fetchProducts }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const [userInfos, setUserInfos] = useState();
    let history = useHistory();
    const [productsInCart, setProductsInCart] = useState([]);
    const [array, setarray] = useState([]);


    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                setUserInfos(user)
            }
        });
        const db = firebase.firestore();
        async function fetchData() {
            await db.collection('users').onSnapshot(snapshot => {
                snapshot.forEach(doc => {
                    setProductsInCart(doc.data().products);
                })
            })
        }
        fetchData();
        const arrayy = productsInCart && productsInCart.length && productsInCart.map(e => {
            return e.prix
        })
        setarray(arrayy);
    }, []);

    const deleteFromCart = (product) => {
        Axios.post('http://localhost:5000/productToCart/delete', { id: userInfos.uid, product })
            .then(response => {
                console.log('ok')
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleSignOut = () => {
        auth.signOut()
            .then(() => {
                console.log('user signed out')
                setUserInfos();
                history.push("/");
            })
            .catch(err => {
                console.log(err);
            })
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {productsInCart && productsInCart.map(product =>
                <Card className={classes.root}>
                    <CardActionArea>
                        <Grid container>
                            <Grid item xs={6}>
                                <CardMedia
                                    component="img"
                                    className={classes.media}
                                    image={product.imgUrl}
                                    title="Contemplative Reptile"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="h2">
                                        {product.prix}€
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle2" component="h2">
                                        {product.name}
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle2" component="h2">
                                        {product.couleur}
                                    </Typography>
                                    <IconButton aria-label="add to favorites" onClick={() => deleteFromCart(product)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </CardContent>

                            </Grid>
                        </Grid>
                    </CardActionArea>
                </Card>
            )}
            {productsInCart && productsInCart.length ?
                <Link to="/panier" className={classes.linkRouterMobile} onClick={handleMenuClose}>
                    <MenuItem>Voir mon panier</MenuItem>
                </Link> : null}
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={userInfos && productsInCart && productsInCart.length} color="secondary" >
                        <ShoppingBasketIcon />
                    </Badge>
                </IconButton>
                <p>Mon panier</p>
            </MenuItem>
            {userInfos &&
                <Link to="/dashboard" className={classes.linkRouterMobile}>
                    <MenuItem onClick={handleMobileMenuClose}>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="primary-search-account-menu"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={handleMenuClose}
                        >
                            <AccountCircle />
                        </IconButton>
                        <p>Mon compte</p>
                    </MenuItem>
                </Link>
            }
        </Menu >
    );

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link to="/" className={classes.linkRouter}>
                        <Typography className={classes.title} variant="h6" noWrap>
                            E-Commerce
                    </Typography>
                    </Link>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton aria-label="show 4 new mails" color="inherit" onClick={handleProfileMenuOpen}>
                            <Badge badgeContent={userInfos && productsInCart && productsInCart.length} color="secondary" >
                                <ShoppingBasketIcon />
                            </Badge>
                        </IconButton>
                        {userInfos &&
                            <Link to="/dashboard" className={classes.linkRouter}>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="primary-search-account-menu"
                                    aria-haspopup="true"
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                            </Link>
                        }
                    </div>
                    {userInfos ?
                        <Button onClick={handleSignOut} variant="contained" color="primary" disableElevation className={classes.deconnexion}>
                            Deconnexion
                        </Button> :
                        <Link to="/signUp" className={classes.linkRouter}>
                            <Button variant="contained" color="primary" disableElevation>
                                Connexion
                    </Button>
                        </Link>
                    }
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchProducts: () => dispatch(fetchProducts())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);