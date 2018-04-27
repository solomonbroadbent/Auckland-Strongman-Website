import Component from '@ember/component';

export default Component.extend({
  store: Ember.inject.service('store'),
  tagName: '',
  inEditMode: false,
  notInEditMode: Ember.computed.not('inEditMode'),
  athlete: undefined,
  athleteName: undefined,
  athleteWeight: undefined,
  actions: {
    async deleteAthlete() {
      let athlete = await this.get('athlete');
      let competition = await athlete.get('competition').then((competition) => {
        return this.get('store').findRecord('competition', competition.id);
      });
      // Delete all records for the athlete
      let records = await this.get('store').findAll('record');
      await records.forEach(async record => {
        let recordAthlete = await record.get('athlete');
        if (recordAthlete == null) debugger;
        if (recordAthlete.id === athlete.id) {
          record.get('event').then(event => {
            event.get('records').then(records => records.removeObject(record));
            event.save();
          });
          record.destroyRecord();
          record.save();
        }
      });
      // Now the athlete can be deleted from the competition and from the database
      await competition.get('athletes').removeObject(athlete);
      await athlete.destroyRecord();
      athlete.save();
      competition.save();
    },
    saveAthlete() {
      let athlete = this.get('athlete');
      athlete.set('name', this.get('athleteName'));
      athlete.set('weight', this.get('athleteWeight'));
      athlete.save();
    }
  }
});
