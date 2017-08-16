(function(){

  var viewportHeight = window.innerHeight;

  var moon = document.getElementById('moon');
  var rocket = document.getElementById('rocket');
  var headerText = document.getElementById('header-text');

  var navBar = document.getElementById('nav-bar');
  var navStick = false;
  // TODO: turn navStick into a generic headerIsShowing var. Then wrap subsequent functions into an IF statement.
  var firstBlock = document.getElementById('first-block');

  var NAV_BAR_CLASS_NAME = 'nav-fixed';

  var verticalPosition;

  var ROCKET_CONFIG = {
    maxXOffset: 600,
    maxYOffset: 300,
    rateOfXChange: 1.9,
    rateOfYChange: 1
  }

  function getTranslateValue(x, y) {
    return 'translate('+ x +'px,'+ y +'px)';
  }

  function propelRocket() {
    var rocketXOffset = Math.min(ROCKET_CONFIG.maxXOffset, verticalPosition * ROCKET_CONFIG.rateOfXChange);
    var rocketYOffset = Math.max(-ROCKET_CONFIG.maxYOffset, verticalPosition * -ROCKET_CONFIG.rateOfYChange);
    rocket.style.transform = getTranslateValue(rocketXOffset, rocketYOffset);
  }

  window.onscroll = function (e) {
    // TODO: if offset results in less than a pixle, then don't repaint DOM.
    if (pageYOffset) {
      verticalPosition = pageYOffset;
      //verticalPosition = window.scrollY;

    } else if (document.documentElement.clientHeight) { //ie
      verticalPosition = document.documentElement.scrollTop;

    } else if (document.body) { //ie quirks
      verticalPosition = document.body.scrollTop;
    }



    ////////////Header Movement
    //Background Movement
    var verticalOffset = verticalPosition / 3;
    firstBlock.style.backgroundPosition = 'left '+ (verticalOffset) + '%';

    //Moon Vertical Movement
    var moonYOffset = verticalPosition / 2;
    moon.style.transform = getTranslateValue(0, moonYOffset);

    //Moon Shrink
    var moonWidth = 8 - (verticalPosition / 180);
    moon.style.width = moonWidth + '%'; // TODO: Look at changing scale

    //Rocket Movement
    propelRocket();

    //Rocket Size Grow
    var rocketWidth = Math.min(8, 4 + (verticalPosition / 50));
    rocket.style.width = rocketWidth + '%';

    //Header Text Movement
    var headerTextYOffset = verticalPosition / 2.5;
    headerText.style.transform = getTranslateValue(0, headerTextYOffset);

    //Sticky Header after scroll
    //Div Sub-Header is defined as 32vh. Once scrolling beyond, then sticky header.
    var stickPoint = .32 * viewportHeight; // TODO: MAKE BETTER
    if (!navStick && verticalPosition >= stickPoint) {
      navBar.classList.add(NAV_BAR_CLASS_NAME);
      navStick = true;
    } else if (navStick && verticalPosition < stickPoint) {
      navBar.classList.remove(NAV_BAR_CLASS_NAME);
      navStick = false;
    }
  }

})();
