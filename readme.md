# bootstrap-modal-extension
 
Extension for Bootstrap ~3.0 modal. A wrapper for the default js that allows for finer control of the modal.

```javascript
	/**
	 * the extension must be initialized
	 */
	var modalExtension = new ModalExtension('Modal');
```

Data Attribute api

	*data-toggle 	="modalExtension" 			=> register extension listener
	*data-title 	="*" 						=> title of modal
	*data-content 	="*" 						=> modal main content (ID selector, text, html)
	*data-expose 	="*,*" 						=> list (selector) to unhide
	*data-footer 	='bool'						=> show footer (with buttons)
	*data-large 	='bool'						=> show large modal
	*data-migrate 	='bool'						=> migrate content location
	*data-keyboard 	='bool'						=> Bootstrap modal -> allow keyboard
	*data-backdrop 	='static..'					=> Bootstrap modal -> set modal backdrop
	*data-confirm-text ="*" 					=> text for confirm button
	*data-confirm-callback ="js function" 		=> js to run after user confirms modal

```html
	<button type="button" class="btn btn-primary"
		data-toggle ="modalExtension"
		data-title 	= "..."
		data-footer = "bool"
        data-large 	= "bool"
		data-content = '(ID selector, text, html)'
		data-confirm-text = "..."
		data-confirm-callback = " function(){...} "
	>Login</button>             
```
```javascript
	modalExtension.show({
		title 	: '...',
		footer 	: true,
        large 	: false,
		content : '(ID selector, text, html)',
		confirm_text : '...',
		confirm_callback : function(){...}
	})

	.hide({ delay : 5000, callback : function(){...} });
```