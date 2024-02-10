const { selectAll, select, create, update, remove } = require("./functions");

const createModel = (table, fields) => {
    return {
        create: async (...values) => {
            const validFields = fields.slice(1);
            const results = await create(table, validFields, values[0]);
            return results;
        },
        getAll: async () => {
            const results = await selectAll(table);
            return results;
        },
        getById: async (id) => {
            const result = await selectAll(table, {
                fields: [fields[0]],
                values: [id]
            });
            return result;
        },
        get: async (fields, conditions = null) => {
            const result = await select(table, fields, conditions);
            return result;
        },
        update: async (id, ...values) => {
            const validFields = fields.slice(1);
            const conditions = {
                fields: [fields[0]],
                values: [id]
            };
            const result = await update(table, validFields, values[0], conditions);
            return result;
        },
        delete: async (id) => {
            const result = await remove(table, {
                fields: [fields[0]],
                values: [id]
            });
            return result;
        },
        inactivate: async (id) => {
            const result = await update(table, ['estado'], [0], {
                fields: [fields[0]],
                values: [id]
            });
            return result;
        },
    };
};

module.exports = createModel;