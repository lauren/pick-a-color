Pick-a-Color: a jQuery color picker for Twitter Bootstrap
============

Pick-a-Color is a color picker that's easy to use--even for people who aren't techies or designers. The interface is based on Twitter Bootstrap styles so it looks lovely with the styles of almost any site.

Features:

*For Your Site's Users*
* text field entry that accepts HEX, RGB, RGBA, HSL, HSLA, HSV, HSVA, and named colors 
** _Thanks to Brian Grinstead's [Tiny Color](https://github.com/bgrins/TinyColor) for doing all the tricky color conversion math._
* dropdown with 8 basic colors that can be lightened and darkened
* "Saved Colors" tab that stores recently used colors for later reference
** _Saved Colors persist across pageviews with localStorage when possible and cookies when localStorage is unavailable or impractical_
* easy-to-use interface based on pretty Bootstrap styles
* chunky mobile styles that make dragging easy on a touch device

*For You*
* simple initialization with as little as three lines of HTML and one line of JavaScript
* configurable options for:
** whether or not to show users a lighten/darken spectrum
** whether or not to show users their saved colors
** whether colors should be saved separately for each color picker or once for all color pickers on a page (sensible default is once per page, but I leave the choice to you)
** whether or not the dropdown menu should fade in and out (hey, some people feel strongly about this...so...yeah)
* anonymous JavaScript function that will not mess up your other JavaScript
* namespaced CSS that will not mess up your other styles
* equally pretty and user-friendly in desktop and mobile browsers
* tested in Chrome (Mac/PC/iOS), Safari (Mac/iOS), IE 8+, Firefox (Mac/PC), and Opera (Mac/PC)
* you didn't have to write your own color picker

Caveats:

* Like ~~most things~~ everything ~~on the internet~~ in life, this is a work in progress. Known issues are relatively minor at this point and are documented here: https://github.com/lauren/pick-a-color/issues?milestone=2&state=open
* This is my first big JavaScript project, so there are surely some things I've done that will make you go "n00b! Look what happens when product managers code!!!" I would LOVE to know what those things are so I can learn and make Pick-a-Color better. You can tell me by making a ticket here: https://github.com/lauren/pick-a-color/issues/new 

Still with me? Let's get to it...

## How to Use

It's so easy!

1. Make sure you're using jQuery 1.9.0. If you're not, add this to the end of your HTML document, right before the closing `</body>`:
	
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
		
2. Make sure you're using the bootstrap.min.css file from Bootstrap 2.2.2. You do not need bootstrap-responsive.min.css or bootstrap.min.js. If you're not using bootstrap yet...

    2.1 Download it here: http://twitter.github.com/bootstrap/assets/bootstrap.zip 
		2.1 Put it in your css folder or somewhere in your project directory.
    2.2 Add this to the `<head>` of your HTML document:

    <link rel="stylesheet" href="/css/bootstrap.min.css">
	
3. Download the Pick-a-Color JS and CSS here: FIXME.

4. Put the CSS your css folder and link to it from the `<head>` of your HTML document like this, AFTER the bootstrap.min.css link:
	
		<link rel="stylesheet" href="css/pick-a-color.min.css">
		
5. Put the JS in your js folder and link to it from the bottom of your HTML document, right before the closing `</body>`. Make sure it comes AFTER the jQuery link:

		<script src="js/color-picker.js"></script>
		
6. Add this to your HTML wherever you want a Pick-A-Color. Replace "YOUR-ID" with your unique identifier for the color picker ("border-color" or "background-color") and "YOUR-DEFAULT" with the default color you'd like to show in the color picker:

		<div class="pick-a-color" id="YOUR-ID" data-YOUR-ID="YOUR-DEFAULT">YOUR-DEFAULT</div>

For instance, yours might look like this:

		<div class="pick-a-color" id="border-color" data-border-color="222">222</div>
		
You can change the class of your div, but make sure to match it in your JavaScript in the next step...

7. Add this to your JavaScript somewhere after the DOM is ready. Make sure the class selector matches the class of your div: 

		$(".pick-a-color").pickAColor();
		
8. To optimize IE and mobile support, I recommend adding these tags to your `<head>`:
	
	<meta http-equiv="x-ua-compatible" content="IE=10">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

Ta-da! You have a color picker! You might even have several!

### Sample HTML

Here's an example of how a simple HTML page using Pick-a-Color might look:

		<!doctype html>
		<html>

			<head>
		
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<meta http-equiv="x-ua-compatible" content="IE=10">
	  
				<link rel="stylesheet" href="css/bootstrap.min.css">
				<link rel="stylesheet" href="css/pick-a-color.css">	  	
		
			</head>
	
			<body>
		
				<div class="pick-a-color" id="border-color" data-border-color="222">222</div>
				<div class="pick-a-color" id="font-color" data-font-color="aaa">aaa</div>
				<div class="pick-a-color" id="data-background-color" data-background-color="a1beef">a1beef</div>
				<div class="pick-a-color" id="data-highlight-color" data-highlight-color="551033">551033</div>
				<div class="pick-a-color" id="data-contrast-color" data-contrast-color="eee">eee</div>
				<div class="pick-a-color"></div>
		
			<script src="js/jquery-1.9.0.min.js"></script>
			<script src="js/tinycolor-min.js"></script>
			<script src="js/pick-a-color.js"></script>	
		
			<script type="text/javascript">
	
			$(document).ready(function () {

			  $(".pick-a-color").pickAColor();

			});
	
			</script>
				
			</body>
	
		</html>

### Options

If you'd like to change any of my default options, you can specify your preferred settings like this:

		$(".pick-a-color").pickAColor({
	    showSpectrum            : true,
	    showSavedColors         : true,
	    saveColorsPerElement    : false,
	    fadeMenuToggle          : true
	  });

#### showSpectrum 

Specifies whether or not there is a spectrum next to each basic color allowing users to lighten and darken it. 

#### showSavedColors

Specifies whether or not there is a tab called "Your Saved Colors" that keeps track of the last 16 colors a user customized. 

##### saveColorsPerElement (for showSavedColors only)

If set to `false`: Every Pick-a-Color on a page will show the same set of saved colors, which will be updated continuously as users customize colors.

If set to `true`: Each Pick-a-Color will get its own set of saved colors, which will be updated as users customize colors. The colors are saved across pageviews using the data-attribute as the key. If this is set to `true` but you don't have a data-attribute in your initializing HTML, your Pick-a-Colors will behave as if the setting was false.

I recommend setting this to `false`. Imagine you're a user filling out a big form to configure a custom page: You find the perfect color for your background. Five fields later, you want to use that same color for your link hover state. It'd be pretty nice if it was hanging out in your Saved Colors tab.

#### fadeMenuToggle

Specifies whether the dropdown menu should fade in and out when it's opened and closed. This setting is overridden for mobile, which NEVER uses a fade because WOW they look terrible in mobile browsers.

## Tested Browsers

I've tested Pick-a-Color in these browsers:

* Google Chrome 23.0.1271.100 (Mac OSX, iOS 6.0.2)
* Google Chrome 24.0.1312.52 (Windows 8)
* Safari 6.0.2 (Mac OSX and iOS 6.0.2)
* Internet Explorer 10 (Windows 8)
* Internet Explorer 9 Mode (via IE10 on Windows 8)
* Internet Explorer 8 (Windows XP)
* Firefox 18.0.1 (Mac OSX and Windows 8)
* Opera 12.12 (Mac OSX and Windows 8)

Minor issues in these browsers are documented here: https://github.com/lauren/pick-a-color/issues

The only major platform I haven't been able to test yet is Android. I'm working on it.

### Notes on IE Support

I highly recommend using the X-UA-COMPATIBLE tag in your html `<head>` to ensure that Internet Explorer 8 and higher use their own "Browser Mode" instead of switching to the Browser Mode of a previous version. It works like this:
	
		<meta http-equiv="x-ua-compatible" content="IE=10">
		
### Notes on Mobile Support

You must use a viewport tag in your html `<head>` for content to be displayed at the correct size in a mobile browser. It works like this:
	
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		
## The Markup

### showSpectrum: true, showSavedColors: true

    <div class="pick-a-color" data-border-color="YOUR_DEFAULT_COLOR">
			<div class="input-prepend input-append pick-a-color-markup">
				<span class="hex-pound">#</span>
				<input id="appendedPrependedDropdownButton" type="text" class="color-text-input" value="YOUR_DEFAULT_COLOR" />
		   	<div class="btn-group">
		    	<button class="btn color-dropdown dropdown-toggle">      
		       	<span class="color-preview current-color"></span>
		       	<span class="caret"></span>
		     	</button>
		     	<div class="color-menu dropdown-menu">
		     		<div class="color-menu-tabs">
			    		<span class="basicColors-tab tab tab-active">
								<a>Basic Colors</a>
							</span>
							<span class="savedColors-tab tab">
								<a>Your Saved Colors</a>
							</span>
						</div>
		      	<div class="basicColors-content active-content">
		      		<h6 class="color-menu-instructions">
		        		'Tap spectrum to lighten or darken color.',
		        	</h6>
		    			<ul>
								<li>
			      			<a class="white">
			        			<span class="color-preview white"></span>
			        			<span class="color-label">white</span>
			        			<span class="color-box spectrum-white">
			          			<span class="highlight-band">
												<span class="highlight-band-stripe"></span>
												<span class="highlight-band-stripe"></span>
												<span class="highlight-band-stripe"></span>
											</span>
			        			</span>
			      			</a>
			    			</li>
								<li>
			      			<a class="red">
			        			<span class="color-preview red"></span>
			        			<span class="color-label">red</span>
			        			<span class="color-box spectrum-red">
			          			<span class="highlight-band">
												<span class="highlight-band-stripe"></span>
												<span class="highlight-band-stripe"></span>
												<span class="highlight-band-stripe"></span>
											</span>
			        			</span>
			      			</a>
			    			</li>
								<li>
			      			<a class="orange">
			        			<span class="color-preview 'orange'"></span>
			        			<span class="color-label">orange</span>
			        			<span class="color-box spectrum-orange">
			          			<span class="highlight-band">
												<span class="highlight-band-stripe"></span>
												<span class="highlight-band-stripe"></span>
												<span class="highlight-band-stripe"></span>
											</span>
			        			</span>
			      			</a>
			    			</li>
								<li>
			      			<a class="yellow">
			        			<span class="color-preview yellow"></span>
			        			<span class="color-label">yellow</span>
			        			<span class="color-box spectrum-yellow">
			          			<span class="highlight-band">
												<span class="highlight-band-stripe"></span>
												<span class="highlight-band-stripe"></span>
												<span class="highlight-band-stripe"></span>
											</span>
			        			</span>
			      			</a>
			    			</li>
								<li>
			      			<a class="green">
			        			<span class="color-preview green"></span>
			        			<span class="color-label">green</span>
			        			<span class="color-box spectrum-green">
			          			<span class="highlight-band">
												<span class="highlight-band-stripe"></span>
												<span class="highlight-band-stripe"></span>
												<span class="highlight-band-stripe"></span>
											</span>
			        			</span>
			      			</a>
			    			</li>
								<li>
			      			<a class="blue">
			        			<span class="color-preview blue"></span>
			        			<span class="color-label">blue</span>
			        			<span class="color-box spectrum-blue">
			          			<span class="highlight-band">
												<span class="highlight-band-stripe"></span>
												<span class="highlight-band-stripe"></span>
												<span class="highlight-band-stripe"></span>
											</span>
			        			</span>
			      			</a>
			    			</li>
								<li>
			      			<a class="purple">
			        			<span class="color-preview purple"></span>
			        			<span class="color-label">purple</span>
			        			<span class="color-box spectrum-purple">
			          			<span class="highlight-band">
												<span class="highlight-band-stripe"></span>
												<span class="highlight-band-stripe"></span>
												<span class="highlight-band-stripe"></span>
											</span>
			        			</span>
			      			</a>
			    			</li>
								<li>
			      			<a class="black">
			        			<span class="color-preview black"></span>
			        			<span class="color-label">black</span>
			        			<span class="color-box spectrum-'black'">
			          			<span class="highlight-band">
												<span class="highlight-band-stripe"></span>
												<span class="highlight-band-stripe"></span>
												<span class="highlight-band-stripe"></span>
											</span>
			        			</span>
			      			</a>
			    			</li>
							</ul>
						</div>
						<div class="savedColors-content inactive-content">
		      		<ul class="saved-color-col 0">
								<li>
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li>
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li>
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li>
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li>
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li>
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li>
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li>
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
							</ul>
							<ul class="saved-color-col 1">
								<li>
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li>
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li>
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li>
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li>
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li>
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li>
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li>
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
							</ul>
		      	</div>
					</div>
				</div>
			</div>
		</div>
		
### showSpectrum: true, showSavedColors: false

		<div class="pick-a-color" data-border-color="YOUR_DEFAULT_COLOR">
			<div class="input-prepend input-append pick-a-color-markup">
				<span class="hex-pound">#</span>
				<input id="appendedPrependedDropdownButton" type="text" class="color-text-input" value="YOUR_DEFAULT_COLOR" />
		   	<div class="btn-group">
		    	<button class="btn color-dropdown dropdown-toggle">      
		       	<span class="color-preview current-color"></span>
		       	<span class="caret"></span>
		     	</button>
		     	<div class="color-menu dropdown-menu">
		      	<div class="basicColors-content active-content">
		      		<h6 class="color-menu-instructions">
		        		'Tap spectrum to lighten or darken color.',
		        	</h6>
		    			<ul>
								<li>
			      			<a class="white">
			        			<span class="color-preview white"></span>
			        			<span class="color-label">white</span>
			        			<span class="color-box spectrum-white">
			          			<span class="highlight-band">
												<span class="highlight-band-stripe"></span>
												<span class="highlight-band-stripe"></span>
												<span class="highlight-band-stripe"></span>
											</span>
			        			</span>
			      			</a>
			    			</li>
								<li>
			      			<a class="red">
			        			<span class="color-preview red"></span>
			        			<span class="color-label">red</span>
			        			<span class="color-box spectrum-red">
			          			<span class="highlight-band">
												<span class="highlight-band-stripe"></span>
												<span class="highlight-band-stripe"></span>
												<span class="highlight-band-stripe"></span>
											</span>
			        			</span>
			      			</a>
			    			</li>
								<li>
			      			<a class="orange">
			        			<span class="color-preview 'orange'"></span>
			        			<span class="color-label">orange</span>
			        			<span class="color-box spectrum-orange">
			          			<span class="highlight-band">
												<span class="highlight-band-stripe"></span>
												<span class="highlight-band-stripe"></span>
												<span class="highlight-band-stripe"></span>
											</span>
			        			</span>
			      			</a>
			    			</li>
								<li>
			      			<a class="yellow">
			        			<span class="color-preview yellow"></span>
			        			<span class="color-label">yellow</span>
			        			<span class="color-box spectrum-yellow">
			          			<span class="highlight-band">
												<span class="highlight-band-stripe"></span>
												<span class="highlight-band-stripe"></span>
												<span class="highlight-band-stripe"></span>
											</span>
			        			</span>
			      			</a>
			    			</li>
								<li>
			      			<a class="green">
			        			<span class="color-preview green"></span>
			        			<span class="color-label">green</span>
			        			<span class="color-box spectrum-green">
			          			<span class="highlight-band">
												<span class="highlight-band-stripe"></span>
												<span class="highlight-band-stripe"></span>
												<span class="highlight-band-stripe"></span>
											</span>
			        			</span>
			      			</a>
			    			</li>
								<li>
			      			<a class="blue">
			        			<span class="color-preview blue"></span>
			        			<span class="color-label">blue</span>
			        			<span class="color-box spectrum-blue">
			          			<span class="highlight-band">
												<span class="highlight-band-stripe"></span>
												<span class="highlight-band-stripe"></span>
												<span class="highlight-band-stripe"></span>
											</span>
			        			</span>
			      			</a>
			    			</li>
								<li>
			      			<a class="purple">
			        			<span class="color-preview purple"></span>
			        			<span class="color-label">purple</span>
			        			<span class="color-box spectrum-purple">
			          			<span class="highlight-band">
												<span class="highlight-band-stripe"></span>
												<span class="highlight-band-stripe"></span>
												<span class="highlight-band-stripe"></span>
											</span>
			        			</span>
			      			</a>
			    			</li>
								<li>
			      			<a class="black">
			        			<span class="color-preview black"></span>
			        			<span class="color-label">black</span>
			        			<span class="color-box spectrum-'black'">
			          			<span class="highlight-band">
												<span class="highlight-band-stripe"></span>
												<span class="highlight-band-stripe"></span>
												<span class="highlight-band-stripe"></span>
											</span>
			        			</span>
			      			</a>
			    			</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		
### showSpectrum: false, showSavedColors: true

    <div class="pick-a-color" data-border-color="YOUR_DEFAULT_COLOR">
			<div class="input-prepend input-append pick-a-color-markup">
				<span class="hex-pound">#</span>
				<input id="appendedPrependedDropdownButton" type="text" class="color-text-input" value="YOUR_DEFAULT_COLOR" />
		   	<div class="btn-group">
		    	<button class="btn color-dropdown dropdown-toggle">      
		       	<span class="color-preview current-color"></span>
		       	<span class="caret"></span>
		     	</button>
		     	<div class="color-menu dropdown-menu">
		     		<div class="color-menu-tabs">
			    		<span class="basicColors-tab tab tab-active">
								<a>Basic Colors</a>
							</span>
							<span class="savedColors-tab tab">
								<a>Your Saved Colors</a>
							</span>
						</div>
		      	<div class="basicColors-content active-content">
		      		<h6 class="color-menu-instructions">
		        		'Tap spectrum to lighten or darken color.',
		        	</h6>
		    			<ul>
								<li>
			      			<a class="white">
			        			<span class="color-preview white"></span>
			        			<span class="color-label">white</span>
			      			</a>
			    			</li>
								<li>
			      			<a class="red">
			        			<span class="color-preview red"></span>
			        			<span class="color-label">red</span>
			      			</a>
			    			</li>
								<li>
			      			<a class="orange">
			        			<span class="color-preview 'orange'"></span>
			        			<span class="color-label">orange</span>
			      			</a>
			    			</li>
								<li>
			      			<a class="yellow">
			        			<span class="color-preview yellow"></span>
			        			<span class="color-label">yellow</span>
			      			</a>
			    			</li>
								<li>
			      			<a class="green">
			        			<span class="color-preview green"></span>
			        			<span class="color-label">green</span>
			      			</a>
			    			</li>
								<li>
			      			<a class="blue">
			        			<span class="color-preview blue"></span>
			        			<span class="color-label">blue</span>
			        			<span class="color-box spectrum-blue">
			      			</a>
			    			</li>
								<li>
			      			<a class="purple">
			        			<span class="color-preview purple"></span>
			        			<span class="color-label">purple</span>
			      			</a>
			    			</li>
								<li>
			      			<a class="black">
			        			<span class="color-preview black"></span>
			        			<span class="color-label">black</span>
			      			</a>
			    			</li>
							</ul>
						</div>
						<div class="savedColors-content inactive-content">
		      		<ul class="saved-color-col 0">
								<li>
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li>
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li>
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li>
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li>
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li>
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li>
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li>
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
							</ul>
							<ul class="saved-color-col 1">
								<li>
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li>
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li>
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li>
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li>
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li>
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li>
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li>
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
							</ul>
		      	</div>
					</div>
				</div>
			</div>
		</div>

### showSpectrum: false, showSavedColors: false

    <div class="pick-a-color" data-border-color="YOUR_DEFAULT_COLOR">
			<div class="input-prepend input-append pick-a-color-markup">
				<span class="hex-pound">#</span>
				<input id="appendedPrependedDropdownButton" type="text" class="color-text-input" value="YOUR_DEFAULT_COLOR" />
		   	<div class="btn-group">
		    	<button class="btn color-dropdown dropdown-toggle">      
		       	<span class="color-preview current-color"></span>
		       	<span class="caret"></span>
		     	</button>
		     	<div class="color-menu dropdown-menu">
		      	<div class="basicColors-content active-content">
		      		<h6 class="color-menu-instructions">
		        		'Tap spectrum to lighten or darken color.',
		        	</h6>
		    			<ul>
								<li>
			      			<a class="white">
			        			<span class="color-preview white"></span>
			        			<span class="color-label">white</span>
			      			</a>
			    			</li>
								<li>
			      			<a class="red">
			        			<span class="color-preview red"></span>
			        			<span class="color-label">red</span>
			      			</a>
			    			</li>
								<li>
			      			<a class="orange">
			        			<span class="color-preview 'orange'"></span>
			        			<span class="color-label">orange</span>
			      			</a>
			    			</li>
								<li>
			      			<a class="yellow">
			        			<span class="color-preview yellow"></span>
			        			<span class="color-label">yellow</span>
			      			</a>
			    			</li>
								<li>
			      			<a class="green">
			        			<span class="color-preview green"></span>
			        			<span class="color-label">green</span>
			      			</a>
			    			</li>
								<li>
			      			<a class="blue">
			        			<span class="color-preview blue"></span>
			        			<span class="color-label">blue</span>
			        			<span class="color-box spectrum-blue">
			      			</a>
			    			</li>
								<li>
			      			<a class="purple">
			        			<span class="color-preview purple"></span>
			        			<span class="color-label">purple</span>
			      			</a>
			    			</li>
								<li>
			      			<a class="black">
			        			<span class="color-preview black"></span>
			        			<span class="color-label">black</span>
			      			</a>
			    			</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>