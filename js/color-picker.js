(function( $ ) {
    
  $.fn.colorPicker = function(options) {
    
    /*** preset colors ***/
    
    var presetColors = [
      'fff',
      'f00',
      'f60',
      'ff0',
      '008000',
      '00f',
      '800080',
      '000'
    ];
    
    /*** settings ***/
    
    var settings = $.extend( {}, {
      'showSpectrum'        : true,
      'showSavedColors'     : true,
      'showColorWheel'      : true
    }, options);
    
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
      	  '<ul class="color-menu dropdown-menu">'
    ].join('\n');
    
    var tabsBeginningMarkup = [
            '<div class="color-menu-tabs nav-tabs">',
              '<span class="basicColors-tab tab active"><a>Basic Colors</a></span>'
    ].join('\n');

    var tabsSavedColorsMarkup = '<span class="savedColors-tab tab"><a>Your Saved Colors</a></span>';
    
    var tabsFullColorWheelMarkup = '<span class="fullColorWheel-tab tab"><a>Full Color Wheel</a></span>';
    
    var tabsEndingMarkup = '</div>';
    
    var basicColorsMarkup = [
            '<div class="basicColors-content active-content">',
        	    '<h6 class="hidden-desktop color-menu-instructions">Tap spectrum to lighten or darken color.</h6>',
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
        		'</div>'
    ].join('\n');
    
    var savedColorsMarkup = [
            '<div class="savedColors-content inactive-content">',
                '<p class="saved-colors-instructions">Type in a color or use the spectrums to lighten or darken an existing color. Up to 40 custom colors will be saved here.</p>',
            '</div>'
    ].join('\n');
               
    var endingMarkup = [
      	  '</ul>',
      	'</div>',
      '</div>'
    ].join('\n');
    
    var myColorVars = {
      typedColor              : "",
      defaultColor            : "",
      newColor                : "",
      selectedColor           : ""
    };
    
    var myStyleVars = { 
      spectrumWidth           : "", 
      halfSpectrumWidth       : "", 
      highlightBandWidth      : "", 
      halfHighlightBandWidth  : "", 
      threeFourthsHBW         : "",
      eightHighlightBands     : "",  
      brightSpectrumWidth     : "", 
      blackSpectrumWidth      : "",
      rowsInDropdown          : 8,
      maxColsInDropdown       : 5
    };
    
    if (settings.showSavedColors === true) {
      mySavedColors = [];
      mySavedColorLinks = {};
    }
     
    /*** methods ***/
    
    var methods = {
      
      initialize: function() {   
             
        
        // get the default color from the content of each div
        myColorVars.defaultColor = $(this).text().match(/^\s+$|^$/) ? "000" : $(this).text();
        myColorVars.typedColor = myColorVars.defaultColor;
        
        // use the default color to construct the markup for the color picker
        var inputMarkup = '<input id="appendedPrependedDropdownButton"' + 
        'type="text" class="span2 color-text-input" value="' + 
        myColorVars.defaultColor + '">';
        
        /** put together the markup strings according to the settings **/
                
        if ((settings.showSavedColors === false) && (settings.showColorWheel === false)) {
          var colorPickerMarkup = [
            markupBeforeInputLineWithVariable, 
            inputMarkup, 
            markupAfterInputLineWithVariable,
            basicColorsMarkup,
            endingMarkup
          ].join('\n');
        } else if ((settings.showSavedColors === true) && (settings.showColorWheel === true)) {
          var colorPickerMarkup = [
            markupBeforeInputLineWithVariable, 
            inputMarkup, 
            markupAfterInputLineWithVariable,
            tabsBeginningMarkup,
            tabsSavedColorsMarkup,
            tabsFullColorWheelMarkup,
            tabsEndingMarkup,
            basicColorsMarkup,
            savedColorsMarkup,
            endingMarkup
          ].join('\n');
        } else if ((settings.showSavedColors === true) && (settings.showColorWheel === false)) {
          var colorPickerMarkup = [
            markupBeforeInputLineWithVariable, 
            inputMarkup, 
            markupAfterInputLineWithVariable,
            tabsBeginningMarkup,
            tabsSavedColorsMarkup,
            tabsEndingMarkup,
            basicColorsMarkup,
            savedColorsMarkup,
            endingMarkup
          ].join('\n');
        } else if ((settings.showSavedColors === false) && (settings.showColorWheel === true)) {
          var colorPickerMarkup = [
            markupBeforeInputLineWithVariable, 
            inputMarkup, 
            markupAfterInputLineWithVariable,
            tabsBeginningMarkup,
            tabsFullColorWheelMarkup,
            tabsEndingMarkup,
            basicColorsMarkup,
            endingMarkup
          ].join('\n');
        };
        
        // swap in the markup
        $(this).html(colorPickerMarkup);
        
        /*** style-related variables ***/

        // width of the color spectrum boxes
        myStyleVars.spectrumWidth = parseInt($(".color-box").width()); 
        myStyleVars.halfSpectrumWidth = myStyleVars.spectrumWidth / 2;
        // width of the highlight band for picking a color on the spectrum;
        myStyleVars.highlightBandWidth = parseInt($(".highlight-band").width()) + 4; 
        myStyleVars.halfHighlightBandWidth = myStyleVars.highlightBandWidth / 2;
        myStyleVars.threeFourthsHBW = myStyleVars.highlightBandWidth * .75;
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
      
      /* switch tabs */
      
      tabbable: function(element) {
        var myContainer = $(this).parents(".color-picker");
        $(this).click(function() {
          // interpret the associated content class from the tab class and get that content div
          var contentClass = $(this).attr("class").split(" ")[0].split("-")[0] + "-content";
          var myContent = $(this).parents(".dropdown-menu").find("." + contentClass);
          if ($(this).hasClass("active") === false) {
            myContainer.find(".active").removeClass("active"); // make all active tabs inactive
            // toggle visibility of active content
            myContainer.find(".active-content").
              removeClass("active-content").addClass("inactive-content");
            $(this).addClass("active"); // make current tab and content active
            $(myContent).addClass("active-content").removeClass("inactive-content");
          };
        })
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
          event.preventDefault(); // keep cursor from turning into text selector
          var this_el = $(event.delegateTarget);
          $(this_el).css("position","absolute");
          var highlightBandWidth = $(this_el).width() + 4;
          var parentWidth = $(this_el).parent().width();
          var parentLocation = $(this_el).parent().offset();
          var minX = parentLocation.left; // this is the furthest left it can go 
          var maxX = parentWidth - highlightBandWidth; // this is the furthest right it can go
          $(document).bind("mousemove", function(e) {
            $(this_el).trigger("dragging");
            // where's my mouse at (relative to highlight band width)?
            var mouseX = e.pageX - myStyleVars.threeFourthsHBW; 
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
      },
      
      updateSavedColorPreview: function(elements) {
        for (var i = 0; i < elements.length; i++) { 
          var thisColor = $(elements[i]).attr("class");
          $(elements[i]).find(".color-preview").css("background-color",thisColor);
        };
      },
      
      updateSavedColorMarkup: function(savedColorsContent) {
        if (mySavedColors.length > 0) {
          
          var savedColors = mySavedColors; // array to iterate through
          var columns = [];
          var savedColorsMarkup = [];
          
          // split into up to max number of columns by max number of rows
          var i = 0;
          var perCol = myStyleVars.rowsInDropdown; // number of colors we can pull into a column
          var colStart = 0; // used to keep track of where to start slicing the array
          var colEnd = perCol; // used to keep track of where to stop slicing the array
          // number of columns is the number of saved colors over available rows
          var numCols = Math.ceil(savedColors.length/perCol);
          // limit that to the maximum number of columns
          var numCols = Math.min(numCols,myStyleVars.maxColsInDropdown);
          while (i < numCols) {
            columns.push(savedColors.slice(colStart,colEnd));
            i++;
            colStart += perCol;
            colEnd += perCol;
          }
          
          // create markup for each column and put it into the markup array
          for (var a = 0; a < columns.length; a++) {
            for (var b = 0; b < columns[a].length; b++) {
              var itemMarkup = [];
              if (b === 0) {
                itemMarkup.push('<div class="saved-color-col ' + a + '">');
              };
              itemMarkup.push([
                '<li>',
          				'<a class="' + columns[a][b] + '">',
          					'<span class="color-preview"></span>',
          					'<span class="color-label">#' + columns[a][b] + '</span>',
          				'</a>',
          			'</li>',
                ].join('\n'));
              if (b === (columns[a].length - 1)) {
                itemMarkup.push('</div>')
              };
              savedColorsMarkup.push(itemMarkup.join('\n'));
            };
          };
          
          // put the new html into the saved colors div
          savedColorsContent.html(savedColorsMarkup.join('\n'));
          
          // update previews of saved colors and add them to the saved color links object
          var savedColorLinks = $(".savedColors-content a");
          methods.updateSavedColorPreview(savedColorLinks);
          mySavedColorLinks = savedColorLinks;
          
        };
      },
      
      addToSavedColors: function(color,mySavedColorsContent) {
        // make sure that...
        if ((settings.showSavedColors === true) && // we're saving colors
          (presetColors.indexOf(color) === -1) && // it's not in the presets
          (mySavedColors.indexOf(color) === -1)) { // it's not already saved
          mySavedColors.push(color); // put it in the saved colors array
          methods.updateSavedColorMarkup(mySavedColorsContent);
        }
      }
      
    };
    
    return this.each(function () {
      
    
      
      /*** initialize  ***/
      methods.initialize.apply(this);      
      
      // commonly used DOM elements for each color picker
      var myContainer = this;
      var myColorTextInput = $(this).find("input");  
      var myColorMenuLinks = $(this).find(".color-menu li a");
      var myColorPreviewButton = $(this).find(".btn-group");
      var myColorMenu = $(this).find(".color-menu");
      var myTouchInstructions = $(this).find(".color-menu-instructions");
      var myHighlightBands = $(this).find(".highlight-band");
      if ((settings.showSavedColors === true) || (settings.showColorWheel === true)) {
        var myTabs = $(this).find(".tab");
      }
      if (settings.showSavedColors === true) {
        var mySavedColorsContent = $(this).find(".savedColors-content");
      }

      methods.updatePreview.apply(myColorTextInput);
      
      /* input field focus: clear content
      input field blur: update preview, restore previous content if no value entered */
    
      myColorTextInput.focus(function() {
        myColorVars.typedColor = $(this).val(); // update with the current typedColor
        $(this).val(" "); //clear the field on focus
        methods.openDropdown(myColorPreviewButton,myColorMenu); //  open dropdown
      }).blur(function() {
        methods.closeDropdown(myColorPreviewButton,myColorMenu); // close dropdown
        myColorVars.newValue = $(this).val(); // on blur, check the field's value
        // if the field is empty, put the original value back in the field
        if (myColorVars.newValue.match(/^\s+$|^$/)) {
          $(this).val(myColorVars.typedColor);
        } else { // otherwise...
          myColorVars.newValue = tinycolor(myColorVars.newValue).toHex(); // convert to hex
          $(this).val(myColorVars.newValue); // put the new value in the field
          methods.addToSavedColors(myColorVars.newValue,mySavedColorsContent); // save to saved colors
        }
        methods.updatePreview.apply(this); // update preview
      });
      
      /* open toggle visibility of dropdown menu when you click the preview button */
      
      myColorPreviewButton.click(function(e) {
        e.stopPropagation(); // prevent clicks to preview button from also triggering the generic close function below
        if (myColorMenu.css("display") === "none") { // if the related menu is currently hidden...
          $(".color-menu").each(function() { // check all the other color menus...
            if ($(this).css("display") === "block") { // if one is open,
              var thisColorPreviewButton = $(this).parents(".btn-group") // find its color preview button
              methods.closeDropdown(thisColorPreviewButton,$(this)); // close it
            }
          });
          methods.openDropdown(myColorPreviewButton,myColorMenu);
        } else {
          methods.closeDropdown(myColorPreviewButton,myColorMenu);
        }
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
        methods.addToSavedColors(selectedColor,mySavedColorsContent); // add to saved colors
        methods.closeDropdown(myColorPreviewButton,myColorMenu); // close the dropdown
      });
      
      /* make the tabs tabbable */
      
      if ((settings.showSavedColors === true) || (settings.showColorWheel === true)) {
        methods.tabbable.apply(myTabs);
      };
      
      /*** for using the light/dark spectrums ***/
      
      if (settings.showSpectrum === true) {
      
        /* move the highlight band when you click on a spectrum */
      
        $(this).find(".color-box").click( function(e) {
          e.stopPropagation(); // stop this click from closing the dropdown
          var spectrumLocation = $(this).offset();
          var spectrumLeft = spectrumLocation.left;
          var mouseX = e.pageX; // find mouse
          var highlightBand = $(this).find(".highlight-band");
          var newPosition = mouseX - spectrumLeft - (myStyleVars.threeFourthsHBW);
          highlightBand.css("left",newPosition); // move mouse
          methods.calculateHighlightedColor.apply(highlightBand);
          // update touch instructions
          myTouchInstructions.html("Press 'select' to choose this color.");
        });
            
        methods.horizontallyDraggable.apply(myHighlightBands);
      
        $(myHighlightBands).on("dragging",function() {
          methods.calculateHighlightedColor.apply(this);
        });
        
      } else {
        
        // if we aren't showing spectrums, 
        // make touch instructions appropriate and 
        // move menu to its original location
        $(myTouchInstructions).html("Tap color to select");
        $(myColorMenu).css("left","0");
        
      }
    
    });

  };
  
})( jQuery );

$(document).ready(function() {
  
  $(".color-picker").colorPicker({
    'showSpectrum'      : true,
    'showColorWheel'    : false,
    'showSavedColors'   : true
  });
  
});