(function( $ ) {
    
  $.fn.colorPicker = function(options) {
    
    /*** preset colors ***/
    
    var presetColors = {
      white     : 'fff',
      red       : 'f00',
      orange    : 'f60',
      yellow    : 'ff0',
      green     : '008000',
      blue      : '00f',
      purple    : '800080',
      black     : '000'
    };
    
    /*** capabilities ***/
    
    var supportsTouch = 'ontouchstart' in window || 'onmsgesturechange' in window;
    var smallScreen = (parseInt($(window).width()) < 767) ? true : false;
    var supportsLocalStorage = 'localStorage' in window && window['localStorage'] !== null;
    var myCookies = document.cookie;
    var tenYearsInMilliseconds = 315360000000;
    
    /*** settings ***/
    
    var settings = $.extend( {}, {
      showSpectrum          : true,
      showSavedColors       : true,
      showColorWheel        : true,
      saveColorsPerElement  : false
    }, options);
    
    /*** color picker markup ***/

    var markupBeforeInputLineWithVariable = [
      '<div class="input-prepend input-append color-picker-markup">',
      	'<span class="hex-pound">#</span>'
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
            '<div class="color-menu-tabs">',
              '<span class="basicColors-tab tab tab-active"><a>Basic Colors</a></span>'
    ].join('\n');

    var tabsSavedColorsMarkup = '<span class="savedColors-tab tab"><a>Your Saved Colors</a></span>';
    
    var tabsFullColorWheelMarkup = '<span class="fullColorWheel-tab tab"><a>Full Color Wheel</a></span>';
    
    var tabsEndingMarkup = '</div>';
    
    var basicColorsMarkup = [
            '<div class="basicColors-content active-content">',
              '<h6 class="hidden-desktop color-menu-instructions">',
                'Tap spectrum to lighten or darken color.',
              '</h6>',
    ];
    
    $.each(presetColors, function(index, value) {
      var singleColorMarkup = [
        '<li>',
          '<a class="' + index + '">',
            '<span class="color-preview ' + index + '"></span>',
            '<span class="color-label">' + index + "</span>",
            '<span class="color-box spectrum-' + index + '">',
              '<span class="highlight-band"></span>',
            '</span>',
          '</a>',
        '</li>'
      ].join('\n');
      basicColorsMarkup.push(singleColorMarkup);
    })
    
    basicColorsMarkup.push('</div>');
    basicColorsMarkup = basicColorsMarkup.join('\n');
    
    var savedColorsMarkup = [
            '<div class="savedColors-content inactive-content">',
                '<p class="saved-colors-instructions">',
                  'Type in a color or use the spectrums to lighten or darken an existing color. ' + 
                  'Up to 16 custom colors will be saved here.',
                '</p>',
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
      maxColsInDropdown       : 2
    };
       
    if (settings.showSavedColors) { // if we're saving colors...
      var allSavedColors = []; // make an array for all saved colors
      if (supportsLocalStorage && localStorage["allSavedColors"]) { // look for them in LS
        allSavedColors = JSON.parse(localStorage["allSavedColors"]); 
        // if there's a saved_colors cookie...
      } else if (myCookies.indexOf("savedColors-allSavedColors") > -1) { 
        myCookies = myCookies.split(";"); // split cookies into an array...
        for (var i = 0; i < myCookies.length; i++) {
          // look for the saved colors cookie...
          if (myCookies[i].match("savedColors-allSavedColors=")) { 
          // take out the name, turn it into an array, and set saved colors equal to it
            allSavedColors = myCookies[i].split("=")[1].split(","); 
          };
        };
      };
    };

    /*** methods ***/
    
    var methods = {
      
      initialize: function() {           
             
        // get the default color from the content of each div
        myColorVars.defaultColor = $(this).text().match(/^\s+$|^$/) ? "000" : $(this).text();
        myColorVars.typedColor = myColorVars.defaultColor;
        
        // use the default color to construct the markup for the color picker
        var inputMarkup = '<input id="appendedPrependedDropdownButton"' + 
        'type="text" class="color-text-input" value="' + 
        myColorVars.defaultColor + '">';
        
        /** put together the markup strings according to the settings **/
                
        if (!settings.showSavedColors && !settings.showColorWheel) {
          var colorPickerMarkup = [
            markupBeforeInputLineWithVariable, 
            inputMarkup, 
            markupAfterInputLineWithVariable,
            basicColorsMarkup,
            endingMarkup
          ].join('\n');
        } else if (settings.showSavedColors && settings.showColorWheel) {
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
        } else if (settings.showSavedColors && !settings.showColorWheel) {
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
        } else if (!settings.showSavedColors && settings.showColorWheel) {
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
        myStyleVars.spectrumWidth = parseInt($(".color-box").width(), 10); 
        myStyleVars.halfSpectrumWidth = myStyleVars.spectrumWidth / 2;
        // width of the highlight band for picking a color on the spectrum;
        myStyleVars.highlightBandWidth = parseInt($(".highlight-band").width(), 10) + 4; 
        myStyleVars.halfHighlightBandWidth = myStyleVars.highlightBandWidth / 2;
        myStyleVars.threeFourthsHBW = myStyleVars.highlightBandWidth * .75;
        // for defining things relative to a few drags' worth of color band
        myStyleVars.threeHighlightBands = myStyleVars.highlightBandWidth * 3;
        myStyleVars.eightHighlightBands = myStyleVars.highlightBandWidth * 8; 
        if (smallScreen) {
          myStyleVars.brightSpectrumWidth = myStyleVars.spectrumWidth - 
          myStyleVars.threeHighlightBands;
          myStyleVars.blackSpectrumWidth = myStyleVars.threeHighlightBands;
        } else {
          // how long the colorbox spectrums for non-B/W color spectrums are bright, 
          // relative to the width of the band
          myStyleVars.brightSpectrumWidth = myStyleVars.spectrumWidth -
            myStyleVars.eightHighlightBands; 
          //how long the black colorbox spectrum is nearly black
          myStyleVars.blackSpectrumWidth = myStyleVars.eightHighlightBands;
        }
                
      },
      
      /* make the current-color preview match the text field value */
      updatePreview: function() {        
        myColorVars.typedColor = tinycolor($(this).val()).toHex();
        $(this).siblings(".btn-group").find(".current-color").css("background-color",
        "#" + myColorVars.typedColor);
      },
      
      pressPreviewButton: function(event,$myColorMenu,$myColorPreviewButton) {
        event.stopPropagation(); 
        if ($myColorMenu.css("display") === "none") { // if the related menu is currently hidden...
          methods.openDropdown($myColorPreviewButton,$myColorMenu);
        } else {
          methods.closeDropdown($myColorPreviewButton,$myColorMenu);
        }
      },
      
      /* open and close dropdown menu */
      
      openDropdown: function(button,menu) {
        $(".color-menu").each(function() { // check all the other color menus...
          if ($(this).css("display") === "block") { // if one is open,
            // find its color preview button
            var thisColorPreviewButton = $(this).parents(".btn-group") 
            methods.closeDropdown(thisColorPreviewButton,$(this)); // close it
          }
        });
        $(menu).css("display","block");
        $(button).addClass("open");
      },
      
      closeDropdown: function(button,menu) {
        $(menu).css("display","none");
        $(button).removeClass("open");
      },
      
      /* switch tabs */
      
      tabbable: function(element) {
        var $myContainer = $(this).parents(".color-picker");
        $(this).click(function() {
          // interpret the associated content class from the tab class and get that content div
          var contentClass = $(this).attr("class").split(" ")[0].split("-")[0] + "-content";
          var myContent = $(this).parents(".dropdown-menu").find("." + contentClass);
          if (!$(this).hasClass("tab-active")) {
            // make all active tabs inactive
            $myContainer.find(".tab-active").removeClass("tab-active"); 
            // toggle visibility of active content
            $myContainer.find(".active-content").
              removeClass("active-content").addClass("inactive-content");
            $(this).addClass("tab-active"); // make current tab and content active
            $(myContent).addClass("active-content").removeClass("inactive-content");
          };
        })
      },
      
      /* takes a color and the current position of the color band, 
      returns the value by which the color should be multiplied to 
      get the color currently being highlighted by the band */
      
      getColorMultiplier: function(color,position) {
        // position of the color band as a percentage of the width of the color box
        var spectrumWidth = smallScreen ? 170 : 200;
        var percent_of_box = position / spectrumWidth; 

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
        $(element).css("border-color", color);
      },
    
      lightenBorder: function(element) {
        methods.changeBorderColor(element,"#aaa");
      },
    
      darkenBorder: function(element) {
        methods.changeBorderColor(element,"#000");
      },
      
      horizontallyDraggable: function(element) {
        // for touch
        if (supportsTouch) {
          $(this).bind("touchstart", function (event) {
            $(document).unbind("touchmove"); // unbind previous drags
            event.preventDefault(); // keep cursor from turning into text selector
            // specify event target so we don't affect all elements with a certain class
            var this_el = $(event.delegateTarget);
            $(this_el).css("position","relative");
            var highlightBandWidth = $(this_el).width();
            var parentWidth = $(this_el).parent().width();
            var parentLocation = $(this_el).parent().offset();
            var minX = parentLocation.left; // this is the furthest left it can go 
            var maxX = parentWidth - highlightBandWidth; // this is the furthest right it can go
            $(document).bind("touchmove", function(e) {
              $(this_el).trigger("dragging");
              // where's my mouse at (relative to highlight band width)?
              var mouseX = e.originalEvent.pageX - myStyleVars.threeFourthsHBW; 
              // constrain mouse positions to min and max values
              var relativeX = Math.max(0,(Math.min(mouseX-minX,maxX))); 
              $(this_el).css("left", relativeX); // put the draggable element there
            }).bind("touchend", function() {
              $(document).unbind("touchmove"); // stop dragging
            });
          });
        // for desktop
        } else {
          $(this).mousedown(function (event) {
            event.preventDefault(); // keep cursor from turning into text selector
            // specify event target so we don't affect all elements with a certain class
            var this_el = $(event.delegateTarget);
            $(this_el).css("position","relative");
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
        }
      },
      
      calculateHighlightedColor: function() {
        // get the class of the parent color box and slice off "spectrum"  
        var colorName = $(this).parent().attr("class").split("-")[2];
        var colorHex = tinycolor(colorName).toHex();
        var colorHsl = tinycolor(colorHex).toHsl();
        
        // midpoint of the current left position of the color band 
        var colorBandLocation = parseInt($(this).css("left")) + 
          myStyleVars.halfHighlightBandWidth; 
          
        // based on the color of the color box and location of the color band, 
        // figure out how multiply the base color to get the new color 
        var colorMultiplier = methods.getColorMultiplier(colorName,colorBandLocation); 
        // figure out what color is being highlighted 

        var highlightedColor = methods.modifyHSL(colorHsl,colorMultiplier);

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
        return highlightedColor;
      },
      
      updateSavedColorPreview: function(elements) {
        for (var i = 0; i < elements.length; i++) { 
          var thisColor = $(elements[i]).attr("class");
          $(elements[i]).find(".color-preview").css("background-color",thisColor);
        };
      },
      
      updateSavedColorMarkup: function($savedColorsContent,mySavedColors) {
        if (mySavedColors.length > 0) {
          
          if (!settings.saveColorsPerElement) {
            $savedColorsContent = $(".savedColors-conten");
            mySavedColors = allSavedColors;
          }
          
          var savedColors = mySavedColors; // array to iterate through
          var columns = [];
          var savedColorsMarkup = [];
          
          // split into up to max number of columns by max number of rows
          var i = 0;
          var perCol = myStyleVars.rowsInDropdown; // number of colors we can pull into a column
          // used to keep track of where to start slicing the array
          var colStart = 0; 
          // number of columns is the number of saved colors over available rows
          var numCols = Math.ceil(savedColors.length/perCol);
          // limit that to the maximum number of columns
          var numCols = Math.min(numCols,myStyleVars.maxColsInDropdown);
          while (i < numCols) {
            columns.push(savedColors.slice(colStart,colStart+perCol));
            i++;
            colStart += perCol; // move start back by the number of items per column
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
          $savedColorsContent.html(savedColorsMarkup.join('\n'));
          
          // update previews of saved colors 
          var savedColorLinks = $($savedColorsContent).find("a");
          methods.updateSavedColorPreview(savedColorLinks);
          
        };
      },
      
      setSavedColorsCookie: function(savedColors,savedColorsDataAttr) {
        var now = new Date();
        var expiresOn = new Date(now.getTime() + tenYearsInMilliseconds);
        expiresOn = expiresOn.toGMTString();
        if (!settings.saveColorsPerElement) {
          document.cookie = "savedColors-allSavedColors=" + savedColors + ";expires=" + expiresOn;
        } else {
          document.cookie = "savedColors-" + savedColorsDataAttr + "=" + savedColors + 
          ";expires=" + expiresOn;
        };
      },
      
      saveColorsToLocalStorage: function(savedColors,savedColorsDataAttr) {
        if (supportsLocalStorage) {
          // if there is no data attribute, save to allSavedColors
          if (typeof savedColorsDataAttr === "undefined") { 
            localStorage["allSavedColors"] = JSON.stringify(savedColors);
          } else { // otherwise save to a data attr-specific item 
            localStorage["savedColors-" + savedColorsDataAttr] = JSON.stringify(savedColors);
          };
        } else {
          setSavedColorsCookie(savedColors,savedColorsDataAttr);
        };
      },
      
      removeFromArray: function(array, item) {
        if (array.indexOf(item) != -1) { // make sure it's in there
          array.splice(array.indexOf(item),1); // take it out, eh?
        };
      },
      
      updateSavedColors: function(color,savedColors,savedColorsDataAttr) {
        methods.removeFromArray(savedColors,color); // remove color if currently in array
        savedColors.unshift(color); // add color to top of array...
        methods.saveColorsToLocalStorage(savedColors,savedColorsDataAttr); // update localStorage
      },
      
      /* when settings.saveColorsPerElement === true, colors are saved to both
      mySavedColors and allSavedColors so they will be avail to color pickers
      with no savedColorsDataAttr */
      addToSavedColors: function(color,mySavedColors,savedColorsDataAttr) {
        // make sure we're saving colors and the current color is not in the pre-sets
        if (settings.showSavedColors  && !presetColors.hasOwnProperty(color)) {
          methods.updateSavedColors(color,allSavedColors);
          if (settings.saveColorsPerElement) { // if we're saving colors per element...
            methods.updateSavedColors(color,mySavedColors,savedColorsDataAttr);
          };
        };
      }
      
    };
    
    return this.each(function () {      
      
      /*** initialize  ***/
      methods.initialize.apply(this);      
      
      // commonly used DOM elements for each color picker
      var $myContainer = this;
      var $myColorTextInput = $($myContainer).find("input");  
      var $myColorMenuLinks = $($myContainer).find(".color-menu li a");
      var $myColorPreviewButton = $($myContainer).find(".btn-group");
      var $myColorMenu = $($myContainer).find(".color-menu");
      var $myTouchInstructions = $($myContainer).find(".color-menu-instructions");
      var $myHighlightBands = $($myContainer).find(".highlight-band");
      if (settings.showSavedColors || settings.showColorWheel) {
        var $myTabs = $($myContainer).find(".tab");
      };
      if (settings.showSavedColors) {
        var $mySavedColorsContent = $($myContainer).find(".savedColors-content");
        if (settings.saveColorsPerElement) { // when saving colors for each color picker...
          var mySavedColors = [];
          var mySavedColorsDataObj = $($myContainer).data(); 
          var mySavedColorsDataAttr;
          $.each(mySavedColorsDataObj, function(key) {
            mySavedColorsDataAttr = key;
          });
          // get this picker's colors from local storage if possible
          if (supportsLocalStorage && localStorage["savedColors-" + mySavedColorsDataAttr]) {
            mySavedColors = JSON.parse(localStorage["savedColors-" + mySavedColorsDataAttr]);
          // otherwise, get them from cookies
          } else if (myCookies.indexOf("savedColors-" + mySavedColorsDataAttr) > -1) {
            myCookies = myCookies.split(";") // an array of cookies...
            $.each(myCookies, function(index, value) { // find the matching cookie
              if (myCookies[index].match("savedColors" + mySavedColorsDataAttr)) {
                // take out the name, turn it into an array, and set saved colors equal to it
                mySavedColors = myCookies[i].split("=")[1].split(","); 
              };
            });
          } else { // if no data-attr specific colors are in local storage OR cookies...
            mySavedColors = allSavedColors; // use mySavedColors
          };
        };
      };
      
      // add the default color to saved colors
      methods.addToSavedColors(myColorVars.defaultColor,mySavedColors,mySavedColorsDataAttr);
      methods.updatePreview.apply($myColorTextInput);
      
      /* input field focus: clear content
      input field blur: update preview, restore previous content if no value entered */
    
      $myColorTextInput.focus(function() {
        myColorVars.typedColor = $(this).val(); // update with the current typedColor
        $(this).val(" "); //clear the field on focus
        methods.openDropdown($myColorPreviewButton,$myColorMenu); //  open dropdown
      }).blur(function() {
        methods.closeDropdown($myColorPreviewButton,$myColorMenu); // close dropdown
        myColorVars.newValue = $(this).val(); // on blur, check the field's value
        // if the field is empty, put the original value back in the field
        if (myColorVars.newValue.match(/^\s+$|^$/)) {
          $(this).val(myColorVars.typedColor);
        } else { // otherwise...
          myColorVars.newValue = tinycolor(myColorVars.newValue).toHex(); // convert to hex
          $(this).val(myColorVars.newValue); // put the new value in the field
          // save to saved colors
          methods.addToSavedColors(myColorVars.newValue,mySavedColors,mySavedColorsDataAttr); 
          methods.updateSavedColorMarkup($mySavedColorsContent,mySavedColors)
        }
        methods.updatePreview.apply(this); // update preview
      });
      
      /* toggle visibility of dropdown menu when you click or press the preview button */
      
      if (supportsTouch) {
        // toggle visibility of dropdown when you press preview button
        $myColorPreviewButton.bind("touchend", function(e) {
          methods.pressPreviewButton(e,$myColorMenu,$myColorPreviewButton);
        });
        
        //any touch outside of a dropdown should close all open dropdowns
        
        $("html").bind("touchend", function() {
          if ($myColorMenu.css("display","block")) {
            methods.closeDropdown($myColorPreviewButton,$myColorMenu);
          }
        });
        
        // Prevent touchend events to color-menu or color-text-input from closing dropdown

        $myColorMenu.bind("touchend", function(e){
          e.stopPropagation();
        });

        $myColorTextInput.bind("touchend", function(e){
          e.stopPropagation();
        });
        
      } else {
        // toggle visibility of dropdown when you click preview button
        $myColorPreviewButton.click(function(e) {        
          methods.pressPreviewButton(e,$myColorMenu,$myColorPreviewButton);
        });
        
        // any click outside of a dropdown should close all open dropdowns */

        $("html").click(function(){
          if ($myColorMenu.css("display","block")) {
            methods.closeDropdown($myColorPreviewButton,$myColorMenu);
          }
        });
        
        // Prevent click events to color-menu or color-text-input from closing dropdown
        $myColorMenu.click(function(e){
          e.stopPropagation();
        });

        $myColorTextInput.click(function(e){
          e.stopPropagation();
        });
      };
      
      /* update field and close menu when selecting from basic dropdown */
      
      $myColorMenuLinks.click( function() {
        //grab the bg color from its preview 
        var selectedColor = $(this).find("span:first").css("background-color"); 
        selectedColor = tinycolor(selectedColor).toHex(); // convert to hex
        $($myColorTextInput).val(selectedColor); // put it in the field 
        methods.updatePreview.apply($myColorTextInput); // update the button preview to match
        // add to saved colors 
        methods.addToSavedColors(selectedColor,mySavedColors,mySavedColorsDataAttr); 
        methods.updateSavedColorMarkup($mySavedColorsContent,mySavedColors)
        methods.closeDropdown($myColorPreviewButton,$myColorMenu); // close the dropdown
      });
            
      /* make the tabs tabbable */
      
      if (settings.showSavedColors || settings.showColorWheel) {
        methods.tabbable.apply($myTabs);
      };
      
      
      /*** hide the spectrums if they aren't shown ***/
      
      if (!settings.showSpectrum) {
        $(".color-box").hide();        
      }
      
      /*** for using the light/dark spectrums ***/
      
      if (settings.showSpectrum) {
      
        /* move the highlight band when you click on a spectrum */
      
        $(this).find(".color-box").click( function(e) {
          e.stopPropagation(); // stop this click from closing the dropdown
          var spectrumLocation = $(this).offset();
          var spectrumLeft = spectrumLocation.left;
          var mouseX = e.pageX; // find mouse
          var highlightBand = $(this).find(".highlight-band");
          var newPosition = mouseX - spectrumLeft - (myStyleVars.threeFourthsHBW);
          highlightBand.css("left",newPosition); // move mouse
          var highlightedColor = methods.calculateHighlightedColor.apply(highlightBand);
          methods.addToSavedColors(highlightedColor,mySavedColors,mySavedColorsDataAttr);
          methods.updateSavedColorMarkup($mySavedColorsContent,mySavedColors);
          // update touch instructions
          $myTouchInstructions.html("Press 'select' to choose this color.");
        });
            
        methods.horizontallyDraggable.apply($myHighlightBands);
      
        $($myHighlightBands).on("dragging",function() {
          methods.calculateHighlightedColor.apply(this);
        });
        
      } else {
        
        // touch instructions for no specturms
        $($myTouchInstructions).html("Tap color to select");
        
      };
      
      /*** for using saved colors ***/
      
      if (settings.showSavedColors) {
        
        // make the links in saved colors work
        $($mySavedColorsContent).click( function(event) {

          // make sure click happened on a link or span
          if ($(event.target).is("SPAN") || $(event.target).is("A")) { 
            //grab the color the link's class or span's parent link's class
            var selectedColor = $(event.target).is("SPAN") ? 
              $(event.target).parent().attr("class") :
              $(event.target).attr("class");
            $($myColorTextInput).val(selectedColor); // put it in the field 
            methods.updatePreview.apply($myColorTextInput); // update the button preview to match 
            methods.closeDropdown($myColorPreviewButton,$myColorMenu); // close the dropdown
          }
        });
                
        // update saved color markup with content from cookies, if available
        if (!settings.saveColorsPerElement) {
          methods.updateSavedColorMarkup($mySavedColorsContent,allSavedColors);
        } else if (settings.saveColorsPerElement) {
          methods.updateSavedColorMarkup($mySavedColorsContent,mySavedColors);
        };
      };
          
    });

  }
  
})( jQuery );

$(document).ready(function() {
  
  $(".color-picker").colorPicker({
    showSpectrum            : true,
    showColorWheel          : false,
    showSavedColors         : true,
    saveColorsPerElement    : true
  });
  
});