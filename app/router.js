import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('scoreboard-interface');
  this.route('competition-list-interface');
  this.route('data-entry-interface', {
    path: '/data-entry-interface/competition/:competition_ID'
  }, function () {
    this.route('day', {
      path: '/day/:day_ID'
    });
  });
});

export default Router;
