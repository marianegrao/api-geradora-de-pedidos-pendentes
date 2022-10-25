const calculateAmountOfRequestById = require("./calculateAmountOfRequestById");

function listPendingItems(pendingItems, listOfRequests) {
	let listOfPendingItems = [];

	for (const item of pendingItems) {
		let pedido = {
			id_pedido: item.id_pedido,
			valor_total: calculateAmountOfRequestById(listOfRequests, item.id_pedido),
			saldo_valor: 0,
			itens: [],
		};

		const itemFound = listOfPendingItems.find((i) => {
			return i.id_pedido === item.id_pedido;
		});

		if (itemFound) {
			itemFound.itens.push(item.item);
			itemFound.saldo_valor += item.item.valor_total_produto;
		} else {
			pedido.saldo_valor += item.item.valor_total_produto;
			pedido.itens.push(item.item);
			listOfPendingItems.push(pedido);
		}
	}
	return listOfPendingItems;
}

module.exports = listPendingItems;
