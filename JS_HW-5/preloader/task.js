function loadData() {
    document.getElementById('loader').classList.add('loader_active');
  
    var cachedData = localStorage.getItem('currency_data');
    if (cachedData) {
      displayData(JSON.parse(cachedData));
    }
  
    fetch('https://www.cbr-xml-daily.ru/daily_json.js')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {

        localStorage.setItem('currency_data', JSON.stringify(data));
  
    
        document.getElementById('loader').classList.remove('loader_active');
  
        displayData(data);
      })
      .catch(function (error) {
        console.log('Error:', error);
      });
  }
  
  function displayData(data) {
    var itemsEl = document.getElementById('items');
  
    itemsEl.innerHTML = '';
  
    for (var currency in data.Valute) {
      var item = data.Valute[currency];

      var itemEl = document.createElement('div');
      itemEl.classList.add('item');
  
      var codeEl = document.createElement('div');
      codeEl.classList.add('item__code');
      codeEl.textContent = item.CharCode;
  
      var valueEl = document.createElement('div');
      valueEl.classList.add('item__value');
      valueEl.textContent = item.Value;
  
      var currencyEl = document.createElement('div');
      currencyEl.classList.add('item__currency');
      currencyEl.textContent = 'руб.';

      itemEl.appendChild(codeEl);
      itemEl.appendChild(valueEl);
      itemEl.appendChild(currencyEl);
  
      itemsEl.appendChild(itemEl);
    }
  }
  
  loadData();