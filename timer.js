
function funcTimer() {
	var seconds = 5; 
		
	setTimePage(seconds);
		
	function secOut() {
		if (seconds == 0) { 
			showMessage(timerId); 
		} else {
			seconds--; 
			setTimePage(seconds);
		  };
		} 
	timerId = setInterval(secOut, 1000);

}


var element = document.getElementById("timer");

function setTimePage(s) { 
	element.innerHTML = "До окончания хода осталось: "+s; 
}



function showMessage(timerId) { 
	alert("Время истекло!");
	clearInterval(timerId); 
	
	element.innerHTML = "";
}