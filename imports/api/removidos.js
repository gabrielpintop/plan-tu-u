import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';
import {Match} from 'meteor/check'; // Match no usado
import {Usuarios} from './usuarios.js';
import {Asignaciones} from './asignaciones.js'; // Componente Asignaciones declarado pero no usado
import {Obtenidos} from './obtenidos.js';
/* dcagua10: Los imports realizados son funcionales pero recomiendo realizar los imports en una linea cada uno puesto que hace el codigo mas compacto
*/

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

                let puntosRemover = obtenido.puntos;

                if (usuarioBuscado.puntos >= puntosRemover) {
                    try {
                        let descripcion = obtenido.descripcion;
                        puntosRemover = puntosRemover * -1;
                        Removidos.insert({
                            idAsignador: usuarioAsignador.identificacion,
                            nombreAsignador: usuarioAsignador.nombre,
                            idUsuario: idUsuario,
                            nombreUsuario: usuarioBuscado.nombre,
                            descripcion: descripcion,
                            puntos: puntosRemover,
                            idAsignacion: idAsignacion,
                            fecha: moment().format('DD/MM/YYYY - h:mm:ss a')
                        }, (err, res) => {
                            if (err) {
                                throw new Meteor.Error("Se presentó un error al remover los puntos")
                            } else {

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