let savedMsg = {
    input: "",
    caseSensitive: false,
    wildcards: false
};

chrome.runtime.onConnect.addListener(port => {
    let mark = new MarkJS(document);
    console.log('on connect');
    if (port.name === 'better-find') {
        console.log('connecting to better-find')

        port.onMessage.addListener(msg => {
            if (msg.input === "$retrive$") {
                console.log('Got retrive request');
                port.postMessage(savedMsg)
            } else {
                console.log('msg:');
                console.log(msg);

                Object.assign(savedMsg, msg);

                mark.unmark();
                mark.mark(savedMsg.input, {
                    caseSensitive: savedMsg.caseSensitive,
                    wildcards: savedMsg.wildcards ? "enabled" : "disabled"
                })
            }
        })
    }
})