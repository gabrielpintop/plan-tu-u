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

const jwt = require('jsonwebtoken');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

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
        clave: cryptr.encrypt(clave),
        puntos: 0,
        rol: 'uniandino'
      });
    } catch (err) {
      if (err) {
        if (err.code === 11000) {
          throw new Meteor.Error("Ya existe un usuario con ese número de identificación o correo asociado.");
        } else {
          throw new Meteor.Error("Se presentó un error al crear el usuario. Por favor intenta nuevamente");
        }
      }
    }

  },
  'usuarios.validarUsuario'({
    correo,
    clave
  }) {
    check(correo, String);
    check(clave, String);

    console.log("Entra aca");

    let usuario = null;


    usuario = Usuarios.findOne({
      correo: correo
    });

    if (!usuario) {
      throw new Meteor.Error('No existe un usuario con ese correo.');
    } else {
      if (cryptr.decrypt(usuario.clave) !== clave) {
        throw new Meteor.Error('La contraseña ingresada no es correcta.');
      } else {
        return usuario;
      }
    }
  },
});