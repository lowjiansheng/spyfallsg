import React from "react";

import { BasicCardContent } from "../../components/BasicCardContent"

export const FrontContent = ({ isDone, handleInitialCardClick}) => {
    if (isDone) {
        return <BasicCardContent message="You're done."/>
    } else {
        return <BasicCardContent
                message="Please click the card."
                onClickCallbackFunction={handleInitialCardClick}
            />
    }
}