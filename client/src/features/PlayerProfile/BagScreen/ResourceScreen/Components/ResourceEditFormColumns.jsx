import React from 'react';
import PropTypes from "prop-types";
import keyBy from "lodash/keyBy";

import InputField from "../../../../Global/Components/InputField/InputField";
import {RESOURCES_PACKS} from "../../../../Global/Constants/resources";

const ResourceEditFormColumns = ({
                                packs,
                                onChange,
                                errors,
                                shouldResetInputs = false
                            }) => {

    const COLUMN_LENGTH = 9;
    const columns = RESOURCES_PACKS.reduce((acc, curr) => {
        if (acc.length === 0 || acc[acc.length - 1].length === COLUMN_LENGTH) {
            acc.push([])
        }
        acc[acc.length - 1].push(curr);
        return acc;
    }, []);
    const NormalizedPacks = keyBy(packs, pack => pack.label);
    return (
        columns.map((column, index) => {
            return (
                <div className="col-sm-12 col-md-4"
                     key={index}
                >
                    {column.map((item, index) => {
                        const currPack = NormalizedPacks[item.label];
                        return (
                            <InputField addon={`${item.label}:`}
                                        defaultValue={currPack ? currPack.quantity : null}
                                        error={errors[item.label]}
                                        name={item.label}
                                        onChange={onChange ? onChange : null}
                                        key={index}
                                        shouldReset={shouldResetInputs}
                            />
                        )
                    })}
                </div>
            )
        })
    )
};

ResourceEditFormColumns.propTypes = {
    packs: PropTypes.array,
    errors: PropTypes.object,
    shouldResetInputs: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
};

export default ResourceEditFormColumns;