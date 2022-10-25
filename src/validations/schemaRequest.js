const yup = require("./settings");

const schemaRequest = yup.object().shape({
	número_item: yup.number().positive().integer().required(),
	código_produto: yup.string().required(),
	quantidade_produto: yup.number().positive().integer().required(),
	valor_unitário_produto: yup.number().positive().required(),
});

module.exports = {
	schemaRequest,
};
