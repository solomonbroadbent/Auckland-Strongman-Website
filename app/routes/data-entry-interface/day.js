import Route from '@ember/routing/route';

export default Route.extend({
  /*async model(params) {
    let competition = await this.store.findRecord('competition', params.competition_ID);
    let days = await competition.get('days');
    let day = await days.findRecord('day', params.day_ID);
    return day;
  }*/
});
