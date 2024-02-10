const Usuario = require("../models/Usuario");
const Empleado = require("../models/Empleado");
const UserService = require("../services/UserService");

exports.getUsers = async(req, res) => {
    const {result, status, message} = await Usuario.getAll();
    if(status){
        res.status(200).json({
            usuarios: result
        });
    }else{
        res.status(500).json({
            error: message
        });
    }
}

exports.addUser = async (req, res) => {
    const {id_rol, id_empleado, id_rfid, correo, contraseña, estado} = req.body;
    const {result, status, message} = await Usuario.create(id_rol, id_empleado, id_rfid, correo, contraseña, estado);
    if(status){
        res.status(200).json({
            message: 'Usuario añadido con éxito'
        });
    }else{
        res.status(500).json({
            error: message
        });
    }
};

exports.updateUser = async (req, res) => {
    const {id_rol, id_empleado, id_rfid, correo, contraseña, estado} = req.body;
    const {result, status, message} = await Usuario.update(req.params.id, id_rol, id_empleado, id_rfid, correo, contraseña, estado);
    if(status){
        res.status(200).json({
            message: 'Usuario actualizado con éxito'
        });
    }else{
        res.status(500).json({
            error: message
        });
    }
};

exports.deleteUser = async (req, res) => {
    const {result, status, message} = await Usuario.delete(req.params.id);
    if(status){
        res.status(200).json({
            message: 'Usuario eliminado con éxito'
        });
    }else{
        res.status(500).json({
            error: message
        });
    }
};

exports.login = async (req, res) => {
    const {correo, contraseña} = req.body;
    const conditions = {
        fields: ['correo', 'contraseña'],
        values: [correo, contraseña]
    }
    
    const {result, status, message} = await Usuario.get([], conditions);

    if(status){
        if(result != null && result.length > 0){
            let qrStatus = true;

            if( result[0].secret == null || result[0].secret == ""){ 
                qrStatus = false;
                result[0].secret = UserService.getSecret();
                const { id_usuario, id_rol, id_empleado, id_rfid, correo, contraseña, estado, secret } = result[0];
                const result_ = await Usuario.update(id_usuario, [id_rol, id_empleado, id_rfid, correo, contraseña, estado, secret]);

                if(!result_.status){
                    console.log(result_.message);
                    res.status(500).json({
                        status: false,
                        message: 'Error Interno'
                    });
                }
            }

            const empleado = await Empleado.getById(result[0].id_empleado);

            res.status(200).json({
                user: {...result[0], nombres: empleado.result[0].nombres},
                status: true,
                qrStatus,
                message: `Bienvenido al sistema de asistencia`,
            });
        }else{
            res.status(200).json({
                status: false,
                message: 'Credenciales erróneas'
            });
        }
    }else{
        res.status(500).json({
            error: message
        });
    }
};

exports.getQr = async(req, res) => {
    const { email, secret } = req.body;
    try{
        const url = await UserService.generateQrLink(email, secret);

        res.status(200).json({
            url,
            message: 'Qr generado',
        });
    }catch( error ) {
        res.status(500).json({
            url: null,
            message: 'Error al generar el qr',
        });
    }
}

exports.compareToken = (req, res) => {

    const { code, secret } = req.body;

    const status = UserService.equalToken(code, secret);

    let message = status ? 'Código válido!' : 'Código incorrecto';

    res.status(200).json({
        status,
        message
    });
}