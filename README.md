Pick-a-Color: a jQuery color picker for Twitter Bootstrap
============

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

### Notes on IE Support

I highly recommend using the X-UA-COMPATIBLE tag in your html <head> to ensure that Internet Explorer 8 and higher use their "Browser Mode" instead of switching to the Browser Mode of a previous version of IE. You can use it like this:
	
		<meta http-equiv="x-ua-compatible" content="IE=10">
		
There is one known issue I'm still working out in IE8, which is documented here: 

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