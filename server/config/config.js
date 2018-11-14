



//==========================
// PUERTO 
//=================
process.env.PORT = process.env.PORT || 3000;


//==========================
// ENTORNO
//=================
//sino existe esta variable con || supongo que estoy en desarollo
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//==========================
// Base de datos
//=================

let urlDB;

if(process.env.NODE_ENV === 'dev'){
	urlDB ='mongodb://localhost:27017/dtex';	
}else {
	urlDB = 'mongodb://Admin-user:n12345@ds061370.mlab.com:61370/dtexpress';
}

process.env.URLDB = urlDB;

