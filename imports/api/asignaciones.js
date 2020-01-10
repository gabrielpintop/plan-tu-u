import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';
import {Match} from 'meteor/check'; //Componente Match no utilizado
/* dcagua10: Los imports realizados son funcionales pero recomiendo realizar los imports en una linea cada uno puesto que hace el codigo mas compacto
*/

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

        let fecha = moment().format('DD/MM/YYYY - h:mm:ss a');

        try {

            Asignaciones.insert({
                idCreador: usuario.identificacion,
                nombreCreador: usuario.nombre,
                item: item,
                descripcion: descripcion,
                idAsignacion: idAsignacion,
                puntosAsignados: puntos,
                fechaCreacion: fecha
            });

            return true;
        } catch (err) {
            throw new Meteor.Error(err);
        }
    },
    'asignaciones.remover'({
        idAsignacion,
        usuario
    }) {
        check(idAsignacion, String);
        check(usuario, Object);

        verificarPermisos(usuario.rol);

        const asignacion = Asignaciones.findOne({
            idAsignacion: idAsignacion
        });

        verificarExistenciaAsignacion(asignacion);

        try {
            Asignaciones.remove({
                idAsignacion: idAsignacion
            });
            return "La asignación " + idAsignacion + " se eliminó correctamente";
        } catch (error) {
            throw new Meteor.Error("Se presentó un error eliminando la asignación.");
        }

    },
    'asignaciones.actualizar'({
        idAsignacion,
        asignacionNueva,
        usuario
    }) {
        check(idAsignacion, String);
        check(asignacionNueva, Object);
        check(usuario, Object);

        verificarPermisos(usuario.rol);

        const asignacion = Asignaciones.findOne({
            idAsignacion: idAsignacion
        });

        verificarExistenciaAsignacion(asignacion);

        try {
            Asignaciones.update({
                idAsignacion: idAsignacion
            }, {
                $set: {
                    puntosAsignados: asignacionNueva.puntosAsignados,
                    descripcion: asignacionNueva.descripcion
                }
            });

            return "La asignación " + idAsignacion + " se actualizó correctamente";
        } catch (error) {
            throw new Meteor.Error(error);
        }
    }
});

function verificarPermisos(rol) {
    if (rol !== "adminPTU") {
        throw new Meteor.Error('No se encuentra autorizado para realizar esta acción');
    }
}

function verificarExistenciaAsignacion(asignacion) {
    if (!asignacion) {
        throw new Meteor.Error('No se encuentra la asignación a eliminar');
    }
}