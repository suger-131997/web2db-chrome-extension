import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

console.log(`'Allo 'Allo! Content script`);

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.command && (msg.command === 'change_title')) {
        var src = document.getElementsByTagName('title')[0].innerHTML;
        var dst = msg.title;
        document.getElementsByTagName('title')[0].innerHTML = dst;
        const target = document.getElementsByTagName('body')[0]
        const subRoot = document.createElement('div');
        //target.appendChild(subRoot)
        target.insertBefore(subRoot, target.firstChild)

        const h = ["a", "b", "c", "d"]
        const u = ""
        ReactDOM.render(<App header_data={h} url={u}/>, subRoot);
        sendResponse('the page title\'s changed: \'' + src + '\' -> \'' + dst + '\'');
    }
});
