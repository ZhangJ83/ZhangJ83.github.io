---
title: 课程与教学资料
layout: page
---

## 课程 (示例)

以下为示例课程列表，课程内容可通过页面右侧的“上传资料”上传（上传会将文件提交到仓库 `assets/uploads/` 下，需要 GitHub Token 授权）。

- 信号与系统（示例）
- 机器学习导论（示例）
- 数字电路与逻辑设计（示例）

<hr>

### 上传课程资料

请准备好你的 GitHub Personal Access Token（包含 `repo` 权限），点击下面的“设置 Token”并粘贴。

<div class="uploader">
  <label>GitHub Token (仅用于将文件保存到仓库，保存在浏览器会话中)：</label>
  <input id="gh-token" type="password" style="max-width:420px">
  <button id="save-token" class="btn">设置 Token</button>

  <label>选择要上传的文件（或拖拽到下方区域）：</label>
  <div id="drop-area" style="border:1px dashed #dbeafe;padding:18px;border-radius:8px;max-width:720px;">
    <input id="course-file" type="file">
    <div id="drop-hint" class="status">将文件拖到此处或使用上面的选择按钮。</div>
  </div>
  <div style="margin-top:8px">
    <label>上传模式：</label>
    <label><input type="radio" name="mode" value="rename" checked> 冲突重命名</label>
    <label style="margin-left:8px"><input type="radio" name="mode" value="overwrite"> 覆盖同名文件</label>
  </div>
  <button id="upload-btn" class="btn">上传到仓库 (assets/uploads/)</button>
  <div id="upload-status" class="status"></div>

  <div style="margin-top:12px">
    <strong>无需 token 的替代上传方式：</strong>
    <p>如果不希望提供 token，你可以通过创建一个 Issue 附件上传文件，GitHub Actions 会在新 Issue 标题以 <code>UPLOAD:</code> 开头时自动将附件保存到仓库。</p>
    <a class="btn" href="https://github.com/ZhangJ83/ZhangJ83.github.io/issues/new?title=UPLOAD:%20Course%20File&body=请将要上传的文件作为附件添加到此 Issue。%0A%0A<!-- upload -->" target="_blank">通过 Issue 上传（无需 token）</a>
  </div>
</div>

<script>
  document.getElementById('save-token').addEventListener('click', ()=>{
    const t = document.getElementById('gh-token').value.trim();
    if(!t){ alert('请输入 token'); return; }
    SiteAPI.setToken(t);
    alert('Token 已保存（仅保存在本次浏览器会话）。');
  });

  // drag & drop handling
  const dropArea = document.getElementById('drop-area');
  ;['dragenter','dragover','dragleave','drop'].forEach(ev => {
    dropArea.addEventListener(ev, e=>{ e.preventDefault(); e.stopPropagation(); }, false);
  });
  dropArea.addEventListener('drop', e=>{
    const f = e.dataTransfer.files[0];
    if(f) document.getElementById('course-file').files = e.dataTransfer.files;
  });

  document.getElementById('upload-btn').addEventListener('click', async ()=>{
    const f = document.getElementById('course-file').files[0];
    const status = document.getElementById('upload-status');
    if(!f){ alert('请选择文件'); return; }
    status.textContent = '上传中...';
    try{
      const mode = document.querySelector('input[name="mode"]:checked').value;
      const options = { overwrite: mode==='overwrite', renameOnConflict: mode==='rename' };
      const resp = await SiteAPI.uploadFile(f, options);
      if(resp && resp.content && resp.content.path){
        status.innerHTML = '上传成功：<a href="/' + resp.content.path + '">' + resp.content.path + '</a>';
      } else if(resp.content && resp.content.sha){
        status.textContent = '上传成功';
      } else if(resp.message){
        status.textContent = '响应：' + resp.message;
      } else{
        status.textContent = '上传完成（无法解析响应）';
      }
    }catch(err){
      status.textContent = '上传失败：' + err.message;
    }
  });
</script>
