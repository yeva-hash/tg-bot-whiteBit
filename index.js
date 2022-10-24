const TelegramApi = require('node-telegram-bot-api');
const token = '5729912995:AAFkVE7deugnVXqz9PTkxvXzBp_RyqPDLsk';
const bot = new TelegramApi(token, {polling: true});
const {corsProxy} = require('./proxy.js')

corsProxy();

const priceOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'USDT-UAH', callback_data: 'usdt'}]
        ]
    })
}

const returnBack = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Назад', callback_data: 'return'}]
        ]
    })
}

bot.setMyCommands([
    {command: '/usdt', description: 'Останній курс USDT-UAH'}
])

bot.on('callback_query', msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    if (data === 'usdt') {
        showPrice(chatId);
    } else if (data === 'return') {
        start(msg.message.chat);
    }
})

bot.on('message', async msg => {
    const chat = msg.chat;
    if (msg.text === '/start') {
        start(chat);
    } else if (msg.text === '/usdt') {
        showPrice(chat.id);
    }
});

bot.on("polling_error", console.log);

function whiteBotAjax(){
    var XMLHttpRequest = require('xhr2');
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://127.0.0.1:8080/https://whitebit.com/api/v4/public/ticker", true);
    xhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhttp.send();
    return xhttp;
}

function showPrice(chatId) {
    const xhttp = whiteBotAjax();

    xhttp.onload = async function(e) {
        await bot.sendPhoto(chatId, 'https://media.exbase.io/images/wiki/GO9dfVij3sWt.jpg');

        price = Number(JSON.parse(xhttp.responseText).USDT_UAH.last_price);
        return bot.sendMessage(chatId, `Фактичний курс для валюти USDT-UAH: ${price.toFixed(2)}`, returnBack);
    };
}

async function start(chat) {
    var userName = chat.first_name && chat.first_name !== '' ? ', ' + chat.first_name : ''; 
    await bot.sendMessage(chat.id, `Вітаю${userName}! У нашому боті ви зможете дізнатися фактичний курс валюти біржі WhiteBit:`, priceOptions);
    return bot.sendMessage(chat.id, 'Телеграм канал: [link]');
}