---
title: Open Courses
layout: page
---

## 开放课程（GitBook 风格页）

此页面提供课程展示与管理员编辑功能（客户端密码校验）。左侧为课程分类目录（可折叠），右侧为该类别下的大图标课程展示。管理员可使用密码输入框激活编辑模式（密码：Philo518sophy），在编辑模式下可添加/删除类别与课程，修改课程描述，并保存为仓库数据（若提供 GitHub Token 则可直接写入 `assets/data/courses.json` 并上传课程资料），否则可保存到本地浏览器存储。

<div id="courses-app" class="courses-app" style="display:flex;gap:20px;">
  <aside style="width:260px;">
    <div style="margin-bottom:12px">
      <input id="admin-pass" type="password" placeholder="管理员密码（输入以解锁编辑）" style="width:100%;padding:8px">
      <button id="admin-unlock" class="btn" style="width:100%;margin-top:6px">解锁管理员</button>
    </div>
    <div id="category-list" class="category-list"></div>
    <div style="margin-top:12px"><button id="save-courses" class="btn">保存更改（本地 / 可推送）</button></div>
  </aside>

  <main style="flex:1">
    <div id="courses-main" class="courses-main"></div>
  </main>
</div>

<script>
  // Simple client-side course manager
  (function(){
    const ADMIN_PASSWORD = 'Philo518sophy';
    const DATA_PATH = 'assets/data/courses.json';
    let admin = false;
    // default data
    const defaultData = {
      categories: [
        { id: 'curriculum', title: '培养方案', courses: [] },
        { id: 'cs', title: '计算机类', courses: [
          { id: 'adv-algo', title: '高级算法', desc: '图算法、网络流与近似算法', icon: '', materials: [] },
          { id: 'ml-intro', title: '机器学习导论', desc: '监督/无监督与深度学习基础', icon: '', materials: [] }
        ] },
        { id: 'ee', title: '电子类', courses: [ { id:'signals', title:'信号与系统', desc:'时域/频域分析', icon:'', materials:[] } ] },
        { id: 'math', title: '数学类', courses: [ { id:'lin-alg', title:'线性代数', desc:'矩阵与向量空间', icon:'', materials:[] } ] }
      ]
    };

    function loadData(){
      // try localStorage first
      const raw = localStorage.getItem('courses_data');
      if(raw) return JSON.parse(raw);
      return defaultData;
    }

    function saveLocal(data){ localStorage.setItem('courses_data', JSON.stringify(data)); }

    function renderCategories(data){
      const container = document.getElementById('category-list'); container.innerHTML='';
      data.categories.forEach(cat=>{
        const el = document.createElement('div'); el.style.marginBottom='8px';
        const a = document.createElement('a'); a.href='#'; a.textContent = cat.title; a.style.display='block'; a.dataset.id=cat.id;
        a.addEventListener('click', e=>{ e.preventDefault(); renderCourses(cat); setActiveCategory(cat.id); });
        el.appendChild(a);
        if(admin){
          const del = document.createElement('button'); del.textContent='删除'; del.style.marginLeft='6px'; del.addEventListener('click', ()=>{ if(confirm('删除类别?')){ data.categories = data.categories.filter(c=>c.id!==cat.id); saveLocal(data); renderCategories(data); renderCourses(data.categories[0]); } });
          el.appendChild(del);
        }
        container.appendChild(el);
      });
      if(admin){
        const addBtn = document.createElement('button'); addBtn.textContent='添加类别'; addBtn.className='btn'; addBtn.addEventListener('click', ()=>{
          const id = prompt('类别 id（英文）'); if(!id) return; const title = prompt('类别标题'); if(!title) return; data.categories.push({id, title, courses:[]}); saveLocal(data); renderCategories(data);
        }); container.appendChild(addBtn);
      }
    }

    function setActiveCategory(id){
      document.querySelectorAll('#category-list a').forEach(a=>{ a.style.fontWeight = a.dataset.id===id? '700':'400'; });
    }

    function renderCourses(cat){
      const main = document.getElementById('courses-main'); main.innerHTML='';
      const h = document.createElement('h2'); h.textContent = cat.title; main.appendChild(h);
      const grid = document.createElement('div'); grid.style.display='grid'; grid.style.gridTemplateColumns='repeat(auto-fit,minmax(240px,1fr))'; grid.style.gap='14px';
      cat.courses.forEach(c=>{
        const card = document.createElement('div'); card.className='panel';
        card.innerHTML = `<h4>${c.title}</h4><p>${c.desc}</p>`;
        const btns = document.createElement('div');
        const view = document.createElement('a'); view.className='btn'; view.textContent='查看'; view.href='#'; btns.appendChild(view);
        if(admin){
          const edit = document.createElement('button'); edit.className='btn'; edit.textContent='编辑'; edit.style.marginLeft='6px'; edit.addEventListener('click', ()=>{ editCourse(cat, c); });
          const del = document.createElement('button'); del.className='btn'; del.textContent='删除'; del.style.marginLeft='6px'; del.addEventListener('click', ()=>{ if(confirm('删除课程?')){ cat.courses = cat.courses.filter(x=>x.id!==c.id); saveLocal(data); renderCategories(data); renderCourses(cat); } });
          btns.appendChild(edit); btns.appendChild(del);
        }
        card.appendChild(btns); grid.appendChild(card);
      });
      if(admin){
        const addCard = document.createElement('div'); addCard.className='panel'; addCard.innerHTML = '<h4>添加新课程</h4>';
        const titleIn = document.createElement('input'); titleIn.placeholder='课程标题'; titleIn.style.width='100%'; titleIn.style.marginBottom='6px';
        const descIn = document.createElement('textarea'); descIn.placeholder='课程描述'; descIn.style.width='100%'; descIn.style.marginBottom='6px';
        const idIn = document.createElement('input'); idIn.placeholder='课程 id（英文）'; idIn.style.width='100%'; idIn.style.marginBottom='6px';
        const fileIn = document.createElement('input'); fileIn.type='file'; fileIn.accept='application/pdf,application/zip';
        const addBtn = document.createElement('button'); addBtn.className='btn'; addBtn.textContent='添加课程'; addBtn.addEventListener('click', async ()=>{
          const id = idIn.value.trim() || ('c'+Date.now()); const t = titleIn.value.trim()||'未命名课程'; const d = descIn.value.trim();
          const courseObj = { id, title: t, desc: d, materials: [] };
          if(fileIn.files[0]){
            const f = fileIn.files[0];
            // upload file if token present
            try{
              const token = SiteAPI.getToken();
              if(token){
                const resp = await SiteAPI.uploadFile(f, { overwrite:false, renameOnConflict:true });
                if(resp && resp.content && resp.content.path) courseObj.materials.push('/'+resp.content.path);
              } else {
                alert('未检测到 GitHub Token，文件将保存在本地（无法上传到仓库）');
              }
            }catch(e){ console.error(e); alert('上传文件失败：'+e.message); }
          }
          cat.courses.push(courseObj); saveLocal(data); renderCategories(data); renderCourses(cat);
        });
        addCard.appendChild(idIn); addCard.appendChild(titleIn); addCard.appendChild(descIn); addCard.appendChild(fileIn); addCard.appendChild(addBtn);
        grid.appendChild(addCard);
      }
      main.appendChild(grid);
    }

    function editCourse(cat, c){
      const title = prompt('课程标题', c.title); if(title!==null) c.title = title;
      const desc = prompt('课程描述', c.desc); if(desc!==null) c.desc = desc;
      saveLocal(data); renderCategories(data); renderCourses(cat);
    }

    // load and init
    let data = loadData();
    renderCategories(data);
    renderCourses(data.categories[0]);

    document.getElementById('admin-unlock').addEventListener('click', ()=>{
      const v = document.getElementById('admin-pass').value;
      if(v===ADMIN_PASSWORD){ admin=true; alert('管理员模式已启用'); renderCategories(data); renderCourses(data.categories[0]); }
      else alert('密码错误');
    });

    document.getElementById('save-courses').addEventListener('click', async ()=>{
      // try to save to repo using SiteAPI.saveJSON if token present
      const token = SiteAPI.getToken();
      if(token){
        try{
          const resp = await SiteAPI.saveJSON('assets/data/courses.json', data, 'Update courses data');
          alert('已保存到仓库（通过 GitHub API）');
        }catch(e){ alert('保存到仓库失败：'+e.message); }
      } else {
        saveLocal(data); alert('已保存到本地浏览器存储（localStorage）');
      }
    });
  })();
</script>

