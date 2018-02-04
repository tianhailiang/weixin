 
define(function(require, exports,module){
  
   // var $=require("zepto");
   //  require("ztap");
   //  require("artTanp");
   //  require("iscroll");
    var index=function(){
  
   $(function(){
          	
      alert(1);
                var flag=0;

               var wHeight=window.innerHeight;
               var hHeight=$("header").height();
               var nHeight=$(".ngt").height();
               var fHeight=$("footer").height();
              
               var sHeight=$("#swCont").find(".swiper-slide").height(wHeight-(hHeight+nHeight+fHeight));
                
                //让iscroll的wrapper高等于它。
                var wrapper0=$(".wrapper0"),wrapper1=$(".wrapper1"),wrapper2=$(".wrapper2");

                wrapper0.height(sHeight.height());
                wrapper1.height(sHeight.height());
                wrapper2.height(sHeight.height());
               
               

               
            //  引入swiper 
              require("swiper");
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
						$("#view").html(vHtml);
					}else{
						alert(data.message);
					}


                })




           	 	cont=false;

           	 }

           })
          


        })


}


  module.exports = index;


})