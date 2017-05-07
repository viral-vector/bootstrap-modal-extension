# bootstrap-modal-extension
 
Extension for Bootstrap ~3.0 modal. A wrapper for the default js that allows for finer control of the modal.

### Installation
```bash
 npm install bootstrap-modal-extension
```
### Use
*data-toggle ='' 			=> register extension listener
*data-title ='*' 			=> title of modal
*data-content ='*' 			=> modal main content (ID selector, text, html)
*data-expose ='*,*' 		=> list of selectors to unhide
*data-footer ='bool'		=> show footer
*data-large ='bool'			=> show large modal
*data-migrate ='bool'		=> migrate content location
*data-keyboard ='bool'		=> allow keyboard
*data-backdrop ='static'	=> set modal backdrop
*data-confirm-text ='*' 	=> text for confirm button
*data-confirm-callback =''	=> callback after user confirms

```js
// modal extension must be created
var modalExtension = new ModalExtension('id of modal');
```

```html
<button type="button" class="btn btn-primary"
	data-toggle = 'modalExtension'
	data-title 	= 'title'
	data-footer = 'bool'
	data-large 	= 'bool'
	data-content = '(ID selector, text, html)'
	data-confirm-text = 'yes'
	data-confirm-callback = 'function(){...}'
>Login</button>             
```
```js
modalExtension.show({
	title 	: 'title',
	footer 	: true,
	large 	: false,
	content : '(ID selector, text, html)',
	confirm_text : 'yes',
	confirm_callback : function(){...}
})

.hide({ delay : 5000, callback : function(){...} });
```