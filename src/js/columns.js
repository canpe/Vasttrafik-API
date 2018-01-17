function Columns(){

    this.getDepartureBoardColumns = function(){
        var columns = [];
        columns.push(getIconColumn());
        columns.push(getTransportTypeColumn());
        columns.push(getDirectionColumn());
        columns.push(getDepartureColumn());
        columns.push(getStopColumn());
        columns.push(getTrackColumn());
        return columns;
    };

    var getIconColumn = function(){
        return {
            field: "sname",
            title: "Line",
            template: getIconElement,
            width: 80,
        }
    };

    var getTransportTypeColumn = function(){
        return {
            field: "type",
            title: "Type",
            template: getTypeElement,
            width: 60,
        }
    };

    var getDepartureColumn = function(){
        return {
            field: "time",
            title: "Departure",
        }
    };

    var getDirectionColumn = function(){
        return {
            field: "direction",
            title: "Direction",
        }
    };

    var getStopColumn = function(){
        return {
            field: "stop",
            title: "Stop",
        }
    };

    var getTrackColumn = function(){
        return {
            field: "track",
            title: "Track",
            width: 60,
        }
    };

    var getIconElement = function(dataItem){
        var fgColorCSS = "background-color:" + dataItem.fgColor + "; ";
        var bgColorCSS = "color:" + dataItem.bgColor + "; ";
        var style =  fgColorCSS + bgColorCSS;
        return "<span class='k-icon-custom' style='" + style + "'>" + dataItem.sname  + "</span>"; 
    };

    var getTypeElement = function(dataItem){
        var typeElement = "";
        if (dataItem.type == "BUS") typeElement += "<span class='icon-bus'></span>";
        if (dataItem.type == "TRAM") typeElement += "<span class='icon-train2'></span>";
        if (dataItem.type == "LDT" || dataItem.type == "REG") typeElement += "<span class='icon-train'></span>";
        if (dataItem.type == "BOAT") typeElement += "<span class='icon-ship'></span>";
        if (dataItem.type == "TAXI") typeElement += "<span class='icon-car2'></span>";
        if (dataItem.accessibility == "wheelChair") typeElement += "<span class='icon-wheelchair'></span>";
        return typeElement;
    };

}