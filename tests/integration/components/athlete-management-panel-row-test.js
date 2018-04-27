import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('athlete-management-panel-row', 'Integration | Component | scoreboard information panel row', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{athlete-management-panel-row}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#athlete-management-panel-row}}
      template block text
    {{/athlete-management-panel-row}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});