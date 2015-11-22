
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

		$.ajax(userOptions).done(userOptions.success).fail(userOptions.error);
		
	};
	app.user.register=function(userOptions){
		userOptions=userOptions||{};
		userOptions.url=app.config.userdomain+'User/Add/Reg/';
		$.ajax(userOptions).done(userOptions.success).fail(userOptions.error);
	};
	app.user.login=function(userOptions){
		userOptions=userOptions||{};
		userOptions.url=app.config.userdomain+'User/Put/Login/';
		$.ajax(userOptions).done(userOptions.success).fail(userOptions.error);
	}
	
	//手机号是否已注册

	app.user.IsExist=function(userOptions){
		userOptions=userOptions||{};
		userOptions.url=app.config.userdomain+'user/get';
		userOptions.type='GET';
		userOptions.async=false;
		$.ajax(userOptions).done(userOptions.success).fail(userOptions.error);
		// if(userOptions.mobile==undefined){
		// 	console.error('arguments error!');
		// 	return;
		// }
		// var options= $.extend({}, app.ajax.defaultOpts, {
		// 	url:app.config.userdomain+'user/get',
		// 	async:false,
		// 	data:{
		// 		uid:userOptions.userid,
		// 		mobile:userOptions.mobile,
		// 		uname:userOptions.username
		// 	}});
		// return JSON.parse($.ajax(options).responseText).get.length==undefined;
		
	}

	//用户名是否已占用
	app.user.userNameIsExist=function(userOptions){

	}
	
	//设置昵称
	app.user.setNickName=function(userOptions){

	}
	
	//设置用户名
	app.user.setUserName=function(userOptions){

	}

	
	app.user.getUserInfo=function(userOptions){
		userOptions=userOptions||{}
		userOptions.url=app.config.userdomain+'user/get';
		userOptions.type='GET';
		$.ajax(userOptions).done(userOptions.success).fail(userOptions.error);
	};
	//status 1待审核2失败3成功
	app.user.getUserRoles=function(userid,token){
		return JSON.parse($.ajax({
			url: app.config.userdomain+'Userrole/List/',
			dataType: 'json',
			data: {key: userid,token:encodeURI(token)},
			async:false,
			cache:false
		}).responseText).list;
	};

	app.user.getRoles=function(){
		return JSON.parse($.ajax({
			url: app.config.userdomain+'Role/List/?offset=1&limit=100',
			dataType: 'json',
			async:false,
			cache:false
		}).responseText).list;
	};

	app.user.applyUserRole=function(userid,token,rid){
		return JSON.parse($.ajax({
			url: app.config.userdomain+'Userrole/Add/',
			dataType: 'json',
			data: {
				key: userid,
				token:encodeURI(token),
				rid:rid
			},
			async:false,
			cache:false
		}).responseText).code==0;
	}
	app.user.createGroup=function(userid,token,title,remark){
		return JSON.parse($.ajax({
			url: app.config.userdomain+'Group/Add/',
			type: 'POST',
			dataType: 'json',
			data: {
				key: userid,
				token:token,
				title:title,
				remark:remark
			},
			async:false,
			cache:false
		}).responseText);
	};
	app.user.removeGroup=function(key,token,gid){
		return JSON.parse($.ajax({
			url:app.config.userdomain+'Group/Del',
			type:'POST',
			dataType:'json',
			data:{
				key,token,gid
			},
			async:false,
			cache:false
		}).responseText);
	};

	app.user.groupList=function(offset,limit){
		return JSON.parse($.ajax({
			url: app.config.userdomain+'Group/List',
			dataType:'json',
			data:{
				offset,limit
			},
			async:false,
			cache:false
		}).responseText);
	};

	app.user.editGroup=function(userid,token,title,remark){
		return JSON.parse($.ajax({
			url: app.config.userdomain+'Group/put/',
			type: 'POST',
			dataType: 'json',
			data: {
				key: userid,
				token:token,
				title:title,
				remark:remark
			},
			async:false,
			cache:false
		}).responseText);
	};

	app.user.groupTitleIsExist=function(userid,token,title){
		return JSON.parse($.ajax({
			url:app.config.userdomain+'Group/Get',
			dataType:'json',
			data:{
				key:userid,
				token:encodeURI(token),
				title:encodeURI(title)
			},
			async:false,
			cache:false
		}).responseText);
	}
	//转让机构
	app.user.attornGroup=function(userid,token,newuserid,gid){
		return JSON.parse($.ajax({
			url: app.config.userdomain+'Group/Attorn',
			type: 'POST',
			dataType: 'json',
			data: {
				key: userid,
				token:token,
				new_userid:newuserid,
				gid:gid
			},
			async:false,
			cache:false
		}).responseText);
	}
	app.user.teamIsExist=function(userid,token,gid,title){
		return JSON.parse($.ajax({
			url:app.config.userdomain+'Team/Get/',
			data:{
				Gid:gid,
				title:encodeURI(title),
				key:userid,
				token:encodeURI(token)},
			dataType:'json',
			async:false,
			cache:false
			}).responseText);
	};
	app.user.createTeam=function(userid,token,gid,title){
		return JSON.parse(
			$.ajax({
				url:app.config.userdomain+'Team/Add',
				type:'POST',
				dataType:'json',
				async:false,
				cache:false,
				data:{
					key:userid,
					token:token,
					gid:gid,
					title:title
				}
			}).responseText);
	};
	app.user.editTeam=function(userid,token,tid,gid,title){
		return JSON.parse($.ajax({
			url:app.config.userdomain+'Team/Put',
			type:'POST',
			dataType:'json',
			async:false,
			cache:false,
			data:{
				key: userid,
				token:token,
				tid:tid,
				gid:gid,
				title:title
			}
		}).responseText);
	};
	app.user.removeTeam=function(userid,token,tid,gid){
		return JSON.parse($.ajax({
			url:app.config.userdomain+'Team/del',
			type:'POST',
			async:false,
			cache:false,
			dataType:'json',
			type:'POST',
			data:{
				key: userid,
				token:token,
				tid:tid,
				gid:gid
			}
		}).responseText);
	};

	app.user.applyUserGroup=function(userid,token,tid,gid){
		return JSON.parse($.ajax({
			url:app.config.userdomain+'Usergroup/Apply/',
			type:'POST',
			dataType:'json',
			async:false,
			cache:false,
			data:{
				key: userid,
				token:token,
				tid:tid,
				gid:gid
			}
		}).responseText);
	};
	/*
		获取用户所在的群组列表
	*/
	app.user.getUserGroupList=function(userid,token){
		return JSON.parse($.ajax({
			url:app.config.userdomain+'Usergroup/ListU',
			dataType:'json',
			async:false,
			cache:false,
			data:{
				key:userid,
				token:encodeURI(token)
			}
		}).responseText);
	};

	app.user.getGroupUserList=function(userid,token){
		return JSON.parse($.ajax({
			url:app.config.userdomain+'Usergroup/ListG/',
			dataType:'json',
			async:false,
			cache:false,
			data:{
				key:userid,
				token:encodeURI(token),
				gid:gid
			}
		}).responseText);
	};

	app.user.removeUserGroup=function(userid,token,gid,usergroupid){
		return JSON.parse($.ajax({
			url:app.config.userdomain+'Usergroup/Del/',
			type:'POST',
			dataType:'json',
			async:false,
			cache:false,
			data:{
				key:userid,
				token:token,
				gid:gid,
				id:usergroupid
			}
		}).responseText);
	};
	
	//flag 1设置管理员0取消
	app.user.setAdmin=function(userid,token,gid,id,flag){
		return JSON.parse($.ajax({
			url:app.config.userdomain+'Usergroup/Admin/',
			type:'POST',
			dataType:'json',
			async:false,
			cache:false,
			data:{
				key:userid,
				token:token,
				id:id,
				gid:gid,
				admin:flag
			}
		}).responseText);
	};
})(jQuery);
