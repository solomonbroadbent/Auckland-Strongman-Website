import Component from '@ember/component';

export default Component.extend({
  // TODO: Refactor so that store injection isn't needed
  store: Ember.inject.service('store'),
  days: Ember.computed('competition' ,function() {
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
    },
    deleteDay(day) {
      console.log(day);
      day.destroyRecord();
    },
  },
});
