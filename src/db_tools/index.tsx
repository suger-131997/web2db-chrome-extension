import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

console.log(`'Allo 'Allo! Content script`);

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.command && (msg.command === 'change_title')) {
        var src = document.getElementsByTagName('title')[0].innerHTML;
        var dst = msg.title;
        document.getElementsByTagName('title')[0].innerHTML = dst;
        console.log(document);
        console.log(document.getElementsByTagName('body')[0]);
        const target = document.getElementsByTagName('body')[0]
        const subRoot = document.createElement('div');
        target.appendChild(subRoot)
        //target.insertBefore(subRoot, target.firstChild)

        const h = ["a", "b", "c"]
        const u = ""
        console.log("aaaaaaaaa");
        ReactDOM.render(<App header_data={h} url={u}/>, subRoot);
        console.log("bbbbbbbbbb");
        sendResponse('the page title\'s changed: \'' + src + '\' -> \'' + dst + '\'');
    }
});
