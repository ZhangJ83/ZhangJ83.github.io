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

  <label>选择要上传的文件：</label>
  <input id="course-file" type="file">
  <button id="upload-btn" class="btn">上传到仓库 (assets/uploads/)</button>
  <div id="upload-status" class="status"></div>
</div>

<script>
  document.getElementById('save-token').addEventListener('click', ()=>{
    const t = document.getElementById('gh-token').value.trim();
    if(!t){ alert('请输入 token'); return; }
    SiteAPI.setToken(t);
    alert('Token 已保存（仅保存在本次浏览器会话）。');
  });

  document.getElementById('upload-btn').addEventListener('click', async ()=>{
    const f = document.getElementById('course-file').files[0];
    const status = document.getElementById('upload-status');
    status.textContent = '上传中...';
    try{
      const resp = await SiteAPI.uploadFile(f);
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
