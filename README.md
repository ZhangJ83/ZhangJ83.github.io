# ZhangJ83.github.io

这是你的学术个人网站仓库，已配置为可直接部署到 GitHub Pages（仓库为 `ZhangJ83.github.io` 时，会自动在 `https://ZhangJ83.github.io` 提供服务）。

## 快速本地预览

在 Windows PowerShell 中执行：

```pwsh
cd E:\Users\zzz\Documents\GitHub\ZhangJ83.github.io
python -m http.server 4000
# 打开 http://localhost:4000
```

## 在 GitHub Pages 上部署

1. 将改动推送到 `main`（已完成）。
2. 打开仓库 Settings → Pages，确认 Pages 源为 `main` 分支的根目录（如果仓库名为 `username.github.io`，通常会自动启用）。
3. 访问 `https://ZhangJ83.github.io` 验证站点上线。

## 功能说明与注意

- 主页使用自定义 `index.html`，并实现 GitBook 风格侧边栏单页布局（同页导航）。
- `open-courses.md`, `publications.md`, `courses.md`, `forum.md` 等页面包含管理和上传交互：
	- 页面内上传到仓库（`assets/uploads/`）需要 GitHub Personal Access Token（在页面中设置）。
	- 已配置 Issue -> Action 工作流以支持通过 Issue 上传附件到 `assets/uploads/`（无需个人 token）。
- 课程管理页面提供名为 `Philo518sophy` 的客户端管理员密码（仅本地 JS 校验，非安全认证机制）。建议如需正式管理权限使用 OAuth 或后端认证。

## 后续可选项（我可以帮你做）

- 将 `publications/` 或 `assets/data/courses.json` 迁移为 Jekyll collections 并创建 `_layouts` 模板以自动渲染列表与详情页。
- 集成 GitHub OAuth / GitHub App 以实现安全的管理员登录与发帖身份验证。
- 改进 GitHub Actions 工作流以更稳健地处理 Issue 附件与课程数据合并。

如需我代为完成部署、OAuth 配置或把页面改为 Jekyll 模板，告诉我你希望先做哪一项。 
