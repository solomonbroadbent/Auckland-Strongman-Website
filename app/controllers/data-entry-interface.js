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

      /*console.log(competition.id);
      console.log(athlete.id);
      console.log(competition);
      console.log(athlete);
      let ath = await this.store.findRecord('athlete', athlete.id);
      console.log(ath);
      debugger;
      let rec = await this.store.findRecord('event', event.id);
      let record = await this.store.createRecord('record', {
        points: 1,
        athlete: athlete,
        primaryResult: null,
        secondaryResult: null,
        event: null,
      });
      await record.save();*/

      /*let primaryResult = await this.store.createRecord('result', {
        value: 10,
        unit: 'kilograms',
        record: record,
      });
      await primaryResult.save();
      /!*await this.store.findRecord('record', primaryResult.get('id')).then(function (record) {
        record.set('primaryResult', primaryResult);
      });*!/

      /!*let secondaryResult = await this.store.createRecord('result', {
        value: 20,
        unit: 'seconds',
        record: record,
      });

      await event.get('records').addObject(record);
      await record.save();
      await secondaryResult.save();
      await record.set('secondaryResult', secondaryResult);
      await record.save();*!/*/
      await event.save();
      await day.save();
      await competition.save();
    }
  }
});
