$(document).ready(function () {
  
  var scrollspyOffset = 130;
  
  $('.navbar').scrollspy({
  });
  
  // make clicks to the nav scroll to the correct location using the scrollspy offset
  $(".nav li a").click(function () {
    var $thisEl = $(this),
        thisId = $thisEl.attr("href"),
        elLocation = $(thisId).offset().top;
        targetLocation = elLocation - scrollspyOffset;
    $('html, body').animate({
    	scrollTop: targetLocation
    }, 500);
  });
    
  $(".pick-a-color").pickAColor();

  $(".pick-a-color-no-spectrum").pickAColor({
    showSpectrum            : false,
    showSavedColors         : false
  });
  
  $(".pick-a-color-no-saved").pickAColor({
    showSavedColors         : false
  });
  
  $(".pick-a-color-per-el").pickAColor({
    showSavedColors         : true,
    saveColorsPerElement    : true
  });
  
  $(".pick-a-color-no-fade").pickAColor({
    fadeMenuToggle          : false
  });
  
});