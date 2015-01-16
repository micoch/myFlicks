import Ember from 'ember';

export default Ember.ObjectController.extend({
	actions: {
		submit: function(){
			var model = this.get('model');
			model.save();
			this.transitionToRoute('movies');
		}
	}

});
