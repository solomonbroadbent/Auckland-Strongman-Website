import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('competition-list-interface-row', 'Integration | Component | competition list interface row', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{competition-list-interface-row}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#competition-list-interface-row}}
      template block text
    {{/competition-list-interface-row}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
