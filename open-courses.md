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

    // generate deterministic cover gradient and emoji based on id
    function hashStr(s){
      let h = 5381;
      for(let i=0;i<s.length;i++) h = ((h<<5) + h) + s.charCodeAt(i);
      return Math.abs(h);
    }

    function makeCoverStyle(id){
      const h = hashStr(id+'cover') % 360;
      const h2 = (h + 25 + (hashStr(id+'b') % 40)) % 360;
      const s = 62 + (hashStr(id+'s') % 14); // saturation 62-75
      const l1 = 42 + (hashStr(id+'l') % 8); // lightness ~42-50
      const l2 = Math.max(28, l1 - 10);
      return `background: linear-gradient(135deg, hsl(${h} ${s}% ${l1}%), hsl(${h2} ${s}% ${l2}%));`;
    }

    function getCoverEmoji(id){
      const pool = ['📘','📗','📙','📕','📒','📚','🧭','🔬','⚙️','🧠','💻','📡'];
      return pool[hashStr(id+'e') % pool.length];
    }

    // create an SVG thumbnail (data URI) showing the first character of the title
    function escapeXml(unsafe){
      return unsafe.replace(/[&<>"']/g, function(c){
        return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
      });
    }

    function makeSVGThumb(title, id){
      const ch = (title||'')[0] || '?';
      const base = hashStr(id+'svg') % 360;
      const sat = 62 + (hashStr(id+'svgs') % 14);
      const light = 46 + (hashStr(id+'svgl') % 8);
      const bg = `hsl(${base} ${sat}% ${light}%)`;
      const fg = '#ffffff';
      const letter = escapeXml((/\p{L}/u.test(ch) || /[\u4e00-\u9fff]/.test(ch)) ? ch.toUpperCase() : ch.toUpperCase());
      const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'>`+
        `<rect rx='18' width='120' height='120' fill='${bg}'/>`+
        `<text x='50%' y='55%' font-family='system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' font-size='56' fill='${fg}' text-anchor='middle' dominant-baseline='middle'>${letter}</text>`+
      `</svg>`;
      return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
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
        // compute cover (gradient) and svg thumb
        const coverStyle = makeCoverStyle(course.id || (course.title||'').slice(0,6));
        const svgThumb = makeSVGThumb(course.title || course.id || 'C', course.id || course.title || 'c');
        
        // Create cover div
        const coverDiv = document.createElement('div');
        coverDiv.className = 'card-cover';
        coverDiv.style.cssText = coverStyle;
        const img = document.createElement('img');
        img.className = 'cover-thumb';
        img.src = svgThumb;
        img.alt = '';
        coverDiv.appendChild(img);
        
        // Create header and content container
        const contentDiv = document.createElement('div');
        contentDiv.style.cssText = 'flex:1;display:flex;flex-direction:column;gap:6px;';
        
        const header = document.createElement('div');
        header.className = 'course-card-header';
        header.innerHTML = `
          <h3>${course.title}</h3>
          <p class="course-meta">${course.instructor} | ${course.credit} 学分 | ${course.semester}</p>
        `;
        
        const desc = document.createElement('p');
        desc.className = 'course-desc';
        desc.textContent = course.desc;
        
        contentDiv.appendChild(header);
        contentDiv.appendChild(desc);
        
        // Create actions
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
        
        // Assemble card: cover + content + actions
        card.appendChild(coverDiv);
        card.appendChild(contentDiv);
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

      // ensure sections structure
      course.sections = course.sections || {};
      const keys = ['syllabus','calendar','notes','assignments','exams'];
      keys.forEach(k=>{ 
        course.sections[k] = course.sections[k] || { 
          md: (k==='syllabus' ? (course.syllabus||'') : ''), 
          files: (course.sections[k] && course.sections[k].files) || [] 
        }; 
        // migrate old materials into syllabus if needed
        if(k==='syllabus' && (!course.sections[k].files.length) && (course.materials||[]).length){
          course.sections[k].files = course.materials.slice();
        }
      });

      // layout: left nav + right content
      main.innerHTML = `
        <div class="detail-header">
          <button class="btn btn-secondary" id="back-btn">← 返回列表</button>
        </div>
        <div class="detail-card" style="display:flex;gap:18px;align-items:flex-start;">
          <div class="detail-left" style="min-width:160px;flex:0 0 180px;">
            <h2 style="margin-top:0">${course.title}</h2>
            <div class="detail-meta" style="margin-bottom:12px">
              <div>👨‍🏫 ${course.instructor}</div>
              <div>⭐ ${course.credit} 学分</div>
              <div>📅 ${course.semester}</div>
            </div>
            <nav id="section-nav" style="display:flex;flex-direction:column;gap:8px"></nav>
          </div>
          <div class="detail-right" style="flex:1;min-width:0">
            <div id="section-content"></div>
          </div>
        </div>
      `;

      document.getElementById('back-btn').addEventListener('click', ()=>{ renderCourseView(cat, data); });

      const nav = document.getElementById('section-nav');
      const content = document.getElementById('section-content');

      // helper: simple markdown -> HTML renderer
      function renderMarkdown(md){
        if(!md) return '<p><em>空内容</em></p>';
        let out = md.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
        // code blocks
        out = out.replace(/```([\s\S]*?)```/g, function(m,code){ return '<pre><code>'+code.replace(/</g,'&lt;')+'</code></pre>'; });
        // headings
        out = out.replace(/^###### (.*$)/gim,'<h6>$1</h6>');
        out = out.replace(/^##### (.*$)/gim,'<h5>$1</h5>');
        out = out.replace(/^#### (.*$)/gim,'<h4>$1</h4>');
        out = out.replace(/^### (.*$)/gim,'<h3>$1</h3>');
        out = out.replace(/^## (.*$)/gim,'<h2>$1</h2>');
        out = out.replace(/^# (.*$)/gim,'<h1>$1</h1>');
        // bold / italic
        out = out.replace(/\*\*(.*?)\*\*/gim,'<strong>$1</strong>');
        out = out.replace(/\*(.*?)\*/gim,'<em>$1</em>');
        // links
        out = out.replace(/\[([^\]]+)\]\(([^\)]+)\)/gim,'<a href="$2" target="_blank">$1</a>');
        // ul
        out = out.replace(/^\s*[-\*] (.*$)/gim,'<li>$1</li>');
        out = out.replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>');
        // paragraphs
        out = out.replace(/(^|\n)([^<\n][^\n]*)(\n|$)/gim,function(m,p1,p2){ if(/^\s*<\/?(h\d|ul|pre|li|p|blockquote)/.test(p2)) return m; return '<p>'+p2+'</p>'; });
        return out;
      }

      // render a specific section
      function showSection(key){
        const sec = course.sections[key] || { md:'', files:[] };
        content.innerHTML = `
          <div style="display:flex;gap:12px;align-items:center;justify-content:space-between;margin-bottom:8px">
            <h3 style="margin:0;text-transform:capitalize">${key}</h3>
            <div>
              ${admin ? '<button id="save-md" class="btn btn-primary">保存 Markdown</button>' : ''}
              <button id="toggle-preview" class="btn btn-secondary">预览</button>
            </div>
          </div>
          <div id="md-editor-area">
            <textarea id="md-editor" style="width:100%;min-height:220px;padding:12px;border-radius:8px;border:1px solid var(--border);font-family:inherit;">${sec.md||''}</textarea>
          </div>
          <div id="md-preview" style="display:none;margin-top:12px;padding:12px;border-radius:8px;border:1px solid var(--border);background:var(--bg);min-height:120px"></div>

          <div style="margin-top:18px">
            <h4>文件管理</h4>
            <div id="files-list" style="display:flex;flex-direction:column;gap:8px;margin-bottom:8px"></div>
            <div style="display:flex;gap:8px;align-items:center">
              <input type="file" id="section-upload" multiple>
              <button id="upload-files" class="btn btn-primary">上传文件</button>
            </div>
          </div>
        `;

        // fill files list
        const filesList = document.getElementById('files-list');
        filesList.innerHTML = '';
        (sec.files||[]).forEach((f,i)=>{
          const el = document.createElement('div'); el.className = 'material-item';
          const filename = f.split('/').pop();
          const fileext = filename.split('.').pop().toLowerCase();
          
          // File type icon
          const iconMap = {
            'pdf':'📄', 'doc':'📝', 'docx':'📝', 'xls':'📊', 'xlsx':'📊', 
            'ppt':'🎯', 'pptx':'🎯', 'zip':'📦', 'rar':'📦', '7z':'📦',
            'jpg':'🖼️', 'jpeg':'🖼️', 'png':'🖼️', 'gif':'🖼️',
            'mp4':'🎬', 'avi':'🎬', 'mov':'🎬', 'txt':'📄', 'md':'📄'
          };
          const icon = iconMap[fileext] || '📎';
          
          // Check if file is previewable
          const previewable = ['pdf','jpg','jpeg','png','gif','txt','md','markdown','csv'].includes(fileext);
          
          el.innerHTML = `${icon} <a href="${f}" target="_blank" style="text-decoration:underline;color:var(--primary)">${filename}</a> <span style="color:var(--text-muted);font-size:0.85rem" id="info-${i}">...</span>`;
          
          // Add preview button if supported
          if(previewable){
            const previewBtn = document.createElement('button');
            previewBtn.className = 'btn-small';
            previewBtn.textContent = '👁️ 预览';
            previewBtn.style.marginLeft = '4px';
            previewBtn.addEventListener('click', (e)=>{
              e.preventDefault();
              showFilePreview(f, fileext, filename);
            });
            el.appendChild(previewBtn);
          }
          
          // Fetch file info async
          (async ()=>{
            try{
              const token = SiteAPI.getToken();
              if(token && f.startsWith('/')){
                const info = await SiteAPI.getFileInfo(f.replace(/^\//,''));
                if(info){
                  const sizeKB = (info.size / 1024).toFixed(1);
                  const sizeStr = info.size < 1024 ? `${info.size}B` : `${sizeKB}KB`;
                  const infoEl = document.getElementById(`info-${i}`);
                  if(infoEl) infoEl.textContent = `(${sizeStr})`;
                }
              }
            }catch(e){ console.warn('Could not fetch file info'); }
          })();
          
          if(admin){
            const del = document.createElement('button'); del.className='btn-small'; del.textContent='删除';
            del.addEventListener('click', async ()=>{
              if(!confirm('确认删除此文件并从课程中移除？')) return;
              try{
                const token = SiteAPI.getToken();
                if(token && f.startsWith('/')){
                  // remove leading /
                  await SiteAPI.deleteFile(f.replace(/^\//,''));
                }
                sec.files.splice(i,1);
                saveLocal(data);
                showSection(key);
              }catch(e){ alert('删除失败:'+e.message); }
            });
            el.appendChild(del);
          }
          filesList.appendChild(el);
        });

        // File preview modal
        function showFilePreview(filePath, ext, filename){
          const modal = document.createElement('div');
          modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:9999;';
          
          const content = document.createElement('div');
          content.style.cssText = 'background:white;border-radius:12px;max-width:90vw;max-height:90vh;overflow:auto;padding:20px;box-shadow:0 10px 40px rgba(0,0,0,0.3);';
          
          const closeBtn = document.createElement('button');
          closeBtn.textContent = '✕ 关闭';
          closeBtn.className = 'btn btn-secondary';
          closeBtn.style.marginBottom = '12px';
          closeBtn.addEventListener('click', ()=>{ modal.remove(); });
          content.appendChild(closeBtn);
          
          const title = document.createElement('h3');
          title.textContent = filename;
          title.style.margin = '0 0 12px 0';
          content.appendChild(title);
          
          const previewContainer = document.createElement('div');
          previewContainer.style.cssText = 'max-width:100%;max-height:70vh;overflow:auto;';
          
          if(ext === 'pdf'){
            // PDF: embed via iframe (using GitHub's PDF viewer)
            const iframe = document.createElement('iframe');
            iframe.src = filePath;
            iframe.style.cssText = 'width:100%;height:600px;border:none;border-radius:8px;';
            previewContainer.appendChild(iframe);
          } else if(['jpg','jpeg','png','gif'].includes(ext)){
            // Image: direct img tag
            const img = document.createElement('img');
            img.src = filePath;
            img.style.cssText = 'max-width:100%;max-height:70vh;border-radius:8px;object-fit:contain;';
            img.addEventListener('error', ()=>{ previewContainer.innerHTML = '<p style="color:red">图片加载失败</p>'; });
            previewContainer.appendChild(img);
          } else if(['txt','md','markdown','csv'].includes(ext)){
            // Text files: fetch and display
            const loadingMsg = document.createElement('p');
            loadingMsg.textContent = '加载中...';
            previewContainer.appendChild(loadingMsg);
            
            fetch(filePath)
              .then(res=>{
                if(!res.ok) throw new Error('加载失败');
                return res.text();
              })
              .then(text=>{
                previewContainer.innerHTML = '';
                
                if(ext === 'md' || ext === 'markdown'){
                  // Render Markdown
                  const rendered = renderMarkdown(text);
                  const mdDiv = document.createElement('div');
                  mdDiv.innerHTML = rendered;
                  mdDiv.style.cssText = 'font-size:0.95rem;line-height:1.6;color:var(--text);';
                  previewContainer.appendChild(mdDiv);
                } else {
                  // Plain text or CSV
                  const pre = document.createElement('pre');
                  pre.textContent = text;
                  pre.style.cssText = 'background:var(--bg);padding:12px;border-radius:8px;overflow-x:auto;font-size:0.9rem;line-height:1.5;color:var(--text);max-width:100%;';
                  previewContainer.appendChild(pre);
                }
              })
              .catch(err=>{
                previewContainer.innerHTML = '<p style="color:red">加载失败：' + err.message + '</p>';
              });
          }
          
          content.appendChild(previewContainer);
          modal.appendChild(content);
          document.body.appendChild(modal);
          
          modal.addEventListener('click', (e)=>{
            if(e.target === modal) modal.remove();
          });
        }

        // preview toggle
        document.getElementById('toggle-preview').addEventListener('click', ()=>{
          const ed = document.getElementById('md-editor');
          const pr = document.getElementById('md-preview');
          if(pr.style.display==='none'){
            pr.innerHTML = renderMarkdown(ed.value);
            pr.style.display = 'block';
          } else { pr.style.display='none'; }
        });

        // Save markdown - always attach listener, check admin inside
        const saveMdBtn = document.getElementById('save-md');
        if(saveMdBtn){
          saveMdBtn.addEventListener('click', ()=>{
            if(!admin){ alert('需要管理员权限'); return; }
            const v = document.getElementById('md-editor').value;
            sec.md = v;
            // keep backwards compatibility
            if(key==='syllabus') course.syllabus = v;
            saveLocal(data);
            alert('已保存到本地 (若已设置 GitHub Token，可点击顶部"保存更改"同步到仓库)');
          });
        }

        // Upload files - always attach listener, check admin inside
        const uploadBtn = document.getElementById('upload-files');
        if(uploadBtn){
          uploadBtn.addEventListener('click', async ()=>{
            if(!admin){ alert('需要管理员权限'); return; }
            const input = document.getElementById('section-upload');
            const files = input.files; if(!files.length){ alert('请选择文件'); return; }
            uploadBtn.disabled = true;
            uploadBtn.textContent = '上传中...';
            for(let f of files){
              try{
                const token = SiteAPI.getToken();
                if(token){
                  const resp = await SiteAPI.uploadFile(f, { overwrite:false, renameOnConflict:true });
                  if(resp && resp.content && resp.content.path) sec.files.push('/'+resp.content.path);
                } else {
                  alert('未检测到 GitHub Token，请先设置 Token 才能上传到仓库');
                  break;
                }
              }catch(e){ alert('上传失败:'+e.message); }
            }
            uploadBtn.disabled = false;
            uploadBtn.textContent = '上传文件';
            saveLocal(data);
            showSection(key);
          });
        }
      }

      // build nav
      keys.forEach((k,i)=>{
        const b = document.createElement('button');
        b.className = 'btn'; b.textContent = k.charAt(0).toUpperCase() + k.slice(1);
        b.addEventListener('click', ()=>{ showSection(k); document.querySelectorAll('#section-nav .btn').forEach(x=>x.classList.remove('active')); b.classList.add('active'); });
        if(i===0) b.classList.add('active');
        nav.appendChild(b);
      });

      // show default
      showSection('syllabus');
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

