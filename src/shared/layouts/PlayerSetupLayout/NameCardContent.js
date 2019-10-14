import React from "react";
import { CardContent, Typography, Button } from "@material-ui/core";
import Form from "react-bootstrap/Form";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    root: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
        justifyContent: "center"
    }
});

export const NameCardContent = ({ handleSubmitFunction, handleChangeFunction, nameValue }) => {
    const classes = useStyles();
    return (
        <CardContent className={classes.root}>
            <Form onSubmit={handleSubmitFunction} className="form-main">
                <Form.Group controlId="formName" className="form-group">
                    <Typography >
                        <Form.Label>What's your name?</Form.Label>
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