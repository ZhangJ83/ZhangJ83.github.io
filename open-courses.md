---
title: Open Courses
layout: page
---

<div id="courses-app" class="courses-app-wrapper">
  <div class="courses-header">
    <button id="toggle-sidebar" class="btn btn-small sidebar-toggle" title="折叠/展开侧边栏">☰</button>
    <h1>🎓 开放课程资源库</h1>
    <p>按分类浏览学术课程，管理员可编辑和上传课程资料。</p>
    <div class="admin-panel">
      <input id="admin-pass" type="password" placeholder="输入管理员密码以解锁编辑" class="admin-input">
      <button id="admin-unlock" class="btn btn-primary">🔓 解锁管理员</button>
      <button id="save-courses" class="btn btn-secondary" style="display:none">💾 保存更改</button>
      <div id="admin-status" class="status"></div>
    </div>
  </div>

  <div id="courses-app" class="courses-app">
    <aside class="courses-sidebar">
      <div id="category-list" class="category-list"></div>
    </aside>
    <main class="courses-main-container">
      <div id="courses-main" class="courses-main"></div>
    </main>
  </div>
</div>

<script>
  (function(){
    const ADMIN_PASSWORD = 'Philo518sophy';
    let admin = false, currentCat = null, currentCourse = null;

    const defaultData = {
      categories: [
        {
          id: 'cs', title: '🖥️ 计算机科学',
          courses: [
            {
              id: 'adv-algo', title: '高级算法', desc: '图论与网络流算法专题',
              instructor: '李教授', credit: 3, semester: '春季',
              syllabus: '第1-2周：图论基础，DFS/BFS算法\n第3-4周：最短路径，Dijkstra与Floyd\n第5-6周：最小生成树，Kruskal与Prim\n第7-8周：网络流算法，最大流问题\n第9-10周：匹配理论\n第11-12周：NP问题与近似算法\n第13-14周：随机化算法\n第15-16周：复习与大作业',
              description: '深入讲解高级算法设计与分析，重点关注图论、网络流与复杂性分析。面向高年级本科与研究生。',
              resources: ['讲义.pdf', '代码示例.zip', '习题集.docx'],
              materials: []
            },
            {
              id: 'ml-intro', title: '机器学习导论', desc: '从基础到深度学习',
              instructor: '王教授', credit: 4, semester: '秋季',
              syllabus: '第1-2周：机器学习基础概念\n第3-5周：线性模型与正则化\n第6-7周：决策树与集成方法\n第8-9周：支持向量机(SVM)\n第10-12周：神经网络基础\n第13-14周：卷积神经网络(CNN)\n第15-16周：循环神经网络(RNN)与Transformer\n第17-18周：项目实战与讨论',
              description: '系统介绍机器学习理论与实践，从经典算法到深度学习，包含大量代码示例与实验案例。',
              resources: ['教材链接', '实验代码', '数据集', '论文推荐'],
              materials: []
            },
            {
              id: 'web-dev', title: '现代Web开发', desc: '前后端全栈技术',
              instructor: '陈教授', credit: 3, semester: '春季',
              syllabus: '第1-2周：HTML5与CSS3基础\n第3-4周：JavaScript核心\n第5-6周：前端框架(React/Vue)\n第7-8周：状态管理与路由\n第9-10周：后端基础与API设计\n第11-12周：数据库设计\n第13-14周：认证与安全\n第15-16周：部署与性能优化',
              description: '全栈Web开发实战课程，从前端UI到后端服务，手把手教学现代Web应用开发。',
              resources: ['项目模板', 'API文档', '前端组件库', '后端框架示例'],
              materials: []
            }
          ]
        },
        {
          id: 'ee', title: '⚡ 电子信息',
          courses: [
            {
              id: 'signals', title: '信号与系统', desc: '连续与离散信号处理',
              instructor: '张教授', credit: 4, semester: '秋季',
              syllabus: '第1-2周：信号基础与分类\n第3-4周：系统特性(线性、移不变性)\n第5-6周：时域分析\n第7-8周：傅里叶级数\n第9-10周：傅里叶变换\n第11-12周：拉普拉斯变换\n第13-14周：Z变换\n第15-16周：滤波器设计',
              description: '经典信号处理理论，涵盖连续与离散信号的表示、分析与处理方法。',
              resources: ['MATLAB代码', '仿真工程文件', '实验指导', '附加资料'],
              materials: []
            },
            {
              id: 'digital-circuit', title: '数字电路与逻辑设计', desc: '从门电路到时序逻辑',
              instructor: '刘教授', credit: 3, semester: '春季',
              syllabus: '第1-2周：布尔代数与逻辑运算\n第3-4周：组合逻辑电路\n第5-6周：编码与译码器\n第7-8周：乘法器与加法器\n第9-10周：时序逻辑基础\n第11-12周：有限状态机\n第13-14周：计数器与寄存器\n第15-16周：大作业与设计讨论',
              description: '数字电路设计基础，学习逻辑门、组合电路、时序电路和状态机设计。',
              resources: ['Verilog代码', '电路原理图', 'FPGA工程文件', '仿真脚本'],
              materials: []
            }
          ]
        },
        {
          id: 'math', title: '📐 数学基础',
          courses: [
            {
              id: 'lin-alg', title: '线性代数', desc: '矩阵论与向量空间',
              instructor: '刘教授', credit: 4, semester: '秋季',
              syllabus: '第1-2周：矩阵基本运算\n第3-4周：行列式与伴随矩阵\n第5-6周：矩阵的秩\n第7-8周：向量空间与基\n第9-10周：线性变换\n第11-12周：特征值与特征向量\n第13-14周：对角化与二次型\n第15-16周：奇异值分解(SVD)',
              description: '线性代数深入讲解，包括矩阵理论、向量空间和特征值分析，为高等数学奠定基础。',
              resources: ['讲义PDF', 'Python计算示例', '习题详解', '参考书推荐'],
              materials: []
            },
            {
              id: 'calculus', title: '微积分进阶', desc: '多元函数与级数',
              instructor: '王教授', credit: 4, semester: '春季',
              syllabus: '第1-2周：多元函数基础\n第3-4周：偏导数与全微分\n第5-6周：多元函数积分\n第7-8周：格林公式与高斯公式\n第9-10周：曲线积分与曲面积分\n第11-12周：无穷级数\n第13-14周：傅里叶级数\n第15-16周：应用与综合复习',
              description: '多元微积分与级数论，涵盖多变量函数的微分、积分和级数分析。',
              resources: ['公式速查表', '习题答案', '计算工具', '应用案例'],
              materials: []
            }
          ]
        }
      ]
    };

    function loadData(){
      const raw = localStorage.getItem('courses_data');
      return raw ? JSON.parse(raw) : defaultData;
    }

    function saveLocal(data){ localStorage.setItem('courses_data', JSON.stringify(data)); }

    function renderCategories(data){
      const container = document.getElementById('category-list');
      container.innerHTML = '';
      data.categories.forEach(cat=>{
        const catEl = document.createElement('div');
        catEl.className = 'category-item';
        const a = document.createElement('a');
        a.href = '#';
        a.dataset.id = cat.id;
        // split emoji icon and label if title contains a space
        const parts = (cat.title||'').split(' ');
        const icon = parts.length>1 ? parts.shift() : parts[0] || '';
        const label = parts.join(' ') || cat.title;
        a.innerHTML = `<span class="cat-icon">${icon}</span><span class="cat-label">${label}</span>`;
        a.addEventListener('click', e=>{ e.preventDefault(); renderCourseView(cat, data); setActiveCategory(cat.id); });
        catEl.appendChild(a);
        if(admin){
          const del = document.createElement('button');
          del.textContent = '✕';
          del.className = 'btn-small';
          del.addEventListener('click', e=>{ e.stopPropagation(); if(confirm('删除此类别?')){ data.categories = data.categories.filter(c=>c.id!==cat.id); saveLocal(data); renderCategories(data); } });
          catEl.appendChild(del);
        }
        container.appendChild(catEl);
      });
      if(admin){
        const addBtn = document.createElement('button');
        addBtn.textContent = '➕ 新增类别';
        addBtn.className = 'btn btn-secondary';
        addBtn.style.width = '100%';
        addBtn.style.marginTop = '12px';
        addBtn.addEventListener('click', ()=>{
          const id = prompt('类别ID(英文):');
          if(!id) return;
          const title = prompt('类别名称:');
          if(!title) return;
          data.categories.push({id, title, courses:[]});
          saveLocal(data);
          renderCategories(data);
        });
        container.appendChild(addBtn);
      }
    }

    function setActiveCategory(id){
      document.querySelectorAll('.category-item a').forEach(a=>{ a.classList.toggle('active', a.dataset.id===id); });
    }

    function renderCourseView(cat, data){
      const main = document.getElementById('courses-main');
      main.innerHTML = '';
      const catTitle = document.createElement('div');
      catTitle.className = 'courses-category-title';
      catTitle.innerHTML = `<h2>${cat.title}</h2><p>共 ${cat.courses.length} 门课程</p>`;
      main.appendChild(catTitle);

      const grid = document.createElement('div');
      grid.className = 'courses-grid';
      cat.courses.forEach(course=>{
        const card = document.createElement('div');
        card.className = 'course-card';
        // cover + header + desc
        card.innerHTML = `
          <div class="card-cover" aria-hidden="true"><div class="card-icon">📘</div></div>
          <div class="course-card-header">
            <h3>${course.title}</h3>
            <p class="course-meta">${course.instructor} | ${course.credit} 学分 | ${course.semester}</p>
          </div>
          <p class="course-desc">${course.desc}</p>
        `;
        const btns = document.createElement('div');
        btns.className = 'course-card-actions';
        const viewBtn = document.createElement('button');
        viewBtn.textContent = '📖 查看详情';
        viewBtn.className = 'btn btn-primary';
        viewBtn.addEventListener('click', ()=>{ renderCourseDetail(course, cat, data); });
        btns.appendChild(viewBtn);
        if(admin){
          const editBtn = document.createElement('button');
          editBtn.textContent = '✏️ 编辑';
          editBtn.className = 'btn btn-secondary';
          editBtn.addEventListener('click', ()=>{ renderCourseEdit(course, cat, data); });
          btns.appendChild(editBtn);
          const delBtn = document.createElement('button');
          delBtn.textContent = '🗑️ 删除';
          delBtn.className = 'btn btn-danger';
          delBtn.addEventListener('click', ()=>{ if(confirm('删除此课程?')){ cat.courses = cat.courses.filter(c=>c.id!==course.id); saveLocal(data); renderCourseView(cat, data); } });
          btns.appendChild(delBtn);
        }
        card.appendChild(btns);
        grid.appendChild(card);
      });

      if(admin){
        const addCard = document.createElement('div');
        addCard.className = 'course-card course-add-card';
        addCard.innerHTML = '<h3>➕ 新增课程</h3>';
        addCard.addEventListener('click', ()=>{ renderCourseEdit({id:'', title:'', desc:'', instructor:'', credit:3, semester:'', syllabus:'', description:'', resources:[], materials:[]}, cat, data); });
        grid.appendChild(addCard);
      }
      main.appendChild(grid);
    }

    function renderCourseDetail(course, cat, data){
      const main = document.getElementById('courses-main');
      main.innerHTML = '';
      main.className = 'course-detail';
      main.innerHTML = `
        <div class="detail-header">
          <button class="btn btn-secondary" id="back-btn">← 返回列表</button>
        </div>
        <div class="detail-card">
          <h1>${course.title}</h1>
          <div class="detail-meta">
            <span>👨‍🏫 ${course.instructor}</span>
            <span>⭐ ${course.credit} 学分</span>
            <span>📅 ${course.semester}开课</span>
          </div>
          <p>${course.description || course.desc}</p>
          
          <section class="detail-section">
            <h3>📚 教学大纲</h3>
            <pre class="syllabus-content">${course.syllabus}</pre>
            ${admin ? '<button class="btn btn-secondary" id="edit-syllabus">编辑大纲</button>' : ''}
            ${admin ? '<input type="file" id="upload-syllabus" accept=".pdf,.doc,.docx" style="display:none">' : ''}
          </section>

          <section class="detail-section">
            <h3>📄 课程资源</h3>
            <div class="resources-list">
              ${(course.resources||[]).map(r=>`<div class="resource-item">📎 ${r}</div>`).join('')}
            </div>
            ${admin ? '<button class="btn btn-secondary" id="add-resource">➕ 添加资源</button>' : ''}
          </section>

          <section class="detail-section">
            <h3>📥 课程资料</h3>
            <div class="materials-list">
              ${(course.materials||[]).map((m,i)=>`<div class="material-item">📦 <a href="${m}">${m.split('/').pop()}</a> <button class="btn-small" data-idx="${i}">删除</button></div>`).join('')}
            </div>
            <div style="margin-top:12px">
              <input type="file" id="upload-material" multiple accept=".pdf,.zip,.docx,.xlsx,.pptx,.txt">
              <button class="btn btn-primary" id="upload-btn" style="margin-left:8px">📤 上传资料</button>
            </div>
          </section>
        </div>
      `;
      
      document.getElementById('back-btn').addEventListener('click', ()=>{ renderCourseView(cat, data); });
      
      if(admin){
        document.getElementById('edit-syllabus').addEventListener('click', ()=>{
          const newSyl = prompt('编辑教学大纲:', course.syllabus);
          if(newSyl!==null){ course.syllabus = newSyl; saveLocal(data); renderCourseDetail(course, cat, data); }
        });
        document.getElementById('add-resource').addEventListener('click', ()=>{
          const res = prompt('添加资源名称:');
          if(res){ (course.resources=course.resources||[]).push(res); saveLocal(data); renderCourseDetail(course, cat, data); }
        });
        document.querySelectorAll('.material-item .btn-small').forEach(btn=>{ btn.addEventListener('click', (e)=>{ const idx=parseInt(e.target.dataset.idx); (course.materials||[]).splice(idx,1); saveLocal(data); renderCourseDetail(course, cat, data); }); });
      }

      document.getElementById('upload-btn').addEventListener('click', async ()=>{
        const files = document.getElementById('upload-material').files;
        if(!files.length){ alert('请选择文件'); return; }
        for(let f of files){
          try{
            const token = SiteAPI.getToken();
            if(token){
              const resp = await SiteAPI.uploadFile(f, {overwrite:false, renameOnConflict:true});
              if(resp && resp.content && resp.content.path){ (course.materials=course.materials||[]).push('/'+resp.content.path); }
            } else { alert('未检测到GitHub Token，请先设置Token'); return; }
          }catch(e){ alert('上传失败:'+e.message); }
        }
        saveLocal(data);
        renderCourseDetail(course, cat, data);
      });
    }

    function renderCourseEdit(course, cat, data){
      const main = document.getElementById('courses-main');
      main.innerHTML = '';
      main.className = 'course-detail';
      const isNew = !course.id;
      main.innerHTML = `
        <div class="detail-header">
          <button class="btn btn-secondary" id="cancel-edit">← 返回</button>
        </div>
        <div class="detail-card">
          <h2>${isNew ? '新增课程' : '编辑课程'}</h2>
          <form id="course-form" class="form-group">
            <label>课程ID(英文):</label>
            <input name="id" value="${course.id}" ${isNew?'':'disabled'} required>
            <label>课程名称:</label>
            <input name="title" value="${course.title}" required>
            <label>简介:</label>
            <input name="desc" value="${course.desc}" required>
            <label>授课教师:</label>
            <input name="instructor" value="${course.instructor}">
            <label>学分:</label>
            <input name="credit" type="number" value="${course.credit}" min="1" max="8">
            <label>开课时间:</label>
            <input name="semester" value="${course.semester}">
            <label>课程描述:</label>
            <textarea name="description">${course.description}</textarea>
            <label>教学大纲(按周列出):</label>
            <textarea name="syllabus">${course.syllabus}</textarea>
            <button type="submit" class="btn btn-primary" style="margin-top:12px">✅ 保存</button>
          </form>
        </div>
      `;
      
      document.getElementById('cancel-edit').addEventListener('click', ()=>{ renderCourseView(cat, data); });
      document.getElementById('course-form').addEventListener('submit', (e)=>{
        e.preventDefault();
        const formData = new FormData(e.target);
        if(isNew){ course.id = formData.get('id'); cat.courses.push(course); }
        course.title = formData.get('title');
        course.desc = formData.get('desc');
        course.instructor = formData.get('instructor');
        course.credit = parseInt(formData.get('credit'));
        course.semester = formData.get('semester');
        course.description = formData.get('description');
        course.syllabus = formData.get('syllabus');
        saveLocal(data);
        renderCourseView(cat, data);
      });
    }

    // Init
    let data = loadData();
    // sidebar collapsed state persistence
    const wrapper = document.querySelector('.courses-app-wrapper');
    const COLLAPSE_KEY = 'courses_sidebar_collapsed';
    let collapsed = localStorage.getItem(COLLAPSE_KEY) === '1';
    if(collapsed) wrapper.classList.add('sidebar-collapsed');

    // toggle button
    const toggleBtn = document.getElementById('toggle-sidebar');
    if(toggleBtn){
      toggleBtn.addEventListener('click', ()=>{
        collapsed = !collapsed;
        wrapper.classList.toggle('sidebar-collapsed', collapsed);
        localStorage.setItem(COLLAPSE_KEY, collapsed ? '1' : '0');
      });
    }

    renderCategories(data);
    if(data.categories.length>0) renderCourseView(data.categories[0], data);

    document.getElementById('admin-unlock').addEventListener('click', ()=>{
      const pass = document.getElementById('admin-pass').value;
      if(pass===ADMIN_PASSWORD){
        admin = true;
        document.getElementById('admin-pass').style.display = 'none';
        document.getElementById('admin-unlock').style.display = 'none';
        document.getElementById('save-courses').style.display = 'inline-block';
        document.getElementById('admin-status').textContent = '✅ 管理员模式已启用';
        renderCategories(data);
        if(currentCat) renderCourseView(currentCat, data);
      } else { alert('密码错误'); }
    });

    document.getElementById('save-courses').addEventListener('click', async ()=>{
      const token = SiteAPI.getToken();
      if(token){
        try{ await SiteAPI.saveJSON('assets/data/courses.json', data, 'Update course data'); alert('✅ 已保存到仓库'); }
        catch(e){ alert('❌ 保存失败:'+e.message); }
      } else { saveLocal(data); alert('✅ 已保存到本地'); }
    });

    // Keep reference for course view
    window._courseApp = {
      data, renderCourseView: (cat)=>{ currentCat=cat; renderCourseView(cat, data); }
    };
  })();
</script>

