 define(function(require,exports,moudle){

              var $=require("zepto");
                 require("tap");
		    	
		    	//获取变量
		    	var phone=$("#phone"),pwd=$("#pwd"),btn=$("#btn"),register=$("#register");
		    	var cir=$(".circle"),nick=$("#nick"); 
		    	  
		    	//点击切换注册
		    	register.on("tap",function(event){
		    		event.preventDefault();

		    		
		    		cir.html("足球圈--注册");
		    		
		    	    $(this).parent().css("display","none");
		    		nick.css("display","block");
		    		
		    	})
		    	 	
		    	 	
		    	 	
		    	 	
		    	 	
		    	 	
		    	btn.on("tap",function(event){
		    		//阻止默认行为。
		    		event.preventDefault();

		    		 
		    		

		    		var params={};
		    		
		    		params.phone=$.trim(phone.val());
		    		params.pwd=$.trim(pwd.val());
		    		
		    		//数据的判断
//		    		console.log(params.phone);
//		    		console.log(validate.phone(params.phone));
                 
                 //引入common
                     var validate=require("common");
		    		if (!validate.phone(params.phone)) {
		       	    	alert("敢不敢把手机号写对！");
		       	    	
		       	    	return false;
       	             };
		    		
		    		if(params.pwd==""||params.pwd.length<6)
		    		{
		    			alert("您的输入的密码不正确");
		    			
		    			return false;

		    		}
		    	
		    	
		    		$.post("/api/login",params,function(data){
		    			
		    			 $("#loadingToast").show();
		    			if(data.error==0)
		    			{

		    				alert("登陆成功了");

		    				setTimeout(function(){
		    					window.location.href="index.html";
		    				},500)
		    			}else{
		    				
		    				$("#loadingToast").hide();
		    				alert(data.message);
		    			}
		    			
		    		})
		    		
		    	});
		    	
		    	
		    	
		    	
	})	    	
		   