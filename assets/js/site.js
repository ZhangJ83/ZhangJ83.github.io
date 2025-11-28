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
  async function uploadFile(file){
    if(!file) throw new Error('No file');
    const path = `assets/uploads/${file.name}`;
    const arrayBuf = await file.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuf)));
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
