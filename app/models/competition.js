import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  refereeName: DS.attr('string'),
  scorerName: DS.attr('string'),
  days: DS.hasMany('day'),
  athletes: DS.hasMany('athlete'),
  startDate: Ember.computed('days', function() {
    return 'start date';
  }),
  endDate: Ember.computed('days', function() {
    return 'end date';
  }),
});
