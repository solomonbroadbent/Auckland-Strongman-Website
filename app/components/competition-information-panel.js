import Component from '@ember/component';

export default Component.extend({
  inEditMode: false,
  notInEditMode: Ember.computed.not('inEditMode'),
  actions: {
    toggleEditMode() {
      this.toggleProperty('inEditMode');
    },
  },
});
