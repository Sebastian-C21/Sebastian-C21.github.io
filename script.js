// function constructors and 'this'
console.log("** Functions constructors below");
function Circle (radius) { //nothing can be returned from the function constructor
    //Method = functions set on properties of objects
    this.radius = radius;
    //If getArea is putted in here it would create the functions everytime
    //A circle is created, overwriting the memory space (wasted processing)
}
//Prototype is used when a function is not used as a methos of all objects created
Circle.prototype.getArea = function () {
    return Math.PI * Math.pow(this.radius, 2);
};
//getArea is the SAME location in memory for all objects
var myCircle = new Circle(10); //Creates a new object by executing the function
console.log(myCircle.getArea());

var myOtherCircle = new Circle(30);
console.log(myOtherCircle);

//functions literals and 'this'
console.log("** Functions literals below");
var litetalCircle = {
    radius: 10,

    getArea: function () {
        var self = this; //this avoid that when 'this' is used in increaseRadius
        //the radius is updated in the windows global object
        console.log(this);

        var increaseRadius = function () {
           self.radius = 20;
        };

        increaseRadius();
        console.log(this.radius);

        return Math.PI * Math.pow(this.radius, 2);
    }
};

console.log(litetalCircle.getArea());