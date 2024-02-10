const Bus = require("../models/Bus");

exports.getBuses = async(req, res) => {
    const {result, status, message} = await Bus.getAll();
    if(status){
        res.status(200).json(result);
    }else{
        res.status(500).json({
            error: message
        });
    }
}

exports.addBus = async (req, res) => {
    const { PLACA, MARCA, FECHACOMPRA, NUMASIENTOS, MODELOANIO, KILOMETRAJE, ESTADO } = req.body;
    const {result, status, message} = await Bus.create([PLACA, MARCA, FECHACOMPRA, NUMASIENTOS, MODELOANIO, KILOMETRAJE, ESTADO]);
    if(status){
        res.status(200).json({
            message: 'Bus añadido con éxito'
        });
    }else{
        res.status(500).json({
            error: message
        });
    }
};

exports.updateBus = async (req, res) => {
    const { IDBUS, PLACA, MARCA, FECHACOMPRA, NUMASIENTOS, MODELOANIO, KILOMETRAJE, ESTADO } = req.body;
    const {result, status, message} = await Bus.update(IDBUS, [PLACA, MARCA, FECHACOMPRA, NUMASIENTOS, MODELOANIO, KILOMETRAJE, ESTADO]);
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

exports.deleteBus = async (req, res) => {
    const {result, status, message} = await Bus.delete(req.params.id);
    if(status){
        res.status(200).json({
            message: 'Bus eliminado con éxito'
        });
    }else{
        res.status(500).json({
            error: message
        });
    }
};
