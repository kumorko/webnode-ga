jQuery(function gaOrder() {
  var ga = window.ga || console.log;

  function addTransaction(id, revenue) {
    ga('ecommerce:addTransaction', {
      id: id,
      revenue: revenue
    });
  }

  function addItems(id, products) {
    Object.keys(products).forEach(function addItem(key) {
      var product = products[key];
      ga('ecommerce:addItem', {
        id: id,
        name: product.name,
        sku: product.id,
        quantity: product.count,
        price: product.amount
      });
    });
  }

  // eslint-disable-next-line no-undef
  var order = RS_CFG.finishedOrderData;
  if (typeof order !== 'undefined') {
    ga('require', 'ecommerce');
    addTransaction(order.orderNumber, order.amount);
    addItems(order.orderNumber, order.products);
    ga('ecommerce:send');
  }
});
