const checkOk = response => {
    return response.json()
        .then(body => {
            if (response.ok) {
                return {
                    ...body,
                    status: response.status
                }
            } else {
                const rejectionObject = {
                    message: body.message
                };
                rejectionObject.status = response.status;

                throw rejectionObject;
            }
        })
        .catch(err => {
            const rejectionObject = {
                ...err,
                message: err.message || 'Что-то пошло не так, попробуйте перезагрузить страницу'
            };
            rejectionObject.status = response.status;

            throw rejectionObject;
        })
};

export const makeRequestWithBody = (url, method, data, additionalHeaders = {}) => {
    const body = JSON.stringify(data);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    Object.keys(additionalHeaders).map(name => headers.append(name, additionalHeaders[name]));

    return fetch(url, {method, body, headers})
        .then(checkOk)
};

export const makeGetRequestWithHeaders = (url, headers = {}) => {
    const requestHeaders = new Headers();
    Object.keys(headers).map(name => requestHeaders.append(name, headers[name]));
    return fetch(url, {
            method: 'GET',
            headers: requestHeaders
        }
    ).then(checkOk)
};