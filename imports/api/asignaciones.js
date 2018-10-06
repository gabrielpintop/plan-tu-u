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

export const Asignaciones = new Mongo.Collection('asignaciones');

if (Meteor.isServer) {

    Meteor.publish('asignaciones', function asignacionesPublication(token) {
        let usuario = decodificarToken(token);

        if (usuario) {
            if (usuario.rol === "adminPTU") {
                return Asignaciones.find();
            } else {
                return Asignaciones.find({
                    $or: [{
                        idUsuario: usuario.identificacion
                    }, ]
                });
            }
        } else {
            throw new Meteor.Error("Debes haber iniciado sesión para acceder a esta funcionalidad.");
        }
    });
}