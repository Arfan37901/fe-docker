import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Footer } from './Footer';
import { Items } from './Items';

import { stopPropagation } from '../../Helpers/general';

import {
    useConfig,
    useExpandable,
} from '../../Helpers/hooks';

/**
 * Minimum quantity of the top filter options to apply blur on options' wrapper
 * @type {Number}
 */
const clipWrapperItemsCount = 9;

/**
 * Top filter
 *
 * @component
 * @example
 * const props= {
    name: String,
    id: String,
    items: Array,
    numItemsSelected: Number,
    onCheck: Function,
    onClearAll: Function,
    results: Number,
    clearFilterText: String,
 * }
 * return (
 *   <Group {...props}/>
 * )
 */
const Group = (props) => {
    const {
        name,
        id,
        items,
        numItemsSelected,
        onCheck,
        onClearAll,
        results,
        clearFilterText,
    } = props;

    const getConfig = useConfig();

    /**
     **** Authored Configs ****
     */
    const mobileGroupTotalResultsText =
        getConfig('filterPanel', 'i18n.topPanel.mobile.group.totalResultsText').replace('{total}', results);
    const mobileGroupApplyBtnText = getConfig('filterPanel', 'i18n.topPanel.mobile.group.applyBtnText');
    const mobileGroupDoneBtnText = getConfig('filterPanel', 'i18n.topPanel.mobile.group.doneBtnText');

    /**
     **** Hooks ****
     */

    /**
     * @typedef {String} openDropdownState -  Id of the top filter
     * @description — defined in the component props
     *
     * @typedef {Function} ToggleSetter - Handles toggling opened/closed state of
     * the top filter
     * @description
     *
     * @type {[String, Function]} openDropdown
     */
    const [openDropdown, handleToggle] = useExpandable(id);

    /**
     **** Constants ****
     */

    /**
     * Whether the top filter is opened
     * @type {Boolean}
     */
    const isOpened = openDropdown === id;

    /**
     * Whether at least one top filter option is selected
     * @type {Boolean}
     */
    const atleastOneItemSelected = numItemsSelected > 0;

    /**
     * Text of the top filter footer button:
     * whether the "Apply changes" text should be shown or "Done"
     * @type {String}
     */
    const mobileFooterBtnText =
        atleastOneItemSelected ? mobileGroupApplyBtnText : mobileGroupDoneBtnText;

    /**
     * Handles unselection of the top filter options
     * when the "Clear filter options" link is clicked
     * @param {ClickEvent} e
     * @listens ClickEvent
     */
    const handleClear = (e) => {
        e.stopPropagation();
        onClearAll(id);
    };

    /**
     * Handles toggling the selected/unselected state of the top filter option
     * when the filter option is checked/unchecked
     * @param {ChangeEvent} e
     * @listens ChangeEvent
     */
    const handleCheck = (e) => {
        e.stopPropagation();
        onCheck(id, e.target.value, e.target.checked);
    };

    /**
     * Array of the top filter selected options
     * @type {Array}
     */
    const selectedFilters = items.filter(item => item.selected);

    /**
     * Whether at least one top filter option is selected
     * @type {Boolean}
     */
    const atleastOneFilterSelected = selectedFilters.length > 0;

    /**
     * Text indicating the quantity of the selected top filter options
     * @type {String}
     */
    const selectedItemQtyText = selectedFilters.length > 0 ? `${selectedFilters.length}` : '';

    /**
     * Whether the top filter is opened
     * @type {Boolean}
     */
    const filterGroupOpened = isOpened;

    /**
     * Whether the top filter is closed
     * @type {Boolean}
     */
    const filterGroupNotOpened = !isOpened;

    /**
     * Whether the top filter options should be blurred at the bottom of the parent container
     * @type {Boolean}
     */
    const shouldClipFilters = items.length >= clipWrapperItemsCount;

    /**
     * Class name for the top filter:
     * whether the top filter is opened
     * whether the top filter contains at least one selected option
     * @type {String}
     */
    const containerClassname = classNames({
        'consonant-top-filter': true,
        'consonant-top-filter_opened': filterGroupOpened,
        'consonant-top-filter_selected': atleastOneFilterSelected && filterGroupNotOpened,
    });

    return (
        <div
            data-testid="filter-item"
            className={containerClassname}>
            <div
                className="consonant-top-filter--inner">
                <h3
                    className="consonant-top-filter--name">
                    <button
                        type="button"
                        className="consonant-top-filter--link"
                        data-testid="filter-group-btn"
                        onClick={handleToggle}
                        tabIndex="0">
                        {name}
                        <span
                            className="consonant-top-filter--selcted-items-qty">
                            {selectedItemQtyText}
                        </span>
                    </button>
                </h3>
                <div
                    className="consonant-top-filter--selcted-items">
                    <div
                        className="consonant-top-filter--absolute-wrapper">
                        {<Items
                            clipWrapperItemsCount={clipWrapperItemsCount}
                            handleCheck={handleCheck}
                            stopPropagation={stopPropagation}
                            items={items} />
                        }
                        {shouldClipFilters &&
                            <aside
                                className="consonant-top-filter--bg" />
                        }
                        {<Footer
                            mobileFooterBtnText={mobileFooterBtnText}
                            handleToggle={handleToggle}
                            clearFilterText={clearFilterText}
                            handleClear={handleClear}
                            numItemsSelected={numItemsSelected}
                            mobileGroupTotalResultsText={mobileGroupTotalResultsText} />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

Group.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onCheck: PropTypes.func.isRequired,
    onClearAll: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    numItemsSelected: PropTypes.number,
    results: PropTypes.number.isRequired,
    clearFilterText: PropTypes.string,
};

Group.defaultProps = {
    numItemsSelected: 0,
    clearFilterText: '',
};

/* eslint-disable-next-line import/prefer-default-export */
export { Group };
