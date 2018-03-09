import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('scoreboard-information-panel', 'Integration | Component | scoreboard information panel', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{scoreboard-information-panel}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#scoreboard-information-panel}}
      template block text
    {{/scoreboard-information-panel}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
