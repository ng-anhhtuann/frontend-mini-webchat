import React from 'react';
import '../styles/global.scss';
import { Link } from 'react-router-dom';
export default function Footer({
    url,
    textRight = '',
    textLeft = '',
    embeddedUrl,
}) {
    return (
        <p className="subTitle">
            {textLeft}
            <Link to={url} className="embeddedUrl">
                {embeddedUrl}
            </Link>
            {textRight}
        </p>
    );
}
