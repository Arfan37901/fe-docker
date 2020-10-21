import React from 'react';
import PropTypes from 'prop-types';

function LinkWithIcon({
    href, openInNewTab, linkHint, text, src, srcAltText,
}) {
    return (
        <a
            href={href}
            data-testid="link-with-icon"
            target={openInNewTab ? '_blank' : '_self'}
            className="consonant-link-with-ico-infobit"
            title={linkHint}
            rel="noreferrer"
            tabIndex="0">
            {src && <img src={src} alt={srcAltText} loading="lazy" height="18" />}
            <span>{text}</span>
        </a>
    );
}

LinkWithIcon.propTypes = {
    href: PropTypes.string,
    text: PropTypes.string,
    src: PropTypes.string,
    openInNewTab: PropTypes.bool,
    linkHint: PropTypes.string,
    srcAltText: PropTypes.string,
};

LinkWithIcon.defaultProps = {
    href: '',
    text: '',
    src: '',
    openInNewTab: true,
    linkHint: '',
    srcAltText: '',
};

export default LinkWithIcon;
