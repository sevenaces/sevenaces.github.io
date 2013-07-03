// Basic JS for the website

$(window).ready(function(){
	if(document.location.toString().indexOf('#') > 0)
	{
		var pid = document.location.toString().substring(document.location.toString().indexOf('#') + 1);
		$('#content').load('./' + pid + '.html');
		$('#' + pid).parent().attr('class', 'active');
	}
});

$('.nav li a').click(function(e){
	//e.preventDefault();
	$('#content').load('./' + this.id + '.html');
	$('.nav li').removeClass('active');
	$('#' + this.id).parent().attr('class', 'active');
});