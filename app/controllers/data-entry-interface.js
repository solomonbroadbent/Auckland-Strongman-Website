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

      let event2 = await this.store.createRecord('event', {
        name: 'event 2',
        type: 'split',
        day: day,
      });
      await event2.save();
      await day.get('events').addObject(event2);
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
        value: 1,
        unit: 'seconds',
        result: null,
      });
      await secondaryResult.save();

      let primaryResult2 = await this.store.createRecord('result', {
        value: 20,
        unit: 'kilograms',
        result: null,
      });
      await primaryResult.save();

      let secondaryResult2 = await this.store.createRecord('result', {
        value: 2,
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

      let record2 = await this.store.createRecord('record', {
        points: 2,
        athlete: athlete,
        primaryResult: await primaryResult2,
        secondaryResult: await secondaryResult2,
        event: event2,
      });
      await record2.save();
      await primaryResult2.set('record', record2);
      await primaryResult2.save();
      await secondaryResult2.set('record', record2);
      await secondaryResult2.save();

      await event.get('records').addObject(record);
      await event.save();

      await event2.get('records').addObject(record2);
      await event2.save();

      await competition.save();
    },
  }
});
