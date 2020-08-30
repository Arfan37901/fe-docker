import React from 'react';
import PropTypes from 'prop-types';

const Select = (props) => {
    const { val, values, onSelect } = props;


    const handleSelect = (evt) => {
        onSelect(evt.target.innerText);
    };

    const checkValuesAreSame = value => value.toLowerCase().indexOf(val.toLowerCase().trim()) >= 0;

    return (
        <div className="consonant-select">
            <input
                type="text"
                value={
                    values.filter(el => el.toLowerCase().indexOf(val.toLowerCase()) >= 0)[0] ||
                    'Please select'
                }
                readOnly />
            <div className="consonant-select--options">
                {values.map(item => (
                    <button
                        key={item}
                        type="button"
                        className={checkValuesAreSame(item) ?
                            'consonant-select--option consonant-select--option_selected' :
                            'consonant-select--option'
                        }
                        onClick={handleSelect}>
                        {item}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Select;

Select.propTypes = {
    val: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
    values: PropTypes.arrayOf(PropTypes.string).isRequired,
};
