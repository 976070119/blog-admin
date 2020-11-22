import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function myRouter(props) {

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
        }
        return "";
    }

    var userId = getCookie('userid');
    return (
        <div>
            {
                userId ? <Route {...props} ></Route> : <Redirect to="/login"></Redirect>
            }
        </div>
    )
}