/*
console.log(document.getElementById("title"));
//Special object document (HTMLDocyment -> different methos to manipulate the webpage)
console.log(document instanceof HTMLDocument);
*/
document.addEventListener("DOMContentLoaded",//runs the function where HTML elements are loaded

    function (event) {//Start assigning different events

        function sayHello (event) {
            console.log(event);

            this.textContent = "Said It!";
            var name = document.getElementById("name").value;
            //.value gets te value of the id selected
            var message = "<h2>Hello "+name+"!</h2>";
        
            document
                .getElementById("content")
                .innerHTML = message;
                //textContent inserts text on an element
                //innerHTML tells the browser to render what innerHTML assigned
            if (name === "student") {
                var title =
                    document
                        .querySelector("#title")
                        //instead of using getElementById, use querySelector();
                        //and use CSS selector notation
                        .textContent; //textContent is the title
                        title = title + " & Lovin' it";
                    document
                        .querySelector("h1")
                        .textContent = title;
            }
        }
        
        //Unobstrusive event binding
        document.querySelector("button")
            //.onclick = sayHello;
            .addEventListener("click", sayHello);

        document.querySelector("body")
            .addEventListener("mousemove", 
                function showMove (event) {
                    if (event.shiftKey === true) {
                        console.log("x: "+event.clientX);
                        console.log("y: "+event.clientY);
                    }
                }
            );
    }
);