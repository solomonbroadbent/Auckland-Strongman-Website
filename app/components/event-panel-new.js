import Component from '@ember/component';

export default Component.extend({
  selectedEventTypeTagName: 'mostWeight',
  eventName: 'New Event Name',
  // events: [],
  eventTypes: [
    {tagName: 'mostWeight', name: 'Most Weight',},
    {tagName: 'furthestDistance', name: 'Furthest Distance',},
    {tagName: 'mostTime', name: 'Most Time',},
    {tagName: 'leastTime', name: 'Least Time',},
    {tagName: 'split', name: 'Split',},
    {tagName: 'mostRepetitions', name: 'Most Repetitions'},
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
        let day = await this.get('day');
        let newEvent = await this.get('store').createRecord('event', {
          name: await this.get('eventName'),
          type: await this.get('selectedEventName'),
          day: await day,
        });
        await newEvent.save();
        // FIXME: The  Attempted to register a view with an id already in use: basic-url bug is here in the
        //  addObject function call
        await day.get('events').then((events) => events.addObject(newEvent));
        await day.save();
      }
    // }
  },
});
