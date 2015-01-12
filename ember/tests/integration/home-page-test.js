import Ember from 'ember';
import startApp from 'my-flicks/tests/helpers/start-app';
import Ember from 'ember';

var App;

module('Integration - Home Page', {
	setup: function(){
	  App = startApp();
	},
	teardown: function(){
		Ember.run(App, 'destroy');
	}
});

test('Should welcome users to MyFlix', function(){
	visit('/').then(function(){
		equal(find('h1.title').text(), 'Welcome to MyFlix cloud catalog for Movies.');
	});
});
