import Ember from 'ember';

export default Ember.Route.extend({
	model: function(){
		return this.store.createRecord('movie', {
			title: '',
			director: '',
			rating: ''
		});
	},

	actions: {
		addMovie: function(){
			var model = this.controller.get('model');
			model.save();
			this.transitionTo('movies');
		}
	}
});
