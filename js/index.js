/**
 * Main JS file for Casper behaviours
 */

//
////
////// Text Animations. Inspired by: http://tympanus.net/codrops/2016/03/02/creative-svg-letter-animations/
////
//



// Global 
var logos = null;

function setupAnimatedLetters() {
  // Selecting the container element
  var el = document.querySelector('#animated-letters');

  if(el == null) {
    // Happens on certain pages that don't have 'animated-letters', like the post pages and about page.
    $("#description").css("visibility","visible");
    return;
  }

  parentWidth = el.clientWidth;
  //console.log(parentWidth)

  el.innerText = "jongomez";
  // There are 8 letters in 'jongomez'.
  size = parentWidth/5

  // Max letter size: 170.
  if(size > 170) {
    size = 170
  }

  if(parentWidth < 500) {
    fade = 0
    weight = 5
  } else {
    fade = 2
    weight = 4
  }

  // All the possible options (these are the default values)
  // Remember that every option (except individualDelays) can be defined as single value or array
  var options = {
    size: size,         // Font size, defined by the height of the letters (pixels)
    weight: weight,         // Font weight (pixels)
    color: '#FFFFFF',  // Font color
    duration: 1.5,       // Duration of the animation of each letter (seconds)
    delay: [0, 0.2],  // Delay animation among letters (seconds)
    
    // fade makes the animation much slower.
    fade: fade,         // Fade effect duration (seconds)
    
    //easing: d3.easeCubicInOut,    // Easing function
    //easing: d3.easeElasticOut,    // Easing function
    easing: d3.easeCircleOut,    // Easing function
    //easing: d3.easeBounceOut    // Easing function
  };

  // Initializing the text (Letters parameters: container-element, options)
  var myText = new Letters(el, options);

  //
  //// Basic setup DONE.
  //

  // Show letters with the default options defined
  myText.show();

  parentHeight = el.clientHeight;
  heightDiff = parentHeight - size

// Used here because the animated letters increase the header size.
// When the header size increases, the #content element may overlap it.
// But if we rerender the #content element, the overlap is gone.
$('#content').hide().show(0);
  
  $("#description").css("top", "-" + heightDiff + "px")
  $("#description").css("visibility","visible");
}


//
////
////// Menu icon animation. Inspired by: http://tympanus.net/codrops/2015/11/12/animating-svg-menu-icon-segment/
////
//

function setupAnimatedMenu() {
  var pathA = document.getElementById('pathA'),
      pathC = document.getElementById('pathC'),
      segmentA = new Segment(pathA, 8, 32),
      segmentC = new Segment(pathC, 8, 32);

  // Linear section, with a callback to the next
  function inAC(s) { s.draw('80% - 24', '80%', 0.3, {delay: 0.1, callback: function(){ inAC2(s) }}); }

  // Elastic section, using elastic-out easing function
  function inAC2(s) { s.draw('100% - 54.5', '100% - 30.5', 0.6, {easing: d3.easeElasticOut}); }


  // Initialize
  var pathB = document.getElementById('pathB'),
      segmentB = new Segment(pathB, 8, 32);

  // Expand the bar a bit
  function inB(s) { s.draw(8 - 6, 32 + 6, 0.1, {callback: function(){ inB2(s) }}); }

  // Reduce with a bounce effect. BEFORE: ease.ease('bounce-out', 1, 0.3)
  function inB2(s) { s.draw(8 + 12, 32 - 12, 0.3, {easing: d3.easeElasticOut}); }


  function outAC(s) { s.draw('90% - 24', '90%', 0.1, {easing: d3.easeElasticOut, callback: function(){ outAC2(s) }}); }
  function outAC2(s) { s.draw('20% - 24', '20%', 0.3, {callback: function(){ outAC3(s) }}); }
  function outAC3(s) { s.draw(8, 32, 0.7, {easing: d3.easeElasticOut}); }
  function outB(s) { s.draw(8, 32, 0.7, {delay: 0.1, easing: d3.easeElasticOut}); }

  var trigger = document.getElementById('menu-icon-trigger'),
      toCloseIcon = true;

  trigger.onclick = function() {
      if (toCloseIcon) {
          inAC(segmentA);
          inB(segmentB);
          inAC(segmentC);
      } else {
          outAC(segmentA);
          outB(segmentB);
          outAC(segmentC);
      }
      //console.log("This is a closure, and toCloseIcon is:", toCloseIcon);
      toCloseIcon = !toCloseIcon;
  };

  // Only show the menu bar after everything's done. Also, if you want to add fade in animations, just add transition css properties.
  document.getElementById("menu-icon-wrapper").style.opacity = 1;
  
}















/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    var width = $(window).width();

    $(window).load(function () {

        var $postContent = $(".post-content");
        $postContent.fitVids();

        $(".scroll-down").arctic_scroll();

        $("#menu-icon-trigger").on("click", function(e){
            e.preventDefault();
            $("body").toggleClass("nav-opened nav-closed");

            if(window.pageYOffset < 100) {
              if($("#nav-close").css("visibility") != "hidden") {
                // Cross visibility has to be 'hidden' if the user hasn't scroll down 100px.
                $("#nav-close").css("visibility", "hidden");
              }
            }

        });

        $(".nav-close").on("click", function(e){
            e.preventDefault();
            $("#menu-icon-trigger").click();
        });

        setupAnimatedLetters();
        setupAnimatedMenu();

    });

    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
    $.fn.arctic_scroll = function (options) {

        var defaults = {
            elem: $(this),
            speed: 500
        },

        allOptions = $.extend(defaults, options);

        allOptions.elem.click(function (event) {
            event.preventDefault();
            var $this = $(this),
                $htmlBody = $('html, body'),
                offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
                position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
                toMove;

            if (offset) {
                toMove = parseInt(offset);
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
            } else {
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
            }
        });

    };





  function scrollListenner() {

/*
    if(window.pageYOffset < 100) {
      if($("#nav-close").css("visibility") != "hidden") {
        // Cross visibility has to be 'hidden' if the user hasn't scroll down 100px.
        $("#nav-close").css("visibility", "hidden");
      }
    } else

*/

    if(window.pageYOffset > 200) {
      // Makes cross visibility 'visible' if the user has scrolled down 100px AND if the nav menu is opened.
      if($("body").hasClass("nav-opened") && $("#nav-close").css("visibility") == "hidden") {
        // The menu nav is "opened" and the user has scrolled more than 100px from the top.
        $("#nav-close").css("visibility", "visible");
      }
    }

  }


  function resizeHandler() {
    // Only handle width resizes. On Android, the chrome bar changes the window height on scroll.
    if(width != $(window).width()) {
      setupAnimatedLetters();
      width = $(window).width();
    }
  }
  window.addEventListener("resize", resizeHandler);
  //window.addEventListener("scroll", scrollListenner);

})(jQuery);


