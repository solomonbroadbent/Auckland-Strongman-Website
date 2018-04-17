import Component from '@ember/component';

export default Component.extend({
  store: Ember.inject.service('store'),
  inEditMode: false,
  notInEditMode: Ember.computed.not('inEditMode'),
  inDataEntryMode: false,
  notInDataEntryMode: Ember.computed.not('inDataEntryMode'),
  event: undefined,
  // Model properties
  eventName: undefined,
  actions: {
    toggleEditMode() {
      this.toggleProperty('inEditMode');
    },
    toggleDataEntryMode() {
      this.toggleProperty('inDataEntryMode');
      this.send('save');
    },
    save() {
      // TODO: Change to the style seen in competition-list-interface-row for saving the name
      this.get('event').set('name', this.get('eventName'));
      this.get('event').save();
    },
    delete() {
      this.get('event').destroyRecord();
    }
  },
});
