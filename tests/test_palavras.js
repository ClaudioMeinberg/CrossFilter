module('Palavras')

test('deve criar palavras ao receber uma lista de strings diferentes', function() {
	var palavras = new Palavras(['twit', '@perfil'])
	same(palavras.listar(), {
		'twit': 1,
		'@perfil': 1
	})
})

test('deve incrementar a frequencia ao adicionar uma palavra que já existe', function() {
	var palavras = new Palavras(['twit', 'twit'])
	same(palavras.listar()['twit'], 2)
})

test('deve retornar a primeira palavra como palavra mais frequente quando só há uma palavra', function() {
	var palavras = new Palavras(['twit'])
	same(palavras.mais_frequentes(1), ['twit'])
})

test('deve retornar a palavra com maior frequencia entre duas', function() {
	palavras = new Palavras(['twit', '@perfil', '@perfil'])
	same(palavras.mais_frequentes(1), ['@perfil'])
})

test('deve retornar as 2 palavra com maior frequencia entre 6', function() {
	palavras = new Palavras(['@perfil', '#hashtag', 'twit', '@perfil', '@perfil', 'twit'])
	same(palavras.mais_frequentes(2), ['@perfil', 'twit'])
})

