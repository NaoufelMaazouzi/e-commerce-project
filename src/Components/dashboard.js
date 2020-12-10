import { makeStyles } from '@material-ui/core/styles';
import { auth } from '../firebase';
import { useState, useEffect } from 'react';

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
    const [userInfos, setUserInfos] = useState()

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setUserInfos(user)
        });
    }, []);

    return (
        <div>
            {userInfos && userInfos.providerData[0].email}
        </div >
    );
}

export default Dashboard;
