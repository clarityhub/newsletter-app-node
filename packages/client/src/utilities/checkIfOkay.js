export default (res) => {
    if (res.status >= 200 && res.status < 300) {
        return res.json();
    }

    return res.json().then(data => {
        throw new Error(data.status);
    });
};
