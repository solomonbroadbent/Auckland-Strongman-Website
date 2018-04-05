import Component from '@ember/component';

export default Component.extend({
  inEditMode: false,
  notInEditMode: Ember.computed.not('inEditMode'),
  competition: undefined,
  actions: {
    toggleEditMode() {
      this.toggleProperty('inEditMode');
    },
    saveCompetition() {
      this.get('competition').save();
    },
  },
});
