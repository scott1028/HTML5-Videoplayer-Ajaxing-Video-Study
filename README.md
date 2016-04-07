## How to launch

- Ref: http://www.oschina.net/translate/http-partial-content-in-node-js

#### web8 Convert by ffmpeg

```
ffmpeg -i $can_not_be_play.webm $output.webm
```

#### Demo
```
http-server
```

```
python -m SimpleHTTPServer
# 似乎無法正常讓 Click 影片時間軸正常運作。Python SimpeHTTPServer 似乎無法控制 Video Current time 來傳輸資料！
```

#### HTTP 206 Partial Content

```
1. Server 必須支援 Partial Content 傳輸否則無法實現時間軸點擊後的部份影片播放，如 Python SimpleHTTPServer 就不行，但是 NodeJS 的 http-server 就可以！
2. 根據使用者點擊的時間軸影響 video.currentTime = $T 後，向 Server 請求 HTTP Request 並得到 206 Response 回傳該 Range 的 Video Bytes 資料！
3. 但是如果以片是需要檔投才能播放的只有中間的 Bytes 就等於是檔案毀損收到也不能播放！(建議可以用 Partial Content 來測試 FLV 影片播放)
```

* Client Request 包含一個 Range 的 Header(Range: bytes=521675-, 利用 JavaScript .currentTime=$T 算出再掉用 .play() 就會有了)

```
GET /trailer_test_for_chrome.mp4 HTTP/1.1
Host: 127.0.0.1:8081
Connection: keep-alive
Accept-Encoding: identity;q=1, *;q=0
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.110 Safari/537.36
Accept: */*
Referer: http://127.0.0.1:8081/sample01.html
Accept-Language: zh-TW,zh;q=0.8,en-US;q=0.6,en;q=0.4,zh-CN;q=0.2
Cookie: _ga=GA1.4.1425862586.1459247316; JSESSIONID=792021E7C03F631591D8701769E2179F; loggedin=200; whoami=%22brian%22
Range: bytes=521675-
```

* Server Response HTTP 206 Partial Content (如果 Server 不支援 Partial Content 就會一直重新傳整份影片)

```
包含 Content-Range Header 告知資料範圍與 Accept-Ranges Header 此區塊的資料總長。
```

```
HTTP/1.1 206 Partial Content
server: ecstatic-1.4.0
Content-Range: bytes 521675-3711806/3711807
Accept-Ranges: bytes
Content-Length: 3190132
Content-Type: video/mp4; charset=utf-8
Date: Thu, 07 Apr 2016 06:46:17 GMT
Connection: keep-alive
 ... Data Start Here ...
```

![Alt text](https://raw.githubusercontent.com/scott1028/HTML5-Videopayer-Design-Sample/master/HTTP206_Response.png "HTTP206_Response.png")

#### 自己用 JavaScript Ajax 請求特定的資料範圍去跟 Server 要影片資料範例

![Alt text](https://raw.githubusercontent.com/scott1028/HTML5-Videopayer-Design-Sample/master/HTTP206_Ajax.png "HTTP206_Ajax.png")

#### Bytes Range to Video timestamp By ffprobe Command Line Tool

- Ref: http://stackoverflow.com/questions/37134341/web-video-bytes-range-to-time

![Alt text](https://raw.githubusercontent.com/scott1028/HTML5-Videopayer-Design-Sample/master/bytes_range_of_video_timestamp解析_webm.png "bytes_range_of_video_timestamp解析_webm.png")
![Alt text](https://raw.githubusercontent.com/scott1028/HTML5-Videopayer-Design-Sample/master/bytes_range_of_video_timestamp解析_webm.png "bytes_range_of_video_timestamp解析_mp4.png")

- 針對 onIceCandidate 強制止寄送 Relay 資訊給對方的設計方式

![Alt text](https://raw.githubusercontent.com/scott1028/HTML5-Videopayer-Design-Sample/master/sample09_webRTC_no_server.png "sample09_webRTC_no_server.png")

```
$ ffprobe -i chrome.webm -show_frames -show_entries frame=pkt_pos -read_intervals 00:10%+#1 -of default=noprint_wrappers=1:nokey=1 -hide_banner -loglevel panic
```

```
$ ffprobe -i chrome.webm -show_frames -select_streams v:0
```

```
$ ffprobe -i chrome.webm -show_frames -select_streams v:0 -read_intervals 10%+#1
[FRAME]
media_type=video
stream_index=0
key_frame=1
pkt_pts=9743  # million second
pkt_pts_time=9.743000
pkt_dts=9743
pkt_dts_time=9.743000
best_effort_timestamp=9743
best_effort_timestamp_time=9.743000
pkt_duration=33
pkt_duration_time=0.033000
pkt_pos=540135  # offset bytes of total
pkt_size=3981
width=480
height=270
pix_fmt=yuv420p
sample_aspect_ratio=1:1
pict_type=I
coded_picture_number=0
display_picture_number=0
interlaced_frame=0
top_field_first=0
repeat_pict=0
[/FRAME]
```
