import DS from 'ember-data';

export default DS.Model.extend({
  value: DS.attr('number'),
  unit: DS.attr('string'),
  record: DS.belongsTo('record'),
});
