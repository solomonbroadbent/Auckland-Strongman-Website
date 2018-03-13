import DS from 'ember-data';

export default DS.Model.extend({
  ID: DS.attr('number'),
  date: DS.attr('date'),
  events: DS.hasMany('events'),
  competition: DS.belongsTo('competition'),
});
