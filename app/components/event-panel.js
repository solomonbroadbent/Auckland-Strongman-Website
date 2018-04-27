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
    async delete() {
      let event = await this.get('event');
      await event.get('day').then(day => {
        day.get('events').then(events => events.removeObject(event));
        day.save();
      });
      // TODO: Refactor this to be more object oriented
      event.get('records').then(records => records.forEach(record => {
        record.get('primaryResult').then(primaryResult => primaryResult.destroyRecord());
        record.get('secondaryResult').then(secondaryResult => secondaryResult.destroyRecord());
        record.destroyRecord();
      }));
      event.destroyRecord();
    }
  },
});
