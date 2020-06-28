(function (window) {
    var juanGreeter = {}; //Creating an object
    juanGreeter.name = "Juan";
    var greeting = "Hello! ";
    juanGreeter.sayHi = function () {
        console.log(greeting+juanGreeter.name);
    }
    window.juanGreeter = juanGreeter; /*Expose this private function with its own parameters
    to the window object so it can be called anytime*/
})(window);