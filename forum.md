---
title: 论坛
layout: page
---

## 讨论论坛（基于 GitHub Issues）

页面可以列出带有 `forum` 标签的 issue；若要发帖或回复，需要提供 GitHub Token（保存在本次会话）。

<div>
  <label>GitHub Token：</label>
  <input id="forum-token" type="password" style="max-width:360px">
  <button id="forum-save" class="btn">设置 Token</button>
</div>

<h3>发起新讨论</h3>
<input id="thread-title" placeholder="话题标题（必填）" style="width:100%;max-width:720px;padding:8px;margin-bottom:6px">
<textarea id="thread-body" placeholder="内容（可选）" style="width:100%;max-width:720px;height:120px;padding:8px"></textarea>
<div style="margin-top:8px">
  <button id="thread-create" class="btn">发布讨论</button>
  <span id="thread-status" class="status"></span>
</div>

<hr>

<h3>现有讨论</h3>
<ul id="threads" class="threads"></ul>

<script>
  document.getElementById('forum-save').addEventListener('click', ()=>{
    const t = document.getElementById('forum-token').value.trim();
    if(!t){ alert('请输入 token'); return; }
    SiteAPI.setToken(t);
    alert('Token 已保存（仅保存在本次浏览器会话）。');
    loadThreads();
  });

  document.getElementById('thread-create').addEventListener('click', async ()=>{
    const title = document.getElementById('thread-title').value.trim();
    const body = document.getElementById('thread-body').value.trim();
    const status = document.getElementById('thread-status');
    if(!title){ alert('请输入标题'); return; }
    status.textContent = '发布中...';
    try{
      const resp = await SiteAPI.createThread(title, body);
      if(resp && resp.url){
        status.innerHTML = '已发布：<a href="' + resp.html_url + '" target="_blank">查看讨论</a>';
        loadThreads();
      } else {
        status.textContent = '发布完成（但返回结果不标准）';
      }
    }catch(err){ status.textContent = '发布失败：' + err.message }
  });

  async function loadThreads(){
    const el = document.getElementById('threads');
    el.innerHTML = '<li class="status">加载中...</li>';
    try{
      const data = await SiteAPI.listThreads();
      if(!Array.isArray(data)){
        el.innerHTML = '<li class="status">无法加载：' + (data.message||JSON.stringify(data)) + '</li>';
        return;
      }
      if(data.length===0) el.innerHTML = '<li class="status">当前没有讨论。</li>';
      else{
        el.innerHTML = '';
        data.forEach(i=>{
          const li = document.createElement('li');
          li.innerHTML = `<h4><a href="${i.html_url}" target="_blank">${i.title}</a></h4><div class="meta">#${i.number} · ${i.user.login} · ${new Date(i.created_at).toLocaleString()}</div>`;
          el.appendChild(li);
        });
      }
    }catch(err){ el.innerHTML = '<li class="status">加载失败：' + err.message + '</li>' }
  }

  // Load initial threads (may be unauthenticated read)
  loadThreads();
</script>
