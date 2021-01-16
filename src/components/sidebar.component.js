import React, { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import jwt from 'jsonwebtoken'

const Sidebar = (props) => {
        {
                const [barStyle, setBarStyle] = useState("show");
                const [timesStyle, setTimesStyle] = useState("hide");
                const [toggleWidth, setWidth] = useState("sidebar-closed");

                const match = useRouteMatch()
                const token = jwt.decode(sessionStorage.token)
                return (
                        <div className="sidebar" id={toggleWidth} onMouseOver={() => { setWidth("sidebar-open"); }} onMouseLeave={() => {
                                setBarStyle("show");
                                setTimesStyle("hide"); setWidth("sidebar-closed");
                        }}>
                                <span className="nav-icon text-white toggle" id={barStyle} ><FontAwesomeIcon icon="bars" onClick={() => {
                                        setTimesStyle("show");
                                        setBarStyle("hide"); setWidth("sidebar-open");
                                }} /></span>
                                <span className="nav-icon text-white toggle" id={timesStyle} ><FontAwesomeIcon icon="times" onClick={() => {
                                        setBarStyle("show");
                                        setTimesStyle("hide"); setWidth("sidebar-closed");
                                }} /></span>
                                {token.role !== 'HR' ? <>
                                        <Link to={`${match.url}/requests`}><span><FontAwesomeIcon className="sidebar-icon" icon="user" /><span className="icon-text">Requests</span></span></Link>
                                        <br></br>
                                        <Link to={`${match.url}/schedule`}><span><FontAwesomeIcon className="sidebar-icon" icon="user" /><span className="icon-text">Schedule</span></span></Link>
                                        <br></br>
                                </> : null}
                                {token.role === 'Head of Department' ? <>
                                        <Link to={`${match.url}/hod-courses`}><span><FontAwesomeIcon className="sidebar-icon" icon="user" /><span className="icon-text">Courses</span></span></Link>
                                        <Link to={`${match.url}/hod-staff-members`}><span><FontAwesomeIcon className="sidebar-icon" icon="user" /><span className="icon-text">Staff members</span></span></Link>
                                </> : null}
                                {token.role === 'Course Instructor' ? <>
                                        <Link to={`${match.url}/ci-courses`}><span><FontAwesomeIcon className="sidebar-icon" icon="user" /><span className="icon-text">Courses</span></span></Link>
                                        <Link to={`${match.url}/staff`}><span><FontAwesomeIcon className="sidebar-icon" icon="user" /><span className="icon-text">Staff members</span></span></Link>
                                </>
                                        : null}
                                {token.role === 'Course Coordinator' ? <>
                                        <Link to={`${match.url}/course-slots`}><span><FontAwesomeIcon className="sidebar-icon" icon="user" /><span className="icon-text">Course Slots</span></span></Link>
                                </> : null}
                                {token.role === 'HR' ? <>
                                        <Link to={`${match.url}/academic-members`}><span><FontAwesomeIcon className="sidebar-icon" icon="user" /><span className="icon-text">Academics</span></span></Link>
                                        <Link to={`${match.url}/hr-members`}><span><FontAwesomeIcon className="sidebar-icon" icon="user" /><span className="icon-text">HR Members</span></span></Link>
                                        <Link to={`${match.url}/courses`}><span><FontAwesomeIcon className="sidebar-icon" icon="user" /><span className="icon-text">Courses</span></span></Link>
                                        <Link to={`${match.url}/departments`}><span><FontAwesomeIcon className="sidebar-icon" icon="user" /><span className="icon-text">Departments</span></span></Link>
                                        <Link to={`${match.url}/faculties`}><span><FontAwesomeIcon className="sidebar-icon" icon="user" /><span className="icon-text">Faculties</span></span></Link>
                                        <Link to={`${match.url}/rooms`}><span><FontAwesomeIcon className="sidebar-icon" icon="user" /><span className="icon-text">Rooms</span></span></Link>
                                </> : null}
                        </div>
                )
        }
}


export default Sidebar;