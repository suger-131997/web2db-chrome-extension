// Listen to messages sent from other parts of the extension.

chrome.browserAction.onClicked.addListener(function(tab) {
    console.log(`'Allo 'Allo! onclick background`);
    chrome.tabs.sendMessage((tab.id as number), {
            command: 'change_title',
            title: 'hoge'
        },
        function(msg: string) {
            console.log('result message:', msg);
        });
});

console.log(`'Allo 'Allo! Event Page for Browser Action`);
