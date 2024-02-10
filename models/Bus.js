const createModel = require("../data_base/createModel");

const Bus = createModel('BUS', [
    'IDBUS',
    'PLACA',
    'MARCA',
    'FECHACOMPRA',
    'NUMASIENTOS',
    'MODELOANIO',
    'KILOMETRAJE',
    'ESTADO',
]);

module.exports = Bus;