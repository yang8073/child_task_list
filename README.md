# Child Task List（每日任務清單）

此版本提供可直接部署到 **GitHub Pages** 的靜態網站，包含：

- 兒童端今日任務清單（可點擊完成/取消完成，代幣即時加減）
- 商城兌換（代幣足夠才可兌換）
- 中文 + 注音 UI 文案

## 本地預覽

直接開啟 `docs/index.html`，或使用任何靜態伺服器。

## GitHub 部署與訪問

1. Push 到 GitHub repository。
2. 到 **Settings → Pages**，Source 選擇 **GitHub Actions**。
3. 確認 workflow `Deploy static site to GitHub Pages` 執行成功。
4. 站點會出現在：
   `https://<你的GitHub帳號>.github.io/<你的repo名稱>/`

## 目錄

- `docs/index.html`：主頁
- `docs/styles.css`：樣式
- `docs/app.js`：互動邏輯
- `.github/workflows/deploy-pages.yml`：自動部署
