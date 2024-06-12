/** All selection jquery */

$(function() {

    var $mainMenuItems = $("#main-menu ul").children("li"),
        totalMainMenuItems = $mainMenuItems.length,
        openedIndex = getRandomIndex(5);

    function getRandomIndex(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    //Function animate and open the li content
    var init = function() {
        bindEvent();
        if (valiIndex(openedIndex)) {
            animateItem($mainMenuItems.eq(openedIndex), true, 700);
        }
    };

    //
    var valiIndex = function(indexToCheck) {
        return (indexToCheck >= 0) && (indexToCheck < totalMainMenuItems);
    };

    //animation
    var animateItem = function($item, toOpen, speed) {
        var $colorImage = $item.find(".color");
        var itemParam = toOpen ? { width: "420px" } : { width: "140px" };
        var colorImageParam = toOpen ? { left: "0px" } : { left: "140px" };

        $colorImage.animate(colorImageParam, speed);
        $item.animate(itemParam, speed);
    };


    //attachement event
    var bindEvent = function() {
        $mainMenuItems.children(".images").click(function() {
            var newIndex = $(this).parent().index();
            var $item = $mainMenuItems.eq(newIndex);
            if (openedIndex === newIndex) {
                animateItem($item, false, 250);
                openedIndex = -1;
            } else {
                if (valiIndex(newIndex)) {
                    animateItem($mainMenuItems.eq(openedIndex), false, 250);
                    openedIndex = newIndex;
                    animateItem($item, true, 250);
                }
            }

        });

        //hovering
        $(".button").hover(function() {
            // over
            $(this).addClass("hoveredButton");
        }, function() {
            // out
            $(this).removeClass("hoveredButton");
        });

        //click
        $(".button").click(function() {
            var newIndex = $(this).index();
            var $item = $mainMenuItems.eq(newIndex);
            if (openedIndex === newIndex) {
                animateItem($item, false, 250);
                openedIndex = -1;
            } else {
                if (valiIndex(newIndex)) {
                    animateItem($mainMenuItems.eq(openedIndex), false, 250);
                    openedIndex = newIndex;
                    animateItem($item, true, 250);
                }
            }
        });
    };

    // check repeat funtion
    function checkAndAnimateItem(indexToCA) {
        if (openedIndex === indexToCA) {
            animateItem($mainMenuItems.eq(indexToCA), false, 250);
            openedIndex = -1;
        } else {
            if (valiIndex(indexToCA)) {
                animateItem($mainMenuItems.eq(openedIndex), false, 250);
                openedIndex = indexToCA;
                animateItem(openedIndex, true, 250);
            }
        }
    };

    // call function
    init();
});