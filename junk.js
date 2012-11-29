
/** variables **/

var HSLAcolors = {
  white   : [0, 0, 100, 1.0],
  red     : [0, 100, 50, 1.0],
  orange  : [23, 100, 50, 1.0],
  yellow  : [60, 100, 50, 1.0],
  green   : [120, 100, 25, 1.0],
  blue    : [220, 100, 44, 1.0],
  purple  : [274, 100, 44, 1.0],
  black   : [0, 0, 0, 1.0]
};

var HEXcolors = {
  white   : "ffffff",
  red     : "FF0000",
  orange  : "FF6600",
  yellow  : "FFFF00",
  green   : "008000",
  blue    : "0000FF",
  purple  : "800080",
  black   : "000000"
}

var RGBMax = 255;
var halfRGBMax = RGBMax / 2;

var colorValues = {
  white   : [255,255,255],
  red     : [255,0,0],
  orange  : [255,96,0],
  yellow  : [255,255,0],
  green   : [0,126,0],
  blue    : [0,0,255],
  purple  : [126,0,126],
  black   : [0,0,0] 
};

/* take an array of RGB numbers, return a hex value */
function getHex(RGB) {
  HEX = [];
  for (var i = 0; i < (RGB.length); i++) {
    HEX[i] = parseInt(RGB[i]).toString(16); // convert to hex
    HEX[i] = HEX[i].length === 1 ? "0" + HEX[i] : HEX[i]; // add a 0 if it's too short
  }
  return HEX.join(""); // return the array joined into a string
}


/* take a string like 'rgb(X,X,X) and return a hex value' */
function getHexFromString(string) {
  
  // if it's an RGB string...
  if (string.match(/^rgb/)) { 
  
    // get rid of the rgb and parens and make an array of the numbers
    var RGB = string.split("(")[1].split(")")[0].split(", "); 
    // then get the HEX value from our other function.
    return getHex(RGB);
  } else { 
    return string; //otherwise, just return the original string
  }
}

/* takes an RGB array and a multiplier by which to modify the color and returns a new hex */
function modifyColor(RGB,colorName,multiplier) {
  var newRGB = [];
  for (var i = 0; i < RGB.length; i++) {
    //if the color is black, we need to multiply by the rgb midpoint instead of 0 to lighten
    if (colorName === "black") {
      newRGB[i] = 0 + (halfRGBMax * multiplier);
    }
    //for other colors, multiply value by multiplier and add back to multiplier
    else {
      newRGB[i] = RGB[i] + (RGBMax * multiplier); 
    }

    //make sure the number is between 0 and 255 and round it and replace the previous value with it!
    newRGB[i] = Math.round(Math.min(Math.max(0,newRGB[i]),RGBMax)); 
    }
    
  return "#" + getHex(newRGB); //return the HEX value of the modified RGB array
}