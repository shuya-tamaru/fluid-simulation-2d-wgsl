# ミャクミャク - Voronoi Pattern with Eyes

WebGPUを使用してリアルタイムでVoronoi図形に「目」を描いた「ミャクミャク」パターンを描画するアプリケーションです。

[![Demo](https://shuya-tamaru.github.io/voronoi-myakumyaku-wgsl/thumbnail.jpg)](https://shuya-tamaru.github.io/voronoi-myakumyaku-wgsl/)

## 🎯 デモ

**[ライブデモはこちら](https://shuya-tamaru.github.io/voronoi-myakumyaku-wgsl/)**

## ✨ 特徴

- **WebGPU**: 最新のGPUコンピューティングAPIを使用
- **リアルタイム描画**: 60FPSで滑らかなアニメーション
- **インタラクティブ**: マウスカーソルに反応して目が動く
- **カスタマイズ可能**: GUIで色やパラメータを調整可能
- **Voronoi図形**: 数学的に美しいセル分割パターン

## 🎨 描画内容

- **Voronoi図形**: グリッドベースのセル分割
- **目**: 各セルに白目と青い瞳を描画
- **アニメーション**: 時間経過でセルが動的に変化
- **マウス追従**: カーソル位置に応じて瞳が移動
- **3色パレット**: Human（赤）、Nature（青）、System（銀）

## 🛠️ 技術スタック

- **WebGPU**: GPU描画
- **WGSL**: WebGPU Shading Language
- **TypeScript**: 型安全な開発
- **Vite**: 高速ビルドツール
- **lil-gui**: パラメータ調整UI

## 🚀 セットアップ

### 前提条件

- Node.js 20以上
- WebGPU対応ブラウザ（Chrome 113+, Edge 113+, Firefox Nightly）

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/shuya-tamaru/voronoi-myakumyaku-wgsl.git
cd voronoi-myakumyaku-wgsl

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

### ビルド

```bash
# プロダクションビルド
npm run build

# プレビュー
npm run preview
```

## 🌐 ブラウザ対応

### 対応ブラウザ
- **Chrome 113+** (Desktop & Android)
- **Edge 113+** (Desktop)
- **Firefox Nightly** (WebGPU有効時)

### WebGPU有効化
Chrome/EdgeでWebGPUを有効にする場合：
```
chrome://flags/#enable-unsafe-webgpu
```

## 📁 プロジェクト構成

```
src/
├── core/           # WebGPUデバイス・レンダラー
├── gfx/            # グラフィックス関連
├── scene/          # シーン管理
├── shaders/        # WGSLシェーダー
├── utils/          # ユーティリティ（GUI、マウス等）
└── app/            # アプリケーション初期化
```

## 🎮 操作方法

- **マウス移動**: 瞳がカーソルを追従
- **GUI**: 画面右上のパネルでパラメータ調整
  - 色の変更
  - グリッド数の調整
  - 動きの強さの調整
---

**注意**: このアプリケーションはWebGPUを必要とします。対応ブラウザでご利用ください。