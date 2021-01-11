import React from "react";
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import Profile from "./profile.component";
import Requests from "./requests.component";
import Schedule from "./schedule.component";
import HODCourses from "./hod_courses.component";
import HRrooms from './hr_rooms.component';
import HRacademics from './hr_academics.component';
import HRfaculty from './hr_faculty.component';
import HRdepartments from './hr_departments.component';
import RoomForm from "./room_form.component";

class HomePage extends React.Component {
    render() {
        const room = {
            "name": "",
            "capacity": "",
            "type": "",
        };

        const room1 = {
            "_id": "5fe66c8538f6263350cacc00",
            "name": "C7.305",
            "capacity": 10,
            "remainingCapacity": 5,
            "type": "Office",
            "__v": 0
        };

        return (
            <div>
                <div>
                    <h1>Welcome</h1>
                    <Link to={`${this.props.match.url}/profile`}>Profile</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to={`${this.props.match.url}/requests`}>Requests</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to={`${this.props.match.url}/schedule`}>Schedule</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to={`${this.props.match.url}/hod-courses`}>HOD courses</Link>
                    <br />
                    <Link to={`${this.props.match.url}/hr-rooms`}>HR rooms</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to={`${this.props.match.url}/hr-academics`}>HR academics</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to={`${this.props.match.url}/hr-faculties`}>HR faculties</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to={`${this.props.match.url}/hr-departments`}>HR departments</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to={`${this.props.match.url}/hr-add-room`}>HR add room</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to={`${this.props.match.url}/hr-update-room`}>HR update room</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <br /><br />
                </div>
                <Router>
                    <Route exact path={`${this.props.match.path}/profile`}> <Profile /> </Route>
                    <Route exact path={`${this.props.match.path}/requests`}> <Requests/> </Route>
                    <Route exact path={`${this.props.match.path}/schedule`}> <Schedule/> </Route>
                    <Route exact path={`${this.props.match.path}/hod-courses`}> <HODCourses /> </Route>
                    <Route exact path={`${this.props.match.path}/hr-rooms`}> <HRrooms /> </Route>
                    <Route exact path={`${this.props.match.path}/hr-academics`}> <HRacademics /> </Route>
                    <Route exact path={`${this.props.match.path}/hr-faculties`}> <HRfaculty /> </Route>
                    <Route exact path={`${this.props.match.path}/hr-departments`}> <HRdepartments /> </Route>
                    <Route exact path={`${this.props.match.path}/hr-add-room`}> <RoomForm room={room} formType="add" /> </Route>
                    <Route exact path={`${this.props.match.path}/hr-update-room`}> <RoomForm room={room1} formType="update" /> </Route>
                </Router>
            </div>
        )
    }
}

export default withRouter(HomePage);