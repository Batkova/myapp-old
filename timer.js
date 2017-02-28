var t = 1;

function funcTimer() {
	if (t === 0) {
		console.log('выход');
		t = 1;
		editors.css.setReadOnly(true);
		return;
	}
	
	var seconds = 5; 
		
	setTimePage(seconds);
		
	function secOut() {
		console.log("func");
		 if (seconds == 0) { 
			showMessage(timerId); 
		} else { 
			seconds--; 
			setTimePage(seconds);
		} 
	} ;
		
	timerId = setInterval(secOut, 1000);
}


var element = document.getElementById("timer");

function setTimePage(s) { 
	element.innerHTML = "До окончания хода осталось: "+s; 
}



function showMessage(timerId) { 
	alert("Время истекло!");
	clearInterval(timerId); 
	//element.innerHTML = "";
	t = 0;
	funcTimer();
}