---
title: Publications
layout: page
---

## 学术论文与出版物

本页用于展示论文、研究报告与出版物。你可以上传 PDF，并为每篇文章填写摘要与关键词。上传会将 PDF 保存到 `assets/uploads/`，并在 `publications/` 下创建一个对应的 Markdown 元数据文件（需提供 GitHub Token 或使用 Issue 上传工作流）。

<section style="max-width:900px">
  <h3>添加新文章</h3>
  <div>
    <label>标题</label>
    <input id="pub-title" style="width:100%;max-width:720px;padding:8px;margin-bottom:6px">
    <label>摘要</label>
    <textarea id="pub-abstract" style="width:100%;max-width:720px;height:120px;padding:8px"></textarea>
    <label>关键词（逗号分隔）</label>
    <input id="pub-keywords" style="width:100%;max-width:720px;padding:8px;margin-bottom:6px">
    <label>上传 PDF</label>
    <input id="pub-file" type="file" accept="application/pdf">
    <div style="margin-top:8px">
      <button id="pub-create" class="btn">创建并上传</button>
      <span id="pub-status" class="status"></span>
    </div>
    <div style="margin-top:12px">
      <strong>无需 token 的替代上传：</strong>
      <p>可创建 Issue（标题以 <code>UPLOAD:</code> 开头）并添加附件，工作流会把附件保存到 `assets/uploads/`。</p>
    </div>
  </div>

  <hr>

  <h3>已发布（示例）</h3>
  <div id="pub-list">
    <article class="intro">
      <h4>示例论文一：学习型信号处理导论</h4>
      <p><strong>摘要：</strong>本文介绍学习型信号处理的基本框架与最新研究进展（占位示例）。</p>
      <p><strong>关键词：</strong>信号处理, 机器学习</p>
      <p><a href="/assets/uploads/sample-paper-1.pdf">下载 PDF（占位）</a></p>
    </article>

    <article class="intro">
      <h4>示例论文二：可解释 AI 与伦理考量</h4>
      <p><strong>摘要：</strong>探讨可解释人工智能在实际部署中的伦理与实用问题（占位示例）。</p>
      <p><strong>关键词：</strong>可解释性, AI伦理</p>
      <p><a href="/assets/uploads/sample-paper-2.pdf">下载 PDF（占位）</a></p>
    </article>

    <article class="intro">
      <h4>示例论文三：量子计算简介（教学笔记）</h4>
      <p><strong>摘要：</strong>面向本科生的量子计算入门讲义（占位示例）。</p>
      <p><strong>关键词：</strong>量子计算, 教学</p>
      <p><a href="/assets/uploads/sample-paper-3.pdf">下载 PDF（占位）</a></p>
    </article>
  </div>
</section>

<script>
  document.getElementById('pub-create').addEventListener('click', async ()=>{
    const title = document.getElementById('pub-title').value.trim();
    const abstract = document.getElementById('pub-abstract').value.trim();
    const keywords = document.getElementById('pub-keywords').value.split(',').map(s=>s.trim()).filter(Boolean);
    const file = document.getElementById('pub-file').files[0];
    const status = document.getElementById('pub-status');
    if(!title || !file){ alert('请填写标题并选择 PDF 文件'); return; }
    status.textContent = '处理中...';
    try{
      const resp = await SiteAPI.createPublication({ title, abstract, keywords }, file);
      if(resp && resp.content && resp.content.path){
        status.innerHTML = '已创建：<a href="/' + resp.content.path + '">' + resp.content.path + '</a>';
      } else if(resp.content && resp.content.sha){
        status.textContent = '发布成功';
      } else if(resp.message){
        status.textContent = '响应：' + resp.message;
      } else{
        status.textContent = '已完成（但响应无法解析）';
      }
    }catch(err){ status.textContent = '失败：'+err.message }
  });
</script>
