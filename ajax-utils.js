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
    ajaxUtils.sendGetRequest = function (requestUrl, responseHandler) {
        var request = getRequestObject();
        request.onreadystatechange = function () {
            handleResponse(request, responseHandler);
        };
        request.open("GET", requestUrl, true);
        request.send(null); //For POST only
    };

    /*Ony calls user provided 'responseHandler function if response is 
    ready and not an error*/
    function handleResponse (request, responseHandler) {
        if ((request.readyState == 4) && (request.status == 200)) {
            responseHandler(request);
        }
    }

    //Expose utility tothe global object
    global.$ajaxUtils = ajaxUtils;
    
})(window);