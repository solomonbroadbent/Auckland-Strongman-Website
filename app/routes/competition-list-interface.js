import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel: function () {
    // TODO: Check this is actually needed as the same logic is in the application router
    if (!this.get('session').get('isAuthenticated')) {
      this.transitionTo('login');
    }
  },
  model() {
    return this.store.findAll('competition');
  },
  /*actions: {
    openCompetitionForEditing(competitionID) {
      this.transitionTo('data-entry-interface');
    }
  }*/
});
