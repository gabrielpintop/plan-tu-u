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

    Meteor.publish('asignaciones', function asignacionesPublication() {
        return Asignaciones.find();
    });
}

Meteor.methods({
    'asignaciones.insertar'({
        item,
        descripcion,
        idAsignacion,
        puntos,
        usuario
    }) {

        check(item, String);
        check(descripcion, String);
        check(puntos, Number);
        check(usuario, Object);

        verificarPermisos(usuario.rol);

        let fecha = new Date;

        try {

            Asignaciones.insert({
                idCreador: usuario.identificacion,
                nombreCreador: usuario.nombre,
                item: item,
                descripcion: descripcion,
                idAsignacion: idAsignacion,
                puntosAsignados: puntos,
                fechaCreacion: fecha.toLocaleString()
            });

            return true;
        } catch (err) {
            throw new Meteor.Error(err);
        }
    }
});

function verificarPermisos(rol) {
    if (rol !== "adminPTU") {
        throw new Meteor.Error('No se encuentra autorizado para editar un beneficio');
    }
}