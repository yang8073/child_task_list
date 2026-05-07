# Child Task List（每日任務清單）

此版本提供可直接部署到 **GitHub Pages** 的靜態網站，包含：

- 兒童端今日任務清單（可點擊完成/取消完成，代幣即時加減）
- 商城兌換（代幣足夠才可兌換）
- 中文 + 右側注音 UI 文案
- 兒童友善的大字體、觸控按鈕與任務 / 商城 icon
- App icon、favicon 與 Web App Manifest

## 本地預覽

直接開啟 `docs/index.html`，或使用任何靜態伺服器。

## GitHub 部署與訪問

1. Push 到 GitHub repository。
2. 到 **Settings → Pages**，Source 選擇 **Deploy from a branch**。
3. Branch 選擇要部署的分支，資料夾選擇 `/docs`。
4. 站點會出現在：
   `https://<你的GitHub帳號>.github.io/<你的repo名稱>/`

## 關於連續建立 PR 與衝突

不需要因為同一個對話建立第二次 PR 就新開對話；衝突通常不是「對話」造成，而是 **PR 的基底分支沒有包含前一個 PR 的變更**。

建議流程：

1. 先確認上一個 PR 已經合併，或把上一個 PR 的 commit 留在目前分支上。
2. 新需求請從最新的目標分支開始，例如先同步 `main` 後再開新分支。
3. 如果上一個 PR 還沒合併，第二個 PR 應該接在第一個 PR 的分支後面，或等第一個 PR 合併後再重建第二個 PR。
4. 若 GitHub 顯示衝突，通常需要把目標分支的最新版合併或 rebase 到目前分支，再重新 push。

常見安全做法：

```bash
git fetch origin
git checkout main
git pull --ff-only origin main
git checkout -b feature/new-change
```

如果你希望每次新需求都完全獨立，請在開始前先確認工作分支是從最新版 `main` 建立；如果希望第二個 PR 包含第一個 PR 的內容，則讓第二個 PR 以第一個 PR 的分支為基底。

## 目錄

- `docs/index.html`：主頁、PWA metadata、版本顯示與靜態注音標題
- `docs/styles.css`：兒童友善樣式、右側注音、icon 與響應式排版
- `docs/app.js`：任務 / 商城互動邏輯、版本號與 icon 渲染
- `docs/icons.svg`：共用 SVG icon sprite
- `docs/app-icon.svg`：系統 / favicon app icon
- `docs/site.webmanifest`：Web App Manifest
