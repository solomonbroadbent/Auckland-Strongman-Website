import Controller from '@ember/controller';
import Ember from 'ember';

export default Controller.extend({
  session: Ember.inject.service(),
  emailAddress: undefined,
  password: undefined,
  areButtonsDisabled: Ember.computed('emailAddress', 'password', function () {
    const emailAddress = this.get('emailAddress');
    const password = this.get('password');
    const emailAddressFormatRegularExpression =
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return password === undefined || password.length <= 0 || !emailAddressFormatRegularExpression.test(emailAddress);
  }),
  isLoggedIn: Ember.computed('model', function () {
    return this.get('model');
  }),
});
