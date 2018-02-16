chrome.tabs.getSelected(tab => {
    let port = chrome.tabs.connect(tab.id, {name: 'better-find'});

    let keywordInput = document.getElementById('keywordInput');
    let caseInput = document.getElementById('caseInput');
    let wildcardsInput = document.getElementById('wildcardsInput');

    let keywordChangeEvent = Rx.Observable.fromEvent(keywordInput, 'keyup')
        .debounce(() => Rx.Observable.timer(500))
        .map(e => e.target.value)
    let caseChangeEvent = Rx.Observable.fromEvent(caseInput, 'change')
        .debounce(() => Rx.Observable.timer(500))
        .map(e => e.target.checked)
        .startWith(false);
    let wildcardsChangeEvent = Rx.Observable.fromEvent(wildcardsInput, 'change')
        .debounce(() => Rx.Observable.timer(500))
        .map(e => e.target.checked
        ).startWith(false);

    let stream = Rx.Observable.combineLatest(keywordChangeEvent, caseChangeEvent, wildcardsChangeEvent, (kw, c, w) => {
        return {
            input: kw,
            case: c,
            wildcards: w
        }
    });

    stream.subscribe(e => port.postMessage(e))
})