import Route from '@ember/routing/route';

export default Route.extend({
  // TODO: Check the correct way to return multiple values from a model function 06/04/2018
  model(params) {
    let competition = this.store.findRecord('competition', params.competition_ID);
    // TODO: Fix the ISSUE HERE where the days aren't being returned for some reason 06/04/2018
    let days = competition.get('days');
    return {
      competition: competition,
      days: days,
    }
  }
});
