(function(){

var viewportHeight = window.innerHeight;

var moon = document.getElementById('moon');
var rocket = document.getElementById('rocket');
var headerText = document.getElementById('header-text');

var navBar = document.getElementById('nav-bar');
var navStick = false;
// TODO: turn navStick into a generic headerIsShowing var. Then wrap subsequent functions into an IF statement.
var firstBlock = document.getElementById('first-block');

window.onscroll = function (e) {
  var verticlalPosition;
  // TODO: if offset results in less than a pixle, then don't repaint DOM. 
  if (pageYOffset) {
    verticlalPosition = pageYOffset;
    //verticlalPosition = window.scrollY;

  } else if (document.documentElement.clientHeight) { //ie
    verticlalPosition = document.documentElement.scrollTop;

  } else if (document.body) { //ie quirks
    verticlalPosition = document.body.scrollTop;
  }



  ////////////Header Movement
  //Background Movement
  var verticalOffset = verticlalPosition / 3;
  firstBlock.style.backgroundPosition = 'left '+ (verticalOffset) + '%';

  //Moon Vertical Movement
  var moonYOffset = verticlalPosition / 2;
  moon.style.transform = 'translate(0px,' + moonYOffset +'px)'

  //Moon Shrink
  var moonWidth = 8 - (verticlalPosition / 200);
  moon.style.width = moonWidth + '%';

  //Rocket Movement
  var rocketXOffset = Math.min(600, verticlalPosition * 1.9);
  var rocketYOffset = Math.max(-300, verticlalPosition * -1);
  rocket.style.transform = 'translate(' + rocketXOffset +'px, ' + rocketYOffset + 'px)';

  //Rocket Size Grow
  var rocketWidth = Math.min(8, 4 + (verticlalPosition / 50));
  rocket.style.width = rocketWidth + '%';

  //Header Text Movement
  var headerTextYOffset = verticlalPosition / 2.5;
  headerText.style.transform = 'translate(0px,' + headerTextYOffset +'px)'

  //Sticky Header after scroll
  //Div Sub-Header is defined as 32vh. Once scrolling beyond, then sticky header.
  var stickPoint = .32 * viewportHeight;
  if (verticlalPosition >= stickPoint && !navStick) {
    navBar.classList.add('nav-fixed');
    navStick = true;
  } else if (verticlalPosition < stickPoint && navStick) {
    navBar.classList.remove('nav-fixed');
    navStick = false;
  }
}

})();
