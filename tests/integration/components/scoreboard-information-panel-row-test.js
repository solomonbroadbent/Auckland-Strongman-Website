import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('scoreboard-information-panel-row', 'Integration | Component | scoreboard information panel row', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{scoreboard-information-panel-row}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#scoreboard-information-panel-row}}
      template block text
    {{/scoreboard-information-panel-row}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
