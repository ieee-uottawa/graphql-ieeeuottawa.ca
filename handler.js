const request = require('superagent');

module.exports.submitNomination = async (event) => {
    const { name, email, studentNumber, program, year, platform, position } = JSON.parse(event.body);

    const { origin } = event.headers;
    const allowedOrigins = ['http://localhost:8000', 'https://ieeeuottawa.ca'];
    const headers = {
        'Access-Control-Allow-Credentials': true,
    };
    if (allowedOrigins.indexOf(origin) > -1) {
        headers['Access-Control-Allow-Origin'] = origin;
    } else {
        return {
            statusCode: 403,
            headers,
            isBase64Encoded: false,
            body: JSON.stringify({ success: false }),
        };
    }
    console.log(event.headers, origin, allowedOrigins.indexOf(origin) > -1, headers);

    try {
        const res = await request.post('https://docs.google.com/forms/d/e/1FAIpQLSe7yw4EC08qpF3BEJVUMhKQDmu6ubIJidkD8jPrdeL8Y2h8iA/formResponse')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'entry.1463790818': name,
                'entry.304218284': email,
                'entry.143175545': studentNumber,
                'entry.1924293788': program,
                'entry.787289669': year,
                'entry.1315432807': position,
                'entry.463459026': platform,
            });
        console.log(res.status);
        return {
            statusCode: res.status,
            headers,
            body: JSON.stringify({ success: true }),
            isBase64Encoded: false,
        };
    } catch (error) {
        console.log(error.status);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ success: false }),
            isBase64Encoded: false,
        };
    }
};


//


module.exports.submitVolunteer = async (event) => {
    const { name, program, year, email, involvement } = JSON.parse(event.body);

    const { origin } = event.headers;
    const allowedOrigins = ['http://localhost:8000', 'https://ieeeuottawa.ca'];
    const headers = {
        'Access-Control-Allow-Credentials': true,
    };
    if (allowedOrigins.indexOf(origin) > -1) {
        headers['Access-Control-Allow-Origin'] = origin;
    } else {
        return {
            statusCode: 403,
            headers,
            isBase64Encoded: false,
            body: JSON.stringify({ success: false }),
        };
    }
    console.log(event.headers, origin, allowedOrigins.indexOf(origin) > -1, headers);

    try {
        const res = await request.post('https://docs.google.com/forms/d/e/1FAIpQLSe1X-rcpQcaorK3QPQXKHBlGTfsGxNwl7_bQ2qtC_3imn2ejA/formResponse')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'entry.347466495': name,
                'entry.1606208189': program,
                'entry.2123998815': year,
                'entry.242066707': email,
                'entry.623488933': involvement,
            });
        console.log(res.status);
        return {
            statusCode: res.status,
            headers,
            body: JSON.stringify({ success: true }),
            isBase64Encoded: false,
        };
    } catch (error) {
        console.log(error.status);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ success: false }),
            isBase64Encoded: false,
        };
    }
};


// entry.347466495=*name*
// entry.1606208189=*program*
// entry.2123998815=*year*
// entry.242066707=*email*
// entry.623488933=*how you would like to get involved*