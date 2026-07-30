# 🌌 极光起始页 · Aurora Start

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

> 一个极光风格的浏览器起始页，带有时钟、搜索历史、多搜索引擎切换。  
> A beautiful aurora‑themed start page with live clock, search history, and multi‑engine switching.  
---

## 📖 中文说明

### ⚠️ 重要提示
- **只支持 Chromium 内核浏览器**（Edge、Chrome、Brave、Vivaldi 等），**不支持 Firefox**。
- 本插件提供 `.crx` 文件，但**新版浏览器已禁止直接拖拽安装**，请严格按照下面的步骤操作。

### ✨ 特性
- 🌌 **动态极光背景** – 柔和彩色光晕缓缓浮动，视觉舒适。
- 🕒 **实时时钟** – 自动更新，显示当前时间与日期（星期）。
- 🔍 **智能搜索框** – 支持 **Bing / 百度 / Yandex** 一键切换。
- 📜 **搜索历史** – 保存最近 30 条记录，点击复用，支持单条删除或清空。
- 🎨 **完全离线** – 所有资源本地加载（搜索除外）。
- 📱 **响应式设计** – 手机、平板、桌面均完美适配。

### 📥 安装方法（正确步骤）
> 由于新版 Chromium 浏览器不再支持直接拖拽 `.crx` 安装，请按以下步骤操作。

1. 前往本仓库的 **Releases** 页面，下载最新版本的 `aurora-start.crx`。
2. **将 `.crx` 后缀改为 `.zip`**（直接重命名文件）。
3. **解压** 这个 `.zip` 文件，得到一个文件夹（如 `aurora-start`）。
4. 打开你的浏览器（Edge 或 Chrome），进入扩展管理页面：
   - Edge：`edge://extensions/`
   - Chrome：`chrome://extensions/`
5. **开启右上角的“开发人员模式”**（Developer mode）。
6. 点击 **“加载已解压的扩展程序”**（Load unpacked），选择刚才解压出来的文件夹。
7. 打开新标签页，极光起始页就出现了！🎉

> 如果你使用的是旧版浏览器（如 Chromium 80 以下），也可尝试直接拖拽 `.crx` 安装，但推荐始终使用上述解压加载方式，以确保兼容性。

### 🛠️ 自定义设置
- **切换搜索引擎**：点击页面底部当前搜索引擎名称（如“✦ Bing”），弹出面板选择其他引擎。
- **默认引擎自动保存**：选择后自动记忆，下次打开仍保留。
- **调整颜色主题**：编辑 `index.html` 中的 CSS `radial-gradient` 值。
- **添加图标**：在 `manifest.json` 中取消 `"icons"` 注释，放入对应尺寸图片。

### 🤔 为什么不上架商店？
商店强制要求绑定手机号，且审核繁琐。本项目仅供个人或小范围分享，通过开发者模式加载简单自由，无需受制于平台规则。

### 📜 授权协议
本项目采用 **GNU General Public License v3.0 (GPL v3)** 协议。

- ✅ 你可以自由下载、安装、使用（包括商业用途）。
- ✅ 你可以自由修改代码。
- ✅ 你可以自由分发原始或修改后的代码。
- ⚠️ **修改后的代码必须同样以 GPL v3 开源**。
- ⚠️ 必须注明原作者（Bili481736023）和修改日期。
- ⚠️ 必须附带完整的 GPL v3 协议文本。
- ❌ 你**不可以**将本代码（或修改后的版本）闭源发布。
- ❌ 你**不可以**将本代码用于训练 AI 模型或作为其他软件的内部组件（此限制为作者附加条款，需保留）。

> 简而言之：**你可以自由使用、修改和分享，但修改后的作品也必须以 GPL 开源。** 详情请查看 `LICENSE` 文件。

### 📧 联系作者
- GitHub：[Bili481736023](https://github.com/Bili481736023)
- 如有问题或建议，欢迎提 Issue 或 Pull Request。

---

## 📖 English Description

### ⚠️ Important Notes
- **Chromium‑based browsers only** (Edge, Chrome, Brave, Vivaldi, etc.) – **Firefox is NOT supported**.
- A `.crx` file is provided, but **modern browsers no longer allow drag‑and‑drop installation**. Please follow the steps below exactly.

### ✨ Features
- 🌌 **Dynamic aurora background** – Soft, floating color glows for a relaxing visual experience.
- 🕒 **Live clock** – Displays current time and date (with weekday) in real time.
- 🔍 **Smart search** – Switch between **Bing / Baidu / Yandex** with one click.
- 📜 **Search history** – Saves the last 30 searches; click to reuse, delete individual entries, or clear all.
- 🎨 **Fully offline** – All assets load locally (except for searching).
- 📱 **Responsive** – Looks great on mobile, tablet, and desktop.

### 📥 Installation (Correct Steps)
> Because modern Chromium browsers no longer allow direct `.crx` drag‑and‑drop, please follow these steps:

1. Go to the **Releases** page of this repo and download the latest `aurora-start.crx`.
2. **Rename the file extension from `.crx` to `.zip`**.
3. **Extract** the `.zip` file to a folder (e.g., `aurora-start`).
4. Open your browser (Edge or Chrome) and go to the extensions page:
   - Edge: `edge://extensions/`
   - Chrome: `chrome://extensions/`
5. **Turn on "Developer mode"** in the top right.
6. Click **"Load unpacked"** and select the extracted folder.
7. Open a new tab – your aurora start page is live! 🎉

> If you are using an older browser (e.g., Chromium < 80), you may try drag‑and‑drop, but the unpacked method is recommended for maximum compatibility.

### 🛠️ Customization
- **Switch search engine**: Click the engine name at the bottom (e.g., "✦ Bing") and pick another from the pop‑up.
- **Default engine is saved** automatically in `localStorage`.
- **Change colors**: Edit the CSS `radial-gradient` values in `index.html`.
- **Add an icon**: Uncomment the `"icons"` field in `manifest.json` and place your own PNG/SVG files.

### 🤔 Why Not Publish to the Store?
The store requires phone number verification and has a lengthy review process. This project is designed for personal or small‑scale sharing. Loading via developer mode is simple and free from platform restrictions.

### 📜 License
This project is licensed under the **GNU General Public License v3.0 (GPL v3)**.

- ✅ You are free to download, install, use (including commercial use).
- ✅ You are free to modify the code.
- ✅ You are free to distribute original or modified code.
- ⚠️ **Modified code must also be open-sourced under GPL v3**.
- ⚠️ You must attribute the original author (Bili481736023) and date of modification.
- ⚠️ You must include the full GPL v3 license text.
- ❌ You are **NOT** allowed to release this code (or modified versions) as closed-source.
- ❌ You are **NOT** allowed to use this code for training AI models or as an internal component of other software (this restriction is an additional author clause and must be retained).

> In short: **You are free to use, modify, and share, but modified versions must also be open-sourced under GPL.** See the `LICENSE` file for details.

### 📧 Contact
- GitHub: [Bili481736023](https://github.com/Bili481736023)
- For issues or suggestions, feel free to open an Issue or Pull Request.

---

**Enjoy the aurora every time you open a new tab!** 🌌  
**愿极光伴你每一次新标签页的开启！**
