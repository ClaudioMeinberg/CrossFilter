/****************************************************************************************\
*  Creative Commons - Attribution-NonCommercial-ShareAlike 3.0 Unported (CC BY-NC-SA 3.0)
*  You are free to Share and to Remix Under the following conditions:
*  Attribution  - You must attribute the work in the manner specified by the author or licensor (but not in any way that suggests that they endorse you or your use of the work).
*  Noncommercial — You may not use this work for commercial purposes.
*  Share Alike — If you alter, transform, or build upon this work, you may distribute the resulting work only under the same or similar license to this one.
*  
*  Developed by Claudio Meinberg (@ClaudioMeinberg) and Israel Teixeira (@israelst)
\****************************************************************************************/

var Filtros = function() {
	this.palavras_ignoradas = ['pra', 'para', 'com', 'que', '...']
	this.ignora_palavra = function(palavra) {
		palavra = palavra.toLowerCase()
		this.palavras_ignoradas.push(palavra)
		this.palavras_ignoradas.push('@'+palavra)
		this.palavras_ignoradas.push('#'+palavra)
	}
	this.validar = function(palavra) {
		return palavra.length > 2 && this.palavras_ignoradas.indexOf(palavra.toLowerCase()) == - 1
	}
}

