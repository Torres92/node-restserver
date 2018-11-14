const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario');
const app = express();

app.get('/usuario', function (req, res) {


//para definir parametros especificos 
//en la busqueda
  let desde = req.query.desde || 0
  desde = Number(desde);

  let limite = req.query.limite || 5;
  limite = Number(limite) 
// aca pedimos que nos encuentre algo en la base de datos
// si find está vacio ... buscara a todos los registros en la db  
// aca condiciones parametros como rol: Empresa 
  Usuario.find({ estado: true }, 'nombre email role img estado google')// especificamos los campos que queremos mostrar
          .skip(desde) // salta y obtiene los siguien (n) registros
          .limit(limite) // retornara (n) cantidad de registros
          .exec((err, usuarios) =>{

            if( err ){
              return res.status(400).json({
                ok: false,
                err
              });
            }

            //cantidad de registros que tiene una coleccion
            Usuario.count({ estado: true }, (err, conteo)=>{
              
              res.json({
                ok: true,
                usuarios,
                cuantos: conteo
              });
            })

          })
});

app.post('/usuario', function (req, res) {
  
  let body = req.body;

// creo el nuevo usuario
  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync( body.password, 10 ),
    role: body.role
  });

//envio a la base de dato y retorno un sucessful o error
  usuario.save((err, usuarioDB) =>{

      if( err ){
        return res.status(400).json({
          ok: false,
          err
        });
      }


      res.json({
        ok: true,
        usuario: usuarioDB
      });      
  });

  
});

app.put('/usuario/:id', function (req, res) {
  
  let id = req.params.id;
  //aca utilizo libreria underscore para hacer un pick de los campos validos que puedo actualizar
  let body = _.pick(req.body, ['nombre', 'email', 'role', 'estado']);

//encuentro el usuario mediante id enviado en la url
  Usuario.findByIdAndUpdate( id, body, { new: true, runValidators: true }, (err, usuarioDB)=>{

    if( err ){
        return res.status(400).json({
          ok: false,
          err
        });
      }

    res.json({
   	  ok: true,
      usuario: usuarioDB
   });
    
  });

});

app.delete('/usuario/:id', function (req, res) {
  
  let id = req.params.id;

let cambiaEstado = {
  estado: false
}
//eliminar fisicamente
// Usuario.findByIdAndRemove(id, (err, usuarioBorrado)=>{
//cambia estado 
  Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado)=>{

    if( err ){
        return res.status(400).json({
          ok: false,
          err
        });
      };

    if( !usuarioBorrado ){
      return res.status(400).json({
          ok: false,
          err: {
            message: 'Usuario no encontrado'
          }
        });
    };  
    res.json({
      ok: true,
      usuario: usuarioBorrado
    });

  });

});

module.exports = app;