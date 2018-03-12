import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('event-panel-least-time', 'Integration | Component | event panel least time', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{event-panel-least-time}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#event-panel-least-time}}
      template block text
    {{/event-panel-least-time}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
