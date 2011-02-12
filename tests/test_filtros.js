module('Filtro', {
	setup: function() {
		filtros = new Filtros()
	}
})

test('deve descartar palavras com 2 ou menos caracteres', function() {
	ok(!filtros.validar('em'))
})

test('deve descartar palavras irrelevantes', function() {
	ok(!filtros.validar('para'))
})

test('deve ser possível incluir uma nova palavra irrelevante', function() {
	ok(filtros.validar('novaPalavraIrrelevante'))
	filtros.ignorar_palavra('novaPalavraIrrelevante')
	ok(!filtros.validar('novaPalavraIrrelevante'))
	ok(!filtros.validar('@novaPalavraIrrelevante'), 'usuário derivado da palavra')
	ok(!filtros.validar('#novaPalavraIrrelevante'), 'hashtag derivada da palavra')
})

