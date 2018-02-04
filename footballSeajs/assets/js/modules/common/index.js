 
define(function(require, exports,module){
  
    
      var s=require("zepto");
      var wx=require("weixin");
      require("tap");
      require("swiper");
      require("iscroll");
      
      var template=require("artTanp");

      //获取动态的高。
     var wHeight=window.innerHeight;
     var hHeight=$("header").height();
     var nHeight=$(".ngt").height();
     var fHeight=$("footer").height();

   $(function(){
          	

                var flag=0;

              
              
               var sHeight=$("#swCont").find(".swiper-slide").height(wHeight-(hHeight+nHeight+fHeight));
                
                //让iscroll的wrapper高等于它。
                var wrapper0=$(".wrapper0"),wrapper1=$(".wrapper1"),wrapper2=$(".wrapper2");

                wrapper0.height(sHeight.height());
                wrapper1.height(sHeight.height());
                wrapper2.height(sHeight.height());
               
               



             //swiper方法
             var mySwiper = new Swiper('.swiper-container', {
	                 onSlideChangeEnd:function(swiper){
                          var lis=$("#nav>li");
                         
                          lis.find("a").removeClass('act');
                          lis.find("a>i").removeClass('show');
                          lis.eq(swiper.activeIndex).find("a").addClass("act");

                          lis.eq(swiper.activeIndex).find("a>i").addClass("show");

                          //请求数据
                            iscroll(swiper.activeIndex);
                          reque(swiper.activeIndex,myScroll);


	                 }  
                   
                 })

                
                 // //初始化iscroll
                    iscroll(0);
                    //声明myScroll;
                    var myScroll;
                     function iscroll(index){
                    	 myScroll = new IScroll(".wrapper"+index);
                    }
                
                   
                
                    // myScroll.on("beforeScrollStart",function(){

                    // })
                 
                
                    
                  


                  //请求reque方法
                       function reque(activeIndex,myScroll){
                         
                      	if(activeIndex>0 &&flag<2)
                      	{   
                      		  
                      		if(activeIndex==1 && flag==1)
                      		 {
                      		 	
                      		 	 return false;
                      		 }
                            

                      		$.get("/api/life"+activeIndex,{},function(data){
                                   var html=template("listLive_tmpl",data);
                             
                                   $("#slider"+activeIndex).html(html);
                                   

                      		        myScroll.refresh();
                      		 flag++;  
                      		
                      	})
                    
                      }

                   }



              
             // tap事件   
              $("#nav").on("tap","li",function(event){
              	event.preventDefault();

                var $this=$(this),index=$(this).index();

                 mySwiper.slideTo(index, 500, false);
                 $this.parent().find('a>i').removeClass('show');
                  $this.parent().find('a').removeClass('act');
                 $this.find("a>i").addClass('show');
                 $this.find("a").addClass('act');
                  
                  //请求数据
                  iscroll(index);
                  reque(index,myScroll);
              });

			
				$.get("/api/list",{},function(data){
					var str="",listData=data.data;
					
				//1种办法。拼接字符串。

				  // if(data.error===0)
				  // {
				  	 
				  // 	  for(var i=0;i<listData.length;i++)
				  // 	  {
				  	  	
				  	  	
                      
				  	  	  
				  //   var s="<ul class='chunk1'><li><img src="+listData[i].imgSrc1+" /><p>"+listData[i].describe1+"</p></li><li class='last'><img src="+listData[i].imgSrc2+" /><p>"+listData[i].describe2+"</p></li></ul>";
							
					 //    str=str+s;
				  	  
				  // 	  }
				  	  
				  // 	  hot.html(str);
				
				  // }
				
				
				//2前端模板
				
				if(data.error===0)
				{
					var html=template("listLive_tmpl",{data:listData});
					$("#slider0").html(html);
					  myScroll.refresh();
				}else{
					alert(data.message);
				}
					
					
				})
			
		})
			
        
        //hot view切换。
        $(function(){
           var cont=true;
           $("#wrapper").height(wHeight-(hHeight+nHeight+fHeight));

             myScroll = new IScroll("#wrapper");
           
           var top=$("#top"),sec=$("section"),nav=$(".ngt");
           
           top.on("tap","li",function(event){
           	 event.preventDefault();
           	var $this=$(this),index=$(this).index();
           	sec.css("display","none");
            nav.css("display","block");
           if(index==1)
           {
           	 nav.css("display","none");
           }
            sec.eq(index).css("display","block");
           
           	 if(index==1&&cont==true){
                
                
                $.get("/api/vhot",{},function(data){
                     
                         
                  if(data.error===0)
        					
                  {
        						var vHtml=template("view_tmpl",data);
        						 $("#view1").html(vHtml);
                      myScroll.refresh();

        					}else{
        						alert(data.message);
        					}


                })

           	 	cont=false;

           	  }

            })
          
         })

       //微信接口
   
    $(function() {
        
          $.post("/getSignature", {}, function(config) {
            if (config != undefined && config != null) {

              wx.config({
                debug : true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId : 'wx3cc6ed0caf890dab', // 必填，appID公众号的唯一标识
                timestamp : config.timestamp, // 必填，生成签名的时间戳
                nonceStr : config.nonceStr, // 必填，生成签名的随机串
                signature : config.signature,// 必填，签名，见附录1
                jsApiList : [ 'chooseImage']
              // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
              });
               alert('配置成功！');
            }
          });
        

    

    wx.ready(function() {
      

     document.querySelector("#photo").onclick=function(){
            alert(1);
                  wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                console.log(localIds)
            }
        });
        
        }  

        //ready
    });

  });

//define

  });
  

