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
    updateScores() {
      let store = this.get('store');
      let event = this.get('event');
      const genericUpdateScores = (records, mapCreationFunction, orderingFunction, pointSettingFunction) => {
        const map = mapCreationFunction(records);
        const orderedMap = orderingFunction(map);
        pointSettingFunction(orderedMap);
      };

      const splitPointSettingFunction = (orderedMap) => {
        let availablePoints = 0;
        console.log(orderedMap);
        for (let set of orderedMap) {
          console.log(set);
        }
      };

      const nonSplitPointSettingFunction = (orderedMap) => {
        // Finding the total available points
        let availablePoints = 0;
        Array.from(orderedMap.values()).forEach(subSet => availablePoints += subSet.size);
        // Setting the correct points for each record, accounting for draws
        for (let recordIdSet of orderedMap) {
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
      };

      const nonSplitMapCreationFunction = records => {
        let uniqueScoresToRecordIdSets = new Map();
        records.forEach(record => {
          const primaryResult = record.get('primaryResult');
          const primaryResultValue = primaryResult.get('value');
          let subSet = uniqueScoresToRecordIdSets.get(primaryResultValue);
          if (subSet !== undefined && subSet.size > 0) {
            subSet.add(record.id);
            uniqueScoresToRecordIdSets.set(primaryResultValue, subSet);
          }
          else uniqueScoresToRecordIdSets.set(primaryResultValue, new Set([record.id]));
        });
        return uniqueScoresToRecordIdSets;
      };

      const splitMapCreationFunction = records => {
        let uniqueValuePairsToRecordIdSets = new Map();
        // At this stage, the primary result value is always the repetitions while the secondary result value is
        //  always the seconds
        records.forEach(record => {
          const primaryResult = record.get('primaryResult');
          const primaryResultValue = primaryResult.get('value');
          const secondaryResult = record.get('secondaryResult');
          const secondaryResultValue = secondaryResult.get('value');
          // A key generator is required as objects can't be directly compared as keys easily
          const keyGenerator = (primaryResultValue, secondaryResultValue) => {
            return `{"primaryResultValue": ${primaryResultValue}, "secondaryResultValue": ${secondaryResultValue}}`;
          };
          let recordIdSet = uniqueValuePairsToRecordIdSets.get(keyGenerator(primaryResultValue, secondaryResultValue));
          if (recordIdSet !== undefined && recordIdSet.size > 0) {
            // This is the very unlikely event that two athletes completed the same amount of repetitions in the
            //   exact same amount of time
            recordIdSet.add(record.id);
          }
          else uniqueValuePairsToRecordIdSets.set(keyGenerator(primaryResultValue, secondaryResultValue), new Set([record.id]));
        });
        return uniqueValuePairsToRecordIdSets;
      };

      const splitStyleUpdateScores = records => {
        const splitMapOrderingFunction = unorderedMap => {
          console.log(unorderedMap);
          let orderedMap = new Map(Array.from(unorderedMap).sort((a, b) => {
            let aParse = JSON.parse(a[0]);
            let bParse = JSON.parse(b[0]);
            console.log(a, aParse, b, bParse);
            if (aParse.primaryResultValue === bParse.primaryResultValue) {
              return aParse.secondaryResultValue - bParse.secondaryResultValue;
            }
            else {
              return bParse.primaryResultValue - aParse.primaryResultValue;
            }
          }));
        };
        genericUpdateScores(records, splitMapCreationFunction, splitMapOrderingFunction, splitPointSettingFunction);
      };

      const maximumStyleUpdateScores = records => {
        const maximumOrderingFunction = unorderedMap => {
          return new Map(Array.from(unorderedMap).sort((a, b) => {
            return b[0] - a[0];
          }));
        };
        genericUpdateScores(records, nonSplitMapCreationFunction, maximumOrderingFunction, nonSplitPointSettingFunction);
      };

      const minimumStyleUpdateScores = records => {
        genericUpdateScores(records, nonSplitMapCreationFunction, unorderedMap => {
          return new Map(Array.from(unorderedMap).sort((a, b) => {
            return a[0] - b[0];
          }));
        }, nonSplitPointSettingFunction);
      };

      event.get('records').then(records => {
        const eventType = event.get('type');
        let updatingFunction = maximumStyleUpdateScores;
        if (eventType === 'Split') updatingFunction = splitStyleUpdateScores;
        else if (eventType === 'Least Time') updatingFunction = minimumStyleUpdateScores;
        updatingFunction(records);
        /*let uniqueScoresToRecordIdSets = new Map();
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
        }*/
      });
    },
  },
});
