fetch('index.html')
    .then(response => response.text())
    .then(data => document.querySelector('head').innerHTML = data);

