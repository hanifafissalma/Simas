
//login
$('#login-form').submit(function(e){
	e.preventDefault();
	var data = $(this).serialize();
	$.ajax({
		url:'http://localhost/simas-service/public/api/user/login',
		type:'post',
		data: data,
		success: function(res){
			setCookie('princess', res.token); 
			alert("Berhasil Login");
			window.location.href='./';
		},
		error: function(res){
			console.log(res);
		}
	})
})
