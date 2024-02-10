const createModel = require("../data_base/createModel");

const Usuario = createModel('Usuario', [
    'id_usuario',
    'id_rol',
    'id_empleado',
    'id_rfid',
    'correo',
    'contraseña',
    'estado',
    'secret',
]);

module.exports = Usuario;