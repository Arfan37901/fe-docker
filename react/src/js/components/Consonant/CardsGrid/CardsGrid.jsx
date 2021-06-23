
import React from 'react';
import {
    func,
    shape,
    number,
    arrayOf,
} from 'prop-types';

import FullCard from '../Cards/Full';
import { cardType } from '../types/card';
import { getByPath } from '../Helpers/general';
import { useConfig } from '../Helpers/hooks';
import ThreeFourthCard from '../Cards/ThreeFourth';
import OneHalfCard from '../Cards/OneHalf';
import {
    CARD_STYLES,
    DEFAULT_SHOW_ITEMS_PER_PAGE,
} from '../Helpers/constants';


const cardsGridType = {
    pages: number,
    resultsPerPage: number,
    cards: arrayOf(shape(cardType)),
    onCardBookmark: func.isRequired,
};

const defaultProps = {
    pages: 1,
    cards: [],
    resultsPerPage: DEFAULT_SHOW_ITEMS_PER_PAGE,
};

/**
 * Contains a grid of cards (of different styles)
 *
 * @component
 * @example
 * const props= {
    resultPerPage: Int,
    pages: Int,
    onCardBookmark: Boolean,
    cards: [],
 * }
 * return (
 *   <CardsGrid {...props}/>
 * )
 */
const CardsGrid = (props) => {
    const {
        resultsPerPage,
        pages,
        onCardBookmark,
        cards,
    } = props;

    /**
     **** Authored Configs ****
     */
    const getConfig = useConfig();
    const collectionStyleOverride = getConfig('collection', 'cardStyle');
    const cardsGridLayout = getConfig('collection', 'layout.type');
    const cardsGridGutter = getConfig('collection', 'layout.gutter');
    const dateFormat = getConfig('collection', 'i18n.prettyDateIntervalFormat');
    const customCardTemplate = getConfig('collection', 'customCard');
    const locale = getConfig('language', '');
    const paginationType = getConfig('pagination', 'type');


    /**
     * Class name for the cards grid:
     * whether the grid should show 2, 3, 4 or 5 cards in a row;
     * whether the grid should have a gutter of 8px, 16px, 24px or 32px;
     * @type {String}
     */
    const gridClass = `
        consonant-CardsGrid
        consonant-CardsGrid--${cardsGridLayout}
        consonant-CardsGrid--with${cardsGridGutter}Gutter`;

    /**
     * Whether the paginator component is being used
     * @type {Boolean}
     */
    const isPaginator = paginationType === 'paginator';
    const isLoadMore = paginationType === 'loadMore';

    /**
     * Total pages to show (used if paginator component is set)
     * @type {Number}
     */
    const totalPages = resultsPerPage * pages;

    /**
     * The final cards to show in the collection
     * @type {Array}
     */
    let cardsToshow = cards;

    /**
     * Current page (used if paginator component is authored)
     * @type {Number}
     */
    const currentPage = resultsPerPage * (pages - 1);

    if (isPaginator) {
        cardsToshow = cards.slice(currentPage, totalPages);
    }

    /**
     * Current page (used if load more button is authored)
     * @type {Number}
     */
    if (isLoadMore) {
        cardsToshow = cards.slice(0, resultsPerPage * pages);
    }

    function createMarkup(card) {
        const custumHtml = customCardTemplate(card);
        return { __html: custumHtml };
    }


    return cardsToshow.length > 0 && (
        <div
            data-testid="consonant-CardsGrid"
            className={gridClass}>
            {cardsToshow.map((card, index) => {
                const cardStyleOverride = getByPath(card, 'styles.typeOverride');
                const cardStyle = collectionStyleOverride || cardStyleOverride;

                if (cardStyle === CARD_STYLES.FULL) {
                    return (
                        <FullCard
                            lh={`Card ${index} | ${card.contentArea.title}`}
                            key={card.id}
                            {...card} />
                    );
                } else if (cardStyle === CARD_STYLES.SQUARE) {
                    return (
                        <ThreeFourthCard
                            lh={`Card ${index} | ${card.contentArea.title}`}
                            key={card.id}
                            {...card} />
                    );
                } else if (cardStyle === CARD_STYLES.CUSTOM) {
                    return (
                        <div dangerouslySetInnerHTML={createMarkup(card)} />
                    );
                }
                return (
                    <OneHalfCard
                        lh={`Card ${index} | ${card.contentArea.title}`}
                        key={card.id}
                        {...card}
                        onClick={onCardBookmark}
                        dateFormat={dateFormat}
                        locale={locale} />
                );
            })}
        </div>
    );
};

CardsGrid.propTypes = cardsGridType;
CardsGrid.defaultProps = defaultProps;

export default CardsGrid;
