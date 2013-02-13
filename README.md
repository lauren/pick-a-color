Pick-a-Color: a jQuery color picker for Twitter Bootstrap
============

For a documentation-reading experience that includes rainbow gradients and live examples, check out the official docs at [http://lauren.github.com/pick-a-color](http://lauren.github.com/pick-a-color).

There are some great color picker plugins out there, but most cater to the needs of techies and designers, providing complicated controls to access every color imaginable.

Pick-a-Color is designed to be easy for anyone to use. The interface is based on Twitter Bootstrap styles so it looks lovely with the styles of almost any site.


### Features 

#### For your site's users

**Flexible text entry**

Accepts HEX, RGB, HSL, HSV, HSVA, and names, thanks to Brian Grinstead's amazing [Tiny Color](https://github.com/bgrins/TinyColor) library.

**Saved colors**

Saves up to 16 recently used colors. Colors are stored in localStorage or cookies.

**Basic color palate**

Easy-to-use preset colors that can be lightened and darkened.

**Chunky mobile styles**

Dragging is easy, even on a touch device.

#### For you

**Tested**

Tested in Chrome (Mac/PC/iOS), Safari (Mac/iOS), IE 8+, Firefox (Mac/PC), and Opera (Mac/PC).

**No conflicts**

Anonymous JavasScript function and namespaced CSS won't mess up your code.

**Simple initialization**

As little as three lines of HTML and one line of JavaScript.

**Done**

You didn't have to write your own color picker. 'Nuff said.

### Caveats

* Like ~~most things~~ everything ~~on the internet~~ in life, this is a work in progress. Known issues are relatively minor at this point and are documented here: https://github.com/lauren/pick-a-color/issues?milestone=2&state=open
* This is my first big JavaScript project, so there are surely some things I've done that will make you go "n00b! Look what happens when product managers code!!!" I would LOVE to know what those things are so I can learn and make Pick-a-Color better. You can tell me by making a ticket here: https://github.com/lauren/pick-a-color/issues/new 

OK! Let's do this color picking thing!

## How to Use

1. Download the required files: http://lauren.github.com/pick-a-color/pick-a-color.zip. Add them to your CSS and JS folders and include them in your document as follows:

*In the `<head>`:*

```html
<link rel="stylesheet" href="css/bootstrap.min.css">
<link rel="stylesheet" href="css/pick-a-color.min.css">
```

*Before the ending `</body>`:*

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
<script src="js/tinycolor-0.9.12.min.js"></script>
<script src="js/color-picker.js"></script>
```
		
2. Add this to your HTML wherever you want a Pick-A-Color. Replace `YOUR_ID` with your unique identifier for the color picker ("border-color" or "background-color") and `YOUR-DEFAULT` with the default color you'd like to show in the color picker:

		```html
		<div class="pick-a-color" id="YOUR_ID" data-YOUR_ID="YOUR_DEFAULT">YOUR_DEFAULT</div>
		```
    
		For instance, yours might look like this:

		```html
		<div class="pick-a-color" id="border-color" data-border-color="222">222</div>
		```
		
		You can change the class of your div, but make sure to match it in your JavaScript in the next step...

3. Add this to your JavaScript somewhere after the DOM is ready. Make sure the class selector matches the class of your div: 

		```javascript
		$(".pick-a-color").pickAColor();
		```
		
4. To optimize IE and mobile support, I recommend adding these tags to your `<head>`:
	
	  ```html
		<meta http-equiv="x-ua-compatible" content="IE=10">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
		```
		
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

Specifies whether the dropdown menu should fade in and out when it's opened and closed. This setting is overridden for mobile devices, in which Pick-a-Color never ever ever uses a fade because WOW they look terrible in mobile browsers.

## Tested Browsers

I've tested Pick-a-Color in these browsers:

* Google Chrome 24.0.1312.57 (Mac OSX, Windows 8, Windows XP, iOS 6.0.2)
* Safari 6.0.2 (Mac OSX and iOS 6.0.2)
* Internet Explorer 10 (Windows 8)
* Internet Explorer 9 Mode (via IE10 on Windows 8)
* Internet Explorer 8 (Windows XP)
* Firefox 18.0.1 (Mac OSX and Windows 8)
* Opera 12.13 (Mac OSX and Windows 8)

Minor issues in these browsers are documented here: https://github.com/lauren/pick-a-color/issues

The only major platform I haven't been able to test yet is Android. I'm working on it.

### Notes on IE Support

I highly recommend using the X-UA-COMPATIBLE tag in your html `<head>` to ensure that Internet Explorer 8 and higher use their own "Browser Mode" instead of switching to the Browser Mode of a previous version. It works like this:
	
		<meta http-equiv="x-ua-compatible" content="IE=10">
		
### Notes on Mobile Support

You must use a viewport tag in your html `<head>` for content to be displayed at the correct size in a mobile browser. It works like this:
	
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		
## The Markup

This is the markup that Pick-a-Color generates when it is initialized, based upon your settings:

### default settings: showSpectrum: true, showSavedColors: true

    <div class="pick-a-color" id="YOUR_ID" data-border-color="YOUR_DEFAULT">
			<div class="input-prepend input-append pick-a-color-markup">
				<span class="hex-pound">#</span>
				<input id="appendedPrependedDropdownButton" type="text" class="color-text-input" value="YOUR_DEFAULT" />
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
		    			<ul class="basic-colors-list">
								<li class="color-item">
			      			<a class="white color-link">
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
								<li class="color-item">
			      			<a class="red color-link">
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
								<li class="color-item">
			      			<a class="orange color-link">
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
								<li class="color-item">
			      			<a class="yellow color-link">
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
								<li class="color-item">
			      			<a class="green color-link">
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
								<li class="color-item">
			      			<a class="blue color-link">
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
								<li class="color-item">
			      			<a class="purple color-link">
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
								<li class="color-item">
			      			<a class="black color-link">
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
								<li class="color-item">
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li class="color-item">
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li class="color-item">
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li class="color-item">
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li class="color-item">
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li class="color-item">
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li class="color-item">
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li class="color-item">
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
							</ul>
							<ul class="saved-color-col 1">
								<li class="color-item">
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li class="color-item">
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li class="color-item">
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li class="color-item">
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li class="color-item">
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li class="color-item">
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li class="color-item">
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li class="color-item">
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

		<div class="pick-a-color" data-border-color="YOUR_DEFAULT">
			<div class="input-prepend input-append pick-a-color-markup">
				<span class="hex-pound">#</span>
				<input id="appendedPrependedDropdownButton" type="text" class="color-text-input" value="YOUR_DEFAULT" />
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
		    			<ul class="basic-colors-list">
								<li class="color-item">
			      			<a class="white color-link">
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
								<li class="color-item">
			      			<a class="red color-link">
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
								<li class="color-item">
			      			<a class="orange color-link">
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
								<li class="color-item">
			      			<a class="yellow color-link">
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
								<li class="color-item">
			      			<a class="green color-link">
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
								<li class="color-item">
			      			<a class="blue color-link">
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
								<li class="color-item">
			      			<a class="purple color-link">
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
								<li class="color-item">
			      			<a class="black color-link">
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
		    			<ul class="basic-colors-link">
								<li class="color-item">
			      			<a class="white color-link">
			        			<span class="color-preview white"></span>
			        			<span class="color-label">white</span>
			      			</a>
			    			</li>
								<li class="color-item">
			      			<a class="red color-link">
			        			<span class="color-preview red"></span>
			        			<span class="color-label">red</span>
			      			</a>
			    			</li>
								<li class="color-item">
			      			<a class="orange color-link">
			        			<span class="color-preview 'orange'"></span>
			        			<span class="color-label">orange</span>
			      			</a>
			    			</li>
								<li class="color-item">
			      			<a class="yellow color-link">
			        			<span class="color-preview yellow"></span>
			        			<span class="color-label">yellow</span>
			      			</a>
			    			</li>
								<li class="color-item">
			      			<a class="green color-link">
			        			<span class="color-preview green"></span>
			        			<span class="color-label">green</span>
			      			</a>
			    			</li>
								<li class="color-item">
			      			<a class="blue color-link">
			        			<span class="color-preview blue"></span>
			        			<span class="color-label">blue</span>
			        			<span class="color-box spectrum-blue">
			      			</a>
			    			</li>
								<li class="color-item">
			      			<a class="purple color-link">
			        			<span class="color-preview purple"></span>
			        			<span class="color-label">purple</span>
			      			</a>
			    			</li>
								<li class="color-item">
			      			<a class="black color-link">
			        			<span class="color-preview black"></span>
			        			<span class="color-label">black</span>
			      			</a>
			    			</li>
							</ul>
						</div>
						<div class="savedColors-content inactive-content">
		      		<ul class="saved-color-col 0">
								<li class="color-item">
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li class="color-item">
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li class="color-item">
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li class="color-item">
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li class="color-item">
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li class="color-item">
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li class="color-item">
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li class="color-item">
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
							</ul>
							<ul class="saved-color-col 1">
								<li class="color-item">
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li class="color-item">
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li class="color-item">
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li class="color-item">
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li class="color-item">
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li class="color-item">
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li class="color-item">
									<a class="#222">
										<span class="color-preview"></span>
										<span class="color-label">#222</span>
									</a>
								</li>
								<li class="color-item">
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
		    			<ul class="basic-colors-list">
								<li class="color-item">
			      			<a class="white color-link">
			        			<span class="color-preview white"></span>
			        			<span class="color-label">white</span>
			      			</a>
			    			</li>
								<li class="color-item">
			      			<a class="red color-link">
			        			<span class="color-preview red"></span>
			        			<span class="color-label">red</span>
			      			</a>
			    			</li>
								<li class="color-item">
			      			<a class="orange color-link">
			        			<span class="color-preview 'orange'"></span>
			        			<span class="color-label">orange</span>
			      			</a>
			    			</li>
								<li class="color-item">
			      			<a class="yellow color-link">
			        			<span class="color-preview yellow"></span>
			        			<span class="color-label">yellow</span>
			      			</a>
			    			</li>
								<li class="color-item">
			      			<a class="green color-link">
			        			<span class="color-preview green"></span>
			        			<span class="color-label">green</span>
			      			</a>
			    			</li>
								<li class="color-item">
			      			<a class="blue color-link">
			        			<span class="color-preview blue"></span>
			        			<span class="color-label">blue</span>
			        			<span class="color-box spectrum-blue">
			      			</a>
			    			</li>
								<li class="color-item">
			      			<a class="purple color-link">
			        			<span class="color-preview purple"></span>
			        			<span class="color-label">purple</span>
			      			</a>
			    			</li>
								<li class="color-item">
			      			<a class="black color-link">
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