(function (global) {
    //Set up a namespace for utility
    var ajaxUtils = {};

    //Return an HTTP request Object
    function getRequestObject () {
        if (window.XMLHttpRequest) {
            return (new XMLHttpRequest());
        }
        else if (window.ActiveXObject) {
            return (new ActiveXObject("Microsoft.XMLHTTP"));
        }
        else {
            global.alert("Ajax is not supported!");
            return (null);
        }
    }

    //Makes an Ajax GET request to 'requestUrl'
    ajaxUtils.sendGetRequest = function (requestUrl, responseHandler, isJsonResponse) {
        var request = getRequestObject();
        request.onreadystatechange = function () {
            handleResponse(request, responseHandler, isJsonResponse);
        };
        request.open("GET", requestUrl, true);
        request.send(null); //For POST only
    };

    /*Ony calls user provided 'responseHandler function if response is 
    ready and not an error*/
    function handleResponse (request, responseHandler, isJsonResponse) {
        if ((request.readyState == 4) && (request.status == 200)) {
            //Default to isJsonResponse = true
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

    //Expose utility tothe global object
    global.$ajaxUtils = ajaxUtils;

})(window);