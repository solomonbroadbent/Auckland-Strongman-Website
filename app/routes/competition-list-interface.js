import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.findAll('competition');
  },
  /*actions: {
    openCompetitionForEditing(competitionID) {
      this.transitionTo('data-entry-interface');
    }
  }*/
});
