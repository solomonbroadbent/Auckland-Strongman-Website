import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  type: DS.attr('string'),
  records: DS.hasMany('record', {
    async: true,
    inverse: this,
  }),
  day: DS.belongsTo('day'),
});
