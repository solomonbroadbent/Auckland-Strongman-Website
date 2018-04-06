import Route from '@ember/routing/route';

export default Route.extend({
  // Marking the model function as asynchronous allows finding the nested records to be done using the await keyword
  //  which avoids many nested callbacks
  async model(params) {
    let competition = await this.store.findRecord('competition', params.competition_ID);
    let days = await competition.get('days');
    return {
      competition: competition,
      days: days,
    }
  }
});
