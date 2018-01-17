function Grid(){
	
	var $aToken = $("#access-token");
    var $grid = $("#qlo-grid");
	var $button = $("#qlo-button");
	var $dateTime = $("#qlo-dateTime");
	var $searchText = $("#qlo-input");
	var vAPI = new VasttrafikAPI();
	var gridColumns = new Columns();
	var locationId = 0;
	
	var init = function (){
		bindAutoComplete();
		bindDateTime();
		bindButton();
	};

	var bindAutoComplete = function(){
		$searchText.kendoAutoComplete({
			minLength: 2,
			enforceMinLength: true,
			placeholder: "Enter station name...",
			dataTextField: "name",
			dataSource: getLocationDataSource(),
			template: getLocationDataItemTemplate,
			//close: function(e) { e.preventDefault(); },
			select: function(e) {
				locationId = e.dataItem.id || 0;
			},
		});
	};
	
	var getLocationDataSource = function() {
		return new kendo.data.DataSource({
			serverFiltering: true,
			transport: {
				read: function(options) {
					var params = { input: options.data.filter.filters[0].value };
					vAPI.getLocationsByName(params, options.success);
				},
			},
			schema: {
				data: function(result) {
				  return $.merge(result.stops, result.cordinates); 
				},  
			},
		}); 
	};

	var getLocationDataItemTemplate = function(dataItem){
		var typeElement = "";
        if (dataItem.type == "ADR") typeElement += "<span class='icon-home2'></span>";
		else if (dataItem.type == "POI") typeElement += "<span class='icon-city'></span>";
		else typeElement += "<span class='icon-pushpin2'></span>";
		return typeElement + "<span>" + dataItem.name + "</span>"; 
	};

	var bindDateTime = function(){
		$dateTime.kendoDateTimePicker({          
			value: new Date(),
			dateInput: true,
			timeFormat: "HH:mm",
			format: "yyyy-MM-dd HH:mm",
		});
	};
	
	var bindButton = function(){
		$button.kendoButton({
			click: onButtonClick,
		});
	};
	
	var onButtonClick = function (){
		var dateValue =  formatDate($dateTime.data("kendoDateTimePicker").value());
		var timeValue =  formatTime($dateTime.data("kendoDateTimePicker").value());
		var params = { 
			date: dateValue, 
			id: locationId, 
			time: timeValue,
		};
		
		if (locationId > 0){
			vAPI.getDepartureBoard(params, bindGrid);
		}
		else{
			kendo.alert("Please select a location!");
		}
	};
	
	var formatDate = function (date){
        var month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear();

		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;

		return [year, month, day].join('-');
	}
	
	var formatTime = function (date){
        var hour = '' + date.getHours(),
        minutes = '' + date.getMinutes();

		if (hour.length < 2) hour = '0' + hour;
		if (minutes.length < 2) minutes = '0' + minutes;

		return [hour, minutes].join(':');
	}
	
	var bindGrid = function (data){
		$grid.kendoGrid({
			dataSource: new kendo.data.DataSource({
				data: data,	
			}),
			columns: gridColumns.getDepartureBoardColumns(),
		}).data("kendoGrid");
	};
	
	init();
}