import React, { useState } from "react";
import {
    NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../logo192.png";


const handleLogOut = () => {
    sessionStorage.removeItem("token");

}


const Header = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);


    return (
        <div className="d-flex flex-row justify-content-between navbar-border navbar-staff-portal">
            <ul className="nav">
                <NavItem className="nav-item">
                    <a className="nav-link text-white">  <img id="navbar-logo" src={Logo} height="20" width="20" alt="GUC Staff Portal"></img> &nbsp; GUC Staff Portal</a>
                </NavItem>
            </ul>
            <ul className="nav">
                <NavItem>
                    <NavLink className="nav-link" to="/">
                        <span className="nav-icon text-white" href="#" ><FontAwesomeIcon icon="home" /></span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className="nav-link" to="/">
                        <span className="nav-icon text-white" href="#" ><FontAwesomeIcon icon="bell" /></span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <UncontrolledDropdown isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle nav>
                            <span className="nav-icon dropdown-toggle text-white" href="#" ><FontAwesomeIcon icon="user" /></span>
                        </DropdownToggle>
                        <DropdownMenu className="navbar-dropdown">
                            <DropdownItem header className="d-flex justify-content-center">User Name</DropdownItem>
                            <div className="d-flex justify-content-center">
                                <Button className="rounded-circle">M</Button>
                            </div>
                            <br></br>
                            <DropdownItem href="/staff/profile"><FontAwesomeIcon icon="address-card" /> &nbsp; View Profile</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem href="/reset-password"><FontAwesomeIcon icon="key" /> &nbsp; Reset Password</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem href="/login"><span onClick={handleLogOut}></span><FontAwesomeIcon icon="sign-out-alt" /> &nbsp; Log out</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown >
                </NavItem>
            </ul>
        </div>
    )
}

export default Header;