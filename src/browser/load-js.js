
export default async mfBaseUrl => {
    const response = await fetch(mfBaseUrl + 'main.js');
    const content = await response.text();

    const js = parseJs(content);
    return js.default();
};

const parseJs = content => new Function('return ' + content).call();
const evalJs = content => eval(content);