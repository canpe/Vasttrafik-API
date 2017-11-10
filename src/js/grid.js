function Grid(){
	
	var $aToken = $("#access-token");
    var $grid = $("#qlo-grid");
	var $button = $("#qlo-button");
	var $dateTime = $("#qlo-dateTime");
	var $dropdown = $("#qlo-dropdown");
	var auth02 = "Bearer ";
	var remoteDATAURL = "https://api.vasttrafik.se/bin/rest.exe/v2/departureBoard";
	var locationData = [
		{stopName:"Norra Gubberogatan", id:"9021014005040000"}, 
		{stopName:"Centralstationen", id:"9021014001950000"},
	];
	
	var init = function (){
		bindDropdown();
		bindDateTime();
		bindButton();
	};
	
	var bindDropdown = function (){
		$dropdown.kendoDropDownList({
            dataTextField: "stopName",
            dataValueField: "id",
			optionLabel: "Please Select!",
            dataSource: locationData,
            index: 0,
		});
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
		var locationId = Number($dropdown.data("kendoDropDownList").value());
		var dateValue =  formatDate($dateTime.data("kendoDateTimePicker").value());
		var timeValue =  formatTime($dateTime.data("kendoDateTimePicker").value());
		var requestData = { 
			date: dateValue, 
			id: locationId, 
			time: timeValue,
			format: "json",
		};
		
		if (locationId > 0){
			auth02 = auth02 + $aToken.val();
			getData(requestData);
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
	
	var getData = function (requestData){
		$.ajax({
            type: "GET",
            url: remoteDATAURL,
			beforeSend: function (xhr) {
				xhr.setRequestHeader("Authorization", auth02);	
			},
			data: requestData,
			dataType: "json",
            asyc: true,
            success: function (result){
				bindGrid(result);
			},
            error: function (xhr, ajaxOptions, thrownError) {
				kendo.alert(xhr.status + " " + thrownError);
			}
        });	
	}
	
	var bindGrid = function (data){
		// AJAX call with returning JSON object
		$grid.kendoGrid({
			dataSource: new kendo.data.DataSource({
				data: data["DepartureBoard"].Departure,
			})
		}).data("kendoGrid");
	};
	
	init();
}