import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('event-panel-most-weight', 'Integration | Component | event panel most weight', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{event-panel-most-weight}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#event-panel-most-weight}}
      template block text
    {{/event-panel-most-weight}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});