import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('date'),
  events: DS.hasMany('events'),
  competition: DS.belongsTo('competition'),
});
