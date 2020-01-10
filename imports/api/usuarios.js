import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';
import {Match} from 'meteor/check'; //Match no utilizado
/* dcagua10: Los imports realizados son funcionales pero recomiendo realizar los imports en una linea cada uno puesto que hace el codigo mas compacto*/

const jwt = require('jsonwebtoken');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKeyPTU');

export const Usuarios = new Mongo.Collection('usuarios');

if (Meteor.isServer) {

  Meteor.publish('usuarios.identificacion', function usuariosPublication(identificacion) {
    return Usuarios.find({
      identificacion: identificacion
    });
  });

  Meteor.publish('usuarios', function usuariosAdmin(token) {
    const admin = decodificarToken(token);

    if (admin.rol === "adminPTU") {
      return Usuarios.find({
        rol: "uniandino"
      });
    } else {
      return [];
    }

  });
}

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

      return true;
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
  'usuarios.buscarUsuario'({
    identificacion
  }) {
    check(identificacion, String);

    const usuario = Usuarios.findOne({
      identificacion: identificacion
    });
    return usuario;
  },
  'usuarios.validarUsuario'({
    correo,
    clave
  }) {
    check(correo, String);
    check(clave, String);

    let usuario = null;

    usuario = Usuarios.findOne({
      correo: correo
    });

    if (!usuario) {
      throw new Meteor.Error('No existe un usuario con ese correo.');
    } else {
      if (cryptr.decrypt(usuario.clave) !== clave) {
        throw new Meteor.Error('La contraseña ingresada no es correcta.');
      }
    }

    delete usuario.clave;

    let token = jwt.sign(usuario, 'shhhhhPTU');

    return token;
  },
  'usuarios.decodificar'(token) {
    let usuario = decodificarToken(token);
    if (usuario) {
      let nUsuario = Usuarios.findOne({
        _id: usuario._id
      });

      if (nUsuario) {
        delete nUsuario.clave;
        return nUsuario;
      } else {
        return null
      }
    } else {
      return null;
    }
  }
});

function decodificarToken(token) {
  return token ? jwt.verify(token, 'shhhhhPTU') : null;
}