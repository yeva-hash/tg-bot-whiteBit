const TelegramApi = require('node-telegram-bot-api');
const token = '5729912995:AAFkVE7deugnVXqz9PTkxvXzBp_RyqPDLsk';
const bot = new TelegramApi(token, {polling: true});
var port = require('./proxy');
console.log('imported port' + port.port + port);


// corsProxy();
bot.on('message', msg => {
    const chatId = msg.chat.id;
    const xhttp = solve();
    xhttp.onload = function(e) {
        price = JSON.parse(xhttp.responseText).USDT_UAH.last_price;
        bot.sendMessage(chatId, `price for USDT_UAH => ${price}`);
    };
});

bot.on("polling_error", console.log);

// function whiteBotAjax() {
//     const endpoint = 'ticker'
//     fetch(`https://cors-anywhere.herokuapp.com/https://whitebit.com/api/v4/public/ticker`)
//     .then((response) => {
//         return response.json();
//     })
//     .then((data) => {
//         return JSON.stringify(data);
//     });
// }


// xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//         whiteBotData = JSON.parse(xhttp.responseText);
//         var price = whiteBotData.USDT_UAH.last_price;
//         var a = null;
//     }
// };


function solve(){
    var XMLHttpRequest = require('xhr2');
    const xhttp = new XMLHttpRequest();
    console.log('the port is' + port);
    xhttp.open("GET", "http://127.0.0.1:" + port + "/https://whitebit.com/api/v4/public/ticker", true);
    xhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhttp.send();
    return xhttp;
}