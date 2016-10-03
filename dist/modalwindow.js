/**
 * ModalWindow extension -> Bootstrap ModalWindow
 * 
 * ViralVector/viral_vector
 */

function ModalWindowExtension (id)
{
	this.props = {
		id				: id,
		modal      		: null,
		lastTimer  		: null,
		lastParent 		: null,
		isActive   		: false,	
		noContentText	: 'No content provided.',

		/**
		 * instance configs
		 */
		title			: '',
		footer			: true,
		confirm_text	: '...',
		confirm_callback: null,
		large			: false,
		migrate			: true,
		expose			: null,
		keyboard		: false,
		backdrop		: 'static'
	};
		
	this.props.modal = $('#' + this.props.id);

	// base event listeners 
	$(document).on('show.bs.modal', function () {
		modalWindow.props.isActive = true;
	})
	.on('shown.bs.modal', function () {
	})
	.on('hide.bs.modal', function () {
		modalWindow.props.isActive = false;
	})
	.on('hidden.bs.modal', function () {
		modalWindow.reset();
	});

	this.listen = function(obj){
		$(document).on('click', obj, function(event){
			modalWindow.show(modalWindow.getConfig(this));
		});
	};

	this.getConfig = function(obj){
		return {
			title 		: $(obj).data('title'),
			footer 		: $(obj).data('footer'),
			large 		: $(obj).data('large'),
			migrate 	: $(obj).data('migrate'),
			content 	: $(obj).data('content'),
			expose 		: $(obj).data('expose'),
			keyboard 	: $(obj).data('keyboard'),
			backdrop 	: $(obj).data('backdrop'),
			confirm_text : $(obj).data('confirm-text'),
			confirm_callback : $(obj).data('confirm-callback'),
		};
	};

	this.listen('[data-toggle=modalWindow]');	

	return this;
}

/**
 * 
 */
ModalWindowExtension.execute = function(func)
{
	if(typeof func !== 'function' && typeof func !== 'object'){
		var method = new Function("return (" + func + ")")();

		method.call();		
	}else{
		func.call();
	}
};

/**
 * 
 */
ModalWindowExtension.prototype.reset = function(args)
{
	if(!this.props.modal){
		this.init();
	}

	// reset current content in modal
	if(this.props.lastParent && this.props.migrate === true){
		if(args && args.expose && args.expose.trim() !== ''){
			var selectors = args.expose.trim();

			this.props.modal.find(selectors).toggleClass('hidden');

		}else if(this.props.expose){
			var selectors = this.props.expose;

			this.props.modal.find(selectors).toggleClass('hidden');
		}

		$(this.props.lastParent).append(this.props.modal.find('.modal-body > div > *'));
	}else{
		this.props.modal.find('.modal-body').html('');
	}

	// clear timer
	clearTimeout(this.props.lastTimer);

	return this;
};

/**
 * 
 */
ModalWindowExtension.prototype.show = function(args)
{
	this.replace(args);

	// confirm_callback
	if(args.confirm_callback){
		this.props.modal.find('[data-confirm]').off().on('click',function(){

			ModalWindow.execute(args.confirm_callback);

		}).text(args.confirm_text).show();
	}else{
		this.props.modal.find('[data-confirm]').hide();
	}

	// size
	if(args.large && args.large === true){
		this.props.modal.find('modal-dialog').addClass('modal-lg');
	}else{
		this.props.modal.find('modal-dialog').removeClass('modal-lg');
	}

	return this.open(args);
};

/**
 * 
 */
ModalWindowExtension.prototype.replace = function(args)
{
	this.reset(args);

	// migrate content
	(this.props.migrate = args.migrate.length ? args.migrate : true);

	// title & footer
	this.props.modal.find('.modal-title').html(args.title + "&nbsp;");
	
	(args.footer === true ?
		this.props.modal.find('.modal-footer').show() 
			: this.props.modal.find('.modal-footer').hide());

	// new content
	args.content = args.content ? args.content : this.props.noContentText;

	this.props.modal.find('.modal-body').html('<div></div>');

	if(((typeof args.content === 'function') || (typeof args.content === 'object')) || args.content.charAt(0) == '#'){
		this.props.lastParent = $(args.content).parent();

		if(this.props.migrate === true){
			this.props.modal.find('.modal-body > div').append($(args.content));
		}else{
			this.props.modal.find('.modal-body > div').html($(args.content).prop('outerHTML'));
		}
	}else{
		this.props.lastParent = null;

		this.props.modal.find('.modal-body > div').html(args.content);
	}

	if(args.expose && args.expose.trim() !== ''){
		var selectors = this.props.expose = args.expose.trim();

		this.props.modal.find(selectors).toggleClass('hidden');
	}

	return this;
};

/**
 * 
 */
ModalWindowExtension.prototype.hide = function(args)
{
	this.props.lastTimer = setTimeout(function(){
		if(modalWindow.props.isActive === true){
			$(modalWindow.props.modal).modal('hide');
		}
	},args.delay? args.delay : 0);

	return this;
};

/**
 * 
 */
ModalWindowExtension.prototype.open = function(args){
	var config = {
		show : true,
		backdrop : args.backdrop? args.backdrop : this.props.backdrop,
		keyboard : args.keyboard? args.keyboard : this.props.keyboard,
	}

	$(this.props.modal).modal(config);

	return this;
};