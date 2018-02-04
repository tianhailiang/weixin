/*这个开发参数就是用来生产环境中使用的匹配*/
//fis.media('dev').match('*.{js,css}',{
//useHash: false
//}).match('*.less', {
//	parser:fis.plugin('less'),
//	rExt: '.css'
//});

/*这个pro参数就是用来生产环境中使用的匹配*/
fis.media('pro').match('*.{js,css}',{
  useHash: true
}).match('*.js', {
  //fis-optimizer-uglify-js 插件进行压缩，已内置
  optimizer: fis.plugin('uglify-js')
}).match('*.png', {
  optimizer: fis.plugin('png-compressor')
}).match('*.less', {
	parser:fis.plugin('less'),
	rExt: '.css'
});

//fis.media("pro").match('/test/server.conf', {
//release: '/config/server.conf'
//});
//
