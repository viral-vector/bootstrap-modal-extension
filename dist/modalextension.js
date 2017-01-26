export default function ModalExtension (id)
{
	this.props = {
		id				: id,
		modal      		: null,
		lastTimer  		: null,
		lastParent 		: null,
		isActive   		: false,	
		noContentText	: 'No content provided.',

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

	$(document)
	  .on('show.bs.modal',   () => {
		this.props.isActive = true;
	}).on('shown.bs.modal',  () => {
	}).on('hide.bs.modal',   () => {
		this.props.isActive = false;
	}).on('hidden.bs.modal', () => {
		this.reset();
	});

	this.listen = (obj) => {
		$(document).on('click', obj, () => {
			this.show(this.getConfig(obj))
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

	this.listen('[data-toggle=modalExtension]');	

	return this;
}

ModalExtension.prototype.execute = function(func)
{
	if(typeof func !== 'function' && typeof func !== 'object'){
		let method = new Function("return (" + func + ")")();

		method.call();		
	}else{
		func.call();
	}
};

ModalExtension.prototype.reset = function(args)
{
	if(!this.props.modal){
		this.init();
	}

	// reset current content in modal
	if(this.props.lastParent && this.props.migrate === true){
		if(args && args.expose && args.expose.trim() !== ''){
			let selectors = args.expose.trim();

			this.props.modal.find(selectors).toggleClass('hidden');

		}else if(this.props.expose){
			let selectors = this.props.expose;

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

ModalExtension.prototype.show = function(args)
{
	this.replace(args);

	// confirm_callback
	if(args.confirm_callback){
		this.props.modal.find('[data-confirm]').off().on('click', () => {
			this.execute(args.confirm_callback);
		})
		.text(args.confirm_text)
		.show();
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

ModalExtension.prototype.replace = function(args)
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
		let selectors = this.props.expose = args.expose.trim();

		this.props.modal.find(selectors).toggleClass('hidden');
	}

	return this;
};

ModalExtension.prototype.hide = function(args)
{
	this.props.lastTimer = setTimeout(() => {
		if(this.props.isActive === true){
			$(this.props.modal).modal('hide');
		}
	},args.delay? args.delay : 0);

	return this;
};

ModalExtension.prototype.open = function(args){
	let config = {
		show : true,
		backdrop : args.backdrop? args.backdrop : this.props.backdrop,
		keyboard : args.keyboard? args.keyboard : this.props.keyboard,
	}

	$(this.props.modal).modal(config);

	return this;
};