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

        $.ajax({
            url: url,
            xhrFields : {
                responseType : 'arraybuffer'
            },
            headers: { 'Range': 'bytes=0-91507/1991507' },
            success: callback
        });
    };

    // Partial Bytes 可能無法直接播放。必須要有檔頭才有辦法，只能 0-N Bytes 如過 N-M Bytes 就會無法播放！
    // get('/sample_flv.flv', callback);  // no support by browser
    // get('/trailer_test_for_chrome.mp4', callback);
    get('/chrome.webm', callback);
})(this, document);


// // headers: { 'Range': 'bytes=0-2000' },
// var xhr = new XMLHttpRequest();

// // add Byte Ranges

// xhr.open('GET', url, true);
// xhr.responseType = 'arraybuffer';  // jQuery Ajax 還不大確定怎寫

// // Total: 3711807 bytes
// // xhr.setRequestHeader("Range", 'bytes=0-');
// xhr.setRequestHeader("Range", 'bytes=0-711807/3711807');
// // xhr.setRequestHeader("Range", 'bytes=91507-1091507/1991507');
// xhr.send();
// xhr.onload = function() {
//     if (xhr.status !== 206) {
//         alert('Unexpected status code ' + xhr.status + ' for ' + url);
//         return false;
//     }
//     callback(new Uint8Array(xhr.response)); 
// };