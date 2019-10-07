import $ from 'jquery';
import { randomNumber } from '../helpers/random';
import { winningNumber } from './promises';

let winningColor = "";
export const setWinningColor = function(numbers){
    for (const item of numbers) {
        if (item.number === winningNumber) {
          winningColor = item.color;
        }
    }
    winningColor = winningColor.charAt(0).toUpperCase() + winningColor.substring(1) + "s";
    return winningColor;
}
export const ifNotInteger = "<div class='perdu'><p>La grande roulette magique n'accepte que des nombres entiers.</p><button class='btn btn-success restart'>Ré-insérez un montant correct</button></div>";
export const ifToto = "<div class='perdu'><p class='text-center'>Coucou Loïc :D</p><button class='btn btn-success restart'>Essaie plutôt avec un nombre :P</button><img src='/assets/images/nyancat.gif' /></div>";
export const ifNegNumber = "<div class='perdu'><p>Un nombre supérieur à zéro 😡 </p><button class='btn btn-success restart'>Ré-insérez un montant correct</button></div>";
export const ifOverAThousand = "<div class='perdu'><p>Pensez à votre famille. Dépensez un peu moins. Jouez avec modération 😬</p><button class='btn btn-success restart'>Ré-insérez un montant inférieur à 1000</button></div>";
export const setRestart = function(){
    $(".restart").on("click", function(){
        location.href=location.href;
        });
}
