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

import {
    Obtenidos
} from './obtenidos.js';


const jwt = require('jsonwebtoken');

export const Removidos = new Mongo.Collection('removidos');

if (Meteor.isServer) {

    Meteor.publish('removidos', function removidosPublication(token) {
        let usuario = decodificarToken(token);

        if (usuario) {
            if (usuario.rol === "adminPTU") {
                return Removidos.find();
            }
        } else {
            throw new Meteor.Error("Debes haber iniciado sesión para acceder a esta funcionalidad.");
        }
    });
}

Meteor.methods({
    'removidos.remover'({
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
            const obtenido = Obtenidos.findOne({
                idAsignacion: idAsignacion,
                idUsuario: idUsuario
            });

            if (obtenido) {

                let puntosRemover = obtenido.puntosAsignados;

                if (usuarioBuscado.puntos >= puntosRemover) {
                    try {
                        let descripcion = obtenido.descripcion;
                        let puntosRemover = obtenido.puntosAsignados;
                        let fecha = new Date;

                        Removidos.insert({
                            idAsignador: usuarioAsignador.identificacion,
                            nombreAsignador: usuarioAsignador.nombre,
                            idUsuario: idUsuario,
                            nombreUsuario: usuarioBuscado.nombre,
                            descripcion: descripcion,
                            puntosRemovidos: puntosRemover,
                            idAsignacion: idAsignacion,
                            fechaRemovido: fecha.toLocaleString()
                        }, (err, res) => {
                            if (err) {
                                throw new Meteor.Error("Se presentó un error al remover los puntos")
                            } else {
                                puntosRemover = puntosRemover * -1;
                                Usuarios.update({
                                    identificacion: idUsuario
                                }, {
                                    '$inc': {
                                        puntos: puntosRemover
                                    }
                                }, (err, res) => {
                                    if (err) {
                                        throw new Meteor.Error("Se presentó un error al remover los puntos")
                                    } else {
                                        Obtenidos.remove({
                                            _id: obtenido._id
                                        });
                                    }
                                });
                            }
                        });

                        return "Se removieron " + (puntosRemover * -1) + " de los puntos de " + usuarioBuscado.nombre;
                    } catch (error) {
                        console.log(error);
                        throw new Meteor.Error(error + "");
                    }
                } else {
                    throw new Meteor.Error("El usuario ya utilizó los puntos de la asignación. No es posible removerla.")
                }


            } else {
                throw new Meteor.Error("No es posible remover una asignación no asociada previamente.");
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