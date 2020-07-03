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
    var menuItemsTitleHTML = "snippets/menu-items-title.html";
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

    //Remove the class 'active' from home and switch to Menu Button
    var switchMenuToActive = function () {
        //Remove 'active' from home button
        var classes = document.querySelector("#navHomeButton").className;
        classes = classes.replace(new RegExp("active", "g"), "");
        document.querySelector("#navHomeButton").className = classes;

        //Add 'active' to menu button if not already there
        classes = document.querySelector("#navMenuButton").className;
        if (classes.indexOf("active") == -1) {
            classes += " active";
            document.querySelector("#navMenuButton").className = classes;
        }
    };

    //On page load (before images or CSS)
    document.addEventListener("DOMContentLoaded", function (event) {
        //on first load, show home view
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(homeHTML, function (responseText) {
            document.querySelector("#main-content")
                .innerHTML = responseText;
        },
        false);
    });

    //load the menu categories view
    PixelR.loadMenuCategories = function () {
        switchMenuToActive();
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            allCategoriesUrl,
            buildAndShowCategoriesHTML);
    };

    //Load the menu items view
    //'CategoryShort' is a short_name for a category
    PixelR.loadMenuItems = function (CategoryShort) {
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            menuItemsUrl + CategoryShort,
            buildAndShowMenuItemsHTML);
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
            },
            false);
        },
        false);
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

    //Builds HTML for the single category page based on the data
    //from the server
    function buildAndShowMenuItemsHTML (categoryMenuItems) {
        //Load title snippet of menu items page
        $ajaxUtils.sendGetRequest(
            menuItemsTitleHTML,
            function (menuItemsTitleHTML){
                //Retrieve single menu item snippet
                $ajaxUtils.sendGetRequest(
                    menuItemsHTML,
                    function (menuItemsHTML){
                        var menuItemsViewHTML = buildMenuItemsViewHTML(
                            categoryMenuItems,
                            menuItemsTitleHTML,
                            menuItemsHTML);
                            insertHTML("#main-content", menuItemsViewHTML);
                    },
                    false);
            }, 
            false);
    }

    //Using Category and menu items data and snippets html
    //Build menu items view htmk to be inserted into the page
    function buildMenuItemsViewHTML (categoryMenuItems,
                                    menuItemsTitleHTML,
                                    menuItemsHTML) {
        menuItemsTitleHTML = insertProperty(menuItemsTitleHTML,
                                            "name",
                                            categoryMenuItems.category.name);
        menuItemsTitleHTML = insertProperty(menuItemsTitleHTML,
                                            "special_instructions",
                                            categoryMenuItems.category.special_instructions);
        var finalHTML = menuItemsTitleHTML;
        finalHTML += "<section class='row'>";

        //Loop over menu items
        var menuItems = categoryMenuItems.menu_items;
        var catShortName = categoryMenuItems.category.short_name;
        for (var i=0; i< menuItems.length; i++) {
            //insert menu items values
            var html = menuItemsHTML;

            html = 
            insertProperty(html, "short_name", menuItems[i].short_name);

            html =
            insertProperty(html, "catShortName", catShortName);

            html =
            insertItemPrice(html, "price_small", menuItems[i].price_small);

            html =
            insertItemPortionName(html, "small_portion_name", menuItems[i].small_portion_name);

            html =
            insertItemPrice(html, "price_large", menuItems[i].price_large);

            html =
            insertItemPortionName(html, "large_portion_name", menuItems[i].large_portion_name);

            html =
            insertProperty(html, "name", menuItems[i].name);

            html = 
            insertProperty(html, "description", menuItems[i].description);

            //Add clearfix after every second menu item
            if (i%2 != 0) {
                html += "<div class='clearfix visible-lg-block visible-md-block'></div>"
            }
            finalHTML += html;
        }
        finalHTML += "</section>";
        return finalHTML;
    }

    //Appends price with '$' idf prince exist
    function insertItemPrice(html, pricePropName, priceValue) {
        //if not specified, replace with empty string
        if (!priceValue) { //If it value doesn't exist, do ->
            return insertProperty(html, pricePropName, "");
        }
        priceValue = "$" + priceValue.toFixed(2);
        html = insertProperty(html, pricePropName, priceValue);
        return html;
    }
    
    //Appends portion name in parents if exisrt
    function insertItemPortionName (html, portionPropName, portionValue) {
        //if not specified, return original string
        if (!portionValue) {
            return insertProperty(html, portionPropName, "");
        }
        html = insertProperty(html, portionPropName, portionValue);
        return html;
    }

    global.$PixelR = PixelR;
})(window);