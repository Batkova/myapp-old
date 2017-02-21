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
  
  
  


  var injectCss = function(doc, style) {
    var style = doc.createElement('style');
    style.type = 'text/css';

    if(style.styleSheet) {
      style.styleSheet.cssText = style;
    } else {
      style.appendChild(doc.createTextNode(style));
    }

    doc.getElementsByTagName('head')[0].appendChild(style);
  };

  
  var applyStyle = function() {
	var doc = this.resultFrame.contentDocument || this.resultFrame.contentWindow.document;
	
	editors.css.getSession().on('change', function() {
	doc.write(defaultCode.html);
	 });

    injectCss(doc, this.style);
	
    //writeStyle(this.resultFrame, this.style);
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
    restoreCode: restoreCode
  };

  var player2 = {
    style: defaultCode.css,
    resultFrame: document.getElementById('result2-frame'),
    applyStyle: applyStyle,
    saveCode: saveCode,
    restoreCode: restoreCode
  };

  
  
  
  var state = {
    playerIdx: null,
    players: [ player1, player2 ],
    switchPlayer: function() {
		console.log(this.playerIdx);
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
        player.applyStyle();
      }
    },

    enableCurrentPlayer: function() {
      var player = this.getCurrentPlayer();

      player.resultFrame.style.backgroundColor = config.activeColor;
	  
	  document.getElementById("turn").innerHTML="Ход: Игрок " + (this.playerIdx + 1).toString();

      player.restoreCode();
	  funcTimer();
	}
  };
  
  
  
  
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

  init();

})(window, document);