import Component from '@ember/component';
import athlete from "../models/athlete";

export default Component.extend({
  store: Ember.inject.service('store'),
  inEditMode: false,
  notInEditMode: Ember.computed.not('inEditMode'),
  newAthleteName: undefined,
  newAthleteWeight: undefined,
  competition: undefined,
  athletes: Ember.computed('competition', function () {
    return this.get('competition').get('athletes');
  }),
  actions: {
    toggleEditMode() {
      this.toggleProperty('inEditMode');
    },
    async saveNewAthlete() {
      if (this.get('newAthleteName') !== '' && this.get('newAthleteWeight') > 0) {
        let competition = this.get('competition');
        const newAthlete = this.get('store').createRecord('athlete', {
          name: this.get('newAthleteName'),
          weight: this.get('newAthleteWeight'),
          competition: competition,
        });
        competition.get('athletes').addObject(newAthlete);
        newAthlete.save().then(competition.save());
        // Add athlete to all records
        let store = await this.get('store');
        store.findAll('event').then(events => events.forEach(async event => {
            // TODO: Refactor this 'find athlete record on event' onto the event object
            let shouldAddARecordForAthlete = true;
            await event.get('records').forEach(async record => {
              let recordAthlete = await record.get('athlete');
              if (recordAthlete.id === newAthlete.id) shouldAddARecordForAthlete = false;
            });
            if (shouldAddARecordForAthlete) {
              let primaryResult = await store.createRecord('result', {
                value: 0,
                unit: 'kilograms',
                result: null,
              });
              await primaryResult.save();

              let secondaryResult = await store.createRecord('result', {
                value: 0,
                unit: 'seconds',
                result: null,
              });
              await secondaryResult.save();

              let record = store.createRecord('record', {
                athlete: newAthlete,
                points: 0,
                event: event,
                primaryResult: primaryResult,
                secondaryResult: secondaryResult,
              });
              record.save();
              // The record must be added to the events records before the event can be saved
              await event.get('records').then(records => records.addObject(record));
              await event.save();
            }
          })
        );
      }
    },
  },
});
