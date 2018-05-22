import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  beforeModel: function () {
    return this.get('session').fetch().catch(function () {
    });
  },
  model: function () {
    let session = this.get('session');
    return session.get('isAuthenticated');
  },
  actions: {
    signIn: function (emailAddress, password) {
      let controller = this.controller;
      this.get('session').open('firebase', {
        provider: 'password',
        email: emailAddress,
        password: password,
      }).then(function (data) {
        controller.set('isLoggedIn', true);
        controller.set('areButtonsDisabled', false);
      }).catch((error) => {
        if (error.code === 'auth/wrong-password') controller.set('areButtonsDisabled', false);
        else throw error;
      });
      controller.set('areButtonsDisabled', true);
    },
    signOut: function () {
      this.get('session').close();
      this.controller.set('isLoggedIn', false);
    }
  }
});
