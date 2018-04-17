import Route from '@ember/routing/route';

export default Route.extend({
  async model(params) {
    let day = await this.store.findRecord('day', params.day_ID);
    // let competition = await this.store.findRecord('competition', params.competition_ID);
    return {
      day: day,
      // competition: competition,
    }
  }
});
