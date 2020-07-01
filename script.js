//Event handling
document.addEventListener("DOMContentLoaded",
    function (event) {

        //Unobstrusive event binding
        document.querySelector("button")
            .addEventListener("click", function() {

                //Call server to get the name
                $ajaxUtils
                    .sendGetRequest("/5_W/name.json",
                        function(res) {
                            var message = "Hello " + res.firstName + " " +
                                res.lastName + " i know you ";
                                if (res.likesChineseFood) {
                                    message += "like Chinese Food! and ";
                                }else {
                                    message += "don't like Chinese food! and ";
                                }
                                message += "that you have " + res.numberOfDisplays +
                                    " displays to code! keep it up!";
                            document.querySelector("#content")
                                .innerHTML = "<h2>"+  message + "</h2>";
                        });
            });
    }
);