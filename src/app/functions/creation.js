import $ from 'jquery';

export const createRouletteTable = function (array, whereTo) {
  array.forEach((e) => {
    const div = $('<div></div>');
    div.append(e.number);
    div.addClass('number');
    div.addClass(e.color);
    div.attr('id', e.number);
    div.attr('data-type', 'number');
    div.css('background-color', e.color);
    whereTo.append(div);
  });
};

export const createChips = function (nombre, whereTo) {
  let balance = nombre;
  while (balance > 0) {
    const jeton = $('<div class="jeton"></div>');
    if (balance >= 100) {
      jeton.addClass('jeton100').attr('id', '100j');
      balance -= 100;
    } else if (balance >= 50) {
      jeton.addClass('jeton50').attr('id', '50j');
      balance -= 50;
    } else if (balance >= 10) {
      jeton.addClass('jeton10').attr('id', '10j');
      balance -= 10;
    } else if (balance >= 5) {
      jeton.addClass('jeton5').attr('id', '5j');
      balance -= 5;
    } else if (balance >= 1) {
      jeton.addClass('jeton1').attr('id', '1j');
      balance -= 1;
    } else {
      jeton.text('Plus de jetons.');
    }
    whereTo.append(jeton);
  }
};
