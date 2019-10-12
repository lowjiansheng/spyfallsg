import React from "react";
import { CardContent, Typography, Button } from "@material-ui/core";
import Form from "react-bootstrap/Form";


export const NameCardContent = ({ handleSubmitFunction, handleChangeFunction, nameValue }) => {
    return (
        <CardContent>
            <Form onSubmit={handleSubmitFunction}>
                <Form.Group controlId="formName">
                    <Typography>
                        <Form.Label>Input Name</Form.Label>
                    </Typography>
                    <Form.Control type="text" onChange={handleChangeFunction} value={nameValue}/>
                </Form.Group>
                <div className="d-flex justify-content-center">
                    <Button variant="contained" color="primary" type="submit">Continue</Button>
                </div>
            </Form>

        </CardContent>
    )
}