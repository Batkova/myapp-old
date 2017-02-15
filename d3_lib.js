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
		
			
	var x ="result1-frame";
	mask(x);
	var doc = move(x);
		
		
		
		//создаем редактор Ace
		var container = document.getElementById("editor"); 
		var editor = ace.edit(container); 
		editor.setTheme("ace/theme/dawn"); 
		editor.getSession().setMode("ace/mode/html"); 
		
		
		//смена цифры - шапка
		function turnchange(t){
			if (change == 1) {
				if (t == 0) {
					t=1;
					whogoesnow = "Ход: Игрок " + 1;	
				}
				else {
					t == 0;
					whogoesnow = "Ход: Игрок " + 2;	
				}
			}
				else {
				t=t;
				}
			change = 1;
			return(t);		
		}
		
		
		
		//маска для ожидающего
		function mask(result) {
			if (result == "result1-frame") {
				result = "result2-frame";
			} else {
				result = "result1-frame";
			}
			document.getElementById(result).style.backgroundColor ='#778899';
		}
		
		//ходы игроков  
    function move(resframe){  
		var container = document.getElementById("editor"); 
		var editor = ace.edit(container); 
		editor.setTheme("ace/theme/dawn"); 
		editor.getSession().setMode("ace/mode/html"); 
		
		var iframe = document.getElementById(resframe); 
		var doc = iframe.contentDocument || iframe.contentWindow.document; 
		
            
		play.onclick = function() {
			doc.open();
			doc.write(html_text + "<style>" + editor.getValue() + "<\/style>"); 
			doc.close();
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
			
	