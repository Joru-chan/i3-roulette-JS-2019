import $ from 'jquery';
import { randomNumber } from '../helpers/random';
import { numbers } from '../data/numbers';
import { createChips } from './creation';
import { dragChips } from './dragndrop';

let winningNumber = '';
let winningColor = '';
export const balance = { current: 532 };
export let valeursMisees = [];

export const getWinningNumber = function (time) {
  const timeOut = new Promise((resolve, reject) => {
    setTimeout(() => {
      if ($('.number').hasClass('winning')) {
        throw new Error(['Only one number can be picked by the magical roulette!']);
      }
      resolve(randomNumber(0, 36));
    }, time);
  });

  timeOut
    .then((number) => { console.log(number); return number; })
    .then((number) => {
      winningNumber = number;
      $('.roulette').removeClass('rotated');
      for (const div of $('.number')) {
        if (parseInt($(div).attr('id'), 10) === winningNumber) {
          $(div).addClass('winning');
        }
      }
      for (const item of numbers) {
        if (item.number === winningNumber) {
          winningColor = item.color;
        }
      }
      for (const valeurMisee of valeursMisees) {
        if (valeurMisee.numero === winningNumber.toString()) {
          balance.current += valeurMisee.jeton * 35;
        } else if (valeurMisee.numero === winningColor) {
          balance.current += valeurMisee.jeton * 2;
        }
        $('.balance > h2').text(`BALANCE : ${balance.current}`);
      }
    })
    .then(() => {
      $('.boite-a-jetons').empty();
      valeursMisees = [];
      createChips(balance.current);
      dragChips();
    })
    .catch((error) => console.log(error));
};
