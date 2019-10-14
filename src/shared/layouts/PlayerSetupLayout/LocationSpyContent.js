import React from "react";
import { CardContent, Typography, Button } from "@material-ui/core";

import { makeStyles } from '@material-ui/styles';

export const LocationSpyContent = ({handleLocationSpyRevealClick, location, isSpy}) => {
    const classes = useStyles();

    var displayContent;
    if (isSpy) { 
        displayContent = <span>You are a Spy.</span>
    } else {
        displayContent = <span>The location is {location}.</span>
    }
    return (
        <CardContent className={classes.cardContent}>
            <Typography className={classes.typographyAlign} variant="body2">
                {displayContent}
            </Typography>
            <Typography className={classes.typographyAlign} variant="body2">
                <Button variant="contained" color="primary" onClick={handleLocationSpyRevealClick}>Done</Button>
            </Typography>
        </CardContent> 
    )
}

const useStyles = makeStyles({
    cardContent: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    root: {
        flex: 1,
        display: "flex",
        justifyContent: "center"
    },
    typographyAlign:{
        alignSelf: "center",
        margin: "5%"
    },
    typographyStyle: {
        margin: "5%"
    }
});
