import joblib
import pandas as pd

model = joblib.load("model.pkl")

def get_mark(action):
    if (type(action) != list):
        return float('inf')
    if (len(action) != 3):
        return float('inf')

    action_frame = pd.DataFrame({'subj': [], 
                     'deadline': [],
                     'exam': [] })
    
    action_frame.loc[len(action_frame.index)] = action
    y_pred = model.predict(action_frame)

    return y_pred