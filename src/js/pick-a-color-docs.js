$(document).ready(function () {
  
  var scrollspyOffset = 80;
  
  $('.navbar').scrollspy({
  });
  
  // make clicks to the nav scroll to the correct location using the scrollspy offset
  $(".nav li a").click(function () {
    var $thisEl = $(this),
        thisId = $thisEl.attr("href"),
        elLocation = $(thisId).offset().top;
        targetLocation = elLocation - scrollspyOffset;
    if ($(window).width() < 767) {
      targetLocation = elLocation;
    }
    $('html, body').animate({
      scrollTop: targetLocation
    }, 500);
  });
    
  $(".pick-a-color").pickAColor();

  $(".pick-a-color-no-spectrum").pickAColor({
    showSpectrum            : false,
    showSavedColors         : false,
    showAdvanced            : false
  });
  
  $(".pick-a-color-no-saved").pickAColor({
    showSavedColors         : false
  });
  
  $(".pick-a-color-no-advanced").pickAColor({
    showAdvanced         : false
  });
  
  $(".pick-a-color-per-el").pickAColor({
    showSavedColors         : true,
    saveColorsPerElement    : true
  });
  
  $(".pick-a-color-no-fade").pickAColor({
    fadeMenuToggle          : false
  });
  
  $(".pick-a-color-no-input").pickAColor({
    showHexInput            : false
  });
  
  $(".pick-a-color-no-basic").pickAColor({
    showBasicColors         : false
  });

  $(".pick-a-color-allow-blank").pickAColor({
    allowBlank              : true
  });

  $(".pick-a-color-inline-dropdown").pickAColor({
    inlineDropdown              : true
  });
  
});