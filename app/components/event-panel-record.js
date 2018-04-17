import Component from '@ember/component';

export default Component.extend({
  tagName: '',
  inDataEntryMode: undefined,
  notInDataEntryMode: Ember.computed.not('inDataEntryMode'),
  // model values
  primaryResultValue: undefined,
  secondaryResultValue: undefined,
  recordPoints: undefined,
  record: undefined,
  actions: {
    async save() {
      let record = await this.get('record');
      let primaryResult = await record.get('primaryResult');
      let secondaryResult = await record.get('secondaryResult');
      primaryResult.set('value', this.get('primaryResultValue'));
      let primaryResultSavePromise = primaryResult.save();
      secondaryResult.set('value', await this.get('secondaryResultValue'));
      let secondaryResultSavePromise = secondaryResult.save();
      Promise.all([primaryResultSavePromise, secondaryResultSavePromise]).then(record.save());
    }
  }
});
