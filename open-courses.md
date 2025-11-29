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
    margin-bottom: 8px;
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
    max-width: 1200px;
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
    margin: 0;
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
    }
    
    .courses-sidebar-nav .nav-section {
      margin-bottom: 0;
      margin-right: 20px;
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

<div class="courses-wrapper">
  <aside class="courses-sidebar-nav" id="coursesNav"></aside>
  <main class="courses-main-area" id="coursesMain"></main>
</div>

<script>
(function(){
  const courseData = {
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
            semester: '春季'
          },
          {
            id: 'ml-intro',
            title: '机器学习导论',
            desc: '从基础到深度学习的完整课程',
            instructor: '王教授',
            credit: 4,
            semester: '秋季'
          },
          {
            id: 'web-dev',
            title: '现代Web开发',
            desc: '前后端全栈技术实战',
            instructor: '陈教授',
            credit: 3,
            semester: '春季'
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
            semester: '秋季'
          },
          {
            id: 'digital-circuit',
            title: '数字电路与逻辑设计',
            desc: '从门电路到时序逻辑',
            instructor: '刘教授',
            credit: 3,
            semester: '春季'
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
            semester: '秋季'
          },
          {
            id: 'calculus',
            title: '微积分进阶',
            desc: '多元函数与级数',
            instructor: '王教授',
            credit: 4,
            semester: '春季'
          }
        ]
      }
    ]
  };
  
  // 生成颜色渐变
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
    
    const header = document.createElement('div');
    header.className = 'courses-header-title';
    header.innerHTML = `
      <h2>${course.title}</h2>
      <p>${course.desc}</p>
    `;
    
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
        <div class="course-actions">
          <button class="btn btn-primary">📖 查看详情</button>
          <button class="btn btn-secondary">📝 教学大纲</button>
          <button class="btn btn-secondary">📂 课程资料</button>
        </div>
      </div>
    `;
    
    main.innerHTML = '';
    main.appendChild(header);
    main.appendChild(courseCard);
  }
  
  // Initialize
  renderNav();
  // Show first course
  const firstCourse = courseData.categories[0].courses[0];
  renderCourseDetail(firstCourse);
  document.querySelector('.nav-item a').classList.add('active');
})();
</script>

