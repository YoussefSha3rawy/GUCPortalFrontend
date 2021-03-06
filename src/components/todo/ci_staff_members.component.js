import React from "react";
import { Route, withRouter } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../others/axios_instance";
import AcademicList from "../list_components/academic_list.component";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";

class CIacademics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            academics: [],
            departments: [],
            dropDownOpen: false,
            rooms: [],
            courses:[],
            selectedCourse: ""
        }
    }

    toggle() {
        this.setState({dropDownOpen : !this.state.dropDownOpen});
    }

    fetchCourses() {
        axiosInstance.get("/fe/get-ci-courses", {
            cancelToken: this.axiosCancelSource.token,
            headers: {
                token: sessionStorage.getItem("token")
            }
        })
            .then(res => {
                this.setState({
                    courses: res.data
                });
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response);
                }
                else if (error.request) {
                    console.log(error.request);
                }
                else {
                    console.log(error.message);
                }
                console.log(error);
            });
    }

    fetchAcademics() {
        axiosInstance.get("/ci/view-staff", {
            cancelToken: this.axiosCancelSource.token,
            headers: {
                token: sessionStorage.getItem("token")
            }
        })
            .then(res => {
                this.setState({
                    academics: res.data.staff,
                    departments: res.data.departments,
                    rooms: res.data.rooms
                });
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response);
                }
                else if (error.request) {
                    console.log(error.request);
                }
                else {
                    console.log(error.message);
                }
                console.log(error);
            });
    }

    componentDidMount() {
        this.axiosCancelSource = axios.CancelToken.source();
        this.fetchCourses();
        this.fetchAcademics();
    }

    componentWillUnmount() {
        this.axiosCancelSource.cancel("Operation canceled by the user");
    }

    getAcademic(academicID) {
        const academics = this.state.academics;
        for (let i = 0; i < academics.length; i++) {
            if (academics[i].id === academicID)
                return academics[i];
        }
        return { id: "", name: "", salary: "", dayOff: "", gender: "", role: "", email: "" }
    };

    getDepartment(academicID) {
        const academics = this.state.academics;
        const departments = this.state.departments;
        for (let i = 0; i < academics.length; i++) {
            if (academics[i].id === academicID)
                return departments[i];
        }
        return { department: "" }
    };

    getRoom(academicID) {
        const academics = this.state.academics;
        const rooms = this.state.rooms;
        for (let i = 0; i < academics.length; i++) {
            if (academics[i].id === academicID)
                return rooms[i];
        }
        return { room: "" }
    };

    render() {
        return (
            <div>
               <Route exact path={`${this.props.match.path}`}>
                    <Dropdown isOpen={this.state.dropDownOpen} toggle={()=>this.toggle()}>
                        <DropdownToggle>
                            {this.state.selectedCourse ? this.state.courses.filter(course=>course._id===this.state.selectedCourse)[0].id : "filter by course"}
                        </DropdownToggle>
                        <DropdownMenu>
                            {this.state.courses.map(course => <DropdownItem onClick={() => this.setState({ selectedCourse: course._id })}>{course.name}</DropdownItem>)}
                        </DropdownMenu>
                    </Dropdown>
                    <AcademicList academics={this.state.academics.filter(academic=>!this.state.selectedCourse || this.state.courses.filter(course=>course._id===this.state.selectedCourse)[0].courseInstructors.includes(academic.id) || this.state.courses.filter(course=>course._id===this.state.selectedCourse)[0].teachingAssistants.includes(academic.id))} departments={this.state.departments} rooms={this.state.rooms} role="ci" />
                </Route>
                {/* <Route exact path={`${this.props.match.path}/update/:id`}
                    render={routeProps => (
                        <AcademicForm academicMember={this.getAcademic(routeProps.match.params.id)} department={this.getDepartment(routeProps.match.params.id)} office={this.getRoom(routeProps.match.params.id)} updateAcademics={this.fetchAcademics()} formType="update" />
                    )} />
                <Route exact path={`${this.props.match.path}/delete/:id`}
                    render={routeProps => (
                        <DeleteAcademic academicMember={this.getAcademic(routeProps.match.params.id)} updateAcademics={this.fetchAcademics()} />
                    )} /> */}
            </div>
        )
    }
}

export default withRouter(CIacademics);