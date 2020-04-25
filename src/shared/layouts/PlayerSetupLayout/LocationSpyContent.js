import React from "react";
import { CardContent, CardActionArea, CardMedia, Typography, Button } from "@material-ui/core";

import { makeStyles } from '@material-ui/styles';
import LOCATIONS from "../../constants/locations";

export const LocationSpyContent = ({handleLocationSpyRevealClick, location, isSpy}) => {
    const classes = useStyles();

    var displayContent;
    var displayImagePath;
    if (isSpy) { 
        displayContent = <span>You are a <b>Spy</b>.</span>
        displayImagePath = ""
    } else {
        displayContent = <span>The location is <b>{location}</b>.</span>
        displayImagePath = LOCATIONS.find(locationC => locationC.name === location).image
        console.log(displayImagePath)
    }
    return (
        <CardActionArea>
            <CardMedia
                component="img"
                alt="Image for Card"
                height="180"
                image= {displayImagePath}
                title="Image for Card"
            />
            <CardContent className={classes.cardContent}>
                <Typography className={classes.typographyAlign} variant="body2">
                    {displayContent}
                </Typography>
                <Typography className={classes.typographyAlign} variant="body2">
                    <Button variant="contained" color="primary" onClick={handleLocationSpyRevealClick}>Done</Button>
                </Typography>
            </CardContent> 
        </CardActionArea>
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
