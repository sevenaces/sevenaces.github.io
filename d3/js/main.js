// Basic JS for the website

$(document).ready(function(){
	$(".dropdown-button").dropdown({hover:true, constrainwidth:false});
	if(document.location.toString().indexOf('#') > 0)
	{
		var pid = document.location.toString().substring(document.location.toString().indexOf('#') + 1);
		$('#content').load('./components/' + pid + '.html');
		$('#' + pid).parent().attr('class', 'active');
	}
	else
	{
		$('#content').load('./components/home.html');
		$('#home').parent().attr('class', 'active');	
	}
});

$('.nav li a').click(function(e){
	$('#content').load('./components/' + this.id + '.html');
	$('.nav li').removeClass('active');
	$('#' + this.id).parent().attr('class', 'active');
});