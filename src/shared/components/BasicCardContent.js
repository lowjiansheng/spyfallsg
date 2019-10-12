import { CardContent, Typography } from "@material-ui/core"
import React from "react";


export const BasicCardContent = ({message, onClickCallbackFunction}) => {
    return (
        <CardContent onClick={onClickCallbackFunction}>
            <Typography color="textSecondary" variant="body2">
                {message}
            </Typography>
        </CardContent>
        )
}