function Auth(){

    var remoteURL = "https://api.vasttrafik.se/token";
    // key:secret encoded base64 string
    var keyAndSecret = "OURER2hOZmMzdkRVRUNEV2t5Z0lHbHlDVkJVYTpUdGpscUpWNmJJUTFHTXBCMDBhZTNUMVlwVmth";
    var basic = "Basic " + keyAndSecret;

    this.getAccessToken = function (callback){
        var requestData = {
            grant_type: "client_credentials",
            scope: "device_0001",
            format: "json",
        };
        $.ajax({
            type: "POST",
            url: remoteURL,
			beforeSend: function (xhr) {
				xhr.setRequestHeader("Authorization", basic);	
			},
			data: requestData,
			dataType: "json",
            asyc: true,
            success: function (result){
				if (callback !== undefined){
                    callback(result);
                }
			},
            error: function (xhr, ajaxOptions, thrownError) {
				kendo.alert(xhr.status + " " + thrownError);
			}
        });	
    };
}