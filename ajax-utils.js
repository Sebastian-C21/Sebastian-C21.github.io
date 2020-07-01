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
        request.onreadystatechange = function
    };
})(window);