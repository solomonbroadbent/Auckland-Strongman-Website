import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  refereeName: DS.attr('string'),
  scorerName: DS.attr('string'),
  days: DS.hasMany('day', {
    // async: true tells the adapter to immediately fetch the record from the Ember Data store, or look up the
    //  record in Firebase
    async: true,
    // I'm pretty sure setting the inverse to this here defines that the days in this days relationship may only
    //  belong to one this competition. https://stackoverflow.com/questions/25693518/ember-understanding-inverse-relationships
    inverse: this,
  }),
  athletes: DS.hasMany('athlete', {
    async: true,
    // I'm pretty sure setting the inverse to null here means the athletes can belong to other competitions as well.
    //  https://stackoverflow.com/questions/25693518/ember-understanding-inverse-relationships
    inverse: this,
  }),
  startDate: Ember.computed('days', function () {
    return 'start date';
  }),
  endDate: Ember.computed('days', function () {
    return 'end date';
  }),
});
