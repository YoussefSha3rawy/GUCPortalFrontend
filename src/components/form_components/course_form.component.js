import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../../others/axios_instance";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "reactstrap";

const CourseForm = props => {
    const [message, setMessage] = useState("");
    const [messageStyle, setMessageStyle] = useState("");
    const axiosCancelSource = axios.CancelToken.source();

    const componentDidMount = () => {
        return () => {
            axiosCancelSource.cancel("Operation canceled by the user");
        }
    };
    useEffect(componentDidMount, []);

    const placeholders = {
        id: "ID",
        name: "Course name",
        department: "Department"
    }

    const initialValues = {
        id: props.course.id,
        name: props.course.name,
        department: props.department
    }

    const validationSchema = Yup.object({
        id: Yup.string()
            .required("This field is required"),
        name: Yup.string()
            .required("This string is required"),
        department: Yup.string()
    });

    const handleSubmit = async values => {
        await axiosInstance({
            method: props.formType === "add" ? "post" : "put",
            url: `/hr/${props.formType}-course${props.formType === "add" ? "" : `/${props.course.id}`}`,
            cancelToken: axiosCancelSource.token,
            headers: {
                token: sessionStorage.getItem("token")
            },
            data: {
                id: values.id,
                name: values.name,
                department: values.department
            }
        })
            .then(response => {
                setMessageStyle("form-success-message");
                setMessage(response.data);
                props.updateCourses();
            })
            .catch(error => {
                if (error.response) {
                    setMessageStyle("form-error-message");
                    setMessage(error.response.data);
                    console.log(error.response);
                }
                else if (error.request) {
                    console.log(error.request);
                }
                else {
                    console.log(error.message);
                }
            });
    };

    const handleFocus = (e) => {
        e.target.placeholder = "";
    };

    const handleBlur = (e, formikProps) => {
        e.target.placeholder = placeholders[e.target.name];
        formikProps.setFieldTouched(e.target.name);
    };

    return (
        <div className="input-form course-form rounded-border container">
            <div className="pt-3 pb-3">
                <Formik className="row"
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {formikProps => (
                        <Form>
                            <label className="form-input-label col-sm-4" htmlFor="id">Course ID</label>
                            <Field className="rounded form-input-border col-sm-8" name="id" placeholder={placeholders.id}
                                onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                            <div className="form-input-error-message">
                                <ErrorMessage name="id" />
                            </div>
                            <label className="form-input-label col-sm-4" htmlFor="name">Course name</label>
                            <Field className="rounded form-input-border col-sm-8" name="name" placeholder={placeholders.name}
                                onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                            <div className="form-input-error-message">
                                <ErrorMessage name="name" />
                            </div>
                            <label className="form-input-label col-sm-4" htmlFor="department">Department</label>
                            <Field className="rounded form-input-border col-sm-8" name="department" placeholder={placeholders.department}
                                onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                            <div className="form-input-error-message">
                                <ErrorMessage name="department" />
                            </div>
                            <div className="form-button-div mb-2">
                                <Button className="rounded bg-info" type="submit" disabled={formikProps.isSubmitting}>{props.formType === "add" ? "Add course" : "Update course"}</Button>
                            </div>
                            <div className={messageStyle}>{message}</div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );

};

export default CourseForm;