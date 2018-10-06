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

export const Redimidos = new Mongo.Collection('redimidos');

if (Meteor.isServer) {

    Meteor.publish('redimidos', function redimidosPublication(token) {
        let usuario = decodificarToken(token);

        if (usuario) {
            if (usuario.rol === "adminPTU") {
                return Redimidos.find({
                    $or: [{
                        idUsuario: usuario.identificacion
                    }, ],
                });
            } else {
                return Redimidos.find();
            }
        } else {
            throw new Meteor.Error("Debes haber iniciado sesión para acceder a esta funcionalidad.");
        }
    });
}