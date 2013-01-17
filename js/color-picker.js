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
      
      var startEvent  = supportsTouch ? "touchstart.colorPicker"  : "mousedown.colorPicker";
      var moveEvent   = supportsTouch ? "touchmove.colorPicker"   : "mousemove.colorPicker";
      var endEvent    = supportsTouch ? "touchend.colorPicker"    : "mouseup.colorPicker";
      var clickEvent  = supportsTouch ? "touchend.colorPicker"    : "click.colorPicker";
      
      if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(obj, start) {
          for (var i = (start || 0), j = this.length; i < j; i++) {
            if (this[i] === obj) { 
              return i; 
            }
          };
          return -1;
        };
      }
  
      /*** settings ***/
  
      var settings = $.extend( {}, {
        showSpectrum          : true,
        showSavedColors       : true,
        showColorWheel        : true,
        saveColorsPerElement  : false,
        fadeMenuToggle        : true
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
        if (!useTabs && !settings.showSpectrum) {
          $listContainer.addClass("small");
        }
        if (useTabs) {
          var $tabContainer = $("<div>").addClass("color-menu-tabs");
          $tabContainer.append($("<span>").addClass("basicColors-tab tab tab-active").
            append($("<a>").text("Basic Colors")));
          if (settings.showSavedColors) {
            $tabContainer.append($("<span>").addClass("savedColors-tab tab").
            append($("<a>").text("Your Saved Colors")));
          }
          if (settings.showColorWheel) {
            $tabContainer.append($("<span>").addClass("fullColorWheel-tab tab").
            append("<a>").text("Full Color Wheel"));
          }
          $listContainer.append($tabContainer);
        }
        var $basicColors = $("<div>").addClass("basicColors-content active-content");
        if (settings.showSpectrum) {
          $basicColors.append($("<h6>").addClass("hidden-dekstop color-menu-instructions").
            text("Tap spectrum or drag band to change color"));
        }
        $.each(presetColors, function (index) {
          var $thisColor = $("<li>");
          var $thisLink = $("<a>").addClass(index);
          $thisLink.append($("<span>").addClass("color-preview " + index));
          $thisLink.append($("<span>").addClass("color-label").text(index));
          if (settings.showSpectrum) {
            var $thisSpectrum = $("<span>").addClass("color-box spectrum-" + index);
            var $thisHighlightBand = $("<span>").addClass("highlight-band");
            $.each([1,2,3], function () {
              $thisHighlightBand.append($("<span>").addClass("highlight-band-stripe"));
            });
            $thisSpectrum.append($thisHighlightBand);
            $thisLink.append($thisSpectrum);
          }
          $thisColor.append($thisLink);
          $basicColors.append($thisColor);
        });
        $listContainer.append($basicColors);
        if (settings.showSavedColors) {
          var $savedColors = $("<div>").addClass("savedColors-content inactive-content");
          $savedColors.append($("<p>").addClass("saved-colors-instructions").
            text("Type in a color or use the spectrums to lighten or darken an existing color."));
          $listContainer.append($savedColors);
        }
        $markup.append($listContainer);
        return $markup;
      };
  
      var myColorVars = {};
      
      var myStyleVars = {
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
          $.each(myCookies, function (index) {
            if (myCookies[index].match("savedColors-allSavedColors=")) {
              allSavedColors = myCookies[index].split("=")[1].split(",");
            }
          });
        }
      }

      /*** methods ***/
  
      var methods = {
            
        initialize: function () {
          var $this_el = $(this);
          // get the default color from the content of each div
          myColorVars.defaultColor = $this_el.text().match(/^\s+$|^$/) ? "000" : $this_el.text();
          myColorVars.typedColor = myColorVars.defaultColor;
          
          var $inputMarkup = $('<input id="appendedPrependedDropdownButton" type="text" value="' +
            myColorVars.defaultColor + '"/>').addClass("color-text-input");
          
          var colorPickerMarkup =
            markupBeforeInput().append($inputMarkup).append(markupAfterInput());
      
          $this_el.html(colorPickerMarkup);
                
          /*** style-related variables ***/
          
          console.log($(".color-box").first());
          console.log($(".color-box").first().width());
          console.log(parseInt($(".color-box").first().width(),10));
          
          myStyleVars.spectrumWidth = parseInt($(".color-box").first().width(), 10);
          if (myStyleVars.spectrumWidth === 0) {
            console.log(myStyleVars.spectrumWidth);
          }
          myStyleVars.halfSpectrumWidth = myStyleVars.spectrumWidth / 2;
          // highlightBandWidth is width plus 2x border-width
          myStyleVars.highlightBandWidth = parseInt($(".highlight-band").first().width(), 10) +
            (2 * parseInt($(".highlight-band").first().css("border-width"), 10));
          myStyleVars.halfHighlightBandWidth = myStyleVars.highlightBandWidth / 2;
          myStyleVars.threeFourthsHBW = myStyleVars.highlightBandWidth * 0.75;
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
          }
        },
    
        updatePreview: function ($this_el) {
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
              var thisColorPreviewButton = $this_el.parents(".btn-group");
              methods.closeDropdown(thisColorPreviewButton,$this_el); // close it
            }
          });
          if (settings.fadeMenuToggle) {
            $(menu).fadeIn("fast");
          } else {
            $(menu).css("display","block");
          }
          $(button).addClass("open");
        },
    
        closeDropdown: function (button,menu) {
          if (settings.fadeMenuToggle) {
            $(menu).fadeOut("fast");
          } else {
            $(menu).css("display","none");
          }
          $(button).removeClass("open");
        },
        
        toggleDropdown: function (button,menu) {
          if ($(menu).css("display") === "none") {
            methods.openDropdown(button,menu);
          } else {
            methods.closeDropdown(button,menu);
          }
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
            }
          });
        },
    
        /* takes a color and the current position of the color band,
        returns the value by which the color should be multiplied to
        get the color currently being highlighted by the band */
    
        getColorMultiplier: function (colorHex,position) {
          // position of the color band as a percentage of the width of the color box
          var spectrumWidth = myStyleVars.spectrumWidth;
          if (spectrumWidth === 0) {
            
            console.log(myStyleVars);
          }
          var percent_of_box = position / spectrumWidth;

          // white only gets darkened up to 50%, so halve multiplier and return negative value
          if (colorHex === "fff") {
            return -percent_of_box / 2;
  
            // black only gets lightened up to 50%, so divide multiplier in half
          } else if (colorHex === "000") {
            return percent_of_box / 2;
  
            // non B/W colors can be lightened OR darkened, but only to 50%,
                    
          } else if (percent_of_box <= 0.5) { // if the color band is in the light half of the box...
  
            // get the percentage position relative to half of the box,
            // then subtract from one to account for the fact that we're
            // lightening as we move away from center, not away from left
            return (1 - (position / myStyleVars.halfSpectrumWidth)) / 2;
  
          } else {  // if the color is in the dark half of the box...
  
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
        
        /* defines the area within which a colorBand can be moved */
        getMoveableArea: function ($colorBand) {
          var dimensions = {};
          var $cbParent = $colorBand.parent();
          var myWidth = myStyleVars.highlightBandWidth;
          var parentWidth = $cbParent.width(); // don't include borders for parent width
          var parentLocation = $cbParent.offset();
          dimensions.minX = parentLocation.left;
          dimensions.maxX = parentWidth - myWidth; //subtract myWidth to avoid pushing out of parent
          return dimensions;
        },
        
        moveColorBand: function ($colorBand, moveableArea, e) {
          var mouseX = supportsTouch ? e.originalEvent.pageX : e.pageX; // find the mouse!
          // mouse position relative to width of colorBand
          var newPosition = mouseX - moveableArea.minX - myStyleVars.threeFourthsHBW;
          // don't move beyond moveable area
          newPosition = Math.max(0,(Math.min(newPosition,moveableArea.maxX))); 
          $colorBand.css("position","relative");
          $colorBand.css("left", newPosition);
        },
    
        horizontallyDraggable: function () {
          $(this).on(startEvent, function (event) {
            event.preventDefault();
            var $this_el = $(event.delegateTarget);
            $this_el.css("position","relative");
            $this_el.css("cursor","-webkit-grabbing");
            $this_el.css("cursor","-moz-grabbing");
            var dimensions = methods.getMoveableArea($this_el);
            $(document).on(moveEvent, function (e) {
              $this_el.trigger("dragging");
              methods.moveColorBand($this_el, dimensions, e);
            }).on(endEvent, function(event) { 
              $(document).off(moveEvent); // for desktop
              $this_el.css("cursor","-webkit-grab");
              $this_el.css("cursor","-moz-grab");
            });
          }).on(endEvent, function(event) { 
            $(document).off(moveEvent); // for mobile
          });
        },
    
        calculateHighlightedColor: function () {
          var $this_el = $(this);
          var $this_parent = $this_el.parent();
          // get the class of the parent color box and slice off "spectrum"
          var colorName = $this_parent.attr("class").split("-")[2];
          var colorHsl = tinycolor(colorName).toHsl();
          var colorHex = tinycolor(colorName).toHex();
      
          // midpoint of the current left position of the color band
          var colorBandLocation = parseInt($this_el.css("left"),10) +
            myStyleVars.halfHighlightBandWidth;
        
          // based on the color of the color box and location of the color band,
          // figure out how multiply the base color to get the new color
          var colorMultiplier = methods.getColorMultiplier(colorHex,colorBandLocation);
          // figure out what color is being highlighted

          var highlightedColor = "#" + methods.modifyHSL(colorHsl,colorMultiplier);

          // change the color preview to the color being highlighted
          $this_parent.siblings(".color-preview").css("background-color",highlightedColor);
  
          /* replace the color label with a 'select me' button */
          $this_parent.prev('.color-label').replaceWith(
            '<button class="btn btn-mini color-select" type="button">Select</button>');
      
          // watch the position of the color band to change its border color
          // when needed for visibility
      
          // if it's not black or white....
          if ((colorHex !== "000") && (colorHex !== "fff")) {
        
            // lighten at dark end, darken at light end
            (colorBandLocation >= myStyleVars.brightSpectrumWidth) ?
              methods.lightenBorder($(this)) : methods.darkenBorder($(this));
  
          } else if (colorHex === "000") {
        
            // turn the black colorband light gray in the black section of the spectrum
            (colorBandLocation > myStyleVars.blackSpectrumWidth) ?
              methods.darkenBorder($(this)) : methods.lightenBorder($(this));
        
          }
          return highlightedColor;
        },
    
        updateSavedColorPreview: function (elements) {
          $.each(elements, function (index) {
            var $this_el = $(elements[index]);
            var thisColor = $this_el.attr("class");
            $this_el.find(".color-preview").css("background-color",thisColor);
          });
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
            numCols = Math.min(numCols,myStyleVars.maxColsInDropdown);
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
                }
                itemMarkup.push([
                  '<li>',
                   '<a class="' + columns[a][b] + '">',
                     '<span class="color-preview"></span>',
                     '<span class="color-label">' + columns[a][b] + '</span>',
                   '</a>',
                 '</li>'
                  ].join('\n'));
                if (b === (columns[a].length - 1)) {
                  itemMarkup.push('</div>');
                }
                savedColorsMarkup.push(itemMarkup.join('\n'));
              }
            }
                    
            $savedColorsContent.html(savedColorsMarkup.join('\n'));
        
            var savedColorLinks = $($savedColorsContent).find("a");
            methods.updateSavedColorPreview(savedColorLinks);
        
          }
        },
    
        setSavedColorsCookie: function (savedColors,savedColorsDataAttr) {
          var now = new Date();
          var expiresOn = new Date(now.getTime() + tenYearsInMilliseconds);
          expiresOn = expiresOn.toGMTString();
          if (typeof savedColorsDataAttr === "undefined") {
            document.cookie = "savedColors-allSavedColors=" + savedColors + ";expires=" + expiresOn;
          } else {
            document.cookie = "savedColors-" + savedColorsDataAttr + "=" + savedColors +
            ";expires=" + expiresOn;
          }
        },
    
        saveColorsToLocalStorage: function (savedColors,savedColorsDataAttr) {
          if (supportsLocalStorage) {
            // if there is no data attribute, save to allSavedColors
            if (typeof savedColorsDataAttr === "undefined") {
              localStorage.allSavedColors = JSON.stringify(savedColors);
            } else { // otherwise save to a data attr-specific item
              localStorage["savedColors-" + savedColorsDataAttr] = JSON.stringify(savedColors);
            }
          } else {
            methods.setSavedColorsCookie(savedColors,savedColorsDataAttr);
          }
        },
    
        removeFromArray: function (array, item) {
          if (array.indexOf(item) !== -1) { // make sure it's in there
            array.splice(array.indexOf(item),1);
          }
        },
    
        updateSavedColors: function (color,savedColors,savedColorsDataAttr) {
          methods.removeFromArray(savedColors,color);
          savedColors.unshift(color);
          methods.saveColorsToLocalStorage(savedColors,savedColorsDataAttr);
        },
    
        /* when settings.saveColorsPerElement, colors are saved to both mySavedColors and
        allSavedColors so they will be avail to color pickers with no savedColorsDataAttr */
        addToSavedColors: function (color,mySavedColors,savedColorsDataAttr) {
          // make sure we're saving colors and the current color is not in the pre-sets
          if (settings.showSavedColors  && !presetColors.hasOwnProperty(color)) {
            methods.updateSavedColors(color,allSavedColors);
            if (settings.saveColorsPerElement) { // if we're saving colors per element...
              methods.updateSavedColors(color,mySavedColors,savedColorsDataAttr);
            }
          }
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
        }
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
              myCookies = myCookies.split(";"); // an array of cookies...
              $.each(myCookies, function (index) { // find the matching cookie
                if (myCookies[index].match("savedColors" + mySavedColorsDataAttr)) {
                  // take out the name, turn it into an array, and set saved colors equal to it
                  mySavedColors = myCookies[index].split("=")[1].split(",");
                }
              });
            } else { // if no data-attr specific colors are in local storage OR cookies...
              mySavedColors = allSavedColors; // use mySavedColors
            }
          }
        }
            
        // add the default color to saved colors
        methods.addToSavedColors("#" + myColorVars.defaultColor,mySavedColors,mySavedColorsDataAttr);
        methods.updatePreview($myColorTextInput);
    
        /* input field focus: clear content
        input field blur: update preview, restore previous content if no value entered */
  
        $myColorTextInput.focus(function () {
          var $this_el = $(this);
          myColorVars.typedColor = $this_el.val(); // update with the current
          $this_el.val(" "); //clear the field on focus
          methods.openDropdown($myColorPreviewButton,$myColorMenu);
        }).blur(function () {
          var $this_el = $(this);
          setTimeout(function () {
            methods.closeDropdown($myColorPreviewButton,$myColorMenu);
          }, 250); // delay menu close to allow pressPreviewButton to trigger if it caused blur
          myColorVars.newValue = $this_el.val(); // on blur, check the field's value
          // if the field is empty, put the original value back in the field
          if (myColorVars.newValue.match(/^\s+$|^$/)) {
            $this_el.val(myColorVars.typedColor);
          } else { // otherwise...
            myColorVars.newValue = tinycolor(myColorVars.newValue).toHex(); // convert to hex
            $this_el.val(myColorVars.newValue); // put the new value in the field
            // save to saved colors
            methods.addToSavedColors("#" + myColorVars.newValue,mySavedColors,mySavedColorsDataAttr);
            methods.updateSavedColorMarkup($mySavedColorsContent,mySavedColors);
          }
          methods.updatePreview($this_el); // update preview
        });
        
        /* toggle visibility of dropdown menu when you click or press the preview button */

        $myColorPreviewButton.on(clickEvent, function (e) {
          methods.pressPreviewButton(e,$myColorMenu,$myColorPreviewButton);
        });
        
        // any touch or click outside of a dropdown should close all dropdowns
        
        $(document).on(clickEvent, function () {
          if ($myColorMenu.css("display") === "block") {
            methods.closeDropdown($myColorPreviewButton,$myColorMenu);
          }
        });
        
        // prevent click/touchend to color-menu or color-text input from closing dropdown
        
        $myColorMenu.on(clickEvent, function (e) {
          e.stopPropagation();
        });
        $myColorTextInput.on(clickEvent, function(e) {
          e.stopPropagation();
        });
    
        /* update field and close menu when selecting from basic dropdown */
    
        $myColorMenuLinks.click( function () {
          var selectedColor = $(this).find("span:first").css("background-color");
          selectedColor = tinycolor(selectedColor).toHex();
          $($myColorTextInput).val(selectedColor);
          methods.updatePreview($myColorTextInput);
          methods.addToSavedColors(selectedColor,mySavedColors,mySavedColorsDataAttr); 
          methods.updateSavedColorMarkup($mySavedColorsContent,mySavedColors);
          methods.closeDropdown($myColorPreviewButton,$myColorMenu); // close the dropdown
        });
                
        if (useTabs) { // make tabs tabbable
          methods.tabbable.apply($myTabs);
        }
    
        /*** for using the light/dark spectrums ***/
    
        if (settings.showSpectrum) {
    
          /* move the highlight band when you click on a spectrum */
    
          $(this).find(".color-box").click( function (e) {
            var $this_el = $(this);
            e.stopPropagation(); // stop this click from closing the dropdown
            var $highlightBand = $this_el.find(".highlight-band");
            var dimensions = methods.getMoveableArea($highlightBand);
            methods.moveColorBand($highlightBand, dimensions, e);
            var highlightedColor = methods.calculateHighlightedColor.apply($highlightBand);
            methods.addToSavedColors(highlightedColor,mySavedColors,mySavedColorsDataAttr);
            methods.updateSavedColorMarkup($mySavedColorsContent,mySavedColors);
            // update touch instructions
            $myTouchInstructions.html("Press 'select' to choose this color.");
          });
          
          methods.horizontallyDraggable.apply($myHighlightBands);
    
          $($myHighlightBands).on("dragging",function () {
            methods.calculateHighlightedColor.apply(this);
          });
          
          //FIXME: Should use the endEvent
          $($myHighlightBands).click(function (e) {
            e.stopPropagation(); // stops dragging highlight band from triggering click on spectrum
          });
      
        }

        /*** for using saved colors ***/
    
        if (settings.showSavedColors) {

          // make the links in saved colors work
          $($mySavedColorsContent).click( function (event) {
            var $this_el = $(event.target);
            // make sure click happened on a link or span
            if ($this_el.is("SPAN") || $this_el.is("A")) {
              //grab the color the link's class or span's parent link's class
              var selectedColor = $this_el.is("SPAN") ?
                $this_el.parent().attr("class") :
                $this_el.attr("class");
              $($myColorTextInput).val(selectedColor);
              methods.updatePreview($myColorTextInput);
              methods.closeDropdown($myColorPreviewButton,$myColorMenu);
              methods.addToSavedColors(selectedColor,mySavedColors,mySavedColorsDataAttr);
              methods.updateSavedColorMarkup($mySavedColorsContent,mySavedColors);
            }
          });
              
          // update saved color markup with content from localStorage or cookies, if available
          if (!settings.saveColorsPerElement) {
            methods.updateSavedColorMarkup($mySavedColorsContent,allSavedColors);
          } else if (settings.saveColorsPerElement) {
            methods.updateSavedColorMarkup($mySavedColorsContent,mySavedColors);
          }
        }
        
      });

    };
  
})(jQuery);

$(document).ready(function () {
  
  $(".color-picker").colorPicker({
    showSpectrum            : true,
    showColorWheel          : false,
    showSavedColors         : true,
    saveColorsPerElement    : true,
    fadeMenuToggle          : true
  });
  
});