import Component from '@ember/component';

export default Component.extend({
  tagName: '',
  inEditMode: false,
  notInEditMode: Ember.computed.not('inEditMode'),
  competitionStartDate: undefined,
  competitionEndDate: undefined,
  competitionName: undefined,
  competitionID: undefined,
  actions: {
    toggleEditMode() {
      this.toggleProperty('inEditMode');
    },
    sendUserToCompetition() {
      alert(`sending user to edit competition: ${this.get('competitionID')}`)
    }
  }
});
