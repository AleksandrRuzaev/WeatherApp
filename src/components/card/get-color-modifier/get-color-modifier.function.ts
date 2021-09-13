const getColorModifier = (temperature: number): string => {
    let modifier: string = '';

    if (temperature <= -30) {
        modifier = 'less-than-thirty';
    }
    if (temperature <= -20 && temperature > -30) {
        modifier = 'less-than-twenty';
    }
    if (temperature <= -10 || temperature > -20) {
        modifier = 'less-than-ten';
    }
    if (temperature <= 0 || temperature > -10) {
        modifier = 'less-than-zero';
    }
    if (temperature > 0 && temperature < 10) {
        modifier = 'more-than-zero';
    }
    if (temperature >= 10 && temperature < 20) {
        modifier = 'more-than-ten';
    }
    if (temperature >= 20 && temperature < 30) {
        modifier = 'more-than-twenty';
    }
    if (temperature >= 30 && temperature < 40) {
        modifier = 'more-than-thirty';
    }
    if (temperature >= 40) {
        modifier = 'more-than-fourty';
    }

    return modifier;
};

export { getColorModifier };
