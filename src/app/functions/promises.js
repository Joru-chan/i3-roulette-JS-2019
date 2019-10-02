import $ from 'jquery';
import { randomNumber } from '../helpers/random';
import { numbers } from '../data/numbers';
import { createChips } from './creation';
import { dragChips, newValeur, dropChips } from './dragndrop';

export let winningNumber = '';
export let winningColor = '';
export let balance = 257;
export let valeursMisees = [];

export const getWinningNumber = function(time){

    const timeOut = new Promise((resolve, reject) => {
        setTimeout(() => {
            if($(".number").hasClass("winning")){
                reject(["Only one number can be picked by the magical roulette!"]);
            }
            resolve(randomNumber(0, 36))} , time);
        
    });
    
    timeOut
        .then((number) => {
            winningNumber = number;
            $(".roulette").removeClass("rotated");
            for (const div of $(".number")){
                if ($(div).attr("id") == winningNumber){
                    $(div).addClass("winning");
                }
            };
            for (const item of numbers) {
                if (item.number === winningNumber) {
                    winningColor = item.color;
                }
            };
            for (const valeurMisee of valeursMisees) {
                if (valeurMisee.numero === winningNumber.toString()) {
                    balance = newValeur + valeurMisee.jeton * 35;
                } else if (valeurMisee.numero === winningColor) {
                    balance = newValeur + valeurMisee.jeton * 2;
                }
                else{
                    balance = newValeur;
                }
                $('.balance > h2').text(`BALANCE : ${balance}`);
            };
        })
        .then(() => {
            $(".boite-a-jetons").empty();
            valeursMisees = [];
            createChips(balance, $('.boite-a-jetons'));
            dragChips();
            dropChips();
            $('.number, .odd, .reds, .blacks, .even').on("drop", balance);
        });
};