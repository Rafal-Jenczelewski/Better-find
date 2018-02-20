let retriveMsgString = "$retrive$";

let savedMsg = {
    input: "",
    caseSensitive: false,
    wildcards: false,
    elementsMarked: 0
};

chrome.runtime.onConnect.addListener(port => {
    let mark = new MarkJS(document);
    console.log('on connect');
    if (port.name === 'better-find') {
        console.log('connecting to better-find')

        port.onMessage.addListener(msg => {
            if (msg.input === retriveMsgString) {
                console.log('Got retrive request');
                port.postMessage({type: retriveMsgString, ...savedMsg})
            } else {
                console.log('msg:');
                console.log(msg);

                Object.assign(savedMsg, msg);

                mark.unmark();
                mark.mark(savedMsg.input, {
                    caseSensitive: savedMsg.caseSensitive,
                    wildcards: savedMsg.wildcards ? "enabled" : "disabled",
                    done(count) {
                        savedMsg.elementsMarked = count;
                        port.postMessage({type: '$done$', elementsMarked: count})
                    }
                })
            }
        })
    }
})