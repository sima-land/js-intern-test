$(document).ready(function(e) {
	
	$(function() {
		//periodically bumping server to check if user is active
		setInterval(function() {
			var active = $('#active-cookie').html();
			
			//this one is waiting till user will go offline
			$.ajax({
				type: "POST",
				url: "/ajax/check_active.php",
				data: {
					'data': active
				},
				success: function(data) {
					$("#active-cookie").html(data)
				}
			});
			
			//just refresh counter on page
			$.ajax({
				type: "POST",
				url: "/ajax/count_update.php",
				success: function(data) {
					$("#count-value").html(data)
				}
			});
		},2000);
	});

});

//and this one is to track people closing tab, refresh, etc.
window.addEventListener("beforeunload", function (e) {
	var active = $('#active-cookie').html();
	
	$.ajax({
		type: "POST",
		url: "/ajax/unload.php",
		data: {
			'data': active
		},
		success: function(data) {
			console.log(data)
		}
	});
});