import Component from '@ember/component';

export default Component.extend({
  inEditMode: false,
  notInEditMode: Ember.computed.not('inEditMode'),
  inDataEntryMode: false,
  notInDataEntryMode: Ember.computed.not('inDataEntryMode'),
  actions: {
    toggleEditMode() {
      this.toggleProperty('inEditMode');
    },
    toggleDataEntryMode() {
      this.toggleProperty('inDataEntryMode');
    },
  },
});
