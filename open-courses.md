---
title: Open Courses
layout: page
---

<style>
  .courses-wrapper {
    display: flex;
    height: calc(100vh - 200px);
    gap: 0;
    background: var(--bg);
  }
  
  .courses-sidebar-nav {
    width: 260px;
    background: linear-gradient(180deg, rgba(91, 124, 250, 0.08) 0%, rgba(116, 75, 162, 0.05) 100%);
    border-right: 1px solid var(--border-light);
    overflow-y: auto;
    flex-shrink: 0;
    padding: 20px 0;
  }
  
  .courses-sidebar-nav .nav-section {
    margin-bottom: 12px;
  }
  
  .courses-sidebar-nav .nav-title {
    padding: 12px 20px 8px 20px;
    font-weight: 700;
    font-size: 0.9rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .courses-sidebar-nav .nav-item {
    padding: 0;
    margin: 0;
  }
  
  .courses-sidebar-nav .nav-item a {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 20px;
    color: var(--text);
    text-decoration: none;
    font-size: 0.95rem;
    transition: all 0.25s ease;
    border-left: 3px solid transparent;
  }
  
  .courses-sidebar-nav .nav-item a:hover {
    background: rgba(91, 124, 250, 0.1);
    color: var(--primary);
    border-left-color: var(--primary);
  }
  
  .courses-sidebar-nav .nav-item a.active {
    background: rgba(91, 124, 250, 0.15);
    color: var(--primary);
    border-left-color: var(--primary);
    font-weight: 600;
  }
  
  .courses-sidebar-nav .nav-icon {
    font-size: 1.2rem;
    flex-shrink: 0;
  }
  
  .courses-main-area {
    flex: 1;
    overflow-y: auto;
    padding: 40px 50px;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
  }
  
  .courses-header-title {
    margin-bottom: 30px;
  }
  
  .courses-header-title h2 {
    margin: 0 0 8px 0;
    font-size: 2rem;
    color: var(--text);
  }
  
  .courses-header-title p {
    margin: 0 0 16px 0;
    color: var(--text-muted);
    font-size: 0.95rem;
  }
  
  .course-item {
    display: flex;
    gap: 20px;
    padding: 20px;
    margin-bottom: 16px;
    background: var(--bg-light);
    border: 1px solid var(--border-light);
    border-radius: var(--radius);
    transition: all 0.25s ease;
    align-items: center;
  }
  
  .course-item:hover {
    box-shadow: var(--shadow-md);
    border-color: var(--primary);
    background: linear-gradient(90deg, rgba(91, 124, 250, 0.05) 0%, var(--bg-light) 100%);
  }
  
  .course-cover {
    width: 140px;
    height: 140px;
    flex-shrink: 0;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-shadow: var(--shadow-md);
    overflow: hidden;
  }
  
  .course-cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .course-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .course-title {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text);
  }
  
  .course-meta {
    display: flex;
    gap: 16px;
    font-size: 0.85rem;
    color: var(--text-muted);
    flex-wrap: wrap;
  }
  
  .course-meta-item {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  
  .course-desc {
    margin: 0;
    color: var(--text);
    font-size: 0.95rem;
    line-height: 1.4;
  }
  
  .course-actions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  
  .admin-header {
    display: flex;
    gap: 12px;
    align-items: center;
    margin-bottom: 20px;
    padding: 12px 16px;
    background: rgba(91, 124, 250, 0.08);
    border-radius: 8px;
    border: 1px solid var(--border-light);
  }
  
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 20px;
  }
  
  .modal-content {
    background: var(--bg);
    border-radius: var(--radius);
    max-width: 600px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    padding: 24px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .form-group label {
    font-weight: 500;
    color: var(--text);
    font-size: 0.9rem;
  }
  
  .form-group input,
  .form-group textarea,
  .form-group select {
    padding: 8px 12px;
    border: 1px solid var(--border-light);
    border-radius: 6px;
    font-family: inherit;
    font-size: 0.9rem;
    background: var(--bg-light);
    color: var(--text);
  }
  
  .form-group textarea {
    min-height: 100px;
    resize: vertical;
  }
  
  .file-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 16px 0;
  }
  
  .file-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    background: var(--bg-light);
    border-radius: 6px;
    border: 1px solid var(--border-light);
    font-size: 0.9rem;
  }
  
  .file-info {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
  }
  
  .file-actions {
    display: flex;
    gap: 6px;
  }
  
  @media (max-width: 1024px) {
    .courses-sidebar-nav {
      width: 220px;
    }
    .courses-main-area {
      padding: 30px 30px;
    }
  }
  
  @media (max-width: 768px) {
    .courses-wrapper {
      flex-direction: column;
      height: auto;
    }
    
    .courses-sidebar-nav {
      width: 100%;
      border-right: none;
      border-bottom: 1px solid var(--border-light);
      max-height: 300px;
      display: flex;
      overflow-x: auto;
      padding: 16px 0;
    }
    
    .courses-sidebar-nav .nav-section {
      margin-bottom: 0;
      margin-right: 20px;
      flex-shrink: 0;
    }
    
    .courses-main-area {
      padding: 20px 16px;
    }
    
    .course-item {
      flex-direction: column;
      gap: 16px;
    }
    
    .course-cover {
      width: 100%;
      height: 180px;
    }
  }
</style>

<div class="admin-header" id="adminHeader" style="display:none;">
  <input type="password" id="adminPass" placeholder="管理员密码" style="flex: 1;">
  <button class="btn btn-primary" id="adminBtn">🔓 解锁管理员</button>
  <span id="adminStatus" style="color: var(--primary); font-weight: 500;"></span>
</div>

<div class="courses-wrapper">
  <aside class="courses-sidebar-nav" id="coursesNav"></aside>
  <main class="courses-main-area" id="coursesMain"></main>
</div>

<script>
(function(){
  const ADMIN_PASSWORD = 'Philo518sophy';
  let admin = false;
  
  // Load data from localStorage or use defaults
  function loadCourseData() {
    const stored = localStorage.getItem('coursesData');
    if (stored) return JSON.parse(stored);
    
    return {
      categories: [
        {
          id: 'cs',
          title: '🖥️ 计算机科学',
          courses: [
            {
              id: 'adv-algo',
              title: '高级算法',
              desc: '图论与网络流算法专题',
              instructor: '李教授',
              credit: 3,
              semester: '春季',
              sections: {
                syllabus: { md: '第1-2周：图论基础、DFS/BFS\n第3-4周：最短路径算法\n第5-6周：最小生成树\n第7-8周：网络流算法', files: [] },
                files: { md: '', files: [] }
              }
            },
            {
              id: 'ml-intro',
              title: '机器学习导论',
              desc: '从基础到深度学习的完整课程',
              instructor: '王教授',
              credit: 4,
              semester: '秋季',
              sections: {
                syllabus: { md: '第1-2周：机器学习基础\n第3-5周：线性模型\n第6-7周：决策树与集成方法\n第8-9周：支持向量机', files: [] },
                files: { md: '', files: [] }
              }
            },
            {
              id: 'web-dev',
              title: '现代Web开发',
              desc: '前后端全栈技术实战',
              instructor: '陈教授',
              credit: 3,
              semester: '春季',
              sections: {
                syllabus: { md: '第1-2周：HTML5与CSS3\n第3-4周：JavaScript核心\n第5-6周：前端框架\n第7-8周：状态管理与路由', files: [] },
                files: { md: '', files: [] }
              }
            }
          ]
        },
        {
          id: 'ee',
          title: '⚡ 电子信息',
          courses: [
            {
              id: 'signals',
              title: '信号与系统',
              desc: '连续与离散信号处理',
              instructor: '张教授',
              credit: 4,
              semester: '秋季',
              sections: {
                syllabus: { md: '第1-2周：信号基础\n第3-4周：系统特性\n第5-6周：时域分析\n第7-8周：傅里叶级数', files: [] },
                files: { md: '', files: [] }
              }
            },
            {
              id: 'digital-circuit',
              title: '数字电路与逻辑设计',
              desc: '从门电路到时序逻辑',
              instructor: '刘教授',
              credit: 3,
              semester: '春季',
              sections: {
                syllabus: { md: '第1-2周：布尔代数\n第3-4周：组合逻辑\n第5-6周：编码与译码\n第7-8周：乘法器与加法器', files: [] },
                files: { md: '', files: [] }
              }
            }
          ]
        },
        {
          id: 'math',
          title: '📐 数学基础',
          courses: [
            {
              id: 'lin-alg',
              title: '线性代数',
              desc: '矩阵论与向量空间',
              instructor: '刘教授',
              credit: 4,
              semester: '秋季',
              sections: {
                syllabus: { md: '第1-2周：矩阵基本运算\n第3-4周：行列式与伴随矩阵\n第5-6周：矩阵的秩\n第7-8周：向量空间', files: [] },
                files: { md: '', files: [] }
              }
            },
            {
              id: 'calculus',
              title: '微积分进阶',
              desc: '多元函数与级数',
              instructor: '王教授',
              credit: 4,
              semester: '春季',
              sections: {
                syllabus: { md: '第1-2周：多元函数基础\n第3-4周：偏导数与全微分\n第5-6周：多元函数积分\n第7-8周：格林公式与高斯公式', files: [] },
                files: { md: '', files: [] }
              }
            }
          ]
        }
      ]
    };
  }
  
  let courseData = loadCourseData();
  
  function saveCourseData() {
    localStorage.setItem('coursesData', JSON.stringify(courseData));
  }
  
  function hashCode(s) {
    let h = 5381;
    for (let i = 0; i < s.length; i++) {
      h = ((h << 5) + h) + s.charCodeAt(i);
    }
    return Math.abs(h);
  }
  
  function generateSVGThumb(text, id) {
    const ch = text[0] || '?';
    const base = hashCode(id) % 360;
    const sat = 65 + (hashCode(id + 's') % 20);
    const light = 48 + (hashCode(id + 'l') % 8);
    const bg = `hsl(${base} ${sat}% ${light}%)`;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="0 0 140 140">
      <rect width="140" height="140" fill="${bg}"/>
      <text x="70" y="75" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="70" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">${ch.toUpperCase()}</text>
    </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }
  
  function renderMarkdown(md) {
    if (!md) return '<p><em>空内容</em></p>';
    let html = md.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');
    html = html.replace(/\n/gim, '<br>');
    return html;
  }
  
  function renderNav() {
    const nav = document.getElementById('coursesNav');
    nav.innerHTML = '';
    
    courseData.categories.forEach(cat => {
      const section = document.createElement('div');
      section.className = 'nav-section';
      
      const title = document.createElement('div');
      title.className = 'nav-title';
      title.textContent = cat.title;
      section.appendChild(title);
      
      cat.courses.forEach(course => {
        const item = document.createElement('div');
        item.className = 'nav-item';
        
        const link = document.createElement('a');
        link.href = '#';
        link.dataset.courseId = course.id;
        link.innerHTML = `<span class="nav-icon">${course.title.charAt(0)}</span><span>${course.title}</span>`;
        
        link.addEventListener('click', (e) => {
          e.preventDefault();
          renderCourseDetail(course);
          document.querySelectorAll('.nav-item a').forEach(a => a.classList.remove('active'));
          link.classList.add('active');
        });
        
        item.appendChild(link);
        section.appendChild(item);
      });
      
      nav.appendChild(section);
    });
  }
  
  function renderCourseDetail(course) {
    const main = document.getElementById('coursesMain');
    main.innerHTML = '';
    
    const header = document.createElement('div');
    header.className = 'courses-header-title';
    header.innerHTML = `
      <h2>${course.title}</h2>
      <p>${course.desc}</p>
      ${admin ? `<button class="btn btn-secondary" onclick="window.editCourse && window.editCourse('${course.id}')">✏️ 编辑课程</button>` : ''}
    `;
    main.appendChild(header);
    
    const courseCard = document.createElement('div');
    courseCard.className = 'course-item';
    courseCard.innerHTML = `
      <div class="course-cover">
        <img src="${generateSVGThumb(course.title, course.id)}" alt="${course.title}">
      </div>
      <div class="course-content">
        <h3 class="course-title">${course.title}</h3>
        <div class="course-meta">
          <div class="course-meta-item">👨‍🏫 ${course.instructor}</div>
          <div class="course-meta-item">⭐ ${course.credit} 学分</div>
          <div class="course-meta-item">📅 ${course.semester}</div>
        </div>
        <p class="course-desc">${course.desc}</p>
      </div>
    `;
    main.appendChild(courseCard);
    
    // Sections
    const sections = course.sections || {};
    const syllabus = sections.syllabus || { md: '', files: [] };
    
    const syllabusDiv = document.createElement('div');
    syllabusDiv.style.marginTop = '24px';
    syllabusDiv.innerHTML = `
      <h3>📚 教学大纲</h3>
      <div style="background: var(--bg-light); padding: 16px; border-radius: 8px; margin: 12px 0;">
        ${renderMarkdown(syllabus.md)}
      </div>
      ${admin ? `<button class="btn btn-secondary" onclick="window.editSyllabus && window.editSyllabus('${course.id}')">📝 编辑大纲</button>` : ''}
    `;
    main.appendChild(syllabusDiv);
    
    // Files
    const filesDiv = document.createElement('div');
    filesDiv.style.marginTop = '24px';
    filesDiv.innerHTML = '<h3>📂 课程资料</h3>';
    
    const fileList = document.createElement('div');
    fileList.className = 'file-list';
    
    const fileSection = syllabus.files || [];
    if (fileSection.length === 0) {
      fileList.innerHTML = '<p style="color: var(--text-muted);">暂无文件</p>';
    } else {
      fileSection.forEach((file, idx) => {
        const filename = file.split('/').pop();
        const ext = filename.split('.').pop().toLowerCase();
        const icons = { pdf: '📄', doc: '📝', docx: '📝', txt: '📄', md: '📄', zip: '📦', jpg: '🖼️', png: '🖼️' };
        const icon = icons[ext] || '📎';
        
        const item = document.createElement('div');
        item.className = 'file-item';
        item.innerHTML = `
          <div class="file-info">
            <span>${icon}</span>
            <a href="${file}" target="_blank" style="text-decoration: underline; color: var(--primary);">${filename}</a>
          </div>
          <div class="file-actions">
            <button class="btn btn-small" onclick="window.previewFile && window.previewFile('${file}', '${ext}')">👁️ 预览</button>
            ${admin ? `<button class="btn btn-small btn-danger" onclick="window.deleteFile && window.deleteFile('${course.id}', ${idx})">🗑️ 删除</button>` : ''}
          </div>
        `;
        fileList.appendChild(item);
      });
    }
    
    filesDiv.appendChild(fileList);
    
    if (admin) {
      const uploadDiv = document.createElement('div');
      uploadDiv.style.marginTop = '12px';
      uploadDiv.innerHTML = `
        <input type="file" id="fileInput" multiple style="margin-right: 8px;">
        <button class="btn btn-primary" onclick="window.uploadFiles && window.uploadFiles('${course.id}')">⬆️ 上传文件</button>
      `;
      filesDiv.appendChild(uploadDiv);
    }
    
    main.appendChild(filesDiv);
  }
  
  // File preview
  window.previewFile = function(filePath, ext) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const content = document.createElement('div');
    content.className = 'modal-content';
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'btn btn-secondary';
    closeBtn.style.marginBottom = '12px';
    closeBtn.textContent = '✕ 关闭';
    closeBtn.onclick = () => modal.remove();
    content.appendChild(closeBtn);
    
    const title = document.createElement('h3');
    title.textContent = filePath.split('/').pop();
    title.style.margin = '0 0 12px 0';
    content.appendChild(title);
    
    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) {
      const img = document.createElement('img');
      img.src = filePath;
      img.style.cssText = 'max-width: 100%; max-height: 70vh; border-radius: 8px;';
      content.appendChild(img);
    } else if (ext === 'pdf') {
      const iframe = document.createElement('iframe');
      iframe.src = filePath;
      iframe.style.cssText = 'width: 100%; height: 600px; border: none; border-radius: 8px;';
      content.appendChild(iframe);
    } else {
      const pre = document.createElement('pre');
      pre.style.cssText = 'background: var(--bg-light); padding: 12px; border-radius: 8px; overflow-x: auto; max-height: 70vh;';
      pre.textContent = '文件预览加载中...';
      content.appendChild(pre);
      
      fetch(filePath)
        .then(r => r.text())
        .then(text => {
          pre.textContent = text;
        })
        .catch(e => {
          pre.textContent = '加载失败: ' + e.message;
        });
    }
    
    modal.appendChild(content);
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    document.body.appendChild(modal);
  };
  
  // File operations
  window.deleteFile = function(courseId, fileIdx) {
    if (!confirm('确认删除此文件?')) return;
    
    const course = courseData.categories.flatMap(c => c.courses).find(c => c.id === courseId);
    if (course && course.sections && course.sections.syllabus && course.sections.syllabus.files) {
      course.sections.syllabus.files.splice(fileIdx, 1);
      saveCourseData();
      renderCourseDetail(course);
    }
  };
  
  window.uploadFiles = function(courseId) {
    const input = document.getElementById('fileInput');
    const files = input.files;
    
    if (files.length === 0) {
      alert('请选择要上传的文件');
      return;
    }
    
    const course = courseData.categories.flatMap(c => c.courses).find(c => c.id === courseId);
    if (!course) return;
    
    if (!course.sections) course.sections = {};
    if (!course.sections.syllabus) course.sections.syllabus = { md: '', files: [] };
    if (!course.sections.syllabus.files) course.sections.syllabus.files = [];
    
    for (let file of files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const filename = file.name;
        const fileData = e.target.result;
        const fileEntry = `data:${file.type};base64,${fileData.split(',')[1]}`;
        
        // 在实际应用中，这里应该上传到GitHub或服务器
        // 这里我们先存储在localStorage中
        localStorage.setItem(`file_${courseId}_${filename}`, fileData);
        course.sections.syllabus.files.push(`/assets/uploads/${courseId}/${filename}`);
        
        saveCourseData();
        input.value = '';
        alert(`文件 ${filename} 已上传`);
        renderCourseDetail(course);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Edit course
  window.editCourse = function(courseId) {
    const course = courseData.categories.flatMap(c => c.courses).find(c => c.id === courseId);
    if (!course) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const content = document.createElement('div');
    content.className = 'modal-content';
    
    const title = document.createElement('h3');
    title.textContent = '编辑课程';
    title.style.margin = '0 0 16px 0';
    content.appendChild(title);
    
    const form = document.createElement('form');
    form.className = 'form-group';
    form.innerHTML = `
      <label>课程名称:</label>
      <input type="text" id="courseTitle" value="${course.title}" required>
      
      <label>课程简介:</label>
      <input type="text" id="courseDesc" value="${course.desc}" required>
      
      <label>授课教师:</label>
      <input type="text" id="courseInstructor" value="${course.instructor}">
      
      <label>学分:</label>
      <input type="number" id="courseCredit" value="${course.credit}" min="1" max="8">
      
      <label>开课时间:</label>
      <input type="text" id="courseSemester" value="${course.semester}">
    `;
    
    const btnContainer = document.createElement('div');
    btnContainer.style.cssText = 'display: flex; gap: 8px; margin-top: 16px;';
    
    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn btn-primary';
    saveBtn.textContent = '✅ 保存';
    saveBtn.type = 'button';
    saveBtn.onclick = () => {
      course.title = document.getElementById('courseTitle').value;
      course.desc = document.getElementById('courseDesc').value;
      course.instructor = document.getElementById('courseInstructor').value;
      course.credit = parseInt(document.getElementById('courseCredit').value);
      course.semester = document.getElementById('courseSemester').value;
      
      saveCourseData();
      renderNav();
      renderCourseDetail(course);
      modal.remove();
    };
    
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'btn btn-secondary';
    cancelBtn.textContent = '❌ 取消';
    cancelBtn.type = 'button';
    cancelBtn.onclick = () => modal.remove();
    
    btnContainer.appendChild(saveBtn);
    btnContainer.appendChild(cancelBtn);
    form.appendChild(btnContainer);
    content.appendChild(form);
    
    modal.appendChild(content);
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    document.body.appendChild(modal);
  };
  
  // Edit syllabus
  window.editSyllabus = function(courseId) {
    const course = courseData.categories.flatMap(c => c.courses).find(c => c.id === courseId);
    if (!course) return;
    
    const syllabus = course.sections?.syllabus?.md || '';
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const content = document.createElement('div');
    content.className = 'modal-content';
    
    const title = document.createElement('h3');
    title.textContent = '编辑教学大纲';
    title.style.margin = '0 0 16px 0';
    content.appendChild(title);
    
    const textarea = document.createElement('textarea');
    textarea.className = 'form-group';
    textarea.style.cssText = 'padding: 12px; border: 1px solid var(--border-light); border-radius: 6px; width: 100%; min-height: 300px; font-family: monospace;';
    textarea.value = syllabus;
    content.appendChild(textarea);
    
    const btnContainer = document.createElement('div');
    btnContainer.style.cssText = 'display: flex; gap: 8px; margin-top: 16px;';
    
    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn btn-primary';
    saveBtn.textContent = '✅ 保存';
    saveBtn.onclick = () => {
      if (!course.sections) course.sections = {};
      if (!course.sections.syllabus) course.sections.syllabus = { md: '', files: [] };
      course.sections.syllabus.md = textarea.value;
      saveCourseData();
      renderCourseDetail(course);
      modal.remove();
    };
    
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'btn btn-secondary';
    cancelBtn.textContent = '❌ 取消';
    cancelBtn.onclick = () => modal.remove();
    
    btnContainer.appendChild(saveBtn);
    btnContainer.appendChild(cancelBtn);
    content.appendChild(btnContainer);
    
    modal.appendChild(content);
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    document.body.appendChild(modal);
  };
  
  // Admin panel
  document.getElementById('adminHeader').style.display = 'block';
  document.getElementById('adminBtn').onclick = () => {
    const pass = document.getElementById('adminPass').value;
    if (pass === ADMIN_PASSWORD) {
      admin = true;
      document.getElementById('adminPass').style.display = 'none';
      document.getElementById('adminBtn').style.display = 'none';
      document.getElementById('adminStatus').textContent = '✅ 管理员已解锁';
      
      // Re-render to show admin buttons
      const firstCourse = courseData.categories[0].courses[0];
      renderCourseDetail(firstCourse);
    } else {
      alert('密码错误');
    }
  };
  
  // Initialize
  renderNav();
  const firstCourse = courseData.categories[0].courses[0];
  renderCourseDetail(firstCourse);
  document.querySelector('.nav-item a').classList.add('active');
})();
</script>

