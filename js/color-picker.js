/*** some variables based on styles ***/

var spectrumWidth = 200; //width of the color spectrum boxes
var halfSpectrumWidth = spectrumWidth / 2;
var cbWidth = 9; //width of the highlight band for picking a color on the spectrum;
var halfCBWidth = cbWidth / 2;
var aFewCBs = cbWidth * 8; //for defining things relative to a few drags worth of color band
var brightSpectrumWidth = spectrumWidth - aFewCBs; //how long the colorbox spectrums for nonBW color spectrums are bright, relative to the width of the band
var blackSpectrumWidth = aFewCBs; //how long the black colorbox spectrum is nearly black


/*** here are all the functions I'm gonna use later ***/


/* make the current-color preview match the text field value */
function updatePreview() {
  typedColor = $(".color-text-input").val();
  $("#current-color").css("background-color","#" + typedColor);
}

/* takes a color and the current position of the color band, returns the value by which the color should be multiplied to get the color currently being highlighted by the band */

function getColorMultiplier(color,position) {
  //position of the color band as a percentage of the width of the color box
  var percent_of_box = position / spectrumWidth; 
  
  //white only gets darkened up to 50%, so divide multiplier in half and return negative value
  if (color === "white") {
    return -percent_of_box / 2; 
    
    //black only gets lightened up to 50%, so divide multiplier in half
  } else if (color === "black") { 
    return percent_of_box / 2; 
    
    //non B/W colors can be lightened OR darkened, but only to 50%, so both multipliers are divided by two
    //if the color band is in the light half of the box...
  } else if (percent_of_box <= 0.5) {   

    //get the percentage position relative half of the box, then subtract from one to account for the fact that we're lightening as we move away from center, not away from left
    return (1 - (position / halfSpectrumWidth)) / 2; 
    
    //if the color is in the dark half of the box...
    } else { 
      
    //get the percentage position relative to half of the box and return negative value
    return -(((position - halfSpectrumWidth) / halfSpectrumWidth) / 2); 
    }

}

/* takes an HSL array and a multiplier and returns a new hex */
function modifyHSL(HSL,multiplier) {
  HSL.l += multiplier; // add the multiplier
  HSL.l = Math.min(Math.max(0,HSL.l),1); //make sure it's between 0 and 1
  return tinycolor(HSL).toHex();
}

/* takes an element and color and changes that element's border to the given color */
function changeBorderColor(element,color) {
  $(element).css("border", "2px solid" + color);
}

function lightenBorder(element) {
  changeBorderColor(element,"#808080");
}

function darkenBorder(element) {
  changeBorderColor(element,"#000");
}

/* makes an element horizontally draggable only within the bounds of its parent container */

function horizontallyDraggable(element) { 
  $(element).mousedown(function (event) {    
    var this_el = $(event.delegateTarget); //specify event target so we don't affect all elements with a certain class
    $(this_el).css("position","absolute");
    var parentWidth = $(this_el).parent().width();
    var parentLocation = $(this_el).parent().offset();
    var minX = parentLocation.left; //this is the furthest left it can go 
    var maxX = parentWidth - cbWidth; //this is the furthest right it can go
    $(document).bind("mousemove", function (e) {
      $(this_el).trigger("dragging");
      var mouseX = e.pageX; //where's my mouse at?
      var relativeX = Math.max(0,(Math.min(mouseX-minX,maxX))); //constrain mouse positions to min and max values
      $(this_el).css("left", relativeX); //put the draggable element there
    }).mouseup(function() {
      $(document).unbind("mousemove");
    });
  });
};

/*** the DOM is ready y'all!! ***/

$(document).ready( function() {

  updatePreview();  
  
  /* clear field on focus, on blur restore previous value or update preview if a new value was entered */
  
  $(".color-text-input").focus( function() {
    $(this).val(" "); //clear the field on focus
  }).blur(function() {
    var newValue = $(this).val(); // on blur, check the field's value
    // if the field is empty, use the original value, otherwise keep the new value
    $(this).val( newValue.match(/^\s+$|^$/) ? typedColor : newValue ); 
    updatePreview();
  });
  
  
  /* update field when selecting from basic dropdown */
  
  $(".color-menu li a").click( function() {
    //grab the bg color from its preview 
    var selectedColor = $(this).find("span:first").css("background-color"); 
    selectedColor = tinycolor(selectedColor).toHex(); // convert to hex
    $(".color-text-input").val(selectedColor); // put it in the field */
    updatePreview(); // update the button preview to match 
  });
  
  /* expand the dropdown when you hover over it */

  $(".color-menu").hover( function() {
    $(this).css("min-width","300px");
  },
  function() {
    $(this).css("min-width","100px");
  });
  

  /* show the spectrum when you hover over a color */
  
  $(".color-menu li a").hover( function() {
    // grab the id of the preview and pre-pend '#spectrum-' to make the ID of the accompanying spectrum
    currentSpectrum = "#spectrum-" + $(this).find("span:first").attr("id"); 
    $(currentSpectrum).show();
  },
  function() {
    $(currentSpectrum).hide();
  });
  
  /* make the color bands draggable */
  
  horizontallyDraggable($(".color-band"));
  
  // $(".color-band").draggable({ containment: "parent", axis: "x" });
  
  /* while color band is being dragged, calculate highlighted color and apply it to preview. also replace color label with a 'select' button the user can click to approve their selection. */
    
  $(".color-band").on("dragging",function() {
    /* find out what color we're dealing with: get the ID of the parent color box and slice off "spectrum" */  
    var colorName = $(this).parent().attr("id").split("-")[1];
    var colorNumbers = tinycolor(colorName).toHsl();

    /* midpoint of the current left position of the color band */
    var colorBandLocation = parseInt($(this).css("left")) + halfCBWidth; 

    /* based on the color of the color box and location of the color band, figure out how multiply the base color to get the new color */
    var colorMultiplier = getColorMultiplier(colorName,colorBandLocation); 

    /* figure out what color is being highlighted */
    var highlightedColor = modifyHSL(colorNumbers,colorMultiplier);

    /* change the color preview to the color being highlighted */
    $("#" + colorName).css("background-color",highlightedColor); 

    /* replace the color label with a 'select me' butrton */
    $(this).parent().prev('.color-label').replaceWith('<button class="btn btn-mini" type="button">Select</button>');
    
    /* watch the position of the color band to change its border color when needed for visibility */
    
    /* if it's not black or white, it should be lightened at the dark end of the spectrum */
    if ((colorName != "white") && (colorName != "black")) {
      if (colorBandLocation >= brightSpectrumWidth) {
        lightenBorder($(this));
      }
      /* when it comes back into the bright portion, turn it black again */
      else if (colorBandLocation < brightSpectrumWidth) {
        darkenBorder($(this));
      }
    } else if (colorName == "black") {
      /* turn the black colorband light gray in the black section of the spectrum */
      if (colorBandLocation > blackSpectrumWidth) {
        darkenBorder($(this));
      }
      else if (colorBandLocation <= blackSpectrumWidth) {
        lightenBorder($(this));
      }
    }

  });
      
  
});