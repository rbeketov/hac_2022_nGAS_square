import pandas as pd
import random
import time

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



def main():
    try:
        data = pd.read_excel('hac_trainset_py.xlsx')
    except:
        data = pd.DataFrame({'time': [],
                            'subj': [], 
                            'deadline': [],
                            'exam': [],
                            'mark': []})

    while(True):
        tmp_list = []
        print("case:")
        tmp_id_subj = random.randint(0, len(subj)-1)
        tmp_id_exam = random.randint(0, len(exam)-1)
        tmp_deadline = random.randint(0, 200)
        tmp_day = tmp_deadline // 24


        print(f"{subj[tmp_id_subj]}, до дедлайна: {tmp_day} ({tmp_deadline}), экзамен: {exam[tmp_id_exam]}")
        
        tmp_list.append(time.ctime(time.time()))
        tmp_list.append(subj[tmp_id_subj])
        tmp_list.append(tmp_deadline)
        tmp_list.append(exam[tmp_id_exam])
        
        print("оцени по-братски:")
        tmp_mark = int(input())
        if tmp_mark > 10 or tmp_mark < 1:
            print("будь аккуртней, брат")
            continue

        tmp_list.append(tmp_mark)

        data.loc[len(data.index)] = tmp_list
        with pd.ExcelWriter('hac_trainset_py.xlsx', mode='w', engine="openpyxl") as writer:
            data.to_excel(writer, sheet_name='третий', index=False)
            
if __name__ == "__main__":
    main()

