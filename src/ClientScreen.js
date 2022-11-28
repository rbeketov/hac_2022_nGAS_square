import React from "react";
import {DragDropContext} from 'react-beautiful-dnd';
import ReactDOM from "react-dom/client";
import {RegOrSign} from "./auth"
import {getCookie} from "./auth"

const vovaHost = 'https://75bc-178-176-77-200.eu.ngrok.io'
const urlHost = 'https://dde0-195-19-42-150.eu.ngrok.io'

export class Node extends React.Component {
    upClick = () => {
        let index = this.props.Id
        if(index === 0){
            return
        }
        if(index === 1){
            this.props.ClientInfo.data[index].mark = (this.props.ClientInfo.data[index].mark + 10)*0.5
        }else{
            this.props.ClientInfo.data[index].mark = (this.props.ClientInfo.data[index].mark + this.props.ClientInfo.data[index - 1].mark)*0.5
        }
        let temp1 = this.props.ClientInfo.data[index].mark
        this.props.ClientInfo.data[index].mark = this.props.ClientInfo.data[index - 1].mark
        this.props.ClientInfo.data[index - 1].mark = temp1

        let temp = this.props.ClientInfo.data[index]
        this.props.ClientInfo.data[index] = this.props.ClientInfo.data[index - 1]
        this.props.ClientInfo.data[index - 1] = temp
        //this.props.ClientInfo.data.splice(index - 1, 2, this.props.ClientInfo.data[index], this.props.ClientInfo.data[index - 1]);
        fetch(urlHost +'/api/user/updatetask', {
            method: 'POST',
            body: JSON.stringify(
                this.props.ClientInfo
            )
        })
            .then(response => {
                    return response.json();
                },
                error => alert(error))
            .then(data => {

                renderClient(this.props.ClientInfo);

            })

    };
    downClick = () => {

        let index = this.props.Id
        if(index === this.props.ClientInfo.data.length){
            return
        }
        if(index === this.props.ClientInfo.data.length){
            this.props.ClientInfo.data[index].mark = (this.props.ClientInfo.data[index].mark)*0.5
        }else{
            this.props.ClientInfo.data[index].mark = (this.props.ClientInfo.data[index].mark + this.props.ClientInfo.data[index + 1].mark)*0.5
        }
        let temp1 = this.props.ClientInfo.data[index].mark
        this.props.ClientInfo.data[index].mark = this.props.ClientInfo.data[index + 1].mark
        this.props.ClientInfo.data[index + 1].mark = temp1

        let temp = this.props.ClientInfo.data[index]
        this.props.ClientInfo.data[index] = this.props.ClientInfo.data[index + 1]
        this.props.ClientInfo.data[index + 1] = temp
        //this.props.ClientInfo.data.splice(index, 2, this.props.ClientInfo.data[index + 1], this.props.ClientInfo.data[index]);
        fetch(urlHost + '/api/user/updatetask', {
            method: 'POST',
            body: JSON.stringify(
                this.props.ClientInfo
            )
        })
            .then(response => {
                    return response.json();
                },
                error => alert(error))
            .then(data => {

                renderClient(this.props.ClientInfo);

            })
        //renderClient(this.props.ClientInfo);
    };
    deleteClick = () => {
        let index = this.props.Id
        this.props.ClientInfo.data.splice(index, 1);
        fetch( urlHost + '/api/user/updatetask', {
            method: 'POST',
            body: JSON.stringify(
                this.props.ClientInfo
            )
        })
            .then(response => {
                    return response.json();
                },
                error => alert(error))
            .then(data => {

                renderClient(this.props.ClientInfo);

            })
    };

    render() {
        let descr = this.props.Note.Description
        if (this.props.Note.Exam === "1") {
            descr = descr + ", экзамен";
        }
        return (
            <div id={this.props.Note.NoteHeader} className="note">
                <h1 className="note-header">{this.props.Note.NoteHeader}</h1>
                <div className="note-text">{this.props.Note.NoteText}
                    <div
                        className="note-deadline">{this.props.Note.Year + '.' + this.props.Note.Month + '.' + this.props.Note.Day}</div>
                    <div className="note-description">{descr}</div>

                    <button className="up-button" onClick={this.upClick}>
                        ←
                    </button>
                    <button className="down-button" onClick={this.downClick}>
                        →
                    </button>
                    <button className="delete-button" onClick={this.deleteClick}>
                        x
                    </button>
                </div>
            </div>

        );
    }
}

export class MainScreen extends React.Component {
    render() {
        const {children} = this.props;
        return (
            <div id="main" className="main-screen">
                {children}
            </div>
        )
    }
}

export class RightCurtain extends React.Component {
    render() {
        const {children} = this.props
        return (
            <div className="right-curtain">
                {children}
            </div>
        );
    }
}

export class LeftCurtain extends React.Component {
    render() {
        const {children} = this.props
        return (
            <div className="left-curtain">
                {children}
            </div>
        );
    }
}


class AddNoteWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            headerVal: "",
            textVal: "",
            discrVal: "",
            dateVal: ""
        }
        this.headerChange = this.headerChange.bind(this);
        this.textChange = this.textChange.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.descriptionChange = this.descriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    headerChange(event) {
        this.setState({headerVal: event.target.value});
    }

    textChange(event) {
        this.setState({textVal: event.target.value});
    }

    dateChange(event) {
        this.setState({dateVal: event.target.value});



    }

    descriptionChange(event) {
        this.setState({discrVal: event.target.value});
    }

    handleSubmit(event) {


        let discription
        let exam
        if (this.state.discrVal.indexOf(", экзамен") !== -1) {
            discription = this.state.discrVal.slice(0, this.state.discrVal.indexOf(", экзамен"))
            exam = "1"
        } else if (this.state.discrVal.indexOf(", !экзамен") !== -1){
            discription = this.state.discrVal.slice(0, this.state.discrVal.indexOf(", !экзамен"))
            exam = "0"
        }else {
            discription = this.state.discrVal
            exam = "NotGiven"
        }
        let newData = {
            sessionId: getCookie("session"),
            title: this.state.headerVal,
            desc: this.state.textVal,
            subj: discription,
            year: this.state.dateVal.substring(0,4),
            month: this.state.dateVal.substring(5,7),
            day: this.state.dateVal.substring(8,10),
            exam: exam,
            mark: 5
        };
        this.props.ClientInfo.data.splice(0, 0, newData)
        event.preventDefault();
        fetch( vovaHost + '/new/new_rec/', {
            method: 'POST',
            body: JSON.stringify({
                sessionId: getCookie("session"),
                title: this.state.headerVal,
                desc: this.state.textVal,
                subj: discription,
                year: this.state.dateVal.substring(0,4),
                month: this.state.dateVal.substring(5,7),
                day: this.state.dateVal.substring(8,10),
                hour: 12,
                min: 0,
                exam: exam,
                mark: 5
            })
        })
            .then(response => {
                    return response.json();
                },
                error => alert(error))
            .then(data => {

                fetch( urlHost + '/api/user/gettask', {
                    method: 'POST',
                    body: JSON.stringify({
                        session: getCookie("session")
                    })
                })
                    .then(response => {
                            return response.json();
                        },
                        error => alert(error))
                    .then(data => {
                        renderClient(data)
                    })
                })

    }

    render() {
        return (
            <div className="add-window">
                <div className="note">
                    <form onSubmit={this.handleSubmit}>
                        <textarea placeholder="Заголовок" onChange={this.headerChange} value={this.state.headerVal}
                                  className="note-header"></textarea>
                        <div className="note-text">
                            <textarea placeholder="Введите текст" onChange={this.textChange} value={this.state.textVal}
                                      className="note-text"></textarea>
                            <div className="note-deadline">
                                <input type="date" placeholder="ММ.ДД.ГГГГ" style={this.styles} onChange={this.dateChange}
                                          value={this.state.dateVal}
                                          className="note-date"></input>
                            </div>
                            <textarea placeholder="Введите тэг" onChange={this.descriptionChange}
                                      value={this.state.discrVal}
                                      className="note-description"></textarea>
                            <input type="submit" value="Отправить"/>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}

class AddButton extends React.Component {
    handleClick = () => {
        renderAddElement(this.props.ClientInfo)
    };

    render() {
        return (
            <button className="add-button" onClick={this.handleClick}>
                +
            </button>
        );
    }
}

function CreateNotes(props) {
    let list = []
    for (let i = 0; i < props.Notes.length; i++) {
        list.push(<Node Id={i} Note={props.Notes[i]} ClientInfo={props.ClientInfo}></Node>);
    }
    return (
        <div>
            {list}
        </div>
    )
}

function addNewNote(info) {


}

function renderAddElement(ClientInfo) {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    let arr = []
    for (let i = 0; i < ClientInfo.data.length; i++) {
        arr.push({
            id: ClientInfo.data[i].sessionId,
            NoteHeader: ClientInfo.data[i].title,
            NoteText: ClientInfo.data[i].desc,
            Description: ClientInfo.data[i].subj,

            Year: ClientInfo.data[i].year,
            Month: ClientInfo.data[i].month,
            Day: ClientInfo.data[i].day,
            Hour: ClientInfo.data[i].hour,
            Min: ClientInfo.data[i].min,
            Exam: ClientInfo.data[i].exam,
            mark: ClientInfo.data[i].mark
        })
    }

    let screen = []
    let sideR = []
    sideR.push(<AddNoteWindow ClientInfo={ClientInfo}></AddNoteWindow>)
    sideR.push(<CreateNotes Notes={arr} ClientInfo={ClientInfo}></CreateNotes>)
    screen.push(<LeftCurtain></LeftCurtain>);
    screen.push(<MainScreen>
        {sideR}
    </MainScreen>);
    screen.push(<RightCurtain></RightCurtain>);

    root.render(screen);
}

export function renderClient(ClientInfo) {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    let arr = []
    for (let i = 0; i < ClientInfo.data.length; i++) {
        arr.push({
            id: ClientInfo.data[i].sessionId,
            NoteHeader: ClientInfo.data[i].title,
            NoteText: ClientInfo.data[i].desc,
            Description: ClientInfo.data[i].subj,
            Year: ClientInfo.data[i].year,
            Month: ClientInfo.data[i].month,
            Day: ClientInfo.data[i].day,
            Hour: ClientInfo.data[i].hour,
            Min: ClientInfo.data[i].min,
            Exam: ClientInfo.data[i].exam,
            mark: ClientInfo.data[i].mark
        })
    }

    let screen = []
    let sideR = []

    sideR.push(<CreateNotes Notes={arr} ClientInfo={ClientInfo}></CreateNotes>)
    sideR.push(<AddButton ClientInfo={ClientInfo}></AddButton>)

    screen.push(<LeftCurtain>
        <DownLoadCal ClientInfo={ClientInfo}></DownLoadCal>
        <ExitButton></ExitButton>
    </LeftCurtain>);
    screen.push(<MainScreen>
        {sideR}
    </MainScreen>);
    screen.push(<RightCurtain></RightCurtain>);

    root.render(screen);

}

export class DownLoadCal extends React.Component {
    downloadClick = () =>{
        fetch(vovaHost + '/make_calendar/', {
            method: 'POST',
            body: JSON.stringify(this.props.ClientInfo)
        })
            .then(response => {
                return response.json();
            }, error => {
                alert(error);
            })
            .then(data => {
                // fetch('http://195.19.62.96/MyCalendar/calendar.ics')
                //     .then(response => {
                //         return response.json();
                //     }, error => {
                //         alert(error);
                //     })
                //     .then(data => {
                //         renderClient(this.ClientInfo)
                //     })
                window.location.href = vovaHost + "/MyCalendar/calendar.ics"
            })
    };
    render(){
        return(
            <button className="download-button" onClick={this.downloadClick}>Cоздать календарь</button>

        )
    }
}

export function renderAuth(ClientInfo){
    const root = ReactDOM.createRoot(document.getElementById('root'));

    let screen = []


    //sideR.push(<CreateNotes Notes={arr} ClientInfo={ClientInfo}></CreateNotes>)
    //sideR.push(<AddButton ClientInfo={ClientInfo}></AddButton>)

    screen.push(<LeftCurtain>
        <RegOrSign></RegOrSign>
    </LeftCurtain>);
    screen.push(<MainScreen>

    </MainScreen>);
    screen.push(<RightCurtain></RightCurtain>);

    root.render(screen);
}

class ExitButton extends React.Component {
    downloadClick = () =>{
        deleteCookie("session")
        renderAuth();

    };
    render() {
        return (
            <button className="exit-button" onClick={this.downloadClick}>Выйти из аккаунта</button>
        );
    }
}

function deleteCookie(name) {
    setCookie(name, "", {
        'max-age': -1
    })
}

function setCookie(name, value, options = {}) {

    options = {
        path: '/',
        // при необходимости добавьте другие значения по умолчанию
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}