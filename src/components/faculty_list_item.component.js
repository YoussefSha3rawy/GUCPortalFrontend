import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Button } from "reactstrap";

const FacultyListItem = (props) => {
    const match = useRouteMatch();

    const customButtons = () => {
        switch (props.role) {
            case "hr":
                return (
                    <>
                        <td>
                            <Link to={`${match.url}/update/${props.faculty.name}`}>
                                <Button className="bg-info">Update faculty</Button>
                            </Link>
                        </td>
                        <td>
                            <Link to={`${match.url}/delete/${props.faculty.name}`}>
                                <Button className="bg-danger">Delete faculty</Button>
                            </Link>
                        </td>
                    </>
                );
            default: return <></>;
        }
    };

    return (
        <tr className="table-row">
            <td>{props.faculty.name}</td>
            {customButtons()}
        </tr>
    );
};

export default FacultyListItem;