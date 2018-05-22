import Controller from '@ember/controller';
import Ember from 'ember';

export default Controller.extend({
  session: Ember.inject.service(),
  // TODO: Check this updated correctly
  /*isLogged: Ember.computed('model', function () {
    return this.get('model');
    // return true
  })*/
  emailAddress: undefined,
  password: undefined,
  areButtonsDisabled: false,
  isLoggedIn: Ember.computed('model', function () {
    return this.get('model');
  }),
});
