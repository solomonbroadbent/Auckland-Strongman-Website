import Component from '@ember/component';

export default Component.extend({
  store: Ember.inject.service('store'),
  tagName: '',
  inEditMode: false,
  notInEditMode: Ember.computed.not('inEditMode'),
  competitionStartDate: undefined,
  competitionEndDate: undefined,
  competitionName: undefined,
  competitionID: undefined,
  // TODO: Decide if this is necessary for working with store
  storeReference: undefined,
  actions: {
    toggleEditMode() {
      this.toggleProperty('inEditMode');
    },
    delete() {
      // TODO: Figure out how to avoid root.deleted.inFlight error
      // TODO: Find the difference between destroyRecord3, destroy, deleteRecord, and delete functions
      let competition = this.get('storeReference');
      competition.get('days').then(days => days.forEach(day => {
        day.get('events').then(events => events.forEach(event => {
          event.get('records').then(record => {
            record.get('primaryResult').then(primaryResult => primaryResult.destroyRecord());
            record.get('secondaryResult').then(secondaryResult => secondaryResult.destroyRecord());
            event.destroyRecord();
          });
          event.destroyRecord();
        }));
        day.destroyRecord();
      }));
      competition.get('athletes').forEach(athlete => athlete.destroyRecord());
      competition.destroyRecord();
    },
    saveCompetitionName() {
      // TODO: Check if the performance improves if checking if the reference isDirty first
      this.get('storeReference').save();
    }
  }
});
