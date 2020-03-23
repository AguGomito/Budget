var UIController = (function () {

	var domElements = {
		budgetTitleMonth : '.budget__title--month',
		budgetValue : '.budget__value',
		budgetIncomeValue : '.budget__income--value',
		budgetExpensesValue : '.budget__expenses--value',
		budgetExpensesPercetage : '.budget__expenses--percentage',
		inputType : '.add__type',
		inputDescription : '.add__description',
		inputValue : '.add__value',
		inputBtn : '.add__btn',
		incomeList : '.income__list',
		expenseList : '.expenses__list',
		container : '.container',
	};

	var formatNumber = function(num, typ) {
		num = Math.abs(num);
		num = num.toFixed(2);
		num = num.toString();

		var numSplit = num.split(".");
		var int = numSplit[0];

		var div = [];
		var j = 0;
		for (var i = 0; i < int.length; i++) {
			if (int[j] >= 0) {
				div[i] = [int[int.length - (j+3)], int[int.length - (j+2)], int[int.length - (j+1)]];
				j += 3;
			}
		}

		var final = "";
		for (var i = div.length - 1; i >= 0; i--) {
			if (i > 0) {
				final += formatValue(div[i]) + ",";
			}
			else {
				final += formatValue(div[i]) + "." + numSplit[1];
			}
		}

		typ === "inc" ? final = "+ " + final : final = "- " + final;
		return final;
	};

	var formatValue = function(num) {
		return num.toString().replace(/,/gi, "");
	};

	var getMonth = function () {
		var date = new Date();
		date.getMonth();
		var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		return months[date.getMonth()] + ", " + date.getFullYear();
	};

	var formatPercentage = function (data) {
		var percentage = (Math.round(data.totals.exp * 100 / data.totals.inc));
		if (isNaN(percentage) || percentage > 100 ) {
			return "---";
		}
		return percentage + " %";
	};

	var displayBudget = function(data) {
		document.querySelector(domElements.budgetTitleMonth).textContent = (getMonth()) ;
		document.querySelector(domElements.budgetValue).textContent = formatNumber(data.budget, (data.totals.inc - data.totals.exp) > 0 ? "inc" : "exp");
		document.querySelector(domElements.budgetIncomeValue).textContent = formatNumber(data.totals.inc, "inc");
		document.querySelector(domElements.budgetExpensesValue).textContent = formatNumber(data.totals.exp, "exp");
		document.querySelector(domElements.budgetExpensesPercetage).textContent = formatPercentage(data);
	};

	var newIncomeHtml = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
	var newExpenseHtml = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

	return {

		newInputValues : function() {
			return {
				type : document.querySelector(domElements.inputType).value,
				description : document.querySelector(domElements.inputDescription).value,
				value : parseFloat(document.querySelector(domElements.inputValue).value)
			}
		},

		resetInputValues : function() {
			document.querySelector(domElements.inputDescription).value = "",
			document.querySelector(domElements.inputValue).value = ""
		},

		addNewEntries : function(newInput) {
			if (newInput.type === 'inc') {
				var newHtml = newIncomeHtml.replace('%id%', newInput.id);
				newHtml = newHtml.replace('%description%', newInput.description);
				newHtml = newHtml.replace('%value%', formatNumber(newInput.value, newInput.type));
				document.querySelector(domElements.incomeList).insertAdjacentHTML('beforeend', newHtml);
			}
			else {
				var newHtml = newExpenseHtml.replace('%id%', newInput.id);
				newHtml = newHtml.replace('%description%', newInput.description);
				newHtml = newHtml.replace('%value%', formatNumber(newInput.value, newInput.type));
				document.querySelector(domElements.expenseList).insertAdjacentHTML('beforeend', newHtml);
			}
		},

		deleteEntry : function(value) {
			var el = document.getElementById(value);
			console.log(el);
			el.parentNode.removeChild(el);
		},

		numbToString : function (data) {
			displayBudget(data);
		},

		getDOMstrings : function () {
			return domElements;
		}

	};

}) ();
