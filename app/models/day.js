import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('date'),
  number: DS.attr('number'),
  events: DS.hasMany('events', {
    inverse: null,
  }),
  competition: DS.belongsTo('competition', {
    inverse: null,
  }),
});
