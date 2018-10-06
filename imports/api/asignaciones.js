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

export const Asignaciones = new Mongo.Collection('asignaciones');

if (Meteor.isServer) {

    Meteor.publish('asignaciones', function asignacionesPublication() {
        return Asignaciones.find();
    });

    Meteor.publish('asignaciones.usuario', function (token) {
        let usuario = decodificarToken(token);
        if (usuario) {
            return Asignaciones.find({
                $or: [{
                    idUsuario: usuario.identificacion
                }, ]
            });
        } else {
            throw new Meteor.Error("Debes haber iniciado sesión para acceder a esta funcionalidad.");
        }
    })
}

function decodificarToken(token) {
    return token ? jwt.verify(token, 'shhhhhPTU') : null;
}