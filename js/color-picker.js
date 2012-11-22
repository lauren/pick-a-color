/* make the current color preview match the field value */
function updatePreview() {
  $typedColor = $(".color-text-input").val();
  $("#current-color").css("background-color","#" + $typedColor);
};

/* returns a HEX value from an array of RGB numbers */
function getHex(RGB) {
  for (i = 0; i < (RGB.length); i++) {
    hex = parseInt(RGB[i]).toString(16); // convert to hex
    RGB[i] = hex.length === 1 ? "0" + hex : hex; // add a 0 if it's too short
  }
  return RGB.join(""); // return the array joined into a string
};

/* returns a HEX value from a string like 'rgb(X,X,X)' */
function getHexFromString(string) {
  if (string.match(/^rgb/)) { // make sure it's an RGB string 
    var RGB = string.split("(")[1].split(")")[0].split(", "); // get rid of the rgb and parens and make an array of the numbers
    return getHex(RGB);
  } else { // otherwise just return the original string 
    return string;
  }
};

$(document).ready( function() {
  
  updatePreview();
  
  
  /* clear field on focus, on blur restore previous value or update preview if a new value was entered */
  
  $(".color-text-input").focus( function() {
    $(this).val(" "); //clear the field on focus
  }).blur(function() {
    var $newValue = $(this).val(); // on blur, check the field's value
    $(this).val( $newValue.match(/^\s+$|^$/) ? $typedColor : $newValue ) // if the field is empty, use the original value, otherwise keep the new value
    updatePreview();
  });
  
  
  /* update field when selecting from basic dropdown */
  
  $(".color-menu li a").click( function() {
    $selectedColor = $(this).find("span:first").css("background-color"); //grab the bg color from its preview 
    $selectedColor = getHexFromString($selectedColor); // convert to hex
    $(".color-text-input").val($selectedColor); // put it in the field */
    updatePreview(); // update the button preview to match 
  });
  
  /* expand the dropdown when you hover over it */

  $(".color-menu").hover( function() {
    $(this).css("min-width","300px");
  },
  function() {
    $(this).css("min-width","100px")
  });
  

  /* show the spectrum when you hover over a color */
  
  $(".color-menu li a").hover( function() {
    $currentSpectrum = "#spectrum-" + $(this).find("span:first").attr("id"); // grab the id of the preview and pre-pend #spectrum- to make the ID of the accompanying spectrum
    $($currentSpectrum).show();
  },
  function() {
    $($currentSpectrum).hide();
  });
  
  
});