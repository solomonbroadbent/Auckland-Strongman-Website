import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  beforeModel: function () {
    return this.get('session').fetch().catch(function () {
    });
  },
  actions: {
    signIn: function () {
      debugger;
      this.get('session').open('firebase', {
        provider: 'password',
        email: 'a@a.com',
        password: '123456'
      }).then(function (data) {
        console.log(data.currentUser);
      });
    },
    signOut: function () {
      this.get('session').close();
    }
  }
});
