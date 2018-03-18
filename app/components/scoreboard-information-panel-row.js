import Component from '@ember/component';

export default Component.extend({
  tagName: '',
  inEditMode: false,
  notInEditMode: Ember.computed.not('inEditMode'),
  athlete: {},
  points: -1,
  position: 'none',
});
