/****************************************************************************************\
*  Creative Commons - Attribution-NonCommercial-ShareAlike 3.0 Unported (CC BY-NC-SA 3.0)
*  You are free to Share and to Remix Under the following conditions:
*  Attribution  - You must attribute the work in the manner specified by the author or licensor (but not in any way that suggests that they endorse you or your use of the work).
*  Noncommercial — You may not use this work for commercial purposes.
*  Share Alike — If you alter, transform, or build upon this work, you may distribute the resulting work only under the same or similar license to this one.
*  
*  Developed by Claudio Meinberg (@ClaudioMeinberg) and Israel Teixeira (@israelst)
\****************************************************************************************/

Crossfilter = function() {
	this.resultado = {}
	this.palavra_buscada = ''
	this.quantidade_de_twits = 50
	this.quantidade_de_palavras_mais_frequentes = 4

	this.url = function() {
		return this.url_base + '?q=' + escape(this.palavra_buscada) + '&result_type=recent&callback=?&rpp=' + this.quantidade_de_twits
	}
	this.controller = function(resposta) {
		var filtros = new Filtros()
		this.palavra_buscada.split(" ").forEach(function(palavra_ignorada, indice) {
			filtros.ignora_palavra(palavra_ignorada)
		})
		var palavras = []
		resposta.results.forEach(function(twit, indice) {
			palavras = palavras.concat(twit.text.split(" ").filter(function(palavra) {
				return filtros.validar(palavra)
			}))
		})
		palavras = new Palavras(palavras)

		this.resultado = {
			twits: resposta['results'],
			palavras_mais_frequentes: palavras.mais_frequentes(this.quantidade_de_palavras_mais_frequentes)
		}
	}
}

