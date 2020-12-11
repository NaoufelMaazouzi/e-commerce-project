import { makeStyles } from '@material-ui/core/styles';
import { auth } from '../firebase';
import { useState, useEffect } from 'react';
import { firebase } from '../firebase';

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


function Dashboard() {
    const classes = useStyles();
    const [userInfos, setUserInfos] = useState();
    const [productsInCart, setProductsInCart] = useState();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setUserInfos(user)
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
    }, []);

    return (
        <div>
            {productsInCart && productsInCart.map(e => e.name)}
        </div >
    );
}

export default Dashboard;
