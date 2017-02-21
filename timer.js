
function funcTimer() {
	var seconds = 5; 
		
	setTimePage(seconds);
		
	function secOut() {
		if (seconds == 0) { 
			showMessage(timerId); 
			if (this.playerIdx === null || this.playerIdx === 1) {
				this.playerIdx = 0;
			} else {
				this.playerIdx += 1;
			}
			//this.state.switchPlayer();
		} else {
			seconds--; 
		  };
		 
		setTimePage(seconds);
		}
		
		timerId = setInterval(secOut, 1000);
}


function setTimePage(s) { 
	var element = document.getElementById("timer"); 
	element.innerHTML = "До окончания хода осталось: "+s; 
}



function showMessage(timerId) { 
	alert("Время истекло!");
	clearInterval(timerId); 
}
