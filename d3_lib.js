//образец выполнения
var html_text = '<!DOCTYPE html>\n' +
            '<html>\n' +
			'<head>\n' +
			'<meta charset="utf-8">\n' +
			'</head> \n' +
            '<body>\n' +
			'<div class="block" >\n' +
			'<div class="bg" ></div>\n' +
			'</div>\n' +
            '</body>\n' +
            '</html>\n';
			
var html_text2 = '<\/style> \n' +
			'</head> \n' +
            '<body>\n' +
			'<div class="block" >\n' +
			'<div class="bg" ></div>\n' +
			'</div>\n' +
            '</body>\n' +
            '</html>';
			
var styles ='html, body {\n' +
							'margin: 0; \n' +
							'padding: 0; \n' +
					'}\n' +
					'.block {\n' +
						'width: 300px;\n' +
						'height: 300px;\n' +
						'background: #3498db;\n' +
						'border: 1px solid black;\n' +
					'}';
			
var sample_frame = document.getElementById('sample-frame');
var sample_doc = sample_frame.contentDocument || sample_frame.contentWindow.document;
sample_doc.open();
sample_doc.write(html_text +  "<style>" + styles + "<\/style>");
sample_doc.close();
		
		
//заблокированный HTML код	
var htm = document.getElementById("editorH");
var htmEditor = ace.edit(htm);
htmEditor.getSession().setMode("ace/mode/html");
htmEditor.setTheme("ace/theme/dawn");
htmEditor.setReadOnly(true);
htmEditor.setValue(
			'<!DOCTYPE html>\n' +
            '<html>\n' +
			'<head>\n' +
			'<meta charset="utf-8">\n' +
			'</head> \n' +
            '<body>\n' +
			'<div class="block">\n' +
			'<div class="bg" ></div>\n' +
			'</div>\n' +
            '</body>\n' +
            '</html>'	);
		

		

//var ed = ace.edit(container);		
var queue = 1;
turnchange(queue);
mask(queue);

//вывод ранее введенного кода
//ed.getValue();

var doc = move(queue);
		
		
//объявление хода - шапка
function turnchange(t){
	if (t == 1) {
		document.getElementById("turn").innerHTML="Ход: Игрок " + t.toString();
		console.log(t);
		}
	else {
		document.getElementById("turn").innerHTML="Ход: Игрок " + t.toString();	
		console.log(t);
		}
		
}
		
		
//маска для ожидающего
function mask(t) {
	var activ_result, inactiv_result;
	if (t == 1) {
		activ_result = "result1-frame";
		inactiv_result = "result2-frame";
		} else {
		activ_result = "result2-frame";
		inactiv_result = "result1-frame";
	}
	document.getElementById(inactiv_result).style.backgroundColor ='#778899';
	document.getElementById(activ_result).style.backgroundColor ='#C0C0C0';
}
		var code;
		//ходы игроков  
    function move(t){ 
		var container = document.getElementById("editor"); 
		var editor = ace.edit(container); 
		editor.setTheme("ace/theme/dawn"); 
		editor.getSession().setMode("ace/mode/html"); 
		
		/* var input = document.getElementById("save_code");
		editor.getSession().on("change", function () {
			input.setValue(editor.getSession().getValue());
		}); 
		
		var input = $('input[name="save_code"]');
        editor.getSession().on("change", function () {
			input.val(editor.getSession().getValue());
		});*/
		
		var cont = document.getElementById("save_code"); 
		var code = ace.edit(cont); 
		code.setTheme("ace/theme/dawn"); 
		code.getSession().setMode("ace/mode/html");   
		
		editor.setValue(code.getValue());
		
				
		var iframe = document.getElementById("result" + t.toString() + "-frame"); 
		var doc = iframe.contentDocument || iframe.contentWindow.document; 
		
        //var ed = ed + editor;    
		play.onclick = function() {
			doc.open();
			doc.write(html_text + "<style>" + editor.getValue() + "<\/style>"); 
			doc.close();
		
		//var code = editor.getValue();
		code.setValue(editor.getValue());
		console.log(code.getValue());
		
		if(t == 1) {
			t = 2}
		else if(t==2){
			t=1;
		}
			turnchange(t);
			mask(t);
			move(t);
		};
	return(doc);
	}
		
	
	//новая игра	
		function reload(){
			editor.setValue("")	;
			//стереть результаты игроков
			var iframe = document.getElementById("result1-frame"); 
			var d = iframe.contentDocument || iframe.contentWindow.document; 
			
			var iframe2 = document.getElementById("result2-frame"); 
			var d2 = iframe.contentDocument || iframe.contentWindow.document; 
			
			d.open();
			d.write(editor.getValue()); 
			d.close();
			
			d2.open();
			d2.write(editor.getValue()); 
			d2.close();
		}
		
		
		
		
		//функция провекри, сравнения с образцом
		var sample_canvas; 
		var result_canvas; 
		var bar_match;
		
	function check() { 
		var img=new Image(); img.crossOrigin="anonymous";
	
		var load_count; 
		var sample_image, result_image; 
		html2canvas(sample_doc.body, { 
			onrendered: function (s_canvas) { 
				sample_canvas = s_canvas; 
				html2canvas(doc.body, { 
					onrendered: function (r_canvas) { 
						result_canvas = r_canvas; 
						var sample_string = sample_canvas.toDataURL("image/jpeg", 1.0); 
						var result_string = result_canvas.toDataURL("image/jpeg", 1.0); 
						resemble(sample_string).compareTo(result_string).onComplete(function (data) { 
							document.getElementById('result_button').innerHTML = Math.floor(100 - data.rawMisMatchPercentage) + ' %'; 
						}); 
					} 
				}); 
			} 
		}); 
	}
			
	
	
	
	
	
	
	
	
	
	
	
	