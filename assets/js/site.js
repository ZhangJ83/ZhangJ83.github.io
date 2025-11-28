// Site JS: provide GitHub-based upload and simple forum (issues) interactions.
(function(){
  const OWNER = 'ZhangJ83';
  const REPO = 'ZhangJ83.github.io';

  function getToken(){
    return sessionStorage.getItem('gh_token') || '';
  }
  function setToken(t){
    sessionStorage.setItem('gh_token', t);
  }

  async function api(path, method='GET', body){
    const token = getToken();
    const headers = { 'Accept': 'application/vnd.github.v3+json' };
    if(token) headers['Authorization'] = 'token ' + token;
    const res = await fetch('https://api.github.com' + path, { method, headers, body: body? JSON.stringify(body): undefined });
    return res.json();
  }

  // Upload a file to repo under assets/uploads/
  async function checkFileExists(path){
    const resp = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(path)}`);
    if(resp.status===200) return await resp.json();
    return null;
  }

  // options: { overwrite:false, renameOnConflict:true }
  async function uploadFile(file, options){
    if(!file) throw new Error('No file');
    options = options || { overwrite: false, renameOnConflict: true };
    let path = `assets/uploads/${file.name}`;

    const existing = await checkFileExists(path);
    if(existing && !options.overwrite){
      if(options.renameOnConflict){
        const ts = Date.now();
        const parts = file.name.split('.');
        if(parts.length>1){
          const ext = parts.pop();
          const base = parts.join('.');
          path = `assets/uploads/${base}_${ts}.${ext}`;
        } else {
          path = `assets/uploads/${file.name}_${ts}`;
        }
      } else {
        throw new Error('File exists');
      }
    }

    const arrayBuf = await file.arrayBuffer();
    // base64 encoding for binary
    let binary = '';
    const bytes = new Uint8Array(arrayBuf);
    const chunk = 0x8000;
    for (let i = 0; i < bytes.length; i += chunk) {
      binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
    }
    const base64 = btoa(binary);
    const message = `Upload ${file.name} via site upload`;
    const body = { message, content: base64 };
    const resp = await api(`/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(path)}`, 'PUT', body);
    return resp;
  }

  // Forum: list issues (label 'forum')
  async function listThreads(){
    const data = await api(`/repos/${OWNER}/${REPO}/issues?labels=forum&state=open`);
    return data;
  }

  async function createThread(title, bodyText){
    const body = { title, body: bodyText, labels: ['forum'] };
    const resp = await api(`/repos/${OWNER}/${REPO}/issues`, 'POST', body);
    return resp;
  }

  // Create a comment on an issue (reply in thread)
  async function createComment(issueNumber, commentBody){
    const resp = await api(`/repos/${OWNER}/${REPO}/issues/${issueNumber}/comments`, 'POST', { body: commentBody });
    return resp;
  }

  // Publications: list files under publications/ directory
  async function listPublications(){
    const data = await api(`/repos/${OWNER}/${REPO}/contents/publications`);
    if(Array.isArray(data)){
      // return only markdown files sorted by name (could sort by date)
      return data.filter(f=>f.name.endsWith('.md')).sort((a,b)=>b.name.localeCompare(a.name));
    }
    return [];
  }

  // Create a publication: upload PDF then create a markdown metadata file in publications/
  // meta: { title, abstract, keywords (array), categories }
  async function createPublication(meta, pdfFile){
    // Upload PDF first
    const pdfResp = await uploadFile(pdfFile, { overwrite: false, renameOnConflict: true });
    let pdfPath = '';
    if(pdfResp && pdfResp.content && pdfResp.content.path) pdfPath = pdfResp.content.path;
    else if(pdfResp.content && pdfResp.content.sha) pdfPath = `assets/uploads/${pdfFile.name}`;

    const slug = meta.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'') + '-' + (new Date()).toISOString().slice(0,10);
    const filename = `publications/${slug}.md`;
    const front = `---\ntitle: "${meta.title.replace(/"/g,'\"')}"\ndate: ${new Date().toISOString()}\nabstract: "${(meta.abstract||'').replace(/"/g,'\"')}"\nkeywords: [${(meta.keywords||[]).map(k=>`"${k.replace(/"/g,'\"')}"`).join(', ')}]\nfile: /${pdfPath}\ncategories: [${(meta.categories||[]).map(c=>`"${c.replace(/"/g,'\"')}"`).join(', ')}]\n---\n\n`;
    const content = front + `# ${meta.title}\n\n${meta.abstract || ''}\n`;
    const body = { message: `Add publication ${meta.title}`, content: btoa(unescape(encodeURIComponent(content))) };
    const resp = await api(`/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(filename)}`, 'PUT', body);
    return resp;
  }

  // Expose to window for page scripts
  window.SiteAPI = {
    setToken,
    getToken,
    uploadFile,
    listThreads,
    createThread
    ,createComment, listPublications, createPublication
  };
})();
