const createPendingRequestsFile = require("../utils/createPendingRequestsFile");
const listPendingRequest = require("../utils/listPendingRequest");

const showPendingRequets = async (req, res) => {
	try {
		const pendingRequets = await listPendingRequest();
		if (!pendingRequets) {
			return res.status(400).json("Não foi possível listar pedidos pendentes.");
		}

		return res.status(200).json(pendingRequets);
	} catch (error) {
		return res.status(500).json(error.message);
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
