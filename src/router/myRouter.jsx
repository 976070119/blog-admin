import React, { useEffect } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { getUser } from '../redux/actions';
import { connect } from 'react-redux';

var status = false;
function MyRouter(props) {

    // function getCookie(cname) {
    //     var name = cname + "=";
    //     var ca = document.cookie.split(';');
    //     for (var i = 0; i < ca.length; i++) {
    //         var c = ca[i].trim();
    //         if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    //     }
    //     return "";
    // }
    useEffect(() => {
        props.getUser();
    }, []);

    useEffect(() => {
        if(!props.user.data) return;
        if (props.user.success === 'true') {
            // setStatus(true);
            status = true;
        };
    }, [props.user]);

    // var userId = getCookie('userid');
    return (
        <div>
            {
                status ? <Route {...props} ></Route> : <Redirect to="/login"></Redirect>
            }
        </div>
    )
}
export default connect(
    state => ({ user: state.user }),
    { getUser }
)(withRouter(MyRouter))