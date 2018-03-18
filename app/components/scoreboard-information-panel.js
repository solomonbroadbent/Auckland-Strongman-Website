import Component from '@ember/component';

export default Component.extend({
  inEditMode: false,
  notInEditMode: Ember.computed.not('inEditMode'),
  newAthleteName: 'a',
  newAthleteWeight: 0,
  rows: [{athlete: {name: 'a', weight: 0}, points: 0, position: '1st'}, {athlete: {name: 'a', weight: 0}, points: 0, position: '1st'}],
  actions: {
    toggleEditMode() {
      this.toggleProperty('inEditMode');
    },
    saveNewAthlete() {
      if (this.get('newAthleteName') !== '' && this.get('newAthleteWeight') > 0) {
        const athleteName = this.get('newAthleteName');
        const athleteWeight = this.get('newAthleteWeight');
        const newAthlete = this.store.createRecord('athlete', {
          name: athleteName,
          weight: athleteWeight,
        });
        newAthlete.save();
      }
    },
  },
});
