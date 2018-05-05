import Component from '@ember/component';
import result from "../models/result";

export default Component.extend({
  store: Ember.inject.service('store'),
  inEditMode: false,
  notInEditMode: Ember.computed.not('inEditMode'),
  inDataEntryMode: false,
  notInDataEntryMode: Ember.computed.not('inDataEntryMode'),
  event: undefined,
  eventType: Ember.observer('event', (event) => event.type),
  isSplitEvent: Ember.computed('eventType', function () {
    return this.get('eventType') === 'Split';
  }),
  eventPrimaryUnit: Ember.computed('eventType', function () {
    switch (this.get('eventType')) {
      case 'Split':
        return 'Repetitions';
      case 'Most Repetitions':
        return 'Repetitions';
      case 'Most Weight':
        return 'Kilograms';
      case 'Furthest Distance':
        return 'Centimeters';
      case 'Least Time':
        return 'Seconds';
      case 'Most Time':
        return 'Seconds';
    }
  }),
  // Model properties
  eventName: undefined,
  actions: {
    toggleEditMode() {
      this.toggleProperty('inEditMode');
    },
    toggleDataEntryMode() {
      this.toggleProperty('inDataEntryMode');
      this.send('save');
    },
    save() {
      // TODO: Change to the style seen in competition-list-interface-row for saving the name
      this.get('event').set('name', this.get('eventName'));
      this.get('event').save();
    },
    async delete() {
      let event = await this.get('event');
      await event.get('day').then(day => {
        day.get('events').then(events => events.removeObject(event));
        day.save();
      });
      // TODO: Refactor this to be more object oriented
      event.get('records').then(records => records.forEach(record => {
        record.get('primaryResult').then(primaryResult => primaryResult.destroyRecord());
        record.get('secondaryResult').then(secondaryResult => secondaryResult.destroyRecord());
        record.destroyRecord();
      }));
      event.destroyRecord();
    },
    async updateScores() {
      let store = this.get('store');
      let event = this.get('event');
      await event.get('records').then(records => {
        let uniqueScoresToRecordIdSets = new Map();
        // Creating the map
        records.forEach(record => {
          const athlete = record.get('athlete');
          const primaryResult = record.get('primaryResult');
          const primaryResultId = primaryResult.id;
          const primaryResultValue = primaryResult.get('value');
          let subSet = uniqueScoresToRecordIdSets.get(primaryResultValue);
          if (subSet !== undefined && subSet.size > 0) {
            subSet.add(record.id);
            uniqueScoresToRecordIdSets.set(primaryResultValue, subSet);
          }
          else uniqueScoresToRecordIdSets.set(primaryResultValue, new Set([record.id]));
        });
        // Ordering the map with largest values first
        uniqueScoresToRecordIdSets = new Map(Array.from(uniqueScoresToRecordIdSets).sort((a, b) => {
          return b[0] - a[0];
        }));
        // Finding the total available points
        let availablePoints = 0;
        Array.from(uniqueScoresToRecordIdSets.values()).forEach(subSet => availablePoints += subSet.size);
        // Setting the correct points for each record, accounting for draws
        for (let recordIdSet of uniqueScoresToRecordIdSets) {
          const recordIds = recordIdSet[1];
          const amountOfRecord = recordIds.size;
          let points = availablePoints / amountOfRecord;
          availablePoints -= amountOfRecord;
          recordIds.forEach(async recordId => {
            let record = await store.findRecord('record', recordId);
            await record.set('points', points);
            await record.save();
          });
        }
      });
    }
  },
});
