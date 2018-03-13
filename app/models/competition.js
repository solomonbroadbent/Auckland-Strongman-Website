import DS from 'ember-data';

export default DS.Model.extend({
  ID: DS.attr('number'),
  name: DS.attr('string'),
  refereeName: DS.attr('string'),
  scorerName: DS.attr('string'),
  days: DS.hasMany('day'),
  startDate: computed('days', function() {
    //Find earliest date
  }),
  endDate: computed('days', function() {
    //Find latest date
  }),
});
