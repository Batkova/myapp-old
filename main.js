(function(root, document) {

  var config = {
    theme: 'ace/theme/dawn',
    mode: {
      html: 'ace/mode/html',
      css:  'ace/mode/css'
    },
    activeColor: '#c0c0c0',
    inactiveColor: '#789'
  };

  var defaultCode = {
    html: (
      '<html>\
       \n<head>\n<meta charset="utf-8">\n</head>\
       \n<body>\n<div class="block">\n<div class="bg"></div>\n</div>\
       \n</body>\
       \n</html>'
    ),
    css: (
      'html, body {\n  margin: 0; padding: 0; \n}\
       \n.block {\n  width: 300px; height: 300px;\
       \n  background: #3498db; border: 1px solid black; \n}'
    )
  };
  

  var editors = {
  };
  
  
  var initHtmlEditor = function() {
    var container = document.getElementById('editorH');
    var editor = ace.edit(container);

    editor.setTheme(config.theme);
    editor.getSession().setMode(config.mode.html);

    editor.setValue(defaultCode.html);

    editors.html = editor;
  };

  var initCssEditor = function() {
    var container = document.getElementById('editor');
    var editor = ace.edit(container);
	ace.require("ace/ext/language_tools");
	
	editor.setOptions({
		enableBasicAutocompletion: true
	});

    editor.setTheme(config.theme);
    editor.getSession().setMode(config.mode.css);

    editors.css = editor;
  };
  
  
  


  var injectCss = function(doc, cssCode) {
    var style = doc.createElement('style');
    style.type = 'text/css';

    if(style.styleSheet) {
      style.styleSheet.cssText = cssCode;
    } else {
      style.appendChild(doc.createTextNode(cssCode));
    }

    doc.getElementsByTagName('head')[0].appendChild(style);
  };

  var doc;
  var applyStyle = function() {
	
	doc = this.resultFrame.contentDocument || this.resultFrame.contentWindow.document;
	
		doc.open();
		doc.write(defaultCode.html);
		doc.close();	
		
    injectCss(doc, this.style);
  };

  var saveCode = function() {
    this.style = editors.css.getValue();
  }; 

  var restoreCode = function() {
    editors.css.setValue(this.style);
  };

  var player1 = {
    style: defaultCode.css,
    resultFrame: document.getElementById('result1-frame'),
    applyStyle: applyStyle,
    saveCode: saveCode,
	attribute: 0,
    restoreCode: restoreCode
  };

  var player2 = {
    style: defaultCode.css,
    resultFrame: document.getElementById('result2-frame'),
    applyStyle: applyStyle,
    saveCode: saveCode,
	attribute: 0,
    restoreCode: restoreCode
  };

  
  
  
  var state = {
    playerIdx: null,
    players: [ player1, player2 ],
    switchPlayer: function() {
	
      this.disableCurrentPlayer();
		 
      if (this.playerIdx === null || this.playerIdx === this.players.length - 1) {
        this.playerIdx = 0;
      } else {
        this.playerIdx += 1;
      }
	 
      this.enableCurrentPlayer();
    },

    getCurrentPlayer: function() {
      return this.players[this.playerIdx];
	  
    },

    disableCurrentPlayer: function() {
	  
      if (this.playerIdx !== null) {
		var player = this.getCurrentPlayer();
		
		player.resultFrame.style.backgroundColor = config.inactiveColor;
			
		player.saveCode();
		check();
		
		
		var attr = player.style.replace(/\s/g, "") ;
		attr = attr.match(/\w+:#?\w+;/gi);
		
		if (attr !== null){
			if (attr.length === (player.attribute + 1)) {
				player.attribute = attr.length;
			} else {
				alert("Свойство введенно не корректно, либо введено не одно свойство! Попробуйте снова!");
				
				if (this.playerIdx === 1) { this.playerIdx = 0;} 
				else {this.playerIdx += 1;}
				return;
			};
		};
      };
	  
    },

    enableCurrentPlayer: function() {

      var player = this.getCurrentPlayer();

      player.resultFrame.style.backgroundColor = config.activeColor;
	  
	  document.getElementById("turn").innerHTML="Ход: Игрок " + (this.playerIdx + 1).toString();

	  player.restoreCode(player.style);
	  
	  editors.css.getSession().on('change', function() {
		//player.saveCode();
		player.applyStyle();
	  });

	/*   var sec = funcTimer();
	  if (sec === 0) {return}; */
	}
  };
  
  
  
  
  
  
  function check() { 
	
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
							var amount = Math.floor(100 - data.rawMisMatchPercentage);
							document.getElementById('result_button').innerHTML = amount + ' %'; 
						}); 
					} 
				}); 
			} 
		}); 
		return(this.amount);
	}
		
  
  
  
  
  
  
  
  
  
  
  
  var attachHandlers = function() {
    document.getElementById('play').addEventListener('click', function(event) {
      event.preventDefault();
      state.switchPlayer();
	  
    });
	
  };

  var init = function() {
    initHtmlEditor();
    initCssEditor();

    attachHandlers();

	state.switchPlayer();
	


  };

  
  //образец
var sample_frame = document.getElementById('sample-frame');
var sample_doc = sample_frame.contentDocument || sample_frame.contentWindow.document;
sample_doc.open();
sample_doc.write(defaultCode.html);
sample_doc.close();

injectCss(sample_doc, defaultCode.css);
  
  
  init();

})(window, document);