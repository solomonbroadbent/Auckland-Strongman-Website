import Component from '@ember/component';

export default Component.extend({
  // TODO: Refactor so that store injection isn't needed
  store: Ember.inject.service('store'),
  days: Ember.computed('competition', function () {
    // return this.get('store').find('competition', this.get('competition').id).then((competition) => competition.days);
    return this.get('competition').get('days');
  }),
  nextNumber: 0,
  competition: undefined,
  actions: {
    addNewDay() {
      let day = this.get('store').createRecord('day', {
        date: '15/11/1998',
        competition: this.get('competition'),
        // Increment property increments the nextNumber and returns it in a prefix style manner
        number: this.incrementProperty('nextNumber'),
      });
      let competition = this.get('competition');
      competition.get('days').addObject(day);
      day.save().then(competition.save());

      /*let day = await this.get('store').createRecord('day', {
          date: '15/11/1998',
          competition: await this.get('competition'),
        // Increment property increments the nextNumber and returns it in a prefix style manner
        number: await this.incrementProperty('nextNumber'),
      });
      let competition = await this.get('competition');

      console.log(await day);
      console.log(await competition);

      await competition.get('days').addObject(day);
      await day.save().then(competition.save());*/
    },
    deleteDay(day) {
      day.get('competition').then(competition => {
        competition.get('days').removeObject(day);
        day.get('events').then(events => events.forEach(event => {
          event.get('records').then(records => records.forEach(record => {
            record.get('primaryResult').then(primaryResult => primaryResult.destroyRecord());
            record.get('secondaryResult').then(secondaryResult => secondaryResult.destroyRecord());
            record.destroyRecord();
          }));
          event.destroyRecord();
        }));
        competition.save();
      });
      day.destroyRecord();
    },

  },
});
