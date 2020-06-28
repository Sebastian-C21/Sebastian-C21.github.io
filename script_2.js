(function (window) {
    var sebGreeter = {};
    sebGreeter.name = "Sebastian";
    var greeting = "Hi! ";
    sebGreeter.sayHi = function () {
        console.log(greeting+sebGreeter.name);
    }
    window.sebGreeter = sebGreeter;
})(window);
