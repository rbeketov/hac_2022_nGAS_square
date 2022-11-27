import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import "./ClientScreen"
import {Node} from "./ClientScreen";
import {renderClient} from "./ClientScreen";
import {RegOrSign} from "./auth"

import {LeftCurtain} from "./ClientScreen";
import {RightCurtain} from "./ClientScreen";
import {MainScreen} from "./ClientScreen";
import {CreateNotes} from "./ClientScreen";
import {AddButton} from "./ClientScreen";
import {renderAuth} from "./ClientScreen";
import {DownLoadCal} from "./ClientScreen";

//const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <React.StrictMode>
//         <App/>
//     </React.StrictMode>
// );

//403d93fc67420f3bf82da0de4edc4ca4b5ac448a12418114ff209ac03bcafb5e

// fetch('https://3517-195-19-42-150.eu.ngrok.io/api/user/gettask', {
//     method: 'POST',
//     body: JSON.stringify({
//         session: "a3a53c451ee3ea33eae13d03d854ac39022cdcddbcf3b3f4b6d3d8eed9cc96ad"
//     })
// })
//         .then(response => {
//             return response.json();
//         }, error => {
//             alert(error);
//
//
//
//         })
//         .then(data => {
//             document.cookie = "session=a3a53c451ee3ea33eae13d03d854ac39022cdcddbcf3b3f4b6d3d8eed9cc96ad"
//             renderClient(data)
//             console.log(data)
//     })
renderAuth();
// const root = ReactDOM.createRoot(document.getElementById('root'));
// let screen = []
// let sideR = []
//
// //sideR.push(<CreateNotes Notes={arr} ClientInfo={ClientInfo}></CreateNotes>)
// //sideR.push(<AddButton ClientInfo={ClientInfo}></AddButton>)
//
// screen.push(<LeftCurtain>
//     <RegOrSign></RegOrSign>
// </LeftCurtain>);
// screen.push(<MainScreen>
//
// </MainScreen>);
// screen.push(<RightCurtain></RightCurtain>);
//
// root.render(screen);

// let arr = []
// for (let i = 0; i < 15; i++) {
//     arr.push({
//         NoteHeader: "Записка№" + i,
//         NoteText: "это заметка №" + i + " вот еще содержание заметки " + clientInfo,
//         Description: "описание " + i
//     })
// }


//
// for (let i = 0; i < clientInfo.length; i++) {
//     arr.push({
//         NoteHeader: clientInfo[i].title,
//         NoteText: clientInfo[i].main,
//         Description: clientInfo[i].text
//     })
// }
// arr.push({Number: 1, NoteText: "это первая заметка", Description: "описание 1"})
// let num = 2;
// let text = "это вторая заметка, проверяю работу"
// arr.push({Number: num, NoteText: text, Description: "описание 2"})
// arr.push({Number: 3, NoteText: "это 3ая заметка", Description: "описание 3"})

// let screen = []


// screen.push(<LeftCurtain></LeftCurtain>);
// screen.push(<MainScreen>
//     <CreateNotes Notes={arr}></CreateNotes>
// </MainScreen>);
// screen.push(<RightCurtain></RightCurtain>);
//
// root.render(screen);
//

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
    reportWebVitals();
