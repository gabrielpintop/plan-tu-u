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

export const Participaciones = new Mongo.Collection('participaciones');

if (Meteor.isServer) {

    Meteor.publish('participaciones', function participacionesPublication(token) {
        let usuario = decodificarToken(token);

        if (usuario) {
            if (usuario.rol === "adminPTU") {
                return Participaciones.find({
                    $or: [{
                        idUsuario: usuario.identificacion
                    }, ],
                });
            } else {
                return Participaciones.find();
            }
        } else {
            throw new Meteor.Error("Debes haber iniciado sesión para acceder a esta funcionalidad.");
        }
    });
}