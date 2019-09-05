import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import CssBaseline from '@material-ui/core/CssBaseline';

// console.log(`'Allo 'Allo! Content script`);

var subRoot = null;

function sendRow(row: {[key: string]: string;}){
    chrome.runtime.sendMessage( {
            command: 'addRow',
            row: row
        },
        function(msg: string) {
            // console.log(msg);
        });
}
function sendHeader(header:string[]){
    chrome.runtime.sendMessage( {
            command: 'setHeader',
            header: header
        },
        function(msg: string) {
            // console.log(msg);
        });
}

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.command && (msg.command === 'insert_tools')) {
        const target = document.getElementsByTagName('body')[0]
        subRoot = document.createElement('div');
        target.insertBefore(subRoot, target.firstChild)
        
        ReactDOM.render(
            <React.Fragment>
                <CssBaseline />
                <App header_data={msg.header} init_rows={msg.init_rows} addFunction={sendRow} setHeaderFunction={sendHeader}/>
            </React.Fragment>, subRoot);
        sendResponse("insert_tools");
    }else if(msg.command && (msg.command === 'remove_tools')){
        const target = document.getElementsByTagName('body')[0]
        target.removeChild(subRoot);
        sendResponse("remove_tools");
    }
});
