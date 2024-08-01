import telebot
import requests
import json
a =0
# Вставьте ваш токен, который вы получили от BotFather
TELEGRAM_TOKEN = '7173762431:AAHie_1KdUSJ367e2Gn-C8YUUSYeWLV2kZ8'

# Базовый URL вашего API
BASE_URL = 'http://localhost:5130/api/ServerTasks/GetUsersInCompany'

# Создание экземпляра бота
bot = telebot.TeleBot(TELEGRAM_TOKEN)

# Обработка команды /start
@bot.message_handler(commands=['start'])
def send_welcome(message):
    bot.reply_to(message, "Привет! Я бот, который может выполнять запросы к вашему API.")

# Обработка команды /getusers
@bot.message_handler(commands=['getusers'])
def get_users(message):
    # Извлекаем параметры команды
    args = message.text.split(maxsplit=1)  # Разделяем команду и аргументы
    if len(args) > 1:
        seed_phase = args[1]  # Получаем параметры из команды
    else:
        seed_phase = ''  # Если параметры не переданы, используем пустую строку

    try:
        response = requests.get(BASE_URL, params={'SeedPhase': seed_phase})
        response.raise_for_status()  # Проверка на успешность запроса

        # Получаем данные из ответа
        data = response.json()

        # Форматируем ответ
        formatted_response = format_response(data)

        bot.reply_to(message, formatted_response)
    except requests.RequestException as e:
        bot.reply_to(message, f'Ошибка при запросе: {e}')

def format_response(data):
    # Проверяем, что данные содержат ожидаемые ключи
    if '$values' in data:
        users = data['$values']
        if not users:
            return "Нет данных для отображения."

        formatted = "Список пользователей:\n"
        for user in users:
            formatted += (f"ID: {user.get('id', 'N/A')}\n"
                          f"Имя пользователя: {user.get('userName', 'N/A')}\n"
                          f"Роль: {'Администратор' if user.get('role', 0) == 1 else 'Пользователь'}\n"
                          f"Компания: {user.get('companyName', 'N/A')}\n"
                          "--------------------\n")
        return formatted
    return "Некорректные данные."

# Запуск бота
bot.polling()