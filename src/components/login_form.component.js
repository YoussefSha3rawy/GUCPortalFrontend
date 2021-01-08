import React from "react";
import axios from "../axios";
import { useFormik } from "formik";

const LoginForm = () => {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: values => {
            axios.post("/staff/login", {
                "email": values.email,
                "password": values.password
            })
            .then(res => {
                alert(res.data);
                console.log(res.headers["token"]);
            })
            .catch(err => {
                if (err.response) {
                    alert(err.response.data);
                    console.log(err.response);
                  }
                  else if (err.request) {
                    console.log(err.request);
                  }
                  else {
                    console.log('Error', err.message);
                  }
            });
        },
    });
    
    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">Email Address</label><br/>
            <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
            /><br/>
            <label htmlFor="password">Password</label><br/>
            <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
            /><br/>
            <button type="submit">Submit</button>
        </form>
    );
};

// class LoginForm extends React.Component {
//     render() {
//         return (
//             <div>
//                 <h1>Login Form</h1>
//                 <Formik></Formik>
//             </div>
//         );
//     }
// }

export default LoginForm;