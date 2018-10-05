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

export const Beneficios = new Mongo.Collection('beneficios');

Meteor.methods({
    // Falta lo de usuario
    'beneficios.insertar'(beneficio, puntos, usuario) {
        check(beneficio, String);
        check(puntos, Number);
        check(usuario, Object);

        if (usuario.rol !== "adminPTU") {
            throw new Meteor.Error('No se encuentra autorizado para crear un beneficio');
        }

        let fecha = new Date;

        Beneficios.insert({
            creadoPor: usuario.codigo,
            beneficio: beneficio,
            puntosRequeridos: puntos,
            fechaCreacion: fecha.toLocaleString()
        });
    },
    'beneficios.remover'(idBeneficio, usuario) {
        check(idBeneficio, String);
        check(usuario, Object);

        if (usuario.rol !== "administrador") {
            throw new Meteor.Error('No se encuentra autorizado para crear un beneficio');
        }

        Beneficios.remove(idBeneficio);
    },
});