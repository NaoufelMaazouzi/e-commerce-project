import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { fade, makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Button,
    Toolbar,
    IconButton,
    Typography,
    InputBase,
    Badge,
    MenuItem,
    Menu,
    Card,
    CardContent,
    CardMedia,
    Grid,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { connect } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import Axios from 'axios';
import apiRest from '../apiKey';
import { fetchProductsInCart } from '../redux/productsInCart/productsInCartActions';
import { fetchUserInfos, removeUserInfos } from '../redux/userInfos/userInfosActions';

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
    panierButton: {
        display: 'flex',
        justifyContent: 'center'
    }
}));

function SearchBar({ productsInCartFetched, fetchProductsInCart, fetchUserInfos, removeUserInfos, userInfosFetched }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    let history = useHistory();
    const [array, setarray] = useState([]);

    useEffect(() => {
        fetchProductsInCart();
        fetchUserInfos();
        const arrayy = productsInCartFetched && productsInCartFetched.length && productsInCartFetched.map(e => {
            return e.prix
        })
        setarray(arrayy);
    }, []);
    const deleteFromCart = (product) => {
        Axios.post(`/api/productToCart/delete`, { id: userInfosFetched.uid, product })
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
                removeUserInfos();
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
            {userInfosFetched && productsInCartFetched && productsInCartFetched.map((product, i) =>
                <Card className={classes.root} key={i}>
                    <CardContent>
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
                    </CardContent>
                </Card>
            )}
            {userInfosFetched && productsInCartFetched && productsInCartFetched.length ?
                <Link to="/panier" className={classes.linkRouterMobile} onClick={handleMenuClose}>
                    <div className={classes.panierButton}>
                        <Button variant="contained" color="primary">Voir panier</Button>
                    </div>
                </Link> : 
                <Link to="/signUp" className={classes.linkRouterMobile} onClick={handleMenuClose}>
                <MenuItem>Se connecter pour voir mon panier</MenuItem>
            </Link>}
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
                    <Badge badgeContent={userInfosFetched && productsInCartFetched && productsInCartFetched.length} color="secondary" >
                        <ShoppingBasketIcon />
                    </Badge>
                </IconButton>
                <p>Mon panier</p>
            </MenuItem>
            {userInfosFetched &&
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
                            <Badge badgeContent={userInfosFetched && productsInCartFetched && productsInCartFetched.length} color="secondary" >
                                <ShoppingBasketIcon />
                            </Badge>
                        </IconButton>
                        {userInfosFetched &&
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
                    {userInfosFetched ?
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
        productsInCartFetched: state.productsInCart.productsInCartFetched,
        userInfosFetched: state.userInfos.userInfosFetched,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchProductsInCart: () => dispatch(fetchProductsInCart()),
        fetchUserInfos: () => dispatch(fetchUserInfos()),
        removeUserInfos: () => dispatch(removeUserInfos())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);