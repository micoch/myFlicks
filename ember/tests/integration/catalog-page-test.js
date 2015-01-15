import Ember from 'ember';
import startApp from 'my-flicks/tests/helpers/start-app';
import Pretender from 'pretender';
var App, server;

module('Integration - Catalog Page', {
	setup: function(){
		App = startApp();
		
		var movies = [
			{ id: 1, title: 'Top Gun', director: 'Tony Scott', rating: 'R' },
			{ id: 2, title: 'Aliens', director: 'Ridley Scott', rating: 'R' },
			{ id: 3, title: 'The Departed', director: 'Martin Scorsese', rating: 'R' }
		];

		server = new Pretender(function(){
			this.get('http://localhost:3000/api/v1/movies', function(request){
				return [200, {"Content-Type": "application/json"}, JSON.stringify({movies: movies})];
			});

			this.get('/api/v1/movies/:id', function(request){
				var movie = movies.find(function(movie){
					if(movie.id === parseInt(request.params.id)){
						return movie;
					}
				});

				return [200, {"Content-Type": "application/json"}, JSON.stringify({movie: movie})];
			});
		});
	},

	teardown: function(){
		Ember.run(App, 'destroy');
		server.shutdown();
	}
});

test('Should navigate to catalog page', function(){
	visit('/').then(function(){
		click('a:contains("Catalog")').then(function(){
			equal(find('h2').text(), 'Your Catalog');
		});
	});
});

test('Should list all movies', function(){
	visit('/movies').then(function(){
			equal(find('div.panel-header:contains("Top Gun")').length, 1);
			equal(find('div.panel-header:contains("Aliens")').length, 1);
			equal(find('div.panel-header:contains("The Departed")').length, 1);
	});
});
