const db = require('../config/db')

const selectAll = async(table, conditions = null) => {

    conditionsString = conditions === null ? '' : setConditions(conditions);

    if(conditionsString || conditionsString === ''){
        const query = `SELECT * FROM ${table} ${conditionsString}`;
        try{
            const result = await db.query(query);
            return results(result, true, 'Selección correcta');
        }catch (err){
            return results(null, false, `Error al obtener los datos: ${err.message}`);
        }
    }else{
        return results([], false, 'Condiciones incorrectas');
    }
}

const select = async(table, fields = [], conditions = null) => {
    if(fields.length > 0){
        conditionsString = conditions === null ? '' : setConditions(conditions);
        if(conditionsString || conditionsString === ''){

            let fieldsString = '';

            fields.forEach((field, index) => {
                fieldsString += index === (fields.length - 1) ? field : `${field}, `;
            });

            const query = `SELECT ${fieldsString} FROM ${table} ${conditionsString}`;

            try{
                const result = await db.query(query);
                return results(result, true, 'Selección correcta');
            }catch (err){
                return results(null, false, `Error al obtener los datos: ${err.message}`);
            }
        }else{
            return results(null, false, 'Condiciones incorrectas');
        }
    }else{
        return selectAll(table, conditions);
    }
}

const create = async(table, fields, values) => {
    if(fields.length > 0 && values.length > 0 && fields.length === values.length){
        let query = `INSERT INTO ${table} (`;
        fields.forEach((field, index) => {
            query += index === (fields.length - 1) ? field + ')' : field + ',';
        });
        query += ' VALUES ('
        values.forEach((value, index) => {
            query += index === (values.length - 1) ? `'${value}' )` : `'${value}', `;
        });

        console.log(query);

        try {
            const result = await db.query(query);
            return results(result, true, 'Elemento añadido correctamente');
        }catch (err){
            return results(null, false, `Error al añadir el elemento: ${err.message}`);
        }

    }else{
        return results(null, false, 'Parámetros incorrectos');
    }

}

const update = async(table, fields, values, conditions) => {
    if(fields.length > 0 && values.length > 0 && fields.length === values.length){
        
        const condtionsString = setConditions(conditions);

        if(condtionsString){

            let fieldsString = '';

            fields.forEach((field, index) => {
                fieldsString += `${field} = '${values[index]}'`;
                fieldsString += index === (fields.length - 1) ? '' : ', ';
            });

            const query = `UPDATE ${table} SET ${fieldsString} ${condtionsString}`;

            console.log(query);

            try {
                const result = await db.query(query);
                return results(result, true, 'Elemento actualizado correctamente');
            } catch (err) {
                return results(null, false, `Error al actualizar el elemento: ${err.message}`);
            }
        }else{
            return results(null, false, 'Condiciones incorrectas');
        }
    }else{
        return results(null, false, 'Parámetros incorrectos');
    }
}

const remove = async(table, conditions) => {
    if(conditions){

        const conditionsString = setConditions(conditions);

        if(conditionsString){

            const query = `DELETE FROM ${table} ${conditionsString}`;

            try{
                const result = db.query(query);
                return results(result, true, 'Elemento eliminado correctamente');
            }catch (err){
                return results(null, false, `Error al eliminar el elemento: ${err.message}`);
            }
        }else{
            return results(null, false, 'Condiciones incorrectas');
        }
    }else{
        return results(null, false, 'Condiciones incorrectas');
    }
}

const raw = async(query) => {
    try{
        const result = await db.query(query);
        return results(result, true, 'Sentencia ejecutada correctamente');
    }catch (err){
        return results(null, false, `Error al ejectuar la sentencia: ${err.message}`);
    }
}

const setConditions = ({fields, values, types = []}) => {
    if(fields && values && fields.length === values.length){
        
        let conditionsString = 'WHERE ';

        fields.forEach((field, index) => {
            if(types.length === fields.length){
                conditionsString += index === 0 ? `${field} = '${values[index]}'` : `${types[index]} ${field} = '${values[index]}'`;
            }else{
                conditionsString += index === 0 ? `${field} = '${values[index]}'` : `AND ${field} = '${values[index]}'`;
            }
            conditionsString += index === (fields.length - 1) ? '' : ' ';
        });

        return conditionsString;
    }else{
        return null;
    }
}

const results = (result, status, message) => ({result,status,message})

module.exports = { selectAll, select, create, update, remove, raw }