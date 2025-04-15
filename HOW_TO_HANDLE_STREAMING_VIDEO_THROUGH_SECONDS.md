# 🎥 MP4 Streaming 與 Byte ↔ 秒數 對應分析教學

---

## 📌 為何有些 MP4 可以 Streaming，有些不行？

### ✅ 可 Streaming 條件
- `moov atom`（metadata 索引）在檔案開頭
- 播放器能一開檔就讀到幀、音訊、長度等資訊

### ❌ 不可 Streaming 條件
- `moov atom` 在檔案結尾
- 播放器需等整個檔案下載完才能播放

### 🔧 解法（將 metadata 搬到檔頭）
```bash
# 使用 ffmpeg
ffmpeg -i input.mp4 -movflags faststart -c copy output.mp4

# 使用 MP4Box
MP4Box -inter 500 input.mp4
```

---

## 🔍 如何判斷 `moov` 在檔頭還是尾端？

### ✅ 方法一：用 ffprobe 查看 atom 順序
```bash
ffprobe -v trace -i input.mp4 2>&1 | grep 'type:'
```
- `moov` 在 `mdat` 前 → ✅ 支援 streaming
- `moov` 在 `mdat` 後 → ❌ 不支援

### ✅ 方法二：用 MP4Box 查看 atom 位置
```bash
MP4Box -info input.mp4
```

### ✅ 方法三：Hex Editor 檢查
- 搜尋 `moov` 字串
- 看出現位置是否靠前

---

## 📄 如何 Human-readable 查看 `moov` 資料？

### ✅ 方法一：MP4Box
```bash
MP4Box -diso input.mp4
```

### ✅ 方法二：mp4dump (Bento4)
```bash
mp4dump input.mp4
```

### ✅ 方法三：ffprobe 快速摘要（非結構）
```bash
ffprobe -v quiet -show_format -show_streams input.mp4
```

---

## ⏱ 如何將 Byte Offset 轉換為播放秒數？

### ✅ 精準方式：ffprobe 顯示封包時間與位址
```bash
ffprobe -show_packets -select_streams v:0 -of compact=p=0 input.mp4
```

範例輸出：
```
packet|pts_time=0.040000|pos=2276|size=1100
```
→ byte offset `2276` ≈ 0.04 秒

### ✅ 分析 MP4 結構：用 mp4dump 解析 sample table
```bash
mp4dump input.mp4
```
讀取：
- `stts` (時間)
- `stsz` (大小)
- `stco` (位址)

### ✅ 粗略方式（比例估算）
```js
duration ≈ (byteOffset / totalSize) * totalDuration
```
⚠️ 不準確，只能當近似值使用

---

## ⏱ 限定 ffprobe -show_packets 撈特定秒數範圍？

### ✅ 使用 `-read_intervals`
```bash
ffprobe -show_packets -read_intervals 0%10 -select_streams v:0 -of compact=p=0 input.mp4
```

### 📌 參數格式：
| 語法         | 說明                     |
|--------------|--------------------------|
| `start%end`  | 時間範圍（秒）           |
| `%end`       | 從開始直到 `end` 秒      |
| `start%`     | 從 `start` 秒直到結束     |
| `+duration`  | 相對範圍（如 `+5` 是接下來 5 秒） |

### 🧪 範例
```bash
ffprobe -show_packets -read_intervals 30%+10 -select_streams v:0 -of compact=p=0 input.mp4
```

---

## 🔚 小結

| 功能                       | 工具        | 說明                                       |
|----------------------------|-------------|--------------------------------------------|
| 判斷 `moov` 位置           | ffprobe, MP4Box | 看 atom 出現順序或 byte offset             |
| 查看 `moov` 詳細內容       | mp4dump, MP4Box  | 解析出 readable metadata                   |
| byte ↔ 秒對應              | ffprobe, mp4dump | 用 pts_time 和 pos 做對照                 |
| 限定分析範圍（時間段）     | ffprobe       | 用 `-read_intervals` 篩選秒數範圍          |

---
