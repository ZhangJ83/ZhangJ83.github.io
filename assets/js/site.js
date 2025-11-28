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

  // Expose to window for page scripts
  window.SiteAPI = {
    setToken,
    getToken,
    uploadFile,
    listThreads,
    createThread
  };
})();
