import Controller from '@ember/controller';

export default Controller.extend({
  inEditMode: false,
  notInEditMode: Ember.computed.not('inEditMode'),
  newCompetitionName: 'default name',
  competitions: [{name: 'competition A', startDate: '15/11/1998', endDate: '18/03/2018'}, {
    name: 'competition B',
    startDate: "15/11/1998",
    endDate: '564564'
  }],
  actions: {
    toggleEditMode() {
      this.toggleProperty('inEditMode');
    },
    addNewCompetition() {
      this.store.createRecord('competition', {
        name: this.get('newCompetitionName'),
        refereeName: 'referee name',
        scorerName: 'scorer name',
        days: [],
        athletes: [],
        startDate: '1',
        endDate: '1',
      }).save();
    }
  }
});
