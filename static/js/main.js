function connect() {
	setTimeout(function() { addTerminalLine("connecting...\n") }, 500);
	setTimeout(function() { addTerminalLine("Connected to POLYGRAPH mainframe\n") }, 1500);
	setTimeout(function() { addTerminalLine("By what name: ") }, 1600);
}

function addTerminalLine(line) {
	var term = document.getElementById("term");
	term.value += line;
	term.scrollTop = term.scrollHeight;
}

function removeTerminalCharacter() {
	var term = document.getElementById("term");
	if (term.value.substring(term.value.lastIndexOf("\n")+1).length > 2) {
		term.value = term.value.substring(0, term.value.length - 1);
	}
}

function sendCommand(line) {
	console.log(line);
	if (line == "") { return; }
	$.get( "/command:" + line, function( data ) {
  		addTerminalLine("\n\n" + data + "\n");
		console.log(data.split("\n")[0])
		responsiveVoice.speak(data.split("\n")[0].split(" : ")[1].toLowerCase(), 'UK English Male',{pitch: 0.4, rate: 0.7});
	});
}

$(document).ready(function() {
	var term = document.getElementById("term");
	$("#term").keypress(function(event) {
			if (event.key == "Enter") {
				line = $("#term").val().substr($("#term").val().lastIndexOf("\n")+1);
				if (line == "> clear") {
					term.value = "";
				} else {
					line = line.substring(2);
					sendCommand(line);
				}
				setTimeout(function() { addTerminalLine("\n> "); }, 200);
			} else if (event.key == "Delete") { removeTerminalCharacter(); } 
			else { addTerminalLine(event.key); }
	});
})
