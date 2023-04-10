import React from "react";
import "../../shared/styles/global.css"
import { Link } from "react-router-dom";
export default function Footer({url, textRight="", textLeft="", embeddedUrl}) {
    return (
        <p className="subTitle">
            {textLeft}<Link to={url} className="embeddedUrl">{embeddedUrl}</Link>{textRight}
        </p>
    )
}