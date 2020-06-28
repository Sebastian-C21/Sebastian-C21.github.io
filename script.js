sebGreeter.sayHi();
juanGreeter.sayHi();

//immediately invoked functions expression. (IIFE)
//It allows the code inside the function don't conflict with the global code
console.log("** Example of IIFE below");
(function (namee) {
    console.log("I love "+namee);
})("Pixels");