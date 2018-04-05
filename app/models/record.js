import DS from 'ember-data';

export default DS.Model.extend({
  athlete: DS.attr('athlete', {
    async: true,
    inverse: null,
  }),
  primaryResult: DS.attr('result', {
    async: true,
    inverse: this,
  }),
  secondaryResult: DS.attr('result', {
    async: true,
    inverse: this,
  }),
  points: DS.attr('number'),
  event: DS.belongsTo('event'),
});
