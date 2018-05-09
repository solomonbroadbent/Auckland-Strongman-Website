const firebase = require('firebase');
name: 'login';

// http://www.webhook.com/blog/how-we-use-firebases-simple-login-with-ember-to-manage-authentication/
export function initialize(application) {
  // application.inject('route', 'foo', 'service:foo');
  application.deferReadiness();
  let session = Ember.Object.create();
  const config = {
    apiKey: 'AIzaSyA0fM48-OnVVt9A0KAi3X0Jch7sPVkjTGQ',
    authDomain: 'auckland-strongman-website.firebaseapp.com',
    databaseURL: 'https://auckland-strongman-website.firebaseio.com',
    projectId: 'auckland-strongman-website',
    storageBucket: 'auckland-strongman-website.appspot.com',
    messagingSenderId: '533895325095'
  };
  let initializedApplication = firebase.initializeApp(config);
  let auth = new FirebaseSimpleLogin(initializedApplication, function (error, user) {
    application.advanceReadiness();
    /*if (error) {
      Ember.Logger.error(error);
      session.set('error', error);
    }
    else if (user) {
      Ember.Logger.log('Logged in as %@'.fmt(user.uid));
      session.set('user', user);
    }
    else {
      Ember.Logger.log('Not logged in.');
      session.set('user', null);
    }
    Ember.run(application, application.advanceReadiness);*/
  });
  // use to access Simple Login methods ie: route.get(`session.auth`).logout()
  // session.set('auth', auth);
  // application.register('login:session:current', session, {instantiate: false, singleton: true});
  // Add `session` object to route to check user
  // application.inject('route', 'session', 'login:session:current');
  //  Add `session` object to controller to visualize in templates
  // application.inject('controller', 'session', 'login:session:current');
}

export default {
  initialize
};
