require('./config/config');

const express = require('express');
// Using Node.js `require()`
const mongoose = require('mongoose');


const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use( require('./routes/usuario'))  

 
mongoose.connect('mongodb://localhost:27017/dtex', (err, res)=>{

	if( err ) throw err;

	console.log('BASE de datos ONLINE')
});


app.listen(process.env.PORT, ()=> {
	console.log('Escuchando los cambios en puerto', process.env.PORT);
});