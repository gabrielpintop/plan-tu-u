import {
  Meteor
} from 'meteor/meteor';
import {
  Mongo
} from 'meteor/mongo';
import {
  check
} from 'meteor/check';
import {
  Match
} from 'meteor/check';

export const Usuarios = new Mongo.Collection('usuarios');
//Usuarios.createIndex({ identificacion: -1 });

Meteor.methods({
  'usuarios.insertar'(nombre, identificacion, correo, celular, clave) {

    Usuarios.insert({
      nombre: nombre,
      identificacion: identificacion,
      correo:correo,
      celular:celular,
      clave: clave,
      puntos:0,
      rol: 'uniandino'
    }, (err, res) => {
      if (err) {
       alert(err);
     } else {
       alert("Se creó el usuario "+nombre+" correctamente");
     }
   });
  },
    'usuarios.validarUsuario'(ident, clave) {
    check(identificacion, String);
    check(clave, String);

    Usuarios.findOne({
                identificacion: ident
            }, (err, usuario) => {
                if (err) {
                      alert(err);
                } else if (!usuario) {
                      alert('El nombre de usuario ingresado no existe');
                } else {       
                    if (!(usuario.clave===clave)) {
                        
                        alert('La contraseña ingresada es incorrecta.');
                    } else {                
                        alert( '¡Bienvenido ' + body.nombreDeUsuario + '!' );
                    }
                }
            });
     },
});
