;(function ($) {
    "use strict";
   
    $.fn.pickAColor = function (options) {
  
      // preset colors
  
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
        
      // capabilities
  
      var supportsTouch = 'ontouchstart' in window,
          smallScreen = (parseInt($(window).width(),10) < 767) ? true : false,
          supportsLocalStorage = 'localStorage' in window && window.localStorage !== null && 
            typeof JSON === 'object', // don't use LS if JSON is not available (IE, ahem)
          isIE = /*@cc_on!@*/false, // OH NOES!
          myCookies = document.cookie,
          tenYearsInMilliseconds = 315360000000, // shut up I need it for the cookie
      
          startEvent    = supportsTouch ? "touchstart.pickAColor"  : "mousedown.pickAColor",
          moveEvent     = supportsTouch ? "touchmove.pickAColor"   : "mousemove.pickAColor",
          endEvent      = supportsTouch ? "touchend.pickAColor"    : "mouseup.pickAColor",
          clickEvent    = supportsTouch ? "touchend.pickAColor"    : "click.pickAColor",
          dragEvent     = "dragging.pickAColor",
          endDragEvent  = "endDrag.pickAColor";
                
      if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(obj) {
          for (var i = 0; i < this.length; i++) {
            if (this[i] === obj) { 
              return i; 
            }
          };
          return -1;
        };
      }
  
      // settings
  
      var settings = $.extend( {}, {
        showSpectrum          : true,
        showSavedColors       : true,
        saveColorsPerElement  : false,
        fadeMenuToggle        : true
      }, options);
      
      var useTabs = settings.showSavedColors;
      
      // so much markup 
      
      var markupBeforeInput = function () {
        return $("<div>").addClass("input-prepend input-append pick-a-color-markup").
          append($("<span>").addClass("hex-pound").text("#"));
      };
      
      var markupAfterInput = function () {
        var $markup = $("<div>").addClass("btn-group").
          append($("<button>").addClass("btn color-dropdown dropdown-toggle").
            append($("<span>").addClass("color-preview current-color")).
            append($("<span>").addClass("caret")));
        var $dropdownContainer = $("<div>").addClass("color-menu dropdown-menu");
        if (!useTabs && !settings.showSpectrum) {
          $dropdownContainer.addClass("small");
        }
        if (useTabs) {
          var $tabContainer = $("<div>").addClass("color-menu-tabs");
          $tabContainer.append($("<span>").addClass("basicColors-tab tab tab-active").
            append($("<a>").text("Basic Colors")));
          if (settings.showSavedColors) {
            $tabContainer.append($("<span>").addClass("savedColors-tab tab").
            append($("<a>").text("Your Saved Colors")));
          }
          $dropdownContainer.append($tabContainer);
        }
        var $basicColors = $("<div>").addClass("basicColors-content active-content");
        if (settings.showSpectrum) {
          $basicColors.append($("<h6>").addClass("color-menu-instructions").
            text("Tap spectrum or drag band to change color"));
        }
        var $listContainer = $("<ul>").addClass("basic-colors-list");
        $.each(presetColors, function (index,value) {
          var $thisColor = $("<li>").addClass("color-item");
          var $thisLink = $("<a>").addClass(index + " color-link").
            append($("<span>").addClass("color-preview " + index)).
            append($("<span>").addClass("color-label").text(index));
          if (settings.showSpectrum) {
            var $thisSpectrum = $("<span>").addClass("color-box spectrum-" + index);
            if (isIE) {
              $.each([0,1], function (i) {
                if (value !== "fff" && index !== "000")
                $thisSpectrum.append($("<span>").addClass(index + "-spectrum-" + i +
                " ie-spectrum"));
              });
            }
            var $thisHighlightBand = $("<span>").addClass("highlight-band");
            $.each([0,1,2], function () {
              $thisHighlightBand.append($("<span>").addClass("highlight-band-stripe"));
            });
            $thisLink.append($thisSpectrum.append($thisHighlightBand));
          }
          $listContainer.append($thisColor.append($thisLink));
        });
        $dropdownContainer.append($basicColors.append($listContainer));
        if (settings.showSavedColors) {
          var $savedColors = $("<div>").addClass("savedColors-content inactive-content");
          $savedColors.append($("<p>").addClass("saved-colors-instructions").
            text("Type in a color or use the spectrums to lighten or darken an existing color."));
          $dropdownContainer.append($savedColors);
        }
        $markup.append($dropdownContainer);
        return $markup;
      };
  
      var myColorVars = {};
      
      var myStyleVars = {
          rowsInDropdown     : 8,
          maxColsInDropdown  : 2
      };
     
      if (settings.showSavedColors) { // if we're saving colors...
        var allSavedColors = []; // make an array for all saved colors
        if (supportsLocalStorage && localStorage.allSavedColors) { // look for them in LS
          allSavedColors = JSON.parse(localStorage.allSavedColors);
          
          // if there's a saved_colors cookie...          
        } else if (myCookies.indexOf("pickAColorSavedColors-allSavedColors") > -1) {
          var theseCookies = myCookies.split(";"); // split cookies into an array...
          
          $.each(theseCookies, function (index) { // find the savedColors cookie!
            if (theseCookies[index].match("pickAColorSavedColors-allSavedColors=")) {
              allSavedColors = theseCookies[index].split("=")[1].split(",");
            }
          
          });
        }
      }
      

      // methods
  
      var methods = {
            
        initialize: function () {
          var $this_el = $(this);
          var $myContainer = $this_el.parents(".pick-a-color-markup");
          
          // get the default color from the content or data attribute
          myColorVars.defaultColor = $this_el.text() === "" ? "000" : $this_el.text();
          myColorVars.typedColor = myColorVars.defaultColor;
          
          $this_el.html(function (){
            return markupBeforeInput().append(function () {
              return $('<input id="appendedPrependedDropdownButton" type="text" value="' +
                myColorVars.defaultColor + '"/>').addClass("color-text-input");
            }).append(markupAfterInput());
          });
        },
    
        updatePreview: function ($this_el) {
          myColorVars.typedColor = tinycolor($this_el.val()).toHex();
          $this_el.siblings(".btn-group").find(".current-color").css("background-color",
            "#" + myColorVars.typedColor);
        },
        
        // must be called with apply and an arguments array like [{thisEvent}]
        pressPreviewButton: function () {
          var thisEvent = arguments[0].thisEvent;
          thisEvent.stopPropagation();
          methods.toggleDropdown(thisEvent.target);
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
          
          if (settings.fadeMenuToggle && !supportsTouch) { //fades look terrible in mobile
            $(menu).fadeIn("fast");
          } else {
            $(menu).css("display","block");
          }
          
          $(button).addClass("open");
        },
    
        closeDropdown: function (button,menu) {
          if (settings.fadeMenuToggle && !supportsTouch) { //fades look terrible in mobile
            $(menu).fadeOut("fast");
          } else {
            $(menu).css("display","none");
          }
          
          $(button).removeClass("open");
        },
        
        // can only be called with apply. requires an arguments array like: 
        // [{button, menu}]
        closeDropdownIfOpen: function () {
          var button = arguments[0].button,
              menu = arguments[0].menu;
          if (menu.css("display") === "block") {
            methods.closeDropdown(button,menu);
          }
        },
        
        toggleDropdown: function (element) {
          var $container = $(element).parents(".pick-a-color-markup"),
              $button = $container.find(".btn-group"),
              $menu = $container.find(".color-menu");
          if ($menu.css("display") === "none") {
            methods.openDropdown($button,$menu);
          } else {
            methods.closeDropdown($button,$menu);
          }
        },
        
        tabbable: function () {
          var $this_el = $(this),
              $myContainer = $this_el.parents(".pick-a-color-markup");
          
          $this_el.click(function () {
            var $this_el = $(this),
            // interpret the associated content class from the tab class and get that content div
                contentClass = $this_el.attr("class").split(" ")[0].split("-")[0] + "-content",
                myContent = $this_el.parents(".dropdown-menu").find("." + contentClass);
            
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
    
        // takes a color and the current position of the color band,
        // returns the value by which the color should be multiplied to
        // get the color currently being highlighted by the band
    
        getColorMultiplier: function (colorHex,position) {
          // position of the color band as a percentage of the width of the color box
          var spectrumWidth = parseInt($(".color-box").first().width(),10);
          if (spectrumWidth === 0) { // in case the width isn't set correctly
            spectrumWidth = supportsTouch ? 160 : 200;
          }
          var halfSpectrumWidth = spectrumWidth / 2,
              percentOfBox = position / spectrumWidth,
              spectrumType;

          switch(colorHex) {
            case "fff":
              spectrumType = "darkenRight";
              break;
            case "000":
              spectrumType = "ligtenRight";
              break;
            default:
              spectrumType = "bidirectional"
          }
                    
          // for spectrums that lighten and darken, recalculate percent of box relative
          // to the half of spectrum the highlight band is currently in
          if (spectrumType === "bidirectional") {
            return (percentOfBox <= 0.5) ?
              (1 - (position / halfSpectrumWidth)) / 2 :
              -((position - halfSpectrumWidth) / halfSpectrumWidth) / 2
            // now that we're treating each half as an individual spectrum, both are darkenRight
          } else {
            return (spectrumType === "darkenRight") ? -(percentOfBox / 2) : (percentOfBox / 2);
          }
          
        },
        
        // modifyHSLLightness based on ligten/darken in LESS   
        // https://github.com/cloudhead/less.js/blob/master/dist/less-1.3.3.js#L1763
  
        modifyHSLLightness: function (HSL,multiplier) {
          HSL.l += multiplier; 
          HSL.l = Math.min(Math.max(0,HSL.l),1); 
          return tinycolor(HSL).toHex();
        },
        
        // defines the area within which an element can be moved 
        getMoveableArea: function ($element) {
          var dimensions = {},
              $elParent = $element.parent(),
              myWidth = $element.outerWidth(),
              parentWidth = $elParent.width(), // don't include borders for parent width
              parentLocation = $elParent.offset();
          dimensions.minX = parentLocation.left;
          dimensions.maxX = parentWidth - myWidth; //subtract myWidth to avoid pushing out of parent
          return dimensions;
        },
        
        moveHighlightBand: function ($highlightBand, moveableArea, e) {
          var hbWidth = $(".highlight-band").first().outerWidth(),
              threeFourthsHBWidth = hbWidth * 0.75,
              mouseX = supportsTouch ? e.originalEvent.pageX : e.pageX, // find the mouse!
              // mouse position relative to width of highlight-band
              newPosition = mouseX - moveableArea.minX - threeFourthsHBWidth;
          
          // don't move beyond moveable area
          newPosition = Math.max(0,(Math.min(newPosition,moveableArea.maxX))); 
          $highlightBand.css("position", "absolute");
          $highlightBand.css("left", newPosition);
        },
    
        horizontallyDraggable: function () {
          $(this).on(startEvent, function (event) {
            event.preventDefault();
            var $this_el = $(event.delegateTarget);
            $this_el.css("cursor","-webkit-grabbing");
            $this_el.css("cursor","-moz-grabbing");
            var dimensions = methods.getMoveableArea($this_el);
            
            $(document).on(moveEvent, function (e) {
              $this_el.trigger(dragEvent);
              methods.moveHighlightBand($this_el, dimensions, e);
            }).on(endEvent, function(event) { 
              $(document).off(moveEvent); // for desktop
              $(document).off(dragEvent);
              $this_el.css("cursor","-webkit-grab");
              $this_el.css("cursor","-moz-grab");
              $this_el.trigger(endDragEvent);
              $(document).off(endEvent);
            });
          }).on(endEvent, function(event) { 
            event.stopPropagation();
            $(document).off(moveEvent); // for mobile
            $(document).off(dragEvent);
          });
        },
        
        modifyHighlightBand: function ($highlightBand,colorMultiplier,colorHex) {
          var darkGrayHSL = { h: 0, s:0, l: 0.05 },
              bwMidHSL = { h: 0, s:0, l: 0.5 },
              // change to color of band is opposite of change to color of spectrum 
              hbColorMultiplier = -colorMultiplier,
              hbsColorMultiplier = hbColorMultiplier * 10, // needs to be either black or white
              $hbStripes = $highlightBand.find(".highlight-band-stripe"),
              newBandColor = (colorHex === "000") ?
                methods.modifyHSLLightness(bwMidHSL,hbColorMultiplier) :  
                methods.modifyHSLLightness(darkGrayHSL,hbColorMultiplier),
              newStripeColor = methods.modifyHSLLightness(bwMidHSL,hbsColorMultiplier);
          $highlightBand.css("border-color","#" + newBandColor);
          $hbStripes.css("background-color","#" + newStripeColor);
        },
    
        calculateHighlightedColor: function () {
          var $this_el = $(this),
              $this_parent = $this_el.parent(),
              hbWidth = $(".highlight-band").first().outerWidth(),
              halfHBWidth = hbWidth / 2,
              // get the class of the parent color box and slice off "spectrum"
              colorName = $this_parent.attr("class").split("-")[2],
              colorHex = presetColors[colorName],
              colorHsl = tinycolor(colorName).toHsl(),
              // midpoint of the current left position of the color band
              highlightBandLocation = parseInt($this_el.css("left"),10) + halfHBWidth,
              colorMultiplier = methods.getColorMultiplier(colorHex,highlightBandLocation),
              highlightedColor = "#" + methods.modifyHSLLightness(colorHsl,colorMultiplier);
              
          $this_parent.siblings(".color-preview").css("background-color",highlightedColor);
          // replace the color label with a 'select' button 
          $this_parent.prev('.color-label').replaceWith(
            '<button class="color-select btn btn-mini" type="button">Select</button>');
          if (colorHex !== "fff") {  
            methods.modifyHighlightBand($this_el,colorMultiplier,colorHex);
          }
          return highlightedColor;
        },
    
        updateSavedColorPreview: function (elements) {
          $.each(elements, function (index) {
            var $this_el = $(elements[index]),
                thisColor = $this_el.attr("class");
            $this_el.find(".color-preview").css("background-color",thisColor);
          });
        },
    
        updateSavedColorMarkup: function ($savedColorsContent,mySavedColors) {
          mySavedColors = mySavedColors ? mySavedColors : allSavedColors;
          if (settings.showSavedColors && mySavedColors.length > 0) {
                    
            if (!settings.saveColorsPerElement) {
              $savedColorsContent = $(".savedColors-content");
              mySavedColors = allSavedColors;
            }
            
            var maxSavedColors = myStyleVars.rowsInDropdown * myStyleVars.maxColsInDropdown;
            mySavedColors = mySavedColors.slice(0,maxSavedColors);
            
            var $col0 = $("<ul>").addClass("saved-color-col 0"),
                $col1 = $("<ul>").addClass("saved-color-col 1");
                    
            $.each(mySavedColors, function (index,value) {
              var $this_li = $("<li>").addClass("color-item"),
                  $this_link = $("<a>").addClass(value);
              $this_link.append($("<span>").addClass("color-preview"));
              $this_link.append($("<span>").addClass("color-label").text(value));
              $this_li.append($this_link);
              if (index % 2 === 0) {
                $col0.append($this_li);
              } else {
                $col1.append($this_li);
              }
            });
            
            $savedColorsContent.html($col0);
            $savedColorsContent.append($col1);
        
            var savedColorLinks = $($savedColorsContent).find("a");
            methods.updateSavedColorPreview(savedColorLinks);
        
          }
        },
    
        setSavedColorsCookie: function (savedColors,savedColorsDataAttr) {
          var now = new Date(),
              expiresOn = new Date(now.getTime() + tenYearsInMilliseconds);
          expiresOn = expiresOn.toGMTString();
          
          if (typeof savedColorsDataAttr === "undefined") {
            document.cookie = "pickAColorSavedColors-allSavedColors=" + savedColors + 
              ";expires=" + expiresOn;
          } else {
            document.cookie = "pickAColorSavedColors-" + savedColorsDataAttr + "=" + 
              savedColors + "; expires=" + expiresOn;
          }
        },
    
        saveColorsToLocalStorage: function (savedColors,savedColorsDataAttr) {
          if (supportsLocalStorage) {
            // if there is no data attribute, save to allSavedColors
            if (typeof savedColorsDataAttr === "undefined") {
              try {
                localStorage.allSavedColors = JSON.stringify(savedColors);
              }
              catch(e) {
                localStorage.clear();
              }
            } else { // otherwise save to a data attr-specific item
              try {
                localStorage["pickAColorSavedColors-" + savedColorsDataAttr] =
                  JSON.stringify(savedColors);
              }
              catch(e) {
                localStorage.clear();
              }
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
    
        // when settings.saveColorsPerElement, colors are saved to both mySavedColors and
        // allSavedColors so they will be avail to color pickers with no savedColorsDataAttr
        addToSavedColors: function (color,mySavedColorsInfo,$mySavedColorsContent) { 
          if (settings.showSavedColors) { // make sure we're saving colors
            if (color[0] != "#") {
              color = "#" + color;
            }
            methods.updateSavedColors(color,allSavedColors);
            if (settings.saveColorsPerElement) { // if we're saving colors per element...
              var mySavedColors = mySavedColorsInfo.colors,
                  dataAttr = mySavedColorsInfo.dataAttr;
              methods.updateSavedColors(color,mySavedColors,dataAttr);
              methods.updateSavedColorMarkup($mySavedColorsContent,mySavedColors);
            } else { // if not saving per element, update markup with allSavedColors
              methods.updateSavedColorMarkup($mySavedColorsContent,allSavedColors);
            }
          }
        },
        
        // handles selecting a color from the basic menu of colors.
        // must be called with apply and relies on an arguments array like:
        // [{els, savedColorsInfo}]
        selectFromBasicColors: function () {
          var selectedColor = $(this).find("span:first").css("background-color");
          selectedColor = tinycolor(selectedColor).toHex();
          var myElements = arguments[0].els,
              mySavedColorsInfo = arguments[0].savedColorsInfo;
          $(myElements.colorTextInput).val(selectedColor);
          methods.updatePreview(myElements.colorTextInput);
          methods.addToSavedColors(selectedColor,mySavedColorsInfo,myElements.savedColorsContent); 
          methods.closeDropdown(myElements.colorPreviewButton,myElements.colorMenu); // close the dropdown
        },
        
        // handles user clicking or tapping on spectrum to select a color.
        // must be called with apply and relies on an arguments array like:
        // [{thisEvent, avedColorsInfo, els}]
        tapSpectrum: function () {
          var thisEvent = arguments[0].thisEvent,
              mySavedColorsInfo = arguments[0].savedColorsInfo,
              mostRecentClick = arguments[0].mostRecentClick,
              myElements = arguments[0].els;
          thisEvent.stopPropagation(); // stop this click from closing the dropdown
          var $highlightBand = $(this).find(".highlight-band"),
              dimensions = methods.getMoveableArea($highlightBand);
          supportsTouch ? methods.moveHighlightBand($highlightBand, dimensions, mostRecentClick) : 
            methods.moveHighlightBand($highlightBand, dimensions, thisEvent);
          var highlightedColor = methods.calculateHighlightedColor.apply($highlightBand);
          methods.addToSavedColors(highlightedColor,mySavedColorsInfo,myElements.savedColorsContent);
          // update touch instructions
          myElements.touchInstructions.html("Press 'select' to choose this color.");
        },
        
        // bind to mousedown/touchstart, execute provied function if the top of the
        // window has not moved when there is a mouseup/touchend
        // must be called with apply and an arguments array like: 
        // [{thisFunction, theseArguments}]
        executeUnlessScrolled: function () {
          var thisFunction = arguments[0].thisFunction,
              theseArguments = arguments[0].theseArguments,
              windowTopPosition,
              mostRecentClick;
          $(this).on(startEvent, function (e) {
            windowTopPosition = $(window).scrollTop(); // save to see if user is scrolling in mobile
            mostRecentClick = e;
          }).on(clickEvent, function (event) {
            var distance = windowTopPosition - $(window).scrollTop();
            if (supportsTouch && (Math.abs(distance) > 0)) {
              return false;
            } else {
              theseArguments.thisEvent = event; //add the click event to the arguments object
              theseArguments.mostRecentClick = mostRecentClick //add start event to the arguments object
              thisFunction.apply($(this), [theseArguments]);
            }
          });
        }
      
    
      };
  
      return this.each(function () {
    
        methods.initialize.apply(this);
        // commonly used DOM elements for each color picker
        var myElements = {
          colorTextInput: $(this).find("input"),
          colorMenuLinks: $(this).find(".color-menu li a"),
          colorPreviewButton: $(this).find(".btn-group"),
          colorMenu: $(this).find(".color-menu"),
          colorSpectrums: $(this).find(".color-box"),
          touchInstructions: $(this).find(".color-menu-instructions"),
          highlightBands: $(this).find(".highlight-band")
        };
        
        var mostRecentClick, // for storing click events when needed
            windowTopPosition; // for storing the position of the top of the window when needed
        
        if (useTabs) {
          myElements.tabs = $(this).find(".tab");
        }
        
        if (settings.showSavedColors) {
          myElements.savedColorsContent = $(this).find(".savedColors-content");
          if (settings.saveColorsPerElement) { // when saving colors for each color picker...
            var mySavedColorsInfo = {
              colors: [],
              dataObj: $(this).data(),
            }
            $.each(mySavedColorsInfo.dataObj, function (key) {
              mySavedColorsInfo.dataAttr = key;
            });
            
            // get this picker's colors from local storage if possible
            if (supportsLocalStorage && localStorage["pickAColorSavedColors-" +
              mySavedColorsInfo.dataAttr]) {
              mySavedColorsInfo.colors = JSON.parse(localStorage["pickAColorSavedColors-" + 
                mySavedColorsInfo.dataAttr]);
            
            // otherwise, get them from cookies
            } else if (myCookies.indexOf("pickAColorSavedColors-" + mySavedColorsInfo.dataAttr) > -1) {
              var theseCookies = myCookies.split(";"); // an array of cookies...
              for (var i=0; i < theseCookies.length; i++) {
                if (theseCookies[i].match(mySavedColorsInfo.dataAttr)) {
                  mySavedColorsInfo.colors = theseCookies[i].split("=")[1].split(",");
                }
              };
           
            } else { // if no data-attr specific colors are in local storage OR cookies...
              mySavedColorsInfo.colors = allSavedColors; // use mySavedColors
            }
          }
        }
            
        // add the default color to saved colors
        methods.addToSavedColors(myColorVars.defaultColor,mySavedColorsInfo,myElements.savedColorsContent);
        methods.updatePreview(myElements.colorTextInput);
    
        //input field focus: clear content
        // input field blur: update preview, restore previous content if no value entered
  
        myElements.colorTextInput.focus(function () {
          var $this_el = $(this);
          myColorVars.typedColor = $this_el.val(); // update with the current
          $this_el.val(""); //clear the field on focus
          methods.openDropdown(myElements.colorPreviewButton,myElements.ColorMenu);
        }).blur(function () {
          var $this_el = $(this);
          myColorVars.newValue = $this_el.val(); // on blur, check the field's value
          // if the field is empty, put the original value back in the field
          if (myColorVars.newValue.match(/^\s+$|^$/)) {
            $this_el.val(myColorVars.typedColor);
          } else { // otherwise...
            myColorVars.newValue = tinycolor(myColorVars.newValue).toHex(); // convert to hex
            $this_el.val(myColorVars.newValue); // put the new value in the field
            // save to saved colors
            methods.addToSavedColors(myColorVars.newValue,mySavedColorsInfo,myElements.savedColorsContent);
          }
          methods.updatePreview($this_el); // update preview
        });
        
        // toggle visibility of dropdown menu when you click or press the preview button
        methods.executeUnlessScrolled.apply(myElements.colorPreviewButton, 
          [{"thisFunction": methods.pressPreviewButton, "theseArguments" : {}}]);
        
        // any touch or click outside of a dropdown should close all dropdowns
        methods.executeUnlessScrolled.apply($(document), [{"thisFunction": methods.closeDropdownIfOpen, 
          "theseArguments": {"button": myElements.colorPreviewButton, "menu": myElements.colorMenu}}]);
        
        // prevent click/touchend to color-menu or color-text input from closing dropdown
        
        myElements.colorMenu.on(clickEvent, function (e) {
          e.stopPropagation();
        });
        myElements.colorTextInput.on(clickEvent, function(e) {
          e.stopPropagation();
        });
    
        // update field and close menu when selecting from basic dropdown
        methods.executeUnlessScrolled.apply(myElements.colorMenuLinks, [{"thisFunction": methods.selectFromBasicColors, 
          "theseArguments": {"els": myElements, "savedColorsInfo": mySavedColorsInfo}}]);
                
        if (useTabs) { // make tabs tabbable
          methods.tabbable.apply(myElements.tabs);
        }
    
        // for using the light/dark spectrums 
    
        if (settings.showSpectrum) {
    
          // move the highlight band when you click on a spectrum 
          
          methods.executeUnlessScrolled.apply(myElements.colorSpectrums, [{"thisFunction": methods.tapSpectrum, 
            "theseArguments": {"savedColorsInfo": mySavedColorsInfo, "els": myElements}}]);
          
          methods.horizontallyDraggable.apply(myElements.highlightBands);
    
          $(myElements.highlightBands).on(dragEvent,function (event) {
            var $thisEl = event.target
            methods.calculateHighlightedColor.apply(this);
          }).on(endDragEvent, function (event) {
            var $thisEl = event.delegateTarget;
            var finalColor = methods.calculateHighlightedColor.apply($thisEl);
            methods.addToSavedColors(finalColor,mySavedColorsInfo,myElements.savedColorsContent);
          });
          

      
        }

        // for using saved colors 
    
        if (settings.showSavedColors) {

          // make the links in saved colors work
          $(myElements.savedColorsContent).click( function (event) {
            var $thisEl = $(event.target);
            
            // make sure click happened on a link or span
            if ($thisEl.is("SPAN") || $thisEl.is("A")) {
              //grab the color the link's class or span's parent link's class
              var selectedColor = $thisEl.is("SPAN") ?
                $thisEl.parent().attr("class").split("#")[1] :
                $thisEl.attr("class").split("#")[1];
              $(myElements.colorTextInput).val(selectedColor);
              methods.updatePreview(myElements.colorTextInput);
              methods.closeDropdown(myElements.colorPreviewButton,myElements.colorMenu);
              methods.addToSavedColors(selectedColor,mySavedColorsInfo,myElements.savedColorsContent);
            }
          });
              
          // update saved color markup with content from localStorage or cookies, if available
          if (!settings.saveColorsPerElement) {
            methods.updateSavedColorMarkup(myElements.savedColorsContent,allSavedColors);
          } else if (settings.saveColorsPerElement) {
            methods.updateSavedColorMarkup(myElements.savedColorsContent,mySavedColorsInfo.colors);
          }
        }
        
      });

    };
  
})(jQuery);