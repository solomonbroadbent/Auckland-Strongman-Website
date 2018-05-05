import Component from '@ember/component';

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
      // alert(event.id);
      await event.get('records').then(async records => {
        let array = await new Array();
        let map = new Map();
        // alert(array);
        // alert(map);
        let index = 0;
        records.forEach(async record => {
          // alert(record.id);
          const athlete = await record.get('athlete');
          // alert(athlete.id);
          const primaryResult = await record.get('primaryResult');
          const primaryResultId = primaryResult.id;
          // alert(primaryResultId);
          const primaryResultValue = await primaryResult.get('value');
          // alert(primaryResultValue);
          array[index++] = {
            key: record.id,
            value: Number(primaryResultValue),
          };
          // TODO: This should be moved outside
          await array.sort((a, b) => {
            return b.value - a.value;
          });
          // For ... of needs to be used instead of forEach as per: https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop
          // TODO: This desperately needs to be moved outside as it is getting fired n times!
          let availablePoints = await array.length;
          for (let item of array) {
            let record = await store.findRecord('record', item.key);
            // then() must be used as the availablePoints need to be updated every time
            await record.set('points', availablePoints);
            await availablePoints--;
            await record.save();
          }
        });
      });
    }
  },
});
