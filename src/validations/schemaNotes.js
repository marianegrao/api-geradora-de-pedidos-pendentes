const yup = require("./settings");

const schemaNote = yup.object().shape({
	id_pedido: yup.number().required(),
	número_item: yup.number().positive().integer().required(),
	quantidade_produto: yup.number().positive().integer().required(),
});

module.exports = {
	schemaNote,
};
