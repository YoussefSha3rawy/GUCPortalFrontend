import React, { useEffect, useState } from "react";
import { Button, Input, Label } from "reactstrap";
import Axios from "../axios";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage, useField, useFormikContext } from "formik"

const DayOffChangeComponent = ({ }) => {

    const placeholders = {
        dayoff: "Day",
        reason: "Reason"
    }

    const initialValues = {
        dayoff: "",
        reason: ""
    }

    const validationSchema = Yup.object({
        dayoff: Yup.string()
            .required("This field is required")
            .oneOf(['Saturday', 'Monday', 'Sunday', 'Tuesday', 'Wednesday', 'Thursday'], "Invalid day"),
        reason: Yup.string()
    });

    const handleSubmit = values => {
        Axios({
            method: "post",
            url: `/academic/change-day-off-request`,
            headers: {
                token: sessionStorage.getItem("token")
            },
            data: {
                dayOff: values.dayoff,
                reason: values.reason
            }
        })
            .then(response => {
                document.getElementById("room-form-error-message").innerHTML = response.data;
                console.log(response.data);
            })
            .catch(error => {
                if (error.response) {
                    document.getElementById("room-form-error-message").innerHTML = error.response;
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

    return (<>
        <Formik
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            initialValues={initialValues}
        >
            {formikProps => (
                <Form>
                    <Label for="dayoff">Day off:</Label>
                    <Field name="dayoff" as="select" placeholder={placeholders.dayoff}
                        onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)}>
                        <option disabled value="">Day off</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                    </Field>
                    <div className="form-input-error-message">
                        <ErrorMessage name="dayoff" />
                    </div>
                    <Label for="reason">Reason:</Label>
                    <Field name="reason" type="textarea" placeholder={placeholders.reason}
                        onFocus={(e) => handleFocus(e)} onBlur={(e) => handleBlur(e, formikProps)} />
                    <div className="form-input-error-message">
                        <ErrorMessage name="reason" />
                    </div>
                    <div>
                        <Button type="submit">Send request</Button>
                    </div>
                    <div className="form-error-message" id="room-form-error-message"></div>
                </Form>
            )}
        </Formik>
    </>
    )
}

export default DayOffChangeComponent