import React, { useState, useEffect } from "react"
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody } from "reactstrap"
import Axios from "../others/axios_instance"
import jwt from "jsonwebtoken"
import SlotTableComponent from "./SlotTable.component"

const ViewTeachingAssignmentsComponent = () => {
    const [courses, setCourses] = useState([])
    const [course, setCourse] = useState("")
    const [slots, setSlots] = useState([])
    const [modalOpen,setModalOpen]=useState(false)
    const [active,setActive]=useState("")
    const [dropdownOpen,setDropdownOpen]=useState(false)

    const toggleDropdown = ()=>setDropdownOpen(!dropdownOpen)

    const toggle = (id)=>{setActive(id);setModalOpen(!modalOpen)}

    useEffect(() => {
        Axios.get("/fe/get-academic-department", {
            headers: {
                token: sessionStorage.token
            }
        }).then(() => Axios.get("/fe/get-courses-by-department", {
            headers: {
                token: sessionStorage.token
            }
        })).then(res => setCourses(res.data.courses))
    }, [])

    const getCourseSlots = (id) => {
        Axios.get("fe/course-slots", {
            headers: {
                token: sessionStorage.token
            },
            params: {
                id: id
            }
        }).then(res => setSlots(res.data)).catch(err => console.log(err))
    }



    return <>
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle>
                {course ? courses.filter(cou => cou.id === course)[0].name : "Choose course"}
            </DropdownToggle>
            <DropdownMenu>
                {courses.map(course => <DropdownItem onClick={() => getCourseSlots(course.id)} key={course._id}>{course.name}</DropdownItem>)}
            </DropdownMenu>
        </Dropdown>
        <SlotTableComponent slots={slots} active={active} onClick={toggle} />
        <Modal isOpen={modalOpen} toggle={toggle}>
            <ModalBody>
                {slots.filter(slot => slot._id === active).map(slot => {
                    return <ul key="slot._id" className="unstyled">
                        <li key="k1">Slot: {slot.slotNumber}</li>
                        <li key="k2">Day: {slot.day}</li>
                        <li key="k3">Course: {slot.course}</li>
                        <li key="k4">Room: {slot.room}</li>
                        <li key="k5">Academic Member: {slot.staffMember}</li>
                    </ul>
                })}
            </ModalBody>
        </Modal>
    </>
}

export default ViewTeachingAssignmentsComponent