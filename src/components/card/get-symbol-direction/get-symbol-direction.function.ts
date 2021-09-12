const getSymbolDirection = (degree: number): string => {
    let direction: string = '';

    if (degree >= 350 || degree <= 10) {
        direction = 'N';
    }
    if (degree > 10 && degree <= 35) {
        direction = 'NNE';
    }
    if (degree > 35 && degree <= 55) {
        direction = 'NE';
    }
    if (degree > 55 && degree < 80) {
        direction = 'ENE';
    }
    if (degree >= 80 && degree <= 100) {
        direction = 'E';
    }
    if (degree > 100 && degree <= 125) {
        direction = 'ESE';
    }
    if (degree > 125 && degree <= 145) {
        direction = 'SE';
    }
    if (degree > 145 && degree < 170) {
        direction = 'SSE';
    }
    if (degree >= 170 && degree <= 190) {
        direction = 'S';
    }
    if (degree > 190 && degree <= 215) {
        direction = 'SSW';
    }
    if (degree > 215 && degree <= 235) {
        direction = 'SW';
    }
    if (degree > 235 && degree < 260) {
        direction = 'WSW';
    }
    if (degree >= 260 && degree <= 280) {
        direction = 'W';
    }
    if (degree > 280 && degree <= 305) {
        direction = 'WNW';
    }
    if (degree > 305 && degree <= 325) {
        direction = 'NW';
    }
    if (degree > 325 && degree < 350) {
        direction = 'NNW';
    }

    return direction;
};

export { getSymbolDirection };
