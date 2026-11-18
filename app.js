const projects=[
['2118648878084612096','冬藏节 · 田间与手作','拔萝卜、做泡菜、灌香肠'],
['2117155891374678016','小小特种兵 · 田野集结','捞鱼、射箭、土灶烤鱼、真人 CS'],
['2110712224741146624','田野里的万圣节','割稻脱粒、南瓜彩绘、手作闯关'],
['2111038853283807232','变装讨糖记 · 南瓜大冒险','主题闯关与亲子 DIY'],
['2087500937630568448','小小极地科考员','认识企鹅、拼装雪龙号模型'],
['2080172030534844416','尖兵军事营 · 3 天 2 晚','真人 CS、装甲车与应急逃生'],
['2092193758973308928','MXGP 赛事主题产品','简历成果：7 天售出 500 份'],
['2029137899967598592','趣挖春笋 · 田野探索','简历成果：单月核销 1,000 人']
];
const grid=document.getElementById('project-grid');
for(const [id,title,sub] of projects){const a=document.createElement('a');a.className='project-card';a.href='https://m.caibeike.com/h5/detail/index?itemCode='+id+'&trace=cbk';a.target='_blank';a.rel='noopener noreferrer';const img=document.createElement('img');img.src='assets/'+id+'-cover-1.jpg';img.alt=title+'产品页面主图';img.loading='lazy';const p=document.createElement('p');p.textContent=title+' ↗';const small=document.createElement('small');small.textContent=sub;a.append(img,p,small);grid.append(a);}
const dialog=document.getElementById('image-dialog');
const dialogImg=document.getElementById('dialog-image');
const captionText=document.getElementById('dialog-caption');
const handbookLinks=document.querySelectorAll('.handbook-enlarge');
let lastFocus;
for (const link of handbookLinks) {
  link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || typeof dialog.showModal !== 'function') return;
    event.preventDefault();
    lastFocus = link;
    dialogImg.onload = null;
    dialogImg.className = 'handbook-preview';
    dialogImg.alt = link.dataset.caption;
    dialogImg.src = link.href;
    captionText.textContent = link.dataset.caption;
    const fullImageLink = document.createElement('a');
    fullImageLink.textContent = '查看原尺寸图片 ↗';
    fullImageLink.href = link.href;
    fullImageLink.target = '_blank';
    fullImageLink.rel = 'noopener';
    captionText.append('　', fullImageLink);
    dialog.showModal();
  });
}
document.querySelectorAll('[data-image]').forEach(el=>el.addEventListener('click',()=>{lastFocus=el;dialogImg.className='';dialogImg.src=el.dataset.image;dialogImg.alt=el.dataset.caption;document.getElementById('dialog-caption').textContent=el.dataset.caption;dialogImg.onload=()=>{dialogImg.classList.toggle('tall',dialogImg.naturalHeight>dialogImg.naturalWidth*1.4)};dialog.showModal();}));
dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{dialogImg.src='';lastFocus?.focus();});
dialogImg.addEventListener('click',()=>{if(dialogImg.classList.contains('tall'))dialogImg.classList.toggle('zoomed');});
const navLinks=[...document.querySelectorAll('.topbar nav a')];
const sections=['about','projects','skills'].map(id=>document.getElementById(id));
const updateNav=()=>{let current='about';for(const s of sections)if(s.getBoundingClientRect().top<=180)current=s.id;for(const a of navLinks){const active=a.hash==='#'+current;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');}};
let ticking=false;addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(()=>{updateNav();ticking=false;});ticking=true;}},{passive:true});updateNav();
