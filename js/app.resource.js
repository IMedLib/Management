
var app=app||{};

(function($){
	if(!$)
		return;
	// if(app.ajax==undefined) return;
	/* resource **********************************************/
	app.resource=app.resource||{};

	/*云板书*/
	app.resource.ybs=app.resource.ybs||{}
	app.resource.ybs.info=function(userOptions){
		userOptions=userOptions||{};
		userOptions.url=app.config.resourcedomain+'YunBook/info';
		userOptions.async=false;
		userOptions.type='GET';
		$.ajax(userOptions);
	}
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
	}

	app.resource.ybs.update=function(userOptions){
		if(userOptions.data.id==undefined||userOptions.data.id==0
			||userOptions.data.key==undefined||userOptions.data.key==''
			||userOptions.data.token==undefined||userOptions.data.token=='')
			return false;
		userOptions.url=app.config.resourcedomain+'YunBook/Put';
		userOptions.type='POST';
		$.ajax(userOptions);
		
	}

	app.resource.classList=function(){
		return JSON.parse($.ajax({
			url:app.config.resourcedomain+'Class/List/',
			dataType:'json',
			async:false,
			cache:false
		}).responseText);
	};
	app.resource.info=function(cid,userid,rid,coin,state,title){
		return JSON.parse($.ajax({
			url:app.config.resourcedomain+"Res/Info",
			dataType:"json",
			async:false,
			cache:false,
			data:{
				cid,userid,rid,coin,state,title
			}
		}).responseText);
	}
	/*
		@param key
		@param token
		@param cid 类别
		@param userid
		@param offset
		@param limit
	*/
	app.resource.list=function(key,token,cid,userid){
		var offset=arguments[4]||1;
		var limit=arguments[5]||app.config.limit;
		return JSON.parse($.ajax({
			url:app.config.resourcedomain+'Res/List',
			dataType:'json',
			async:false,
			cache:false,
			data:{
				key,
				token:encodeURI(token),
				cid,userid,offset,limit
			}
		}).responseText);
	}
	app.resource.listByUserId=function(key,token,cid,offset,limit){
		return JSON.parse($.ajax({
			url:app.config.resourcedomain+'Res/UList',
			dataType:'json',
			async:false,
			cache:false,
			data:{
				key,
				token:encodeURI(token),
				cid,
				userId:key,
				offset,limit
			}
		}).responseText);
	}
	app.resource.detail=function(key,token,rid){
		return JSON.parse($.ajax({
			url:app.config.resourcedomain+'Res/Get',
			dataType:'json',
			async:false,
			cache:false,
			data:{
				key:key,
				token:encodeURI(token),
				rid:rid
			}
		}).responseText);
	}
	/*
		Cid:类别,Coin:所需积分,
	*/
	app.resource.add=function(key,token,cid,state,title,remark,uri){
		return JSON.parse($.ajax({
			url:app.config.resourcedomain+'Res/Add',
			type:'POST',
			dataType:'json',
			async:false,
			cache:false,
			data:{
				key,token,cid,title,remark,uri,state,
				coin:0
			}
		}).responseText);

	};

	app.resource.edit=function(key,token,prid,rid,cid,title,remark,uri){
		return JSON.parse($.ajax({
			url:app.config.resourcedomain+'Res/Put',
			type:'POST',
			dataType:'json',
			async:false,
			cache:false,
			data:{
				key,token,prid,rid,cid,title,remark,uri
			}
		}).responseText);
	}

	/*
		@param state 1私有2共有
		@param rank 排序
	*/
	app.resource.addRelationship=function(key,token,prid,rid){
		var state=arguments[5]||2;
		var rank=arguments[6]||30;
		return JSON.parse($.ajax({
			url:app.config.resourcedomain+"Resrelate/Add/",
			type:'POST',
			dataType:'json',
			async:false,
			cache:false,
			data:{
				key,token,prid,rid,state,rank
			}
		}).responseText);
	};

	app.resource.getRelationshipList=function(key,token,prid){
		return JSON.parse($.ajax({
			url:app.config.resourcedomain+"Resrelate/List/",
			dataType:'json',
			async:false,
			cache:false,
			data:{
				key,
				token:encodeURI(token),
				prid
			}
		}).responseText);
	};
	
	app.resource.getDiscussList=function(key,token,rid){
		var offset=arguments[3]||1;
		var limit=arguments[4]||app.config.limit;
		return JSON.parse($.ajax({
			url:app.config.resourcedomain+"Resdiscuss/List/",
			dataType:'json',
			async:false,
			cache:false,
			data:{
				key,
				token:encodeURI(token),
				rid,offset,limit
			}
		}).responseText);
	};

	app.resource.getTagList=function(rid){
		var state=arguments[1]||2;
		return JSON.parse($.ajax({
			url:app.config.resourcedomain+"ResTag/List",
			dataType:'json',
			async:false,
			cache:false,
			data:{
				rid,state
			}
		}).responseText);
	};

	app.resource.addTag=function(key,token,rid,title){
		var state=arguments[4]||2;
		return JSON.parse($.ajax({
			url:app.config.resourcedomain+"ResTag/Add",
			dataType:"json",
			async:false,
			cache:false,
			data:{
				key,token,rid,title,state
			}
		}).responseText);
	};
})(jQuery);