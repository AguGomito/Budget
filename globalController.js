var globalController = (function (budgetCtrl, uictrl) {

	var dom = uictrl.getDOMstrings();

	document.querySelector(dom.inputBtn).addEventListener('click', addNewItem);

	document.addEventListener('keypress', function(event) {
		if (event.keyCode === 13) {
			addNewItem();
		}
	});

	function addNewItem() {
		var inputValues = uictrl.newInputValues();
		if (inputValues.description !== "" && !isNaN(inputValues.value)) {
			var newInput = budgetCtrl.newInput(inputValues.type, inputValues.description, inputValues.value);
			uictrl.addNewEntries(newInput);
			uictrl.numbToString(budgetCtrl.getData());
			uictrl.resetInputValues();
		}
	};

	document.querySelector(dom.container).addEventListener('click', function(event) {
		var value = event.target.parentNode.parentNode.parentNode.parentNode.id;
		console.log(value);
		var output = budgetCtrl.deleteItem(value.split('-'));
		uictrl.numbToString(budgetCtrl.getData());
		uictrl.deleteEntry(value);
	});

	return {

		init : function () {
			uictrl.numbToString(budgetCtrl.getData());
		}

	};

}) (budgetController, UIController);


globalController.init();
