import DS from 'ember-data';

export default DS.Model.extend({
  ID: DS.attr('number'),
  name: DS.attr('string'),
  type: DS.attr('string'),
  records: DS.hasMany('record'),
  day: DS.belongsTo('day'),
});
