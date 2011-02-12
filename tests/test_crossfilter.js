module('Crossfilter', {
	setup: function() {
		crossfilter = new Crossfilter()
		crossfilter.url_base = "http://search.twitter.com/search.json"
		crossfilter.quantidade_de_twits = 50
		crossfilter.quantidade_de_palavras_mais_frequentes = 4
		crossfilter.palavra_buscada = '#cpbr4'
	}
})

mock_twit = {
	"from_user_id_str": "0",
	"profile_image_url": "url_da_foto",
	"created_at": "Sun, 23 Jan 2011 02:31:27 +0000",
	"from_user": "user_name",
	"id_str": "0",
	"metadata": {
		"result_type": "recent"
	},
	"to_user_id": null,
	"text": "texto texto texto texto twit twit twit palavra palavra repetida #cpbr4 #cpbr4 #cpbr4",
	"id": 000,
	"from_user_id": 000,
	"geo": null,
	"iso_language_code": "en",
	"to_user_id_str": null,
	"source": "&lt;a href=&quot;http://twitter.com/&quot;&gt;web&lt;/a&gt;"
}

function mock_getJSON(url, callback) {
	callback({
		"results": [mock_twit]
	})
}

test('deve retornar url baseada nas propriedades de configuração', function() {
	equals(crossfilter.url(), "http://search.twitter.com/search.json?q=%23cpbr4&result_type=recent&callback=?&rpp=50")
})

/*
test('deve ignorar a palavra buscada', function() {
        crossfilter.controller
        }
*/

test('deve buscar twits com a palavra "#cpbr4"', function() {
	mock_getJSON(crossfilter.url(), function(resposta) {
		crossfilter.controller(resposta)
	})
	same(crossfilter.resultado, {
		twits: [mock_twit],
		palavras_mais_frequentes: ["texto", "twit", "palavra", "repetida"]
	})
})

