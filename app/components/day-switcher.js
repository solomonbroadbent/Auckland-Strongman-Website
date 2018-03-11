import Component from '@ember/component';

export default Component.extend({
  days: [{number: 1}],
  nextNumber: 1,
  actions: {
    addNewDay() {
      this.incrementProperty('nextNumber');
      this.get('days').pushObject({number: this.get('nextNumber')});
    },
  },
});
