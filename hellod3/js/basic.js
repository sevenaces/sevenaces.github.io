// Basic JS for the website

$('.nav li a').click(function(){
	$('#content').load('./' + this.id + '.html');
});