// Listen to messages sent from other parts of the extension.
import {Mutex} from 'await-semaphore';

var extention_state = false;
var wait_flag = false

var rows: {[key: string]: string;}[] = [];
var header_data: string[] = []

function addRow(row: {[key: string]: string;}){
    rows.push(row);
}

function setHeader(header:string[]){
    header_data = header;
}

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.command && (msg.command === 'addRow')) {
        addRow(msg.row);
        sendResponse("addRow");
    }else if(msg.command && (msg.command === 'setHeader')){
        setHeader(msg.header)
        sendResponse("setHeader");
    }
});


chrome.browserAction.onClicked.addListener(async function(tab) {
    // console.log(tab.id);
    // console.log(`'Allo 'Allo! onclick background`);
    const mutex = new Mutex();
    const release = await mutex.acquire();
    try {
        if(wait_flag === false){
            wait_flag = true;
            if(extention_state === false){
                extention_state = true;
                chrome.tabs.sendMessage((tab.id as number), {
                    command: 'insert_tools',
                    init_rows: rows,
                    header: header_data
                },
                function(msg: string) {
                    wait_flag = false;
                    console.log(msg);
                });
            }else{
                extention_state = false;
                rows = [];
                header_data = []
                chrome.tabs.sendMessage((tab.id as number), {
                    command: 'remove_tools'
                },
                function(msg: string) {
                    wait_flag = false;
                    console.log(msg);
                });
            }
        } 
    } finally {
        // release を呼び出さないとデットロックになる
        release();
    }
});

// // タブが切り替わった時のイベント
// chrome.tabs.onActivated.addListener(function (tabId) {
//     chrome.tabs.query({"active": true}, function (tab) {
//         console.log(tab[0].url); // 切り替わったタブのURL
//         chrome.tabs.remove(tab[0].id); //切り替わったタブを削除
//     });
// });

// タブが更新された時のイベント
chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
    // console.log(tab.url); // → 更新されたURL
    // console.log(tab.id);
    // console.log(tabId);
    // console.log(info.status); //→ loading,complete
    // console.log(rows);
    if(info.status === 'complete' && extention_state){
        chrome.tabs.sendMessage((tabId as number), {
            command: 'insert_tools',
            init_rows: rows,
            header: header_data
        },
        function(msg: string) {
            console.log(msg);
        });
    }
});

// console.log(`'Allo 'Allo! Event Page for Browser Action`);
