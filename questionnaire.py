import pandas as pd
import random
import time
import telebot




subj = ["Физика", 
        "Математика", 
        "Архитектура АСОИУ", 
        "Модели данных",
        "Электротехника",
        "Модели данных",
        "История",
        "Правоведение",
        "Экология",
        "Социология",
        "Программирование",
        ""]

exam = [True, False]

bot = telebot.TeleBot('5916029613:AAH7c3qVy43HZOGvks6KGsbm21PZVPDvF_E');



try:
    data = pd.read_excel('hac_trainset_py.xlsx')
except:
    data = pd.DataFrame({'time': [],
                        'subj': [], 
                        'deadline': [],
                        'exam': [],
                        'mark': []})

def get_case():
    tmp_list = []

    tmp_id_subj = random.randint(0, len(subj)-1) # предмет
    tmp_id_exam = random.randint(0, len(exam)-1) # экзамен
    tmp_deadline = random.randint(0, 200) # дедлайн
    
    tmp_list.append(time.ctime(time.time()))
    tmp_list.append(subj[tmp_id_subj])
    tmp_list.append(tmp_deadline)
    tmp_list.append(exam[tmp_id_exam])

    return tmp_list


case = get_case()

@bot.message_handler(commands=["start"])
def start(m, res=False):
    bot.send_message(m.chat.id, 'Сейчас я буду отправлять тебе кейсы, а ты оцени по шкале от 1 до 10 готовность выполнить задание по этому предмету прямо сейчас (представь, что ты свободен и готов трудиться), если что то пропущено, то значит просто такой кейс')
    bot.send_message(m.chat.id, f'Предмет: {case[1]},  до дедлайна: дней {case[2]//24}, ({case[2]} час), экзаменационный предмет: {case[3]}')

@bot.message_handler(content_types=["text"])
def handle_text(message):
    global case
    try:
        int_message = int(message.text)
    except:
        bot.send_message(message.chat.id, 'аккуратней браток(str)')
        case = get_case()
        bot.send_message(message.chat.id, f'Предмет: {case[1]},  до дедлайна: дней {case[2]//24}, ({case[2]} час), экзаменационный предмет: {case[3]}')
        return

    if int_message > 10 or int_message < 1:
        bot.send_message(message.chat.id, f'аккуратней браток (много)')
        case = get_case()
        bot.send_message(message.chat.id, f'Предмет: {case[1]},  до дедлайна: дней {case[2]//24}, ({case[2]} час), экзаменационный предмет: {case[3]}')
        return

    print(message.chat.id)
    case.append(int_message)
    
    data.loc[len(data.index)] = case
    with pd.ExcelWriter('hac_trainset_py.xlsx', mode='w', engine="openpyxl") as writer:
        data.to_excel(writer, sheet_name='третий', index=False)
    case = get_case()
    bot.send_message(message.chat.id, f'Предмет: {case[1]},  до дедлайна: дней {case[2]//24}, ({case[2]} час), экзаменационный предмет: {case[3]}')
    


bot.polling(none_stop=True, interval=0)

    
