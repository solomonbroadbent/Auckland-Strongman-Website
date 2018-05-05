import Component from '@ember/component';

export default Component.extend({
  selectedEventTypeTagName: 'mostWeight',
  eventName: 'New Event Name',
  // events: [],
  eventTypes: [
    {tagName: 'mostWeight', name: 'Most Weight', shortUnits: 'kG', longUnits: 'Kilograms'},
    {tagName: 'furthestDistance', name: 'Furthest Distance', shortUnits: 'cM', longUnits: 'Centimeters'},
    {tagName: 'mostTime', name: 'Most Time', shortUnits: 'S', longUnits: 'Seconds'},
    {tagName: 'leastTime', name: 'Least Time', shortUnits: 'S', longUnits: 'Seconds'},
    {tagName: 'split', name: 'Split', shortUnits: 'R', longUnits: 'Repetitions', shortSecondaryUnits: 'S', longSecondaryUnits: 'Seconds'},
    {tagName: 'mostRepetitions', name: 'Most Repetitions', shortUnits: 'R', longUnits: 'Repetitions'},
  ],
  selectedEvent: Ember.computed('selectedEventTypeTagName', function () {
    return this.get('eventTypes').filter((event) => {
      if (event.tagName === (this.get('selectedEventTypeTagName'))) return event;
    })[0];
  }),
  selectedEventName: Ember.computed('selectedEvent', function () {
    return this.get('selectedEvent').name;
  }),
  selectedEventTypeTagNameIsValid: Ember.computed('selectedEventTypeTagName', function () {
    let eventTypes = this.get('eventTypes');
    //TODO: Refactor this with better stream techniques
    let matchingEventType = eventTypes.filter(event => event.tagName === this.get('selectedEventTypeTagName')).map(e => e.tagName);
    return matchingEventType !== undefined;
  }),
  newEventIsReady: Ember.computed('eventName', 'selectedEventTypeTagName', function () {
    let newEventName = this.get('selectedEventName');
    return (newEventName !== null) && (newEventName !== undefined);
  }),

  day: undefined,
  store: Ember.inject.service('store'),
  actions: {
    setSelectedEventType(eventTagName) {
      //TODO: Find a way to implement this with just a function instead of a computed property
      //The event needs to be set first as the selectedEventTypeTagNameIsValid relies on the field being set
      this.set('selectedEventTypeTagName', eventTagName);
      // if (this.get('selectedEventTypeTagNameIsValid') === true) this.set('selectedEventTypeTagName', eventTagName);
    },
    async addNewEvent() {
      // if (this.get('newEventIsReady') === true) {
      let type = await this.get('selectedEventName');
      let eventUnitsObject = await this.get('eventTypes').filter(e => e.name === type)[0];
      let day = await this.get('day');
      let newEvent = await this.get('store').createRecord('event', {
        name: await this.get('eventName'),
        type: await this.get('selectedEventName'),
        day: await day,
        longPrimaryUnitName: await eventUnitsObject.longUnits,
        shortPrimaryUnitName: await eventUnitsObject.shortUnits,
        longSecondaryUnitName: await eventUnitsObject.longSecondaryUnits,
        shortSecondaryUnitName: await eventUnitsObject.shortSecondaryUnits,
        splitRepetitionsTarget: 0,
      });
      let athletes = await day.get('competition').then(competition => {
        return competition.get('athletes');
      });
      // Adding every athlete to the event with empty records
      await athletes.forEach(async athlete => {
        let store = await this.get('store');
        let record = await store.createRecord('record', {
          athlete: athlete,
          points: 0,
          event: newEvent,
        });
        let primaryResult = await store.createRecord('result', {
          value: 0,
          record: record,
          unit: eventUnitsObject.shortPrimaryUnitName,
        });
        let secondaryResult = await store.createRecord('result', {
          value: 0,
          record: record,
          unit: eventUnitsObject.shortSecondaryUnitName,
        });
        await record.set('primaryResult', primaryResult);
        await record.set('secondaryResult', secondaryResult);
        await newEvent.get('records').then(records => records.addObject(record));
        record.save();
        primaryResult.save();
        secondaryResult.save();
      });
      let events = await day.get('events');
      await events.addObject(newEvent);
      await newEvent.save().then(day.save());
      // }
    }
  },
});
