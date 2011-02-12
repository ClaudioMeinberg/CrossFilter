/****************************************************************************************\
*  Creative Commons - Attribution-NonCommercial-ShareAlike 3.0 Unported (CC BY-NC-SA 3.0)
*  You are free to Share and to Remix Under the following conditions:
*  Attribution  - You must attribute the work in the manner specified by the author or licensor (but not in any way that suggests that they endorse you or your use of the work).
*  Noncommercial — You may not use this work for commercial purposes.
*  Share Alike — If you alter, transform, or build upon this work, you may distribute the resulting work only under the same or similar license to this one.
*
*  Developed by Claudio Meinberg (@ClaudioMeinberg) and Israel Teixeira (@israelst)
\****************************************************************************************/

var Palavras = function(palavras) {
	var lista_de_palavras = {}
	var filtro = filtro
	this.incluir = function(palavra) {
		lista_de_palavras[palavra] == undefined ? lista_de_palavras[palavra] = 1: lista_de_palavras[palavra]++;
	}

	this.listar = function() {
		return lista_de_palavras
	}

	this.mais_frequentes = function(numero_de_ocorrencias) {
		var palavras = []
		for (palavra in lista_de_palavras) {
			palavras.push(palavra)
		}
		palavras.sort(function(a, b) {
			return lista_de_palavras[b] - lista_de_palavras[a]
		})
		return palavras.slice(0, numero_de_ocorrencias)
	}

	var palavras = palavras || []
	for (; palavra = palavras.shift();) {
		this.incluir(palavra)
	}

}

