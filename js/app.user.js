
var app=app||{};

(function($){
	if(!$)
		return;
	/* user **********************************************/
	app.user=app.user||{};
	//发送验证码
	app.user.sendSms=function(userOptions){
		userOptions=userOptions||{};
		userOptions.url=app.config.userdomain+'Captcha/Add/';
		userOptions.type='GET';

		$.ajax(userOptions);
		
	};
	app.user.register=function(userOptions){
		userOptions=userOptions||{};
		userOptions.url=app.config.userdomain+'User/Add/Reg/';
		$.ajax(userOptions);
	};
	app.user.login=function(userOptions){
		userOptions=userOptions||{};
		userOptions.url=app.config.userdomain+'User/Put/Login/';
		$.ajax(userOptions);
	};
	
	/*手机号是否已注册
		return flase 不存在
	*/
	app.user.isExist=function(userOptions){
		var flag=false;
		userOptions=userOptions||{};
		userOptions.url=app.config.userdomain+'user/get';
		userOptions.async=false;
		$.ajax(userOptions).done(function(data){
			flag = data.get.uid != undefined;
		});
		return flag;
	};

	/*设置用户信息
		@param uname 用户名 
		@param nname 昵称
		@param pwd 支付密码
	*/
	app.user.setUserInfo=function(userOptions){
		var flag=false;
		userOptions=userOptions||{};
		userOptions.url=app.config.userdomain+'user/put';
		userOptions.type="POST";
		$.ajax(userOptions).done(function(data){
			flag=data.code == 0;
		});
		return false;
	};

	
	app.user.getUserInfo=function(userOptions){
		userOptions=userOptions||{};
		userOptions.url=app.config.userdomain+'user/get';
		$.ajax(userOptions);
	};
	//status 1待审核2失败3成功
	app.user.getUserRoles=function(userOptions){
		userOptions=userOptions||{};
		userOptions.url=app.config.userdomain+'userrole/list';
		userOptions.data.limit=$.extend(true,app.config.limit, userOptions.data.limit);
		userOptions.data.offset=$.extend(true,1, offset);
				
		$.ajax(userOptions);
	};

	/*
		@param rid 角色序号 
	*/
	app.user.applyUserRole=function(userOptions){
		var flag=false;
		userOptions=userOptions||{};
		if(userOptions.data.rid==undefined) return flag;
		userOptions.url=app.config.userdomain+'userrole/add';
		userOptions.async=false;
		$.ajax(userOptions).done(function(data){
			if(data.code!=undefined)flag = (data.code == 0);
		});
		return flag;
	}	
	
})(jQuery);
