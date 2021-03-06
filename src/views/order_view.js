import Backbone from 'backbone';
import _ from 'underscore';

import Quote from '../models/quote';
import QuoteList from '../collections/quote_list';

const OrderView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'change', this.render);
    this.bus = params.bus;
    this.listenTo(this.bus, `${this.model.attributes.symbol}${this.model.attributes.buy}orderFinished`, this.cancelOrder);
  },
  render() {
    const template = this.template(this.model.toJSON());
    this.$el.html(template);
    return this;
  },
  events: {
    'click button.btn-cancel': 'cancelOrder'
  },
  cancelOrder: function(e) {
    this.model.destroy();
    this.remove();
  }
});

export default OrderView;
