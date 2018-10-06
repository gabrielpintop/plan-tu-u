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

Meteor.methods({
  'usuarios.insertar'({
    nombre,
    identificacion,
    correo,
    celular,
    clave
  }) {

    try {
      Usuarios.insert({
        nombre: nombre,
        identificacion: identificacion,
        correo: correo,
        celular: celular,
        clave: clave,
        puntos: 0,
        rol: 'uniandino'
      });
    } catch (err) {
      if (err) {
        if (err.code === 11000) {
          throw new Meteor.Error("Ya existe un usuario con ese número de identificación.");
        } else {
          throw new Meteor.Error("Se presentó un error al crear el usuario. Por favor intenta nuevamente");
        }
      }
    }

  },
  'usuarios.validarUsuario'({
    identificacion,
    clave
  }) {
    check(identificacion, String);
    check(clave, String);

    let usuario = null;

    try {
      Usuarios.findOne({
        identificacion: identificacion
      }, (err, usu) => {
        if (err) {
          throw new Meteor.Error('Hubo problemas con el inicio de sesión. Intenta nuevamente.');
        } else if (!usu) {
          throw new Meteor.Error('No existe un usuario con ese número de identificación.');
        } else {
          if (usuario.clave !== clave) {
            throw new Meteor.Error('La contraseña ingresada no es correcta.');
          } else {
            usuario = usuario;
          }
        }
      });
    } catch (err) {
      throw new Meteor.Error(err);
    }

    return usuario;
  },
});