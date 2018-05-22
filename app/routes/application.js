import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  beforeModel: function () {
    if(!this.get('session').get('isAuthenticated')){
      this.transitionTo('login');
    }
  },
});
