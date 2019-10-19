import React from "react";

import { NameCardContent } from './NameCardContent';
import { LocationSpyContent } from './LocationSpyContent';

export const BackContent = ({
    setupPlayerNames, 
    handleSubmitFunction, 
    handleChangeFunction, 
    formValidated,
    nameValue, 
    handleLocationSpyRevealClick, 
    location, 
    isSpy}) => {
    if (setupPlayerNames) {
        return <NameCardContent
                handleSubmitFunction={handleSubmitFunction}
                handleChangeFunction={handleChangeFunction}
                formValidated={formValidated}
                nameValue={nameValue}/>
    } else {
        return <LocationSpyContent
                handleLocationSpyRevealClick={handleLocationSpyRevealClick}
                location={location}
                isSpy={isSpy}/>
    }
}