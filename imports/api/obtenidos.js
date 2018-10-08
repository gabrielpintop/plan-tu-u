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

import {
    Usuarios
} from './usuarios.js';

import {
    Asignaciones
} from './asignaciones.js';

const jwt = require('jsonwebtoken');

export const Obtenidos = new Mongo.Collection('obtenidos');

if (Meteor.isServer) {

    Meteor.publish('obtenidos', function obtenidosPublication(token) {
        let usuario = decodificarToken(token);

        if (usuario) {
            if (usuario.rol === "uniandino") {
                return Obtenidos.find({
                    $or: [{
                        idUsuario: usuario.identificacion
                    }, ],
                });
            } else if (usuario.rol === "adminPTU") {
                return Obtenidos.find();
            }
        } else {
            throw new Meteor.Error("Debes haber iniciado sesión para acceder a esta funcionalidad.");
        }
    });
}

Meteor.methods({
    'obtenidos.insertar'({
        idUsuario,
        idAsignacion,
        usuarioAsignador
    }) {
        check(idUsuario, String);
        check(idAsignacion, String);
        check(usuarioAsignador, Object);

        verificarPermisos(usuarioAsignador.rol);

        const usuarioBuscado = Usuarios.findOne({
            identificacion: idUsuario,
        });

        if (usuarioBuscado) {
            const asignacion = Asignaciones.findOne({
                idAsignacion: idAsignacion
            });

            if (asignacion) {
                try {
                    let descripcion = asignacion.descripcion;
                    let puntosInsertar = asignacion.puntosAsignados;

                    let fecha = moment().format('DD/MM/YYYY - h:mm:ss a');

                    Obtenidos.insert({
                        idAsignador: usuarioAsignador.identificacion,
                        nombreAsignador: usuarioAsignador.nombre,
                        idUsuario: idUsuario,
                        nombreUsuario: usuarioBuscado.nombre,
                        descripcion: descripcion,
                        puntos: puntosInsertar,
                        idAsignacion: idAsignacion,
                        fecha: fecha
                    }, (err, res) => {
                        if (err) {
                            throw new Meteor.Error("Se presentó un error al agregar el beneficio")
                        } else {
                            Usuarios.update({
                                identificacion: idUsuario
                            }, {
                                '$inc': {
                                    puntos: puntosInsertar
                                }
                            });
                        }
                    });

                    return "Se incrementaron en " + puntosInsertar + " los puntos de " + usuarioBuscado.nombre;
                } catch (error) {
                    throw new Meteor.Error(error);
                }
            } else {
                throw new Meteor.Error("No existe dicha asignación");
            }

        } else {
            throw new Meteor.Error("No existe un usuario con identificación " + idUsuario);
        }
    }
});

function decodificarToken(token) {
    return token ? jwt.verify(token, 'shhhhhPTU') : null;
}

function verificarPermisos(rol) {
    if (rol !== "adminPTU") {
        throw new Meteor.Error('No se encuentra autorizado para editar un beneficio');
    }
}