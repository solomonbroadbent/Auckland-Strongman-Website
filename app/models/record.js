import DS from 'ember-data';

export default DS.Model.extend({
  athlete: DS.belongsTo('athlete', {
    inverse: null,
  }),
  primaryResult: DS.belongsTo('result', {
    inverse: null,
  }),
  secondaryResult: DS.belongsTo('result', {
    inverse: null,
  }),
  points: DS.attr('number'),
  event: DS.belongsTo('event', {
    inverse: null,
  }),
});
