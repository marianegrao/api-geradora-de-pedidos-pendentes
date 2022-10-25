function readAllNotes(listOfNotes, allItemsInAnRequest) {
	for (const note of listOfNotes) {
		for (const noteData of note.data) {
			const itemFound = allItemsInAnRequest.find((i) => {
				return (
					i.item.número_item === noteData.número_item &&
					i.id_pedido === noteData.id_pedido
				);
			});
			if (itemFound) {
				itemFound.item.saldo_quantidade -= noteData.quantidade_produto;
				itemFound.item.valor_total_produto =
					itemFound.item.valor_unitário_produto *
					itemFound.item.saldo_quantidade;
			}
		}
	}
}

module.exports = readAllNotes;
