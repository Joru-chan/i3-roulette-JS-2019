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
    $('.jeu').css('transform', 'rotate(-90deg)');
  });
};
