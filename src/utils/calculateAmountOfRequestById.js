function calculateAmountOfRequestById(listOfRequests, id) {
	let amountOfRequest = 0;
	for (const request of listOfRequests) {
		if (request.id === id) {
			for (const requestData of request.data) {
				amountOfRequest +=
					requestData.valor_unitário_produto * requestData.quantidade_produto;
			}
		}
	}
	return amountOfRequest;
}

module.exports = calculateAmountOfRequestById;
