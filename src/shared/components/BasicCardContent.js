import { CardContent, Typography } from "@material-ui/core"
import React from "react";

import { makeStyles } from '@material-ui/styles';

export const BasicCardContent = ({message, onClickCallbackFunction}) => {
    const classes = useStyles();
    
    return (
        <CardContent height="100%" className={classes.root} onClick={onClickCallbackFunction}>
            <Typography color="textSecondary" variant="body2">
                {message}
            </Typography>
        </CardContent>
        )
}

const useStyles = makeStyles({
    root: {
        height: "inherit"
    },
});
