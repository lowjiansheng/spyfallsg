import React from "react";
import { CardContent, Typography, Button } from "@material-ui/core";

export const LocationSpyContent = ({handleLocationSpyRevealClick, location, isSpy}) => {
    var displayContent;
    if (isSpy) { 
        displayContent = <p>You are a Spy.</p>
    } else {
        displayContent = <p>The location is {location}.</p>
    }
    return (
        <CardContent>
            <Typography className="d-flex p2" variant="body2">
                {displayContent}
            </Typography>
            <Typography className="d-flex p2 justify-content-center" variant="body2">
                <Button variant="contained" color="primary" onClick={handleLocationSpyRevealClick}>Done</Button>
            </Typography>
        </CardContent> 
    )
}