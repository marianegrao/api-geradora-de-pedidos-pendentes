const createPendingRequestsFile = require("../utils/createPendingRequestsFile");
const listPendingRequest = require("../utils/listPendingRequest");

const showPendingRequets = async (req, res) => {
	try {
		const response = await listPendingRequest();

		if (response.error) {
			return res.status(400).json(response.message);
		}

		return res.status(200).json(response.listOfPendingItems);
	} catch (error) {
		return res.status(500).json(error);
	}
};

const registerPendingRequests = async (req, res) => {
	try {
		await createPendingRequestsFile("./src/data/PedidosPendentes.txt");

		return res
			.status(200)
			.json("Pedidos pendentes foram registrados em arquivo txt");
	} catch (error) {
		return res.status(500).json(error.message);
	}
};

module.exports = { showPendingRequets, registerPendingRequests };
