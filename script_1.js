(function (global){
    //Set up a namespace for utility
    var ajaxUtils = {};

    //Returns HTTP request object
    function getRequestObject () {
        if (window.XMLHttpRequest) {
            return (new XMLHttpRequest());
        }
        else {
            global.alert("Ajax is not supported!");
        }
    }
    //Makes an Ajax GET request to 'requestUrl'
    ajaxUtils.sendGetRequest = function (requestUrl, responseHandler, isJsonResponse) {
        var request = getRequestObject();
        request.onreadystatechange = function () {
            handleResponse(request, responseHandler, isJsonResponse);
        };
        request.open("GET", requestUrl, true);
        requestUrl.send(null); //for POST only
    };

    /*Only calls user provided 'responseHandler'
    function if response is ready and not an error*/
    function handleResponse(request, responseHandler, isJsonResponse) {
        if ((request.readyState == 4)&&(request.status == 200)) {
            //Default is to isJsonResponsive = true
            if (isJsonResponse == undefined) {
                isJsonResponse = true;
            }
            if (isJsonResponse) {
                responseHandler(JSON.parse(request.responseText));
            }
            else {
                responseHandler(request.responseText);
            }
        }
    }

    //Expose utility to the global object
    global.$ajaxUtils = ajaxUtils;
});