(function( $ ) {
    
  $.fn.colorPicker = function(options) {
    
    /*** color picker markup ***/

    var markupBeforeInputLineWithVariable = [
      '<div class="input-prepend input-append color-picker-markup">',
      	'<span class="add-on">#</span>'
    ].join('\n');

    var markupAfterInputLineWithVariable = [
      	'<div class="btn-group">',
      		'<button class="btn color-dropdown dropdown-toggle">',			
      			'<span class="color-preview current-color"></span>',
      			'<span class="caret"></span>',
      		'</button>',
      	  '<ul class="color-menu dropdown-menu">',
      	    '<h6 class="hidden-desktop color-menu-instructions">Tap color to lighten or darken</h6>',
      		 	'<li>',
      				'<a class="white">',
      					'<span class="color-preview white"></span>',
      					'<span class="color-label">White</span>',
      					'<span class="color-box spectrum-white">',
      						'<span class="highlight-band"></span>',
      					'</span>',
      				'</a>',
      			'</li>',
      	  	'<li>',
      				'<a class="red">',
      					'<span class="color-preview red"></span>',
      					'<span class="color-label">Red</span>',
      					'<span class="color-box spectrum-red">',
      						'<span class="highlight-band"></span>',
      					'</span>',
      				'</a>',
      			'</li>',
      			'<li>',
      				'<a class="orange">',
      					'<span class="color-preview orange"></span>',
      					'<span class="color-label">Orange</span>',
      					'<span class="color-box spectrum-orange">',
      						'<span class="highlight-band"></span>',
      					'</span>',
      				'</a>',
      			'</li>',
      	  	'<li>',
      				'<a class="yellow">',
      					'<span class="color-preview yellow"></span>',
      					'<span class="color-label">Yellow</span>',
      					'<span class="color-box spectrum-yellow">',
      						'<span class="highlight-band"></span>',
      					'</span>',
      				'</a>',
      			'</li>',
      			'<li>',
      				'<a class="green">',
      					'<span class="color-preview green"></span>',
      					'<span class="color-label">Green</span>',
      					'<span class="color-box spectrum-green">',
      						'<span class="highlight-band"></span>',
      					'</span>',
      				'</a>',
      			'</li>',
      	  	'<li>',
      				'<a class="blue">',
      					'<span class="color-preview blue"></span>',
      					'<span class="color-label">Blue</span>',
      					'<span class="color-box spectrum-blue">',
      						'<span class="highlight-band"></span>',
      					'</span>',
      				'</a>',
      			'</li>',
      			'<li>',
      				'<a class="purple">',
      					'<span class="color-preview purple"></span>',
      					'<span class="color-label">Purple</span>',
      					'<span class="color-box spectrum-purple">',
      						'<span class="highlight-band"></span>',
      					'</span>',
      				'</a>',
      			'</li>',
      			'<li>',
      				'<a class="black">',
      					'<span class="color-preview black"></span>',
      					'<span class="color-label">Black</span>',
      					'<span class="color-box spectrum-black">',
      						'<span class="highlight-band"></span>',
      					'</span>',
      				'</a>',
      			'</li>',
      	  '</ul>',
      	'</div>',
      '</div>'
    ].join('\n');
     
    /*** methods ***/
    
    var methods = {
      
      initialize: function() {        
        
        // get the default color from the content of each div
        myColorVars.defaultColor = $(this).html() || "000";
        myColorVars.typedColor = myColorVars.defaultColor;
        
        // use the default color to construct the markup for the color picker
        var inputMarkup = '<input id="appendedPrependedDropdownButton"' + 
        'type="text" class="span2 color-text-input" value="' + 
        myColorVars.defaultColor + '">';
        
        var colorPickerMarkup = [
          markupBeforeInputLineWithVariable, 
          inputMarkup, 
          markupAfterInputLineWithVariable
        ].join('\n');
        
        // swap in the markup
        $(this).html(colorPickerMarkup);
        
        /*** style-related variables ***/

        // width of the color spectrum boxes
        myStyleVars.spectrumWidth = parseInt($(".color-box").width()); 
        myStyleVars.halfSpectrumWidth = myStyleVars.spectrumWidth / 2;
        // width of the highlight band for picking a color on the spectrum;
        myStyleVars.highlightBandWidth = parseInt($(".highlight-band").width()) + 4; 
        myStyleVars.halfHighlightBandWidth = myStyleVars.highlightBandWidth / 2;
        // for defining things relative to a few drags' worth of color band
        myStyleVars.eightHighlightBands = myStyleVars.highlightBandWidth * 8; 
        // how long the colorbox spectrums for non-B/W color spectrums are bright, 
        // relative to the width of the band
        myStyleVars.brightSpectrumWidth = myStyleVars.spectrumWidth -
          myStyleVars.eightHighlightBands; 
        //how long the black colorbox spectrum is nearly black
        myStyleVars.blackSpectrumWidth = myStyleVars.eightHighlightBands;
                
      },
      
      /* make the current-color preview match the text field value */
      updatePreview: function() {        
        myColorVars.typedColor = tinycolor($(this).val()).toHex();
        $(this).siblings(".btn-group").find(".current-color").css("background-color",
        "#" + myColorVars.typedColor);
      },
      
      /* open and close dropdown menu */
      
      openDropdown: function(button,menu) {
        $(menu).css("display","block");
        $(button).addClass("open");
      },
      
      closeDropdown: function(button,menu) {
        $(menu).css("display","none");
        $(button).removeClass("open");
      },
      
      /* takes a color and the current position of the color band, 
      returns the value by which the color should be multiplied to 
      get the color currently being highlighted by the band */
      
      getColorMultiplier: function(color,position) {
        // position of the color band as a percentage of the width of the color box
        var percent_of_box = position / myStyleVars.spectrumWidth; 
    
        // white only gets darkened up to 50%, 
        // so divide multiplier in half and return negative value
        if (color === "white") {
          return -percent_of_box / 2; 
    
          // black only gets lightened up to 50%, so divide multiplier in half
        } else if (color === "black") { 
          return percent_of_box / 2; 
    
          // non B/W colors can be lightened OR darkened, but only to 50%, 
          // so both multipliers are divided by two
          
          // if the color band is in the light half of the box...
        } else if (percent_of_box <= 0.5) {   
    
          // get the percentage position relative half of the box, 
          // then subtract from one to account for the fact that we're 
          // lightening as we move away from center, not away from left
          return (1 - (position / myStyleVars.halfSpectrumWidth)) / 2; 
    
          // if the color is in the dark half of the box...
        } else { 
    
          // get the percentage position relative to half of the box 
          // and return negative value
          return -(((position - myStyleVars.halfSpectrumWidth) / 
            myStyleVars.halfSpectrumWidth) / 2); 
        }
    
      },
    
      /* takes an HSL array and a multiplier and returns a new hex */
      modifyHSL: function(HSL,multiplier) {
        HSL.l += multiplier; // add the multiplier
        HSL.l = Math.min(Math.max(0,HSL.l),1); //make sure it's between 0 and 1
        return tinycolor(HSL).toHex();
      },
    
      /* takes an element and color and changes that element's border 
         to the given color */
      changeBorderColor: function(element,color) {
        $(element).css("border", "2px solid" + color);
      },
    
      lightenBorder: function(element) {
        methods.changeBorderColor(element,"#aaa");
      },
    
      darkenBorder: function(element) {
        methods.changeBorderColor(element,"#000");
      },
      
      horizontallyDraggable: function(element) {
        $(this).mousedown(function (event) {
          // specify event target so we don't affect all elements with a certain class
          var this_el = $(event.delegateTarget);
          $(this_el).css("position","absolute");
          var highlightBandWidth = $(this_el).width() + 4;
          var parentWidth = $(this_el).parent().width();
          var parentLocation = $(this_el).parent().offset();
          var minX = parentLocation.left; // this is the furthest left it can go 
          var maxX = parentWidth - highlightBandWidth; // this is the furthest right it can go
          $(document).bind("mousemove", function(e) {
            $(this_el).trigger("dragging");
            var mouseX = e.pageX; // where's my mouse at?
            // constrain mouse positions to min and max values
            var relativeX = Math.max(0,(Math.min(mouseX-minX,maxX))); 
            $(this_el).css("left", relativeX); // put the draggable element there
          }).mouseup(function() {
            $(document).unbind("mousemove"); // stop dragging
          });
        });
      },
      
      calculateHighlightedColor: function(highlightBand) {
        // get the class of the parent color box and slice off "spectrum"  
        var colorName = $(this).parent().attr("class").split("-")[2];
        var colorNumbers = tinycolor(colorName).toHsl();

        // midpoint of the current left position of the color band 
        var colorBandLocation = parseInt($(this).css("left")) + 
          myStyleVars.halfHighlightBandWidth; 
          
        // based on the color of the color box and location of the color band, 
        // figure out how multiply the base color to get the new color 
        var colorMultiplier = methods.getColorMultiplier(colorName,colorBandLocation); 
    
        // figure out what color is being highlighted 
        var highlightedColor = methods.modifyHSL(colorNumbers,colorMultiplier);
    
        // change the color preview to the color being highlighted 
        $(this).parent().siblings(".color-preview").css("background-color",highlightedColor); 
    
        /* replace the color label with a 'select me' button */
        $(this).parent().prev('.color-label').replaceWith(
          '<button class="btn btn-mini color-select" type="button">Select</button>');
        
        // watch the position of the color band to change its border color 
        // when needed for visibility 
        
        // if it's not black or white....  
        if ((colorName != "white") && (colorName != "black")) {
          
          // lighten at dark end, darken at light end 
          (colorBandLocation >= myStyleVars.brightSpectrumWidth) ? 
            methods.lightenBorder($(this)) : methods.darkenBorder($(this));
    
        } else if (colorName == "black") {
          
          // turn the black colorband light gray in the black section of the spectrum 
          (colorBandLocation > myStyleVars.blackSpectrumWidth) ? 
            methods.darkenBorder($(this)) : methods.lightenBorder($(this));
          
        };
      }   
      
    };
    
    return this.each(function() {
      
      myColorVars = {
        typedColor:     "",
        defaultColor:   "",
        newColor:       "",
        selectedColor:  ""
      };
      
      myStyleVars = { 
        spectrumWidth:            "", 
        halfSpectrumWidth:        "", 
        highlightBandWidth:       "", 
        halfHighlightBandWidth:   "", 
        eightHighlightBands:      "",  
        brightSpectrumWidth:      "", 
        blackSpectrumWidth:       ""
      };
      
      /*** initialize  ***/

      methods.initialize.apply(this);      
      
      // commonly used DOM elements for each color picker
      var myColorTextInput = $(this).find("input");      
      var myColorMenuLinks = $(this).find(".color-menu li a");
      var myColorPreviewButton = $(this).find(".btn-group");
      var myColorMenu = $(this).find(".color-menu");
      var myTouchInstructions = $(this).find(".color-menu-instructions");

      methods.updatePreview.apply(myColorTextInput);
      
      /* input field focus: clear content
      input field blur: update preview, restore previous content if no value entered */
    
      myColorTextInput.focus( function() {
        myColorVars.typedColor = $(this).val(); // update with the current typedColor
        $(this).val(" "); //clear the field on focus
        methods.openDropdown(myColorPreviewButton,myColorMenu); //  open dropdown
      }).blur(function() {
        methods.closeDropdown(myColorPreviewButton,myColorMenu); // close dropdown
        myColorVars.newValue = $(this).val(); // on blur, check the field's value
        // if the field is empty, use the original value, otherwise keep the new value
        $(this).val( myColorVars.newValue.match(/^\s+$|^$/) ? myColorVars.typedColor 
          : myColorVars.newValue ); 
        methods.updatePreview.apply(this);
      });
      
      /* open dropdown menu when you click the preview button */
      
      myColorPreviewButton.click(function(e) {
        e.stopPropagation();
        (myColorMenu.css("display") === "none") ?
          methods.openDropdown(myColorPreviewButton,myColorMenu) :
          methods.closeDropdown(myColorPreviewButton,myColorMenu);
      });
      
      /* any click outside of a dropdown should close all open dropdowns */
      
      $("html").click(function(){
        if (myColorMenu.css("display","block")) {
          methods.closeDropdown(myColorPreviewButton,myColorMenu);
        }
      });

      // Prevent click events to color-menu or color-text-input from closing dropdown
      myColorMenu.click(function(e){
        e.stopPropagation();
      });
      
      myColorTextInput.click(function(e){
        e.stopPropagation();
      });
      
      /* update field and close menu when selecting from basic dropdown */
      
      myColorMenuLinks.click( function() {
        //grab the bg color from its preview 
        var selectedColor = $(this).find("span:first").css("background-color"); 
        selectedColor = tinycolor(selectedColor).toHex(); // convert to hex
        $(myColorTextInput).val(selectedColor); // put it in the field 
        methods.updatePreview.apply(myColorTextInput); // update the button preview to match 
        methods.closeDropdown(myColorPreviewButton,myColorMenu); // close the dropdown
      });
      
      /* expand the dropdown when you hover over it */
    
      myColorMenu.hover( function() {
        $(this).css("min-width","300px");
      },
      function() {
        $(this).css("min-width","100px");
      });
      
      /* show the spectrum when you hover over a color */
            
      myColorMenuLinks.hover( function() {
        // grab the class of the a and pre-pend '#spectrum-' 
        // to make the class of the accompanying spectrum
        currentSpectrum = ".spectrum-" + $(this).attr("class"); 
        $(currentSpectrum).show();
        // update touch instructions
        $(myTouchInstructions).html("Tap spectrum to lighten or darken"); 
      },
      function() {
        $(currentSpectrum).hide();
        // restore touch instructions
        $(myTouchInstructions).html("Tap color to lighten or darken"); 
      });
      
      /* move the highlight band when you click on a spectrum */
      
      $(this).find(".color-box").click( function(e) {
        e.stopPropagation(); // stop this click from closing the dropdown
        var spectrumLocation = $(this).offset();
        var spectrumLeft = spectrumLocation.left;
        var mouseX = e.pageX; // find mouse
        var highlightBand = $(this).find(".highlight-band");
        var newPosition = mouseX - spectrumLeft - myStyleVars.halfHighlightBandWidth;
        highlightBand.css("left",newPosition); // move mouse
        methods.calculateHighlightedColor.apply(highlightBand);
        // update touch instructions
        myTouchInstructions.html("Press 'select' to choose this color.");
      });
            
      methods.horizontallyDraggable.apply($(this).find(".highlight-band"));
      
      $(this).find(".highlight-band").on("dragging",function() {
        methods.calculateHighlightedColor.apply(this);
      });
      
    
    });

  };
  
})( jQuery );

$(document).ready(function() {
  
  $(".color-picker").colorPicker();
  
});