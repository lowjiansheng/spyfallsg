import { CardContent, Typography } from "@material-ui/core"
import React from "react";

import { makeStyles } from '@material-ui/styles';

export const BasicCardContent = ({message, onClickCallbackFunction}) => {
    const classes = useStyles();
    
    return (
        <CardContent height="100%" className={classes.root} onClick={onClickCallbackFunction}>
            <Typography color="textSecondary" className={classes.typographyAlign} variant="body2">
                {message}
            </Typography>
        </CardContent>
        )
}

const useStyles = makeStyles({
    root: {
        flex: 1,
        display: "flex",
        justifyContent: "center"
    },
    typographyAlign:{
        alignSelf: "center"
    }
});
