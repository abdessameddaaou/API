const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const routesauth = require('./Routes/authentification')
const routesutilisateur = require('./Routes/utilisateur')
const cookieParser = require('cookie-parser')

const app = express();


// elle permet la connexion a la base de donnée
mongoose.connect('mongodb+srv://root:root@cluster0.5h8ej.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{ useNewUrlParser: true,
    useUnifiedTopology: true })

.then(() => console.log("connextion reussi "))
.catch(()=> console.log("connextion echoué "));

app.use(bodyParser.json())
app.use(cookieParser())

// permet de faire le lien avec ejs et backend
app.set('view engine', 'ejs')




app.use(routesauth)
app.use(routesutilisateur)


module.exports = app;