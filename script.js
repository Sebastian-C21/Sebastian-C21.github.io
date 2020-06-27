/*String Concatenation*/
console.log("** String Concatenation Below");
var string = "Hello";
string += " World";
console.log(string + "!");
/*Regular Operationa*/
console.log("** Regular Operations Below");
console.log((5+4)/3);
console.log(undefined/5)
function test1 (a) {
    console.log(a/5)
}
test1();
console.log("NaN means Not a Number, something went wrgon with the data");
/*Equality*/
console.log("** Equality Below");
var x=4, y=4;
if (x == y){
    console.log("x=4 is equal to y=4");
}
x = "4";
if (x == y) {
    console.log("x='4' is equal to y=4")
}
console.log("JavaScrip transforms the data automaticly before comparing the data");
/*Strict Equality*/
console.log("** Strict Equality Below");
if (x === y) {
    console.log("Strict:'4' is equal to 4");
}else {
    console.log("Strict:'4' is NOT equal to 4 ");
}
/*If statement (all false)*/
console.log("** If statement below (what's false on JS)");
if (false || null || undefined || "" || 0 || NaN) {
    console.log("This line won't even execute");
}else {
    console.log("All false");
}
/*If statement (all true)*/
console.log("** If statement below (what's true on JS)");
if (true && "hello" && 1 && -1 && "false") {
    console.log("All true");
}
/*Curly Braces Best practice con JS*/
console.log("** Curly Braces Best Practice on JS below");
function a()
{
    return
    {
        name: "Juan"
    };
}
function b() {
    return {
        name: "Juan"
    };
}
console.log(a());
console.log(b());
/*For Loop */
console.log("For Loop below");
var sum = 0;
for (var i=0; i<10; i++) {
    console.log(i)
    sum = sum + i;
}
console.log("Sum of 0 through 9 is: " + sum);
/*Default Values */
console.log("** Default Values Below")
function orderChickenWith(sideDish) {
    sideDish = sideDish || "no dish selected!";
    console.log("Chicken with " + sideDish);
}
orderChickenWith("noodles");
orderChickenWith();
/*How to Create and add properties to and object */
console.log("** Creating Objects With Values Below");
var company = new Object();/*Object Creation */
company.name = "Pixel Restaurant"; /*When assigned a value to a property, the property gets created*/
company.ceo = new Object();
company.ceo.name = "Juan C.";
company.ceo.favColor = "Red";

console.log(company);
console.log("Pixel Restauran CEO is " + company.ceo.name +
" and its favorite color is " + company.ceo.favColor + "!");

console.log(company["name"]);
console.log(company.ceo["name"]);

company.warehouse = new Object();
var stockProp = "Stock of company";
company.warehouse[stockProp] = 123456;

console.log(company.warehouse["Stock of company"]);
/*Better Way: Object Literal */
console.log("** Better way: Object literal")
var P_Restaurant = {
    name: "Pixel Resturant",
    ceo: {
        name: "Juan C.",
        favColor: "Red"
    },
    warehouse: {
        "stock of company": 123456
    }
};

console.log(P_Restaurant);
console.log(P_Restaurant.ceo.name);
/*Starting Functions (explained): functions on JS are objects */
function multiply (x, y) {
    return x * y;
}
multiply.version = "v.1.0.0";
console.log(multiply);
console.log(multiply.toString());
console.log("multiply function version is " + multiply.version + "!");
console.log(multiply(1,2))
var result = multiply(3,2);
console.log(result);

/*Function Factory */
console.log("** Function inside another function")
function makeMultiplier(multiplier) {
    console.log("Value of multiplier = "+multiplier)
    var myfunc = function (x) {
        console.log("Value of x = "+x)
        return multiplier * x;
    };
    return myfunc;
}
var multiplyBy3 = makeMultiplier(3);
console.log(multiplyBy3(10));

var doubleAll = makeMultiplier(2);
console.log(doubleAll(100));

/*Passing Functions as Arguments */
console.log("** Passing Functions as Arguments")
function doOperationOn (x, operation) {
    console.log("The value of x is "+x);
    console.log("The value of operation is "+operation);
    return operation(x);
}
var result_1 = doOperationOn(5, multiplyBy3);
console.log(result_1);

//Copying by value
console.log("** Copying by value");
var a = 7;
var b = a;
console.log("a: "+a);
console.log("b: "+b);
b = 5;
console.log("after b update: ");
console.log("a: "+a);
console.log("b: "+b);

//Copying by reference
console.log("** Copying by reference");
var c = { x:7 };
var d = c;
console.log(c);
console.log(d);
d.x = 3;
console.log("After d.x update:");
console.log(c);
console.log(d);
//Passing value into function calls (Passing by value vs Passing by reference)
console.log("** Passing by value");
function changePrimitive (primValue) {
    console.log("in changePrimitive...");
    console.log("before: "+primValue);

    primValue = 5;
    console.log("after: "+primValue);
}
var value = 7;
changePrimitive(value); //primValue = value
console.log("after changePrimitive, original value of value: "+value);

//Passing values by reference
console.log("** Passing by reference");
function changeObject (objVal) {
    console.log("in changeObject...");
    console.log("before:");
    console.log(objVal);

    objVal.x = 9;
    console.log("after: ");
    console.log(objVal);
}
var value_1 = {x:2};
changeObject(value_1); //objVal = value_1
console.log("after changeObject, orignial value of value_1:");
console.log(value_1);