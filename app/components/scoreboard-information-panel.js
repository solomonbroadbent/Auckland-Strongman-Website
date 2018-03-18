import Component from '@ember/component';

export default Component.extend({
  inEditMode: false,
  notInEditMode: Ember.computed.not('inEditMode'),
  newAthleteName: undefined,
  newAthleteWeight: undefined,
  rows: [],
  actions: {
    toggleEditMode() {
      this.toggleProperty('inEditMode');
    },
    saveNewAthlete() {
      if (this.get('newAthleteName') !== '' && this.get('newAthleteWeight') > 0) {
        const athleteName = this.get('newAthleteName');
        const athleteWeight = this.get('newAthleteWeight');
        /*const newAthlete = this.store.createRecord('athlete', {
          name: athleteName,
          weight: athleteWeight,
        });
        newAthlete.save();*/
        this.get('rows').pushObject({
          athlete: {
            name: athleteName,
            weight: athleteWeight,
          },
          points: undefined,
          position: undefined,
        });
      }
    },
  },
});
