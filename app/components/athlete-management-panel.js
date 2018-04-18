import Component from '@ember/component';

export default Component.extend({
  store: Ember.inject.service('store'),
  inEditMode: false,
  notInEditMode: Ember.computed.not('inEditMode'),
  newAthleteName: undefined,
  newAthleteWeight: undefined,
  competition: undefined,
  athletes: Ember.computed('competition', function() {
    return this.get('competition').get('athletes');
  }),
  actions: {
    toggleEditMode() {
      this.toggleProperty('inEditMode');
    },
    saveNewAthlete() {
      if (this.get('newAthleteName') !== '' && this.get('newAthleteWeight') > 0) {
        let competition = this.get('competition');
        const newAthlete = this.get('store').createRecord('athlete', {
          name: this.get('newAthleteName'),
          weight: this.get('newAthleteWeight'),
          competition: competition,
        });
        competition.get('athletes').addObject(newAthlete);
        newAthlete.save().then(competition.save());
      }
    },
    toggleEditMode() {
      this.toggleProperty('inEditMode');
    }
  },
});
