import DS from 'ember-data';

export default DS.Model.extend({
  athlete: DS.attr('athlete'),
  primaryResult: DS.attr('result'),
  points: DS.attr('number'),
  secondaryResult: DS.attr('result'),
  event: DS.belongsTo('event'),
});
