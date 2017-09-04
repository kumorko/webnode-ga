jQuery(function initialization() {
  // id generator section
  var ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  var ID_LENGTH = 8;

  function generateId() {
    var rtn = '';
    for (var i = 0; i < ID_LENGTH; i++) {
      rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }
    return rtn;
  }

  // parsing data section
  function priceToNumber(value) {
    if (typeof value === 'string') {
      return Number(value.split(',')[0]);
    }
    return NaN;
  }

  function parseItem(index, el) {
    var $el = jQuery(el);
    var $countInput = $el.find('input[type=text]');
    return {
      name: $el.find('td a').html(),
      sku: $countInput.attr('id').replace('product_', ''),
      quantity: $countInput.val(),
      price: priceToNumber(
        $el.find('.price').first().html()
      )
    };
  }

  function parseItems($cartTable) {
    return $cartTable.find('tbody tr').map(parseItem).get();
  }

  function parseRevenue($totalTable) {
    return priceToNumber(
      $totalTable.find('thead .value').html()
    );
  }

  function parseData($cartForm) {
    return {
      items: parseItems($cartForm.find('.cartTable')),
      revenue: parseRevenue($cartForm.find('.totalTable'))
    };
  }

  // logging section
  var log = window.ga || console.log;

  function logTransaction(id, revenue) {
    log('ecommerce:addTransaction', {
      id: id,
      revenue: revenue
    });
  }

  function logItems(id, items) {
    items.forEach(function logItem(item) {
      item.id = id;
      log('ecommerce:addItem', item);
    });
  }

  // execution
  var $cartForm = jQuery('#cartForm');
  $cartForm.on('submit', function submit() {
    var data = parseData($cartForm);
    var id = generateId();
    logTransaction(id, data.revenue);
    logItems(id, data.items);
  });
});
