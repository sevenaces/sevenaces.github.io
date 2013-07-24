// Basic JS for the website

// $(window).ready(function(){
// 	if(document.location.toString().indexOf('#') > 0)
// 	{
// 		var pid = document.location.toString().substring(document.location.toString().indexOf('#') + 1);
// 		$('#content').load('./' + pid + '.html');
// 		$('#' + pid).parent().attr('class', 'active');
// 	}
// });
var pid;
$('.pager li a').click(function(){
	pid = (this.href.substring(1+this.href.indexOf('#')));
	
	switch(pid)
	{
		case 'info':
			console.log('INFO TO BE DISPLAYED');
			break;

		default:
			break;
	}
});