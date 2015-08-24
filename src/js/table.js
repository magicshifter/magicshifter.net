var tableHeaders = document.querySelectorAll('th');
var wantedTableHeader = null;

Object.keys(tableHeaders).forEach(function(key) {
  var header = tableHeaders[key];
  if (header.innerHTML === 'Datasheet') {
    wantedTableHeader = header;
  }
});

window.addEventListener('resize', changeTableHeader);

changeTableHeader();

function changeTableHeader() {
  if (window.innerWidth < 400) {
    wantedTableHeader.innerHTML = 'PDF';
  } else {
    wantedTableHeader.innerHTML = 'Datasheet';
  }
}
