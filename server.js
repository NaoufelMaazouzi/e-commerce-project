const express = require('express');
const http = require('http');
const cors = require('cors');

var admin = require('firebase-admin');
var serviceAccount = require("./secret-key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    apiKey: "AIzaSyCOn_779NOTzxzWkoTxTvYezcgoRCF5NJQ",
    authDomain: "e-commerce-project-1f484.firebaseapp.com",
    databaseURL: "https://e-commerce-project-1f484-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "e-commerce-project-1f484",
    storageBucket: "e-commerce-project-1f484.appspot.com",
    messagingSenderId: "4209990291",
    appId: "1:4209990291:web:78823716b0f04ff14bcb66",
    measurementId: "G-FRF2DBEM0Q"
})

const socketio = require('socket.io');
require('dotenv').config();

// CREATE SERVER
const port = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);

// CONNECT SOCKET.IO, MAKE EMIT TO CLIENT & LISTEN TO EMIT
const io = socketio(server);
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('deleteProducts', () => {
        console.log('supprimé');
        io.emit('serverEmit');
    });

    socket.on('addProducts', ({
        name, type, price, rating, warranty_years, available,
    }) => {
        console.log(name, type, price, rating, warranty_years, available);
        io.emit('serverEmit');
    });

    socket.on('modifyProducts', () => {
        console.log('Produits modifiés');
        io.emit('serverEmit');
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// USE CORS FOR NO PROBLEM BETWEEN DIFFERENT DOMAIN & SERVERS
app.use(cors());
app.use(express.json());

// ROUTES
const productsRouter = require('./ApiRoutes/products');
const signUpRouter = require('./ApiRoutes/signUp');
const signInRouter = require('./ApiRoutes/signIn');
const productToCartRouter = require('./ApiRoutes/addProductToCart');
const route = require('./ApiRoutes/route');

app.use('/products', productsRouter);
app.use('/productToCart', productToCartRouter);
app.use('/signUp', signUpRouter);
app.use('/signIn', signInRouter);
app.use('/', route);

// FOR PRODUCTION
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('build'));
}

server.listen(port, () => {
    console.log(`Server is runnig on port: ${port}`);
});
