var budgetController = (function() {

	var Input = function (id, type, description, value) {
		this.id = id;
		this.type = type;
		this.description = description;
		this.value = value;
	};

	var setIds = function (type) {
		var id = 0;
		if (data.allItems[type].length > 0) {
			id = data.allItems[type][data.allItems[type].length - 1].id + 1;
		}
		return id;
	};

	var dataController = function(input, action) {
		if (action === "add") {
			data.allItems[input.type].push(input);
			data.totals[input.type] += input.value;
		}
		else {
			data.allItems[input.type].splice(input.id, 1);
			data.totals[input.type] -= input.value;
		}
		data.percentage = data.totals.exp * 100 / data.totals.inc;
		data.budget = data.totals.inc - data.totals.exp;
	};

	data = {
		allItems : {
			exp : [],
			inc : []
		},
		totals : {
			exp : 0,
			inc : 0
		},
		budget : 0,
		percentage : 0
	};

	return {

		newInput : function (typ, des, val) {
			var id = setIds(typ);
			var input = new Input(id, typ, des, val);
			dataController(input, "add");
			return input;
		},

		deleteItem : function(val) {
			var output = data.allItems[val[0]][val[1]];
			dataController(output, "delete");
			return output;
		},

		getData : function() {
			return data;
		}

	};

}) ();
