import Controller from '@ember/controller';

export default Controller.extend({
  store: Ember.inject.service('store'),
  actions: {
    async setupDatabase(competition) {
      let day = await this.store.createRecord('day', {
        competition: competition,
        number: 123,
      });
      await competition.get('days').addObject(day);
      await day.save();

      let event = await this.store.createRecord('event', {
        name: 'event 1',
        type: 'split',
        day: day,
      });
      await event.save();
      await day.get('events').addObject(event);

      let athlete = await this.store.createRecord('athlete', {
        name: 'athlete 1',
        weight: 100,
        competition: competition,
      });
      await athlete.save();
      await competition.get('athletes').addObject(athlete);

      /*let record = await this.store.create('record', {
        athlete: athlete,
        points: 1,
        event: event,
      });
      await record.save();
      await event.get('records').addObject(record);

      let primaryResult = await this.store.createRecord('result', {
        value: 10,
        unit: 'kilograms',
        record: record,
      });
      await primaryResult.save();
      await record.set('primaryResult', primaryResult);

      let secondaryResult = await this.store.createRecord('result', {
        value: 20,
        unit: 'seconds',
        record: record,
      });
      await secondaryResult.save();
      await record.set('primaryResult', primaryResult);
      await record.save();*/

      await event.save();
      await day.save();
      await competition.save();
    }
  }
});
