/****************************************************************************************\
*  Creative Commons - Attribution-NonCommercial-ShareAlike 3.0 Unported (CC BY-NC-SA 3.0)
*  You are free to Share and to Remix Under the following conditions:
*  Attribution  - You must attribute the work in the manner specified by the author or licensor (but not in any way that suggests that they endorse you or your use of the work).
*  Noncommercial — You may not use this work for commercial purposes.
*  Share Alike — If you alter, transform, or build upon this work, you may distribute the resulting work only under the same or similar license to this one.
*  
*  Developed by Claudio Meinberg (@ClaudioMeinberg) and Israel Teixeira (@israelst)
\****************************************************************************************/

$(document).ready(function() {
	hideResultFields()
	hideLoadingScreen()

	$('#formSearch').bind('submit', function() {
                if ($("#busca").val() != "") {
		    setNewSearch()
		    doYourThing()
                }
		
		return false
	})
})


function doYourThing(){
		showLoadingScreen()

		var crossfilter = new Crossfilter()
		crossfilter.url_base = "http://search.twitter.com/search.json"
		crossfilter.quantidade_de_twits = 50
		crossfilter.quantidade_de_palavras_mais_frequentes = 4
		crossfilter.palavra_buscada = $('#q').val()

		$.getJSON(crossfilter.url(), function(resposta) {
			crossfilter.controller(resposta)

			clearResults()	
			
			$(crossfilter.resultado.twits).each(function(indice, twit) {
				$('#result').append('<p class="tweet-row"><div class="tweet-content"><span id="tweet-publisher"><a href="http://twitter.com/'+ twit.from_user +'">' + twit.from_user + '</a></span><br /> <span id="class">' +twit.text + '</span><br /><span class="tweet-timestamp">'+twit.created_at+'</span></div></p>');
			})
			
			$('#result').append('<p><br /></p>');
			
			if(crossfilter.resultado.palavras_mais_frequentes[0] != undefined)
				$("#block1").html('<br /><a href="#" onclick="addFilter(1);">'+crossfilter.resultado.palavras_mais_frequentes[0]+'</a>');
			if(crossfilter.resultado.palavras_mais_frequentes[1] != undefined)
				$("#block2").html('<br /><a href="#" onclick="addFilter(2);">'+crossfilter.resultado.palavras_mais_frequentes[1]+'</a>');
			if(crossfilter.resultado.palavras_mais_frequentes[2] != undefined)
				$("#block3").html('<br /><a href="#" onclick="addFilter(3);">'+crossfilter.resultado.palavras_mais_frequentes[2]+'</a>');
			if(crossfilter.resultado.palavras_mais_frequentes[3] != undefined)
				$("#block4").html('<br /><a href="#" onclick="addFilter(4);">'+crossfilter.resultado.palavras_mais_frequentes[3]+'</a>');

			showResultFields()
			hideLoadingScreen()
		})
}

function setNewSearch(){
	$("#q").val($("#busca").val())
}
function addFilter(code){
	for(i=1; i<=4; i++){
		if(code != i) {
			// $('#q').val($('#q').val() + ' -' + $("#block"+i+" a").html())
		} else {
			$('#q').val($('#q').val() + ' ' + $("#block"+i+" a").html())
		}
	}
	doYourThing()
}
function showLoadingScreen(){
	$(".loadingScreen").show()
}
function hideLoadingScreen(){
	$(".loadingScreen").hide()
}
function showResultFields(){
	$(".resultFields").show()
}
function hideResultFields(){
	$(".resultFields").hide()
}
function clearResults(){
	$('.resultDataFields').html('')
}