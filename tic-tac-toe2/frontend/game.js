var socket = io();

var cells = document.querySelectorAll('.col-xs-4');

for (var i = 0; i < cells.length; i++) {
  cells[i].addEventListener('click', function() {
    socket.emit('move', this.dataset.index);
  });
}

socket.on('move', function(index, symbol) {
  cells[index].innerHTML = symbol;
});

socket.on('win', function(symbol) {
  alert(symbol + ' wins!');
});

socket.on('draw', function() {
  alert('It\'s a draw!');
});
