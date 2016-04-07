## How to launch

#### Usage

```
$ ffmpeg -i input.mp4 -profile:v baseline -level 3.0 -s 640x360 -start_number 0 -hls_time $second_per_segment -hls_list_size $total_segment -f hls index.m3u8
```

```
$ ffmpeg -i input.mp4 -profile:v baseline -level 3.0 -s 640x360 -start_number 0 -hls_time 10 -hls_list_size 0 -f hls index.m3u8
```

- HLS library for video.js http://videojs.github.io/videojs-contrib-hls/
- Github Ref: https://github.com/videojs/videojs-contrib-hls

#### Library(2 Plugins)

- video.js
- videojs-contrib-hls


```
http-server
```

#### Note

For example Modify & Add authorization to index.m3u8 Text Content.

```
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:12
#EXT-X-MEDIA-SEQUENCE:0
#EXTINF:11.302944,
index0.ts
#EXTINF:9.633333,
index1.ts
#EXTINF:9.100000,
index2.ts
#EXTINF:3.033333,
index3.ts
#EXT-X-ENDLIST

to

#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:12
#EXT-X-MEDIA-SEQUENCE:0
#EXTINF:11.302944,
/api/auth/index0.ts
#EXTINF:9.633333,
/api/auth/index1.ts
#EXTINF:9.100000,
/api/auth/index2.ts
#EXTINF:3.033333,
/api/auth/index3.ts
#EXT-X-ENDLIST
```
