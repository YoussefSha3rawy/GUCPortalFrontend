import React from "react";
import axios from "../axios"
import HRHoursRecord from "./hr_hour_item.component"
import {Dropdown, DropdownItem, DropdownToggle, DropdownMenu} from "reactstrap"


  export default class HRHours extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {records: [],
        dropdownOpen: false,
        dropdownOpenY: false,
        month:null,
        year:null};
    }

    componentDidMount() {
        axios({
          method:"get",
          url:"/hr/view-staff-missing-hours" ,
          headers: {
            "token": sessionStorage.token
        }, 
          params: {
            month:this.state.month,
            year:this.state.year
          }
        })
          .then(res => {
            
            let x = res.data
            console.log(x);
            this.setState({ records: res.data })
          })
          .catch((error) => {
            console.log(error);
          })
      }

      updateSelection() {
        axios({
          method:"get",
          url:"/hr/view-staff-missing-hours" ,
          headers: {
            "token": sessionStorage.token
        }, 
          params: {
                month:this.state.month,
                year:this.state.year
          }
        })
          .then(res => {
            console.log(res.data);
            this.setState({ records: res.data })
          })
          .catch((error) => {
            console.log(error);
          })
      }



      toggleDropDown() {
        this.setState({ dropdownOpen: !this.state.dropdownOpen })
    }

    toggleDropDownY() {
      this.setState({ dropdownOpenY: !this.state.dropdownOpenY })
  }

      hoursList() {
        console.log(typeof this.state.records);
        if(typeof this.state.records ==="object"){
        console.log(this.state.records);
        return this.state.records.map((currentRecord) => {
            return <HRHoursRecord key={currentRecord._id} records={currentRecord} />;
        })
      }
      else return [];
    }


    render() {
        return (
          <div>
            <div className="row">
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={() => this.toggleDropDown()}>
                            <DropdownToggle caret>
                                Month
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => { this.setState({ month: 1 });this.updateSelection() }}>1</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { this.setState({ month: 2 }) }}>2</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { this.setState({ month: 3 }) }}>3</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { this.setState({ month: 4 }) }}>4</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { this.setState({ month: 5 }) }}>5</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { this.setState({ month: 6 }) }}>6</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { this.setState({ month: 7 }) }}>7</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { this.setState({ month: 8 }) }}>8</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { this.setState({ month: 9 }) }}>9</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { this.setState({ month: 10 }) }}>10</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { this.setState({ month: 11 }) }}>11</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { this.setState({ month: 12 }); this.updateSelection()}}>12</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div className="row">
                        <Dropdown isOpen={this.state.dropdownOpenY} toggle={() => this.toggleDropDownY()}>
                            <DropdownToggle caret>
                                Year
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => { this.setState({ year: 2016 }) }}>2016</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { this.setState({ year: 2017 }) }}>2017</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { this.setState({ year: 2018 }) }}>2018</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { this.setState({ year: 2019 }) }}>2019</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { this.setState({ year: 2020 }); this.updateSelection() }}>2020</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => { this.setState({ year: 2021 }); this.updateSelection() }}>2021</DropdownItem>
                                <DropdownItem divider />
                            </DropdownMenu>
                        </Dropdown>
                    </div>
            <div>
              <h3>Missing Hours</h3>
              <table className="table">
                <thead className="thead-light">
                  <tr>
                  <th>ID</th>
                  <th>Missing Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {this.hoursList()}
                </tbody>
              </table>
            </div>
          </div>
        )
      }
  }
