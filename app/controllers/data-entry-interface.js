import Controller from '@ember/controller';

export default Controller.extend({
  store: Ember.inject.service('store'),
  actions: {
    setupDatabase(competition) {
      let day = this.store.createRecord('day', {
        competition: competition,
        number: 123,
      });
      competition.get('days').addObject(day).then();
      day.save().then(competition.save());
      /*let event = this.store.createRecord('event', {
        name: 'event 1',
        type: 'split',
        day: day,
      });*/
      /*let athlete = this.store.createRecord('athlete', {
        name: 'athlete 1',
        weight: 100,
        competition: competition,
      });
      let primaryResult = this.store.createRecord('result', {
        value: 10,
        unit: 'kilograms',
        record: record,
      });
      let secondaryResult = this.store.createRecord('result', {
        value: 20,
        unit: 'seconds',
        record: record,
      });
      let record = this.store.create('record', {
        athlete: athlete,
        primaryResult: primaryResult,
        secondaryResult: secondaryResult,
        points: 1,
        event: event,
      });*/
    }
  }
});
