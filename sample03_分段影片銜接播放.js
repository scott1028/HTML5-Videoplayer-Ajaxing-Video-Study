(function(window, document) {
    function callback(data){

        var blob = new Blob([data], {
            type: 'video/mp4'
        });

        // var objectURL = URL.createObjectURL(blob, { type: 'video/flv' });
        // var objectURL = URL.createObjectURL(blob, { type: 'video/mp4' });
        var objectURL = URL.createObjectURL(blob, { type: 'video/webm' });

        console.debug(objectURL);

        //
        document.querySelector('video').src = objectURL;
        document.querySelector('video').autoplay = true;
    };

    function get(url, callback) {
        // headers: { 'Range': 'bytes=0-2000' },
        var xhr = new XMLHttpRequest();
        
        // add Byte Ranges

        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';  // jQuery Ajax 還不大確定怎寫

        // Total: 3711807 bytes
        // xhr.setRequestHeader("Range", 'bytes=0-');
        xhr.setRequestHeader("Range", 'bytes=0-711807/3711807');
        // xhr.setRequestHeader("Range", 'bytes=91507-1091507/1991507');
        xhr.send();
        xhr.onload = function() {
            if (xhr.status !== 206) {
                alert('Unexpected status code ' + xhr.status + ' for ' + url);
                return false;
            }
            callback(new Uint8Array(xhr.response)); 
        };
    };
    window.get = get;
    window.callback = callback;

    // Partial Bytes 可能無法直接播放。必須要有檔頭才有辦法，只能 0-N Bytes 如過 N-M Bytes 就會無法播放！
    // get('/sample_flv.flv', callback);  // no support by browser
    // get('/trailer_test_for_chrome.mp4', callback);
    get('/chrome.webm', callback);
})(this, document);


// Sample For jQuery Ajax
// // add Ajax Get Partial Video Content By Byte Range
// $.ajax({
//     url: '/trailer_test_for_chrome.mp4',
//     headers: { 'Range': 'bytes=0-2000' },
//     success: function(data) {
//         var blob = new Blob([data]);

//         // var parts = [
//         //   new Blob(['you construct a file...'], {type: 'text/plain'}),
//         //   ' Same way as you do with blob',
//         //   new Uint16Array([33])
//         // ];

//         // Construct a file
//         // var file = new File([blob], 'videoInBuffer.mp4', {
//         //     lastModified: new Date(0), // optional - default = now
//         //     type: "video/mp4" // optional - default = ''
//         // });

//         // debugger;
//         // set can play type
//         // document.querySelector('video').canPlayType(file.type);


//         // var fr = new FileReader();
//         // fr.readAsArrayBuffer(file);

//         var objectURL = URL.createObjectURL(blob, { type: 'video/mp4' });  // 一定要設定 type 為 mp4 類型否則無法播放
//         // var objectURL = URL.createObjectURL(file, { type: 'video/mp4' });  // 一定要設定 type 為 mp4 類型否則無法播放
//         // replace new URL
//         // document.querySelector('video source[type="video/mp4"]').src = objectURL;
//         // document.querySelector('video').src = objectURL;
//         document.querySelector('video').addEventListener("load", function (evt) { URL.revokeObjectURL(objectURL); } );
//         // document.querySelector('video').src = objectURL;
//         document.querySelector('video').setAttribute("src", objectURL);

//         var source = document.createElement('source');


//         // source.src = objectURL;
//         // source.type = 'video/mp4';
//         // document.querySelector('video').appendChild(source);
//     }
// });
