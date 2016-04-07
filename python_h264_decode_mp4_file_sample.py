# coding" utf-8

import ffvideo

aa = ffvideo.VideoStream('trailer_test_for_chrome.mp4')
aa.get_frame_at_sec(0).image().save('0_sec.jpg')
