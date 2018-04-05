import Component from '@ember/component';

export default Component.extend({
  // TODO: Refactor so that store injection isn't needed
  store: Ember.inject.service('store'),
  /*days: Ember.computed('competition' ,function() {
    return this.get('store').find('competition', this.get('competition').id).then((competition) => competition.days);
  }),*/
  nextNumber: 1,
  competition: undefined,
  actions: {
    addNewDay() {
      // this.get('days').then((days) => console.log(days));
      /*this.get('days').then(function (a) {
        console.log(a.days);
      });*/
      let day = this.get('store').createRecord('day', {
        date: '15/11/1998',
        competition: this.get('competition'),
        number: this.get('nextNumber')
      });
      day.save().then(function (day) {
        this.get('competition').days.pushObject(day).then(function () {
          this.get('competition').save();
        });
      });
      // this.get('competition').pushObject(newDay);
      // this.get('days').pushObject({number: this.get('nextNumber')});
      this.incrementProperty('nextNumber');
    },
  },
});
