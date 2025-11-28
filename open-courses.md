---
title: Open Courses
layout: page
---

## 开放课程资源（样式参考 MIT OpenCourseWare）

本页收录若干示例课程，每门课程包含课程描述、教学大纲（占位），并提供课程资料上传功能（PDF/ZIP/代码）。资料会被保存到 `assets/uploads/`。

<section style="max-width:900px">
  <article class="intro">
    <h3>高级算法（示例）</h3>
    <p><strong>课程简介：</strong>本课程覆盖图算法、近似算法、随机化算法与复杂性分析。</p>
    <p><strong>教学大纲：</strong>
      <ol>
        <li>图论基础与最短路</li>
        <li>网络流与匹配</li>
        <li>近似算法与 NP-hard 问题</li>
        <li>随机化与在线算法</li>
      </ol>
    </p>
    <div>
      <label>上传课程资料（高级算法）</label>
      <input class="course-upload" data-course="Advanced Algorithms" type="file">
      <button class="btn course-upload-btn" data-course="Advanced Algorithms">上传</button>
      <div class="status course-status"></div>
    </div>
  </article>

  <article class="intro">
    <h3>机器学习导论（示例）</h3>
    <p><strong>课程简介：</strong>监督学习、无监督学习、深度学习基础与实践项目。</p>
    <p><strong>教学大纲（示例）：</strong>线性模型、决策树、神经网络、优化方法、模型评估。</p>
    <div>
      <label>上传课程资料（机器学习导论）</label>
      <input class="course-upload" data-course="Intro ML" type="file">
      <button class="btn course-upload-btn" data-course="Intro ML">上传</button>
      <div class="status course-status"></div>
    </div>
  </article>

  <article class="intro">
    <h3>量子计算入门（示例）</h3>
    <p><strong>课程简介：</strong>介绍量子比特、量子门、基本算法与量子编程实践。</p>
    <p><strong>教学大纲（示例）：</strong>量子力学基础、量子电路、量子算法（Grover, Shor）</p>
    <div>
      <label>上传课程资料（量子计算入门）</label>
      <input class="course-upload" data-course="Quantum Intro" type="file">
      <button class="btn course-upload-btn" data-course="Quantum Intro">上传</button>
      <div class="status course-status"></div>
    </div>
  </article>

  <article class="intro">
    <h3>可选：深度学习工程（示例）</h3>
    <p><strong>课程简介：</strong>动手实战与工程实践，如模型部署、性能调优与数据工程。</p>
  </article>
</section>

<script>
  document.querySelectorAll('.course-upload-btn').forEach(btn=>{
    btn.addEventListener('click', async (e)=>{
      const course = btn.dataset.course;
      const input = document.querySelector(`.course-upload[data-course="${course}"]`);
      const file = input.files[0];
      const statusEl = btn.parentElement.querySelector('.course-status');
      if(!file){ alert('请选择文件'); return; }
      statusEl.textContent = '上传中...';
      try{
        const resp = await SiteAPI.uploadFile(file, { overwrite:false, renameOnConflict:true });
        if(resp && resp.content && resp.content.path) statusEl.innerHTML = '上传成功：<a href="/'+resp.content.path+'">'+resp.content.path+'</a>';
        else statusEl.textContent = '上传完成';
      }catch(err){ statusEl.textContent = '上传失败：'+err.message }
    });
  });
</script>
