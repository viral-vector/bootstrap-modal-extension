## Title 	: bootstrap-modalwindow-extension
### Author 	: viralvector/viral_vector
### Bootstrap ~3.0 

## An extension for bootratp modal js. An easy syntax to add a bit of functionality.
    1. JS & Data Attribute API
    2. Js customization of modal
    3. Callbacks
    4. Size
    5. contnet handling

	data-attribute API

	-- required
	*data-toggle 	="modalWindow" 				=> register modal listener
	*data-title 	="*" 						=> title of modal
	*data-content 	="*" 						=> modal main content (selector, ..., html)
	*data-expose 	="*,*" 						=> list (selector) to unhide
	*data-footer 	='bool'						=> show footer (with buttons)
	*data-large 	='bool'						=> show large modal
	*data-migrate 	='bool'						=> migrate content location
	-- optional
	*data-keyboard 	='bool'						=> Bootstrap modal -> allow keyboard
	*data-backdrop 	='static..'					=> Bootstrap modal -> set modal backdrop
	*data-confirm-text ="*" 					=> text for confirm button
	*data-confirm-callback ="js function" 		=> js to run after user confirms modal


```html
	<button type="button" class="btn btn-primary"
		data-toggle ="modalWindow"
		data-title 	= "..."
		data-footer = "bool"
        data-large 	= "bool"
		data-content = '(ID selector, text, html)'
		data-confirm-text = "..."
		data-confirm-callback = " function(){...} "
	>Login</button>             
```
```javascript
	modalWindow.show({
		title 	: '...',
		footer 	: true,
        large 	: false,
		content : '(ID selector, text, html)',
		confirm_text : '...',
		confirm_callback : function(){...}
	})

	.hide({delay:1000, callback:'', callback_arguments:''});
```