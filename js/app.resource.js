
var app=app||{};

(function($){
	if(!$)
		return;
	// if(app.ajax==undefined) return;
	/* resource **********************************************/
	app.resource=app.resource||{};
	/*云板书*/
	app.resource.ybs=app.resource.ybs||{};
	app.resource.ybs.info=function(userOptions){
		userOptions=userOptions||{};
		userOptions.url=app.config.resourcedomain+'YunBook/info';
		userOptions.async=false;
		userOptions.type='GET';
		$.ajax(userOptions);
	};
	/*
		uid 用户id
		title 云板书名称
		offset 页码
		limit 分页大小
	*/
	app.resource.ybs.list=function(userOptions){
		userOptions=userOptions||{};
		userOptions.url=app.config.resourcedomain+'YunBook/List';
		userOptions.type='GET';
		$.ajax(userOptions);
	};

	app.resource.ybs.update=function(userOptions){
		if(userOptions.data.id==undefined||userOptions.data.id==0
			||userOptions.data.key==undefined||userOptions.data.key==''
			||userOptions.data.token==undefined||userOptions.data.token=='')
			return false;
		userOptions.url=app.config.resourcedomain+'YunBook/Put';
		userOptions.type='POST';
		$.ajax(userOptions);
		
	};

	app.resource.info=function(userOptions){
		userOptions=userOptions||{};
		userOptions.url=app.config.resourcedomain+"Res/Info";
		$.ajax(userOptions);
	};
	/*
		@param key
		@param token
		@param cid 类别
		@param userid
		@param offset
		@param limit
	*/
	app.resource.list=function(userOptions){
		userOptions=userOptions||{};
		userOptions.data.limit=userOptions.data.limit||app.config.limit;
		userOptions.data.offset=userOptions.data.offset||1;
		userOptions.url=app.config.resourcedomain+'Res/List';
		$.ajax(userOptions);
		
	};
	
	app.resource.detail=function(userOptions){
		userOptions=userOptions||{};
		userOptions.url=app.config.resourcedomain+'Res/Get';
		userOptions.async=false;
		$.ajax(userOptions).fail(function(){
			app.message.error('网络超时，请稍后再试！');
		});
	};
	/*
		@param title
		@param remark
		@param sid 素材序号
		@param bid 子类资源ID
		@param zoom
		@param point 田家园中的坐标
	*/
	app.resource.add=function(userOptions){
		userOptions=userOptions||{};
		userOptions.url=app.config.resourcedomain+'Res/Add';
		userOptions.type="POST";
		userOptions.async=false;
		$.ajax(userOptions).done(function(data){
			return data.code == 0;
		}).fail(function(){
			app.message.error('网络超时，请稍后再试！');
		});
	};

	app.resource.edit=function(userOptions){
		userOptions=userOptions||{};
		userOptions.url=app.config.resourcedomain+'Res/Put';
		$.ajax(userOptions).fail(function(){
			app.message.error('网络超时，请稍后再试！');
		})
	};

	app.resource.delete=function(userOptions){
		userOptions=userOptions||{};
		if(userOptions.data.rid==undefined) return false;
		userOptions.url=app.config.resourcedomain+'Res/Del';
		userOptions.type='POST';
		$.ajax(userOptions).fail(function(){
			app.message.error('网络超时，请稍后再试！');
		})
	};
})(jQuery);