import Ember from 'ember';

export default Ember.Route.extend({	
	model: function(){
		return this.store.push('movie', {
			title: this.get('title'),
			director: this.get('director'),
			rating: this.get('rating')
		});
	}

});
