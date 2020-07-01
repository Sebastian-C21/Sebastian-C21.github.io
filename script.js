//Event handling
document.addEventListener("DOMContentLoaded",
    function (event) {

        //Unobstrusive event binding
        document.querySelector("button")
            .addEventListener("click", function() {
                var self = this;
                var name = "";

                //Call server to get the name
                $ajaxUtils
                    .sendGetRequest("/5_W/name.txt",
                        function(request) {
                            self.name = request.responseText;
                            
                            document.querySelector("#content")
                                .innerHTML = "Hello " + self.name;
                        });
            });
    }
);