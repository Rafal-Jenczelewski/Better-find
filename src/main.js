import Mark from '/vanilla.js'

let m = new Mark(document);
console.log(document);
console.log(m);

console.log(chrome.runtime.onMessage)
chrome.extensions.onConnect.addListener(port => {
    console.log('connect!');
    if (port.name === 'better-find') {
        console.log('connected to better find')
        port.onMessage.addListener(msg => {
            console.log(msg);
        })
    }
})