import React from "react";
import ReactDOM from "react-dom/client";
import {renderClient} from "./ClientScreen";

const urlHost = 'https://dde0-195-19-42-150.eu.ngrok.io'

export function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export class RegOrSign extends React.Component {
    constructor(props) {
        super(props);
        this.state = {userValue: ''};
        this.state = {passValue: ''};

        this.passwordChange = this.passwordChange.bind(this);
        this.regSubmit = this.regSubmit.bind(this);
        this.userChange = this.userChange.bind(this);
        this.signSubmit = this.signSubmit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    passwordChange(event){
        this.setState({passValue: event.target.value});
    }
    userChange(event){
        this.setState({userValue: event.target.value});
    }
    regSubmit(event){
        //alert(this.state.userValue)
        fetch( urlHost + '/api/user/signup', {
            method: 'POST',
            body: JSON.stringify({
                login: this.state.userValue,
                password: this.state.passValue
            })
        })
            .then(response => {
                    return response.json();
                },
                error => alert(error))
            .then(data => {
                if (data.status === "ok"){
                    fetch(urlHost + '/api/user/signin', {
                        method: 'POST',
                        body: JSON.stringify({
                            login: this.state.userValue,
                            password: this.state.passValue
                        })
                    })
                        .then(response => {
                                return response.json();
                            },
                            error => alert(error))
                        .then(data => {
                            if (data.status === "ok"){
                                document.cookie = "session=" + data.session
                                fetch(urlHost + '/api/user/gettask', {
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
                            }
                        })
                }
            })
    }
    signSubmit(event){

        fetch(urlHost + '/api/user/signin', {
            method: 'POST',
            body: JSON.stringify({
                login: this.state.userValue,
                password: this.state.passValue
            })
        })
            .then(response => {
                   return response.json();
                },
                error => alert(error))
            .then(data => {
                if (data.status === "ok"){
                    document.cookie = "session=" + data.session
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
                }
            })
        //alert("вы вошли")
    }
    handleSubmit(event){
        event.preventDefault();
    }
    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className='reg-window'>

                        <input className="login-field" placeholder="Логин" type="text" value={this.state.userValue} onChange={this.userChange} />

                        <input className="password-field" placeholder="Пароль" type="password" value={this.state.passValue} onChange={this.passwordChange} />

                        <input className="sign-button" type="submit" value="Войти" onClick={this.signSubmit}/>
                        <input className="reg-button" type="submit" value="Зарегистрироваться" onClick={this.regSubmit} />
                    </div>
                </form>
            </div>
        )
    }
}