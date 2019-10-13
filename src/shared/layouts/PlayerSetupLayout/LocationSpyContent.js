import React from "react";
import { CardContent, Typography, Button } from "@material-ui/core";

export const LocationSpyContent = ({handleLocationSpyRevealClick, location, isSpy}) => {
    var displayContent;
    if (isSpy) { 
        displayContent = <span>You are a Spy.</span>
    } else {
        displayContent = <span>The location is {location}.</span>
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