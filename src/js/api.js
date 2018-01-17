function VasttrafikAPI (){

    var auth = new Auth();
    var expiredTime = null;
    var oAuth02 = "Bearer ";
	var baseURL = "https://api.vasttrafik.se/bin/rest.exe/v2";

    this.getLocationsByName = function (params, callback){
        var url = baseURL + "/location.name";
        sendRequest(url, params, function(data){
            var data = {
                cordinates: toArray(data["LocationList"].CoordLocation),
                stops: toArray(data["LocationList"].StopLocation),
            };
            if (callback !== undefined){
                callback(data);
            }
        });
    };

    this.getDepartureBoard = function (params, callback){
        var url = baseURL + "/departureBoard";
        sendRequest(url, params, function(data){
            var data = data["DepartureBoard"].Departure;
            if (callback !== undefined){
                callback(data);
            }
        });
    };

    var sendRequest = function(url, params, callback){
        $.extend(params, {format: "json"});
        checkExpired(function(){
            $.ajax({
                type: "GET",
                url: url,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", oAuth02);	
                },
                data: params,
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
        });
    };

    var checkExpired = function(callback){
        if ((new Date).getTime() >= expiredTime.getTime()){
            getAccessToken(callback);
        }
        else{
            if (callback !== undefined){
                callback();
            }
        }
    }

    var getAccessToken = function (callback){
        auth.getAccessToken(function (e){
            oAuth02 = e.token_type + " " + e.access_token;
            expiredTime = new Date((new Date()).getTime() + Number(e.expires_in) * 1000);
            if (callback !== undefined){
                callback();
            }
        });
    }

    var toArray = function(obj){
        if (obj !== undefined){
            return (obj instanceof Array) ? obj : new Array(obj);
        }
        return new Array()
    };

    var init = function(){
        getAccessToken();
    };

    init();
}