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
      // await day.save();
      await competition.save();

      let event = await this.store.createRecord('event', {
        name: 'event 1',
        type: 'split',
        day: day,
      });
      await event.save();
      await day.get('events').addObject(event);
      await day.save();

      let athlete = await this.store.createRecord('athlete', {
        name: 'athlete 1',
        weight: 100,
        competition: competition,
      });
      await athlete.save();
      await competition.get('athletes').addObject(athlete);

      let primaryResult = await this.store.createRecord('result', {
        value: 10,
        unit: 'kilograms',
        result: null,
      });
      await primaryResult.save();

      let secondaryResult = await this.store.createRecord('result', {
        value: 20,
        unit: 'seconds',
        result: null,
      });
      await secondaryResult.save();

      let record = await this.store.createRecord('record', {
        points: 1,
        athlete: athlete,
        primaryResult: await primaryResult,
        secondaryResult: await secondaryResult,
        event: event,
      });
      await record.save();
      await primaryResult.set('record', record);
      await primaryResult.save();
      await secondaryResult.set('record', record);
      await secondaryResult.save();
      await event.get('records').addObject(record);
      await event.save();

      await competition.save();
    },
  }
});
