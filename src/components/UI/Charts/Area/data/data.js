const graphColors = [
    {
        id: 'colorPending',
        stopColor1: '#ff750ced',
        stopColor2: '#ff632aed',
    },
    {
        id: 'colorProcessing',
        stopColor1: '#5ef108ed',
        stopColor2: '#5dc508',
    },
    {
        id: 'colorInprogress',
        stopColor1: '#0983f3ed',
        stopColor2: '#2172f3',
    },
    {
        id: 'colorCompleted',
        stopColor1: '#099e7aed',
        stopColor2: '#268b4a',
    },
    {
        id: 'colorPartial',
        stopColor1: '#f86444ed',
        stopColor2: '#f34242',
    },
    {
        id: 'colorCancelled',
        stopColor1: '#ee2a2a',
        stopColor2: '#dd2a2a',
    },
    {
        id: 'colorRefunded',
        stopColor1: '#8F66f4ed',
        stopColor2: '#8F44FD',
    },
];

const graphKey = [
    {
        dataKey: 'pending',
        color: 'colorPending',
    },
    {
        dataKey: 'processing',
        color: 'colorProcessing',
    },
    {
        dataKey: 'inProgress',
        color: 'colorInProgress',
    },
    {
        dataKey: 'completed',
        color: 'colorCompleted',
    },
    {
        dataKey: 'partial',
        color: 'colorPartial',
    },
    {
        dataKey: 'cancelled',
        color: 'colorCancelled',
    },
    {
        dataKey: 'refunded',
        color: 'colorRefunded',
    },
];

const Data = {
    graphColors,
    graphKey,
};

export default Data;
