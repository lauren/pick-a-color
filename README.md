color-picker
============

## Browsers

Google Chrome 23.0.1271.100 (Mac OSX, iOS 6.0.2)
Google Chrome 24.0.1312.52 (Windows 8)
Safari 6.0.2 (Mac OSX and iOS 6.0.2)
Firefox 18.0.1 (Mac OSX and Windows 8)
Internet Explorer 10 (Windows 8)
Internet Explorer 8 (Windows XP)

## The Markup

    <div class="color-picker" data-border-color="YOUR_DEFAULT_COLOR">
			<div class="input-prepend input-append color-picker-markup">
				<span class="hex-pound">#</span>
				<input id="appendedPrependedDropdownButton" type="text" class="color-text-input" value="YOUR_DEFAULT_COLOR" />
		   	<div class="btn-group">
		    	<button class="btn color-dropdown dropdown-toggle">      
		       	<span class="color-preview current-color"></span>
		       	<span class="caret"></span>
		     	</button>
		     	<ul class="color-menu dropdown-menu">
		     		<div class="color-menu-tabs">
			    		<span class="basicColors-tab tab tab-active">
								<a>Basic Colors</a>
							</span>
							<span class="savedColors-tab tab">
								<a>Your Saved Colors</a>
							</span>
							<span class="fullColorWheel-tab tab">
								<a>Full Color Wheel</a>
							</span>
						</div>
		      	<div class="basicColors-content active-content">
		      		<h6 class="hidden-desktop color-menu-instructions">
		        		'Tap spectrum to lighten or darken color.',
		        	</h6>
		    			<li>
		      			<a class="' + index + '">
		        			<span class="color-preview ' + index + '"></span>
		        			<span class="color-label"> + index + "</span>",
		        			<span class="color-box spectrum-' + index + '">
		          			<span class="highlight-band">
											<span class="highlight-band-stripe"></span>
											<span class="highlight-band-stripe"></span>
											<span class="highlight-band-stripe"></span>
										</span>
		        			</span>
		      			</a>
		    			</li>
						</div>
						<div class="savedColors-content inactive-content">
		      		<p class="saved-colors-instructions">
		        		Type in a color or use the spectrums to lighten or darken an existing color. Up to 16 custom colors will be saved here.
		        	</p>
		      	</div>
					</ul>
				</div>
			</div>
		</div>

