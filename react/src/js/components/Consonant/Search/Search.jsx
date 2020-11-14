import React, {
    useEffect,
    useRef,
} from 'react';
import {
    string,
    bool,
    func,
} from 'prop-types';

import { useConfig } from '../Helpers/hooks';
import { trackClearSearchInput } from '../Analytics/Analytics';

const searchType = {
    name: string,
    value: string,
    autofocus: bool,
    placeholderText: string,
    onSearch: func.isRequired,
};

const defaultProps = {
    name: '',
    value: '',
    autofocus: true,
    placeholderText: '',
};

/**
 * Used as unique id for accessibility labels/attributes
 * @type {Number}
 */
const searchId = 'consonant-search';

/**
 * Search Component (Used in both Top And Left Filter Views)
 *
 * @component
 * @example
 * const props= {
    value: Function,
    onSearch: String,
    name: String,
    autofocus: Boolean,
    placeholderText: String,
 * }
 * return (
 *   <Search {...props}/>
 * )
 */
const Search = ({
    value,
    onSearch,
    name,
    autofocus,
    placeholderText,
}) => {
    const getConfig = useConfig();

    /**
     * Authored Search Title
     * @type {String}
     */
    const leftPanelTitle = getConfig('search', 'i18n.leftFilterPanel.searchTitle');

    /**
     * Refernce to input element
     * @type {HTMLElement}
     */
    const textInput = useRef(null);

    /**
     * Handles search box input changes
     * is clicked
     *
     * @param {InputChangeEvent} e
     * @listens InputChangeEvent
     */
    const handleSearch = (e) => {
        onSearch(e.target.value);
    };

    /**
     * Handles focus events for text input
     *
     * @param {ClickEvent} e
     * @listens ClickEvent
     */
    const focusTextInput = () => {
        textInput.current.focus();
    };

    /**
     * Handles clearing user's search query
     *
     * @param {ClickEvent} e
     * @listens ClickEvent
     */
    const clearSearch = () => {
        onSearch('');
        focusTextInput();
        trackClearSearchInput();
    };

    /**
    * Handles focus for search box
    * @returns {Void} - an updated state
    */
    useEffect(() => {
        if (autofocus && textInput.current) {
            textInput.current.focus();
        }
    }, [autofocus, textInput]);

    return (
        <div
            data-testid={name}
            className="consonant-search">
            <label
                htmlFor={searchId}>
                <span
                    className="consonant-search--input-title">
                    {leftPanelTitle}
                </span>
                <span
                    className="consonant-search--input-wrapper">
                    <input
                        id={searchId}
                        data-testid="search-input"
                        type="search"
                        placeholder={placeholderText}
                        onClick={e => e.stopPropagation()}
                        value={value}
                        onChange={handleSearch}
                        ref={textInput}
                        className="consonant-search--input"
                        required />
                    <button
                        data-testid="clear-search-button"
                        type="button"
                        title=""
                        className="consonant-search--input-clear"
                        onClick={clearSearch}
                        tabIndex="0" />
                </span>
            </label>
        </div>
    );
};

Search.propTypes = searchType;
Search.defaultProps = defaultProps;

export default Search;
