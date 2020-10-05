$(document).ready(function() {
  
  $('.HLInput').keyup(function(){
  	if ($(this).val().match(/[\.\|\\\/\<\>\$\^\[\]\{\}]$/gi)) { 
    	clear();
    }
    var block = $('.highlighter'); 
    var del = new RegExp("(<b class=\"hl\"*\>)(.*?)(\<\/b?>)", "mig");
    var blockText = block.html().replace(del , "$2" );
    var searchText = $('.HLInput').val();
	var regEx = new RegExp("("+searchText+")(?![^<]*>|[<>]*<\/^)", "mig");
	if (searchText != '') { 
	  var newText = blockText.replace(regEx , "<b class='hl'>$1</b>");
	  block.html(newText);
	} else {
	block.html(blockText);
	}
  });


  function clear() {
    $('HLInput').val('');
  };

  $(document).mouseup(function(m){ 
    var div = $("#searchInp"); 
    if (!div.is(m.target)) {
     clear();
    }
  });	

});