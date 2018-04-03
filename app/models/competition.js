import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  refereeName: DS.attr('string'),
  scorerName: DS.attr('string'),
  days: DS.hasMany('day'),
  athletes: DS.hasMany('athlete'),
  startDate: computed('days', function() {
    //Find earliest date
  }),
  endDate: computed('days', function() {
    //Find latest date
  }),
});
