import React, { useContext } from 'react';
import { array } from 'prop-types';
import {
    AreaChart, Area, XAxis, Tooltip, ResponsiveContainer,
} from 'recharts';

import Data from './data/data';
import classes from './Area.module.scss';

import Theme from '../../../../store/theme';

function StackedArea({ graphData }) {
    const { darkTheme } = useContext(Theme);

    return (
        <div
            className={
                `
                    ${classes.chart} 
                    ${darkTheme ? `${classes.chart} ${classes.dark}` : ''}
                `
            }
        >
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={graphData}
                    margin={{
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <defs>
                        {
                            Data.graphColors.map((_colors) => (
                                <linearGradient key={_colors.id} id={_colors.id} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="8%" stopColor={_colors.stopColor1} stopOpacity={0.8} />
                                    <stop offset="92%" stopColor={_colors.stopColor2} stopOpacity={0} />
                                </linearGradient>
                            ))
                        }
                    </defs>

                    <XAxis dataKey="name" />
                    <Tooltip
                        cursor={
                            {
                                stroke: '#0f89ff',
                                strokeWidth: 8,
                                strokeOpacity: '0.2',
                            }
                        }
                    />
                    {
                        Data.graphKey.map((_keys) => (
                            <Area
                                key={_keys.dataKey}
                                type="monotone"
                                dataKey={_keys.dataKey}
                                stroke={`url(#${_keys.color})`}
                                strokeOpacity="0.8"
                                strokeWidth="2"
                                fill={`url(#${_keys.color})`}
                                fillOpacity="1"
                                style={{ strokeLinecap: 'round' }}
                            />
                        ))
                    }
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

StackedArea.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    graphData: array,
};

export default StackedArea;
