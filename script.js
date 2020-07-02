//Event handling:JQuery function name is $
$(function (){ //same as document.addEventListener("DOMContentLoaded, ...")
    //same as document.querySelector("#navbarToggle").addEventListener("blur", ...)
    $("#navbarToggle").blur(function(event){
        var screenWidth = window.innerWidth;
        if (screenWidth < 768) {
            $("#collapsable-nav").collapse('hide');
        }
    });
});

(function (global) { //window Object

    var PixelR = {};

    var homeHTML = "snippets/home-snippet.html";
    
    var allCategoriesUrl = "http://davids-restaurant.herokuapp.com/categories.json";
    var categoriesTitleHTML = "snippets/categories-title-snippet.html";
    var categoryHTML = "snippets/category-snippet.html";

    var menuItemsUrl = "http://davids-restaurant.herokuapp.com/menu_items.json?category=";
    var menuItemsTitle = "snippets/menu-items-title.html";
    var menuItemsHTML = "snippets/menu-item.html";

    //convinience function for inserting innerHTML for 'select'
    var insertHTML = function (selector, html) {
        var targerElem = document.querySelector(selector);
        targerElem.innerHTML = html;
    };

    //show loading icon inside element identified by 'selector'
    var showLoading = function (selector) {
        var html = "<div class='text-center'>";
        html += "<img src='Images/ajax-loader.gif'</div>";
        insertHTML(selector, html);
    };

    //Return substitute of '{{propName}}' with propValue in given 'string'
    var insertProperty = function (string, propName, propValue) {
        var propToReplace = "{{"+propName+"}}";
        string = string.replace(new RegExp(propToReplace, "g"), propValue);
        return string;
    }

    //On page load (before images or CSS)
    document.addEventListener("DOMContentLoaded", function (event) {
        //on first load, show home view
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(homeHTML, function (responseText) {
            document.querySelector("#main-content")
                .innerHTML = responseText;
        }, false);
    });

    //load the menu categories view
    PixelR.loadMenuCategories = function () {
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            allCategoriesUrl,
            buildAndShowCategoriesHTML);
    };

    //Builds HTML for the categories page based on the data from the server
    function buildAndShowCategoriesHTML (categories) {
        //Load title snippet of categories page
        $ajaxUtils.sendGetRequest(
            categoriesTitleHTML,
            function (categoriesTitleHTML) {
            //Retrieve single category snippet
            $ajaxUtils.sendGetRequest(
                categoryHTML,
                function(categoryHTML) {
                var categoriesViewHTML = 
                    buildCategoriesViewHTML(
                        categories,
                        categoriesTitleHTML,
                        categoryHTML);
                insertHTML("#main-content", categoriesViewHTML);
            }, false);
        }, false);
    }

    //Using categories data and snippets html build categories view HTML
    //to be inserted into page
    function buildCategoriesViewHTML(categories,
                                    categoriesTitleHTML,
                                    categoryHTML) {
        var finalHTML = categoriesTitleHTML;
        finalHTML += "<section class='row'>";

        //Loop over categories
        for (var i=0; i<categories.length; i++) {
            //Insert category values
            var html = categoryHTML;
            var name = "" + categories[i].name;
            var short_name = categories[i].short_name;
            html = insertProperty(html, "name", name);
            html = insertProperty(html, "short_name", short_name);
            finalHTML += html;
        }
        finalHTML += "</section>";
        return finalHTML;
    }
    global.$PixelR = PixelR;
})(window);