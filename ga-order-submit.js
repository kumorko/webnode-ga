jQuery(function gaOrder() {
  // logging section
  var log = window.ga || console.log;

  function logTransaction(id, revenue) {
    log('ecommerce:addTransaction', {
      id: id,
      revenue: revenue
    });
  }

  function logItems(id, products) {
    Object.keys(products).forEach(function logItem(key) {
      var product = products[key];
      log('ecommerce:addItem', {
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
    logTransaction(order.orderNumber, order.amount);
    logItems(order.orderNumber, order.products);
  }
});
