import Component from '@ember/component';

export default Component.extend({
  selectedEventTypeID: 'mostWeight',
  eventName: 'New Event Name',
  events: [],
  eventTypes: [
    {ID: 'mostWeight', name: 'Most Weight',},
    {ID: 'furthestDistance', name: 'Furthest Distance',},
    {ID: 'mostTime', name: 'Most Time',},
    {ID: 'leastTime', name: 'Least Time',},
    {ID: 'split', name: 'Split',},
    {ID: 'mostRepetitions', name: 'Most Repetitions'},
  ],
  selectedEvent: Ember.computed('selectedEventTypeID', function() {
    //TODO: Check if a fail here returns something other than null
    /*let result = this.get('eventTypes').reduce((result, event) => {
      if (event.ID === (this.get('selectedEventTypeID'))) result = event;
    });
    return result;*/
    let eventTypes = this.get('eventTypes');
    let result = null;
    let that = this;
    eventTypes.forEach(function (event) {
      if(event.ID === that.get('selectedEventTypeID')) {
        result = event;
      }
    });
    return result;
  }),
  selectedEventName: Ember.computed('selectedEvent', function() {
    return this.get('selectedEvent').name;
  }),
  selectedEventTypeIDIsValid: Ember.computed('selectedEventTypeID', function () {
    let eventTypes = this.get('eventTypes');
    //TODO: Refactor this with better stream techniques
    let matchingEventType = eventTypes.filter(event => event.ID === this.get('selectedEventTypeID')).map(e => e.ID);
    return matchingEventType !== undefined;
  }),
  newEventIsReady: Ember.computed('eventName', 'selectedEventTypeID', function() {
    let newEventName = this.get('selectedEventName');
    return (newEventName !== null) && (newEventName !== undefined);
  }),
  actions: {
    setSelectedEventType(eventID) {
      //TODO: Find a way to implement this with just a function instead of a computed property
      //The event needs to be set first as the selectedEventTypeIDIsValid relies on the field being set
      alert('new ID: ' + eventID);
      this.set('selectedEventTypeID', eventID);
      if (this.get('selectedEventTypeIDIsValid') === true) this.set('selectedEventTypeID', null);
    },
    addNewEvent() {
      if (this.get('newEventIsReady') === true) {
        alert('Name ' + this.get('selectedEventName'));
        this.get('events').pushObject({
          eventName: this.get('eventName'),
          eventType: this.get('selectedEventName'),
        });
      }
    }
  },
});
