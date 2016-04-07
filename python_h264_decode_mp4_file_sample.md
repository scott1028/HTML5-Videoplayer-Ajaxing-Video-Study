#### Installation

* ref: https://pypi.python.org/pypi/FFVideo/0.0.9

```
$ sudo apt-get install libavformat-dev libswscale-dev
$ pip install ffvideo
```

#### ffmpeg way
```
直接使用 ffmpeg 切割 mp4 檔案，紀錄使用者上次觀看的開始時間加剩餘時間切出 Movie Clip 給使用者(就是去除超過部份的 Movie，除非使用者儲值後)。
	$ ffmpeg -i trailer_test_for_chrome.mp4 -ss 10 -t 15 o.mp4			← 從 10 秒切到 25 秒！
		( 剩下就是寫 HTML5 Player 的技巧，把虛擬的 Timeline 做出來即可！ )
```
