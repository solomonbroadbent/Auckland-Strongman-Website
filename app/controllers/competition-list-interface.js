import Controller from '@ember/controller';

export default Controller.extend({
  // TODO: Refactor so that the component doesn't need to know of the store
  store: Ember.inject.service('store'),
  inEditMode: false,
  notInEditMode: Ember.computed.not('inEditMode'),
  newCompetitionName: 'default name',
  // I'm somewhat unsure of how this competitions property works; the solution was found at:
  //  https://discuss.emberjs.com/t/access-store-inside-component/11182/3.
  // Changing items via the FireBase console doesn't seem to sync with app. This may not be an issue however.
  // TODO: Check property updates correctly
  competitions: Ember.computed('', function () {
    return this.get('store').findAll('competition');
  }),
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
      }).save();
    }
  }
});
