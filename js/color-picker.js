(function ($) {
    "use strict";
   
    $.fn.colorPicker = function (options) {
  
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
      var smallScreen = (parseInt($(window).width(),10) < 767) ? true : false;
      var supportsLocalStorage = 'localStorage' in window && window.localStorage !== null;
      var myCookies = document.cookie;
      var tenYearsInMilliseconds = 315360000000;
  
      /*** settings ***/
  
      var settings = $.extend( {}, {
        showSpectrum          : true,
        showSavedColors       : true,
        showColorWheel        : true,
        saveColorsPerElement  : false
      }, options);
      
      var useTabs = settings.showSavedColors || settings.showColorWheel;
      
      /*** markup ***/
      
      var markupBeforeInput = function () {
        var $markup = $("<div>").addClass("input-prepend input-append color-picker-markup");
        $markup.append($("<span>").addClass("hex-pound").text("#"));
        return $markup;
      };
      
      var markupAfterInput = function () {
        var $markup = $("<div>").addClass("btn-group");
        var $button = $("<button>").addClass("btn color-dropdown dropdown-toggle");
        $button.append($("<span>").addClass("color-preview current-color"));
        $button.append($("<span>").addClass("caret"));
        $markup.append($button);
        var $listContainer = $("<ul>").addClass("color-menu dropdown-menu");
        if (useTabs) {
          var $tabContainer = $("<div>").addClass("color-menu-tabs");
          $tabContainer.append($("<span>").addClass("basicColors-tab tab tab-active").
            append($("<a>").text("Basic Colors")));
          if (settings.showSavedColors) {
            $tabContainer.append($("<span>").addClass("savedColors-tab tab").
            append($("<a>").text("Your Saved Colors")));
          };
          if (settings.showColorWheel) {
            $tabContainer.append($("<span>").addClass("fullColorWheel-tab tab").
            append("<a>").text("Full Color Wheel"));
          };
          $listContainer.append($tabContainer);
        };
        var $basicColors = $("<div>").addClass("basicColors-content active-content");
        $basicColors.append($("<h6>").addClass("hidden-dekstop color-menu-instructions").
          text("Tap spectrum to lighten or darken color"));
        $.each(presetColors, function (index, value) {
          var $thisColor = $("<li>");
          var $thisLink = $("<a>").addClass(index);
          $thisLink.append($("<span>").addClass("color-preview " + index));
          $thisLink.append($("<span>").addClass("color-label").text(index));
          if (settings.showSpectrum) {
            var $thisSpectrum = $("<span>").addClass("color-box spectrum-" + index);
            $thisSpectrum.append($("<span>").addClass("highlight-band"));
            $thisLink.append($thisSpectrum);
          };
          $thisColor.append($thisLink);
          $basicColors.append($thisColor);
        });
        $listContainer.append($basicColors);
        if (settings.showSavedColors) {
          var $savedColors = $("<div>").addClass("savedColors-content inactive-content");
          $savedColors.append($("<p>").addClass("saved-colors-instructions").
            text("Type in a color or use the spectrums to lighten or darken an existing color."));
          $listContainer.append($savedColors);
        };
        $markup.append($listContainer);
        return $markup;
      };    
  
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
        if (supportsLocalStorage && localStorage.allSavedColors) { // look for them in LS
          allSavedColors = JSON.parse(localStorage.allSavedColors); 
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
            
        initialize: function () {           
           
          // get the default color from the content of each div
          myColorVars.defaultColor = $(this).text().match(/^\s+$|^$/) ? "000" : $(this).text();
          myColorVars.typedColor = myColorVars.defaultColor;
          
          var $inputMarkup = $('<input id="appendedPrependedDropdownButton" type="text" value="' + 
            myColorVars.defaultColor + '">').addClass("color-text-input");
          
          var colorPickerMarkup = 
            markupBeforeInput().append($inputMarkup).append(markupAfterInput());
      
          $(this).html(colorPickerMarkup);
                
          /*** style-related variables ***/

          myStyleVars.spectrumWidth = parseInt($(".color-box").width(), 10); 
          myStyleVars.halfSpectrumWidth = myStyleVars.spectrumWidth / 2;
          myStyleVars.highlightBandWidth = parseInt($(".highlight-band").width(), 10) + 4; 
          myStyleVars.halfHighlightBandWidth = myStyleVars.highlightBandWidth / 2;
          myStyleVars.threeFourthsHBW = myStyleVars.highlightBandWidth * .75;
          myStyleVars.threeHighlightBands = myStyleVars.highlightBandWidth * 3;
          myStyleVars.eightHighlightBands = myStyleVars.highlightBandWidth * 8; 
          if (smallScreen) {
            myStyleVars.brightSpectrumWidth = myStyleVars.spectrumWidth - 
            myStyleVars.threeHighlightBands;
            myStyleVars.blackSpectrumWidth = myStyleVars.threeHighlightBands;
          } else {
            myStyleVars.brightSpectrumWidth = myStyleVars.spectrumWidth -
              myStyleVars.eightHighlightBands; 
            myStyleVars.blackSpectrumWidth = myStyleVars.eightHighlightBands;
          };
              
        },
    
        updatePreview: function () {
          var $this_el = $(this);        
          myColorVars.typedColor = tinycolor($this_el.val()).toHex();
          $this_el.siblings(".btn-group").find(".current-color").css("background-color",
            "#" + myColorVars.typedColor);
        },
    
        pressPreviewButton: function (event,$myColorMenu,$myColorPreviewButton) {
          event.stopPropagation(); 
          methods.toggleDropdown($myColorPreviewButton,$myColorMenu);
        },
        
        openDropdown: function (button,menu) {
          $(".color-menu").each(function () { // check all the other color menus...
            var $this_el = $(this);
            if ($this_el.css("display") === "block") { // if one is open,
              // find its color preview button
              var thisColorPreviewButton = $this_el.parents(".btn-group") 
              methods.closeDropdown(thisColorPreviewButton,$this_el); // close it
            };
          });
          $(menu).css("display","block");
          $(button).addClass("open");
        },
    
        closeDropdown: function (button,menu) {
          $(menu).css("display","none");
          $(button).removeClass("open");
        },
        
        toggleDropdown: function (button,menu) {
          if ($(menu).css("display") === "none") {
            methods.openDropdown(button,menu);
          } else {
            methods.closeDropdown(button,menu);
          };
        },
        
        tabbable: function () {
          var $this_el = $(this);
          var $myContainer = $this_el.parents(".color-picker");
          $this_el.click(function () {
            var $this_el = $(this);
            // interpret the associated content class from the tab class and get that content div
            var contentClass = $this_el.attr("class").split(" ")[0].split("-")[0] + "-content";
            var myContent = $this_el.parents(".dropdown-menu").find("." + contentClass);
            if (!$this_el.hasClass("tab-active")) { // make all active tabs inactive
              $myContainer.find(".tab-active").removeClass("tab-active"); 
              // toggle visibility of active content
              $myContainer.find(".active-content").
                removeClass("active-content").addClass("inactive-content");
              $this_el.addClass("tab-active"); // make current tab and content active
              $(myContent).addClass("active-content").removeClass("inactive-content");
            };
          });
        },
    
        /* takes a color and the current position of the color band, 
        returns the value by which the color should be multiplied to 
        get the color currently being highlighted by the band */
    
        getColorMultiplier: function (color,position) {
          // position of the color band as a percentage of the width of the color box
          var spectrumWidth = myStyleVars.spectrumWidth;
          if (spectrumWidth === 0) {
            
            console.log(myStyleVars);
          }
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
  
        modifyHSL: function (HSL,multiplier) {
          HSL.l += multiplier; // add the multiplier
          HSL.l = Math.min(Math.max(0,HSL.l),1); //make sure it's between 0 and 1
          return tinycolor(HSL).toHex();
        },
        
        changeBorderColor: function (element,color) {
          $(element).css("border-color", color);
        },
  
        lightenBorder: function (element) {
          methods.changeBorderColor(element,"#aaa");
        },
  
        darkenBorder: function (element) {
          methods.changeBorderColor(element,"#000");
        },
    
        horizontallyDraggable: function () {
          var startEvent = supportsTouch ? "touchstart" : "mousedown";
          var moveEvent = supportsTouch ? "touchmove" : "mousemove";
          var endEvent = supportsTouch ? "touchend" : "mouseup";
          
          $(this).bind(startEvent, function (event) {
            event.preventDefault(); // keep cursor from turning into text selector
            var $this_el = $(event.delegateTarget);
            var $this_parent = $this_el.parent();
            $this_el.css("position","relative");
            var parentWidth = $this_parent.width();
            var parentLocation = $this_parent.offset();
            var minX = parentLocation.left;
            var maxX = parentWidth - myStyleVars.highlightBandWidth;
            $(document).bind(moveEvent, function (e) {
              $this_el.trigger("dragging");
              var mouseX = supportsTouch ? e.originalEvent.pageX - myStyleVars.highlightBandWidth : 
                e.pageX - myStyleVars.highlightBandWidth;
              var relativeX = Math.max(0,(Math.min(mouseX-minX,maxX)));
              $this_el.css("left",relativeX);
            });
          }).bind(endEvent, function () {
            $(document).unbind(moveEvent);
          });
        },
    
        calculateHighlightedColor: function () {
          // get the class of the parent color box and slice off "spectrum"  
          var colorName = $(this).parent().attr("class").split("-")[2];
          var colorHex = tinycolor(colorName).toHex();
          var colorHsl = tinycolor(colorHex).toHsl();
      
          // midpoint of the current left position of the color band 
          var colorBandLocation = parseInt($(this).css("left"),10) + 
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
    
        updateSavedColorPreview: function (elements) {
          for (var i = 0; i < elements.length; i++) { 
            var thisColor = $(elements[i]).attr("class");
            $(elements[i]).find(".color-preview").css("background-color",thisColor);
          };
        },
    
        updateSavedColorMarkup: function ($savedColorsContent,mySavedColors) {
          if (mySavedColors.length > 0) {
                    
            if (!settings.saveColorsPerElement) {
              $savedColorsContent = $(".savedColors-content");
              mySavedColors = allSavedColors;
            }
                    
            var savedColors = mySavedColors; // array to iterate through
            var columns = [];
            var savedColorsMarkup = [];         
            
            // $savedColorsContent.html(
            //   '<div class="saved-color-col 0"></div><div class="saved-color-col 1"></div>'
            // );
            // var $savedCol0 = $(".saved-color-col 0");
            // var $savedCol1 = $(".saved-color-col 1");
            // 
            // $.each(savedColors, function (index) {
            //   var itemMarkup = [
            //     '<li>',
            //                  '<a class="' + savedColors[index] + '">',
            //                    '<span class="color-preview"></span>',
            //                    '<span class="color-label">#' + savedColors[index] + '</span>',
            //                  '</a>',
            //                '</li>'
            //   ].join('\n');
            //   if (index % 2 === 0) {
            //     $savedCol0.append(itemMarkup);
            //   } else {
            //     $savedCol1.append(itemMarkup);
            //   }
            // });
                    
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
                    
            $savedColorsContent.html(savedColorsMarkup.join('\n'));
        
            var savedColorLinks = $($savedColorsContent).find("a");
            methods.updateSavedColorPreview(savedColorLinks);
        
          };
        },
    
        setSavedColorsCookie: function (savedColors,savedColorsDataAttr) {
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
    
        saveColorsToLocalStorage: function (savedColors,savedColorsDataAttr) {
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
    
        removeFromArray: function (array, item) {
          if (array.indexOf(item) != -1) { // make sure it's in there
            array.splice(array.indexOf(item),1); // take it out, eh?
          };
        },
    
        updateSavedColors: function (color,savedColors,savedColorsDataAttr) {
          methods.removeFromArray(savedColors,color); // remove color if currently in array
          savedColors.unshift(color); // add color to top of array...
          methods.saveColorsToLocalStorage(savedColors,savedColorsDataAttr); // update localStorage
        },
    
        /* when settings.saveColorsPerElement, colors are saved to both mySavedColors and 
        allSavedColors so they will be avail to color pickers with no savedColorsDataAttr */
        addToSavedColors: function (color,mySavedColors,savedColorsDataAttr) {
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
        var $myColorSpectrums = $($myContainer).find(".color-box");
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
            $.each(mySavedColorsDataObj, function (key) {
              mySavedColorsDataAttr = key;
            });
            // get this picker's colors from local storage if possible
            if (supportsLocalStorage && localStorage["savedColors-" + mySavedColorsDataAttr]) {
              mySavedColors = JSON.parse(localStorage["savedColors-" + mySavedColorsDataAttr]);
            // otherwise, get them from cookies
            } else if (myCookies.indexOf("savedColors-" + mySavedColorsDataAttr) > -1) {
              myCookies = myCookies.split(";") // an array of cookies...
              $.each(myCookies, function (index, value) { // find the matching cookie
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
  
        $myColorTextInput.focus(function () {
          myColorVars.typedColor = $(this).val(); // update with the current typedColor
          $(this).val(" "); //clear the field on focus
          methods.openDropdown($myColorPreviewButton,$myColorMenu); 
        }).blur(function () {
          methods.closeDropdown($myColorPreviewButton,$myColorMenu); 
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
          $myColorPreviewButton.bind("touchend", function (e) {
            methods.pressPreviewButton(e,$myColorMenu,$myColorPreviewButton);
          });
      
          //any touch outside of a dropdown should close all open dropdowns
      
          $("html").bind("touchend", function () {
            if ($myColorMenu.css("display","block")) {
              methods.closeDropdown($myColorPreviewButton,$myColorMenu);
            }
          });
      
          // Prevent touchend events to color-menu or color-text-input from closing dropdown

          $myColorMenu.bind("touchend", function (e){
            e.stopPropagation();
          });

          $myColorTextInput.bind("touchend", function (e){
            e.stopPropagation();
          });
      
        } else {
          // toggle visibility of dropdown when you click preview button
          $myColorPreviewButton.click(function (e) {        
            methods.pressPreviewButton(e,$myColorMenu,$myColorPreviewButton);
          });
      
          // any click outside of a dropdown should close all open dropdowns */

          $("html").click(function (){
            if ($myColorMenu.css("display","block")) {
              methods.closeDropdown($myColorPreviewButton,$myColorMenu);
            }
          });
      
          // Prevent click events to color-menu or color-text-input from closing dropdown
          $myColorMenu.click(function (e){
            e.stopPropagation();
          });

          $myColorTextInput.click(function (e){
            e.stopPropagation();
          });
        };
    
        /* update field and close menu when selecting from basic dropdown */
    
        $myColorMenuLinks.click( function () {
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
                
        if (useTabs) { // make tabs tabbable
          methods.tabbable.apply($myTabs);
        };
          
        if (!settings.showSpectrum) { // hide spectrums if we won't show them
          $myColorSpectrums.hide();
          if (!useTabs) // smaller menu if no spectrums or tabs
            $myColorMenu.css("min-width","100px"); 
        }
    
        /*** for using the light/dark spectrums ***/
    
        if (settings.showSpectrum) {
    
          /* move the highlight band when you click on a spectrum */
    
          $(this).find(".color-box").click( function (e) {
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
    
          $($myHighlightBands).on("dragging",function () {
            methods.calculateHighlightedColor.apply(this);
          });
      
        } else {
      
          // touch instructions for no specturms
          $($myTouchInstructions).html("Tap color to select");
      
        };
    
        /*** for using saved colors ***/
    
        if (settings.showSavedColors) {
      
          // make the links in saved colors work
          $($mySavedColorsContent).click( function (event) {

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

$(document).ready(function () {
  
  $(".color-picker").colorPicker({
    showSpectrum            : true,
    showColorWheel          : false,
    showSavedColors         : true,
    saveColorsPerElement    : true
  });
  
});