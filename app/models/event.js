import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  type: DS.attr('string'),
  longPrimaryUnitName: DS.attr('string'),
  shortPrimaryUnitName: DS.attr('string'),
  longSecondaryUnitName: DS.attr('string'),
  shortSecondaryUnitName: DS.attr('string'),
  records: DS.hasMany('record', {
    inverse: null,
  }),
  day: DS.belongsTo('day', {
    inverse: null,
  }),
});
