
var app=app||{};

(function($){
	if(!$)
		return;
	app.auth=app.auth||{};
	app.auth.apply=function(userOptions){
		if(userOptions.key==undefined||userOptions.token==undefined||userOptions.rid==undefined)
		{
			console.error('arguments error!');
			return;
		}
		app.ajax({
			url:app.config.resourcedomain+"Resauth/Add/",
			data:{
				key:userOptions.key,
				token:userOptions.token,
				rid:userOptions.rid
			},
			chg:userOptions.success,
			shb:userOptions.error
		})
	}
})(jQuery)