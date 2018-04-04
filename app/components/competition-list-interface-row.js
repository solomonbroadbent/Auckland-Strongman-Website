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
    sendUserToCompetition() {
      alert(`sending user to edit competition: ${this.get('competitionID')}`)
    },
    delete() {
      // TODO: Figure out how to avoid root.deleted.inFlight error
      // TODO: Find the difference between destroyRecord3, destroy, deleteRecord, and delete functions
      this.get('storeReference').destroyRecord();
    },
    saveCompetitionName() {
      // TODO: Check if the performance improves if checking if the reference isDirty first
      this.get('storeReference').save();
    }
  }
});
