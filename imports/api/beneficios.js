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

if (Meteor.isServer) {
    Meteor.publish('beneficios', function beneficiosPublication() {
        return Beneficios.find();
    });
}

Meteor.methods({
    'beneficios.insertar'(beneficio, puntos, usuario) {
        check(beneficio, String);
        check(puntos, Number);
        check(usuario, Object);

        verificarPermisos(usuario.rol);

        let fecha = new Date;

        Beneficios.insert({
            idCreador: usuario.identificacion,
            nombreCreador: usuario.nombre,
            beneficio: beneficio,
            puntosRequeridos: puntos,
            fechaCreacion: fecha.toLocaleString()
        });
    },
    'beneficios.remover'(idBeneficio, usuario) {
        check(idBeneficio, String);
        check(usuario, Object);

        verificarPermisos(usuario.rol);

        const beneficio = Beneficios.findOne(idBeneficio);

        verificarExistenciaBeneficio(beneficio);

        Beneficios.remove(idBeneficio);
    },
    'beneficios.actualizar'(idBeneficio, beneficioNuevo, usuario) {
        check(idBeneficio, String);
        check(beneficioNuevo, Object);
        check(usuario, Object);

        verificarPermisos(usuario.rol);

        const beneficio = Beneficios.findOne(idBeneficio);

        verificarExistenciaBeneficio(beneficio);

        Beneficios.update(idBeneficio, {
            $set: {
                puntosRequeridos: beneficioNuevo.puntosRequeridos,
                beneficio: beneficioNuevo.beneficio
            }
        });
    }
});

function verificarPermisos(rol) {
    if (rol !== "adminPTU") {
        throw new Meteor.Error('No se encuentra autorizado para editar un beneficio');
    }
}

function verificarExistenciaBeneficio(beneficio) {
    if (!beneficio) {
        throw new Meteor.Error('No se encuentra el beneficio a eliminar');
    }
}