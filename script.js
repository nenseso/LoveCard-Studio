// 工具：根据选择设置卡片尺寸
function applyCardSize(card, sizeStr){
  const [w, h] = sizeStr.split('x').map(n => parseInt(n, 10));
  card.style.setProperty('--card-w', `${w}px`);
  card.style.setProperty('--card-h', `${h}px`);
}

// 工具：随机生成若干心形
function populateHearts(layer, count = 18){
  layer.innerHTML = '';
  for(let i=0;i<count;i++){
    const d = document.createElement('div');
    d.className = 'heart';
    const left = Math.random()*100;       // %
    const top = 70 + Math.random()*35;    // 从底部附近开始
    const size = 10 + Math.random()*22;   // px
    const delay = Math.random()*6;        // s
    const dur = 6 + Math.random()*6;      // s
    d.style.setProperty('--left', `${left}%`);
    d.style.setProperty('--top', `${top}%`);
    d.style.setProperty('--size', `${size}px`);
    d.style.setProperty('--delay', `${delay}s`);
    d.style.setProperty('--dur', `${dur}s`);
    layer.appendChild(d);
  }
}

// 工具：应用渐变配色
function applyPalette(card, hexList){
  const [c1,c2,c3] = hexList;
  card.style.setProperty('--bg-1', `#${c1}`);
  card.style.setProperty('--bg-2', `#${c2}`);
  card.style.setProperty('--bg-3', `#${c3}`);
}

// 工具：导出 PNG
async function exportCardPNG(card, scale = 2){
  const { width, height } = card.getBoundingClientRect();

  // 确保字体加载完成再截图
  if (document.fonts && document.fonts.ready) {
    try { await document.fonts.ready; } catch {}
  }

  const canvas = await html2canvas(card, {
    backgroundColor: null, // 保留透明（但我们有底色）
    scale: scale,
    useCORS: true,
    width: Math.round(width),
    height: Math.round(height),
    windowWidth: Math.max(document.documentElement.clientWidth, window.innerWidth),
    windowHeight: Math.max(document.documentElement.clientHeight, window.innerHeight),
  });

  const dataURL = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  const ts = new Date().toISOString().replace(/[:.]/g,'-');
  a.download = `LoveCard-${ts}.png`;
  a.href = dataURL;
  a.click();
}

// 主逻辑
document.addEventListener('DOMContentLoaded', () => {
  const els = {
    message: document.getElementById('message'),
    toName: document.getElementById('toName'),
    fromName: document.getElementById('fromName'),
    theme: document.getElementById('theme'),
    fontFamily: document.getElementById('fontFamily'),
    align: document.getElementById('align'),
    textSize: document.getElementById('textSize'),
    cardSize: document.getElementById('cardSize'),
    exportScale: document.getElementById('exportScale'),
    showHearts: document.getElementById('showHearts'),
    showFrame: document.getElementById('showFrame'),
    glow: document.getElementById('glow'),
    swatches: Array.from(document.querySelectorAll('.swatch')),
    btnGenerate: document.getElementById('btn-generate'),
    btnDownload: document.getElementById('btn-download'),
    card: document.getElementById('card'),
    heartsLayer: document.getElementById('heartsLayer'),
    cardMessage: document.getElementById('cardMessage'),
    toLine: document.getElementById('toLine'),
    toText: document.getElementById('toText'),
    signature: document.getElementById('signature'),
    fromText: document.getElementById('fromText'),
  };

  // 初始化尺寸、心形
  applyCardSize(els.card, els.cardSize.value);
  populateHearts(els.heartsLayer, 22);

  function applyTheme(){
    els.card.classList.remove('theme-love','theme-elegant','theme-noir');
    els.card.classList.add(`theme-${els.theme.value}`);
  }

  function applyToggles(){
    els.card.classList.toggle('with-glow', els.glow.checked);
    els.card.classList.toggle('with-frame', els.showFrame.checked);
    els.heartsLayer.style.display = els.showHearts.checked ? 'block' : 'none';
  }

  function applyFontsAndAlign(){
    els.cardMessage.style.fontFamily = els.fontFamily.value;
    // 签名字体：保持优雅
    // align
    els.cardMessage.classList.toggle('align-left', els.align.value === 'left');
  }

  function applyText(){
    const raw = els.message.value || '';
    els.cardMessage.textContent = raw; // 先设置纯文本
    // 使用 white-space: pre-wrap 已支持换行
    // 收件人与署名
    const toVal = (els.toName.value || '').trim();
    const fromVal = (els.fromName.value || '').trim();
    if (toVal) {
      els.toText.textContent = toVal;
      els.toLine.hidden = false;
    } else {
      els.toLine.hidden = true;
    }
    if (fromVal) {
      els.fromText.textContent = fromVal;
      els.signature.hidden = false;
    } else {
      els.signature.hidden = true;
    }
  }

  function applyTextSize(){
    const v = parseInt(els.textSize.value, 10);
    els.card.style.setProperty('--text-size', `${v}px`);
  }

  function applyPaletteFromSwatch(target){
    const hexes = (target.getAttribute('data-colors') || '').split(',').map(s => s.trim());
    if (hexes.length >= 3) {
      applyPalette(els.card, hexes);
    }
  }

  function applyAll(){
    applyTheme();
    applyToggles();
    applyFontsAndAlign();
    applyText();
    applyTextSize();
    applyCardSize(els.card, els.cardSize.value);
  }

  // 事件绑定
  [
    'input','change'
  ].forEach(evt => {
    els.message.addEventListener(evt, applyText);
    els.toName.addEventListener(evt, applyText);
    els.fromName.addEventListener(evt, applyText);
    els.align.addEventListener(evt, applyFontsAndAlign);
    els.fontFamily.addEventListener(evt, applyFontsAndAlign);
    els.textSize.addEventListener(evt, applyTextSize);
    els.cardSize.addEventListener(evt, () => applyCardSize(els.card, els.cardSize.value));
    els.theme.addEventListener(evt, applyTheme);
    els.showHearts.addEventListener(evt, applyToggles);
    els.showFrame.addEventListener(evt, applyToggles);
    els.glow.addEventListener(evt, applyToggles);
  });

  els.swatches.forEach(btn => {
    btn.addEventListener('click', (e) => {
      applyPaletteFromSwatch(e.currentTarget);
    });
    // 设置预览背景
    const hexes = (btn.getAttribute('data-colors') || '').split(',');
    if (hexes.length >= 3) {
      btn.style.background = `linear-gradient(135deg, #${hexes[0]}, #${hexes[1]}, #${hexes[2]})`;
    }
  });

  // 生成与下载
  els.btnGenerate.addEventListener('click', () => {
    applyAll();
    // 再次刷新心形，带来“活力感”
    if (els.showHearts.checked) populateHearts(els.heartsLayer, 22);
    // 可下载
    els.btnDownload.disabled = false;
    // 小动效
    els.btnGenerate.classList.add('pulse');
    setTimeout(() => els.btnGenerate.classList.remove('pulse'), 300);
  });

  els.btnDownload.addEventListener('click', async () => {
    els.btnDownload.disabled = true;
    els.btnDownload.textContent = '导出中…';
    try{
      await exportCardPNG(els.card, parseInt(els.exportScale.value, 10));
    } finally {
      els.btnDownload.disabled = false;
      els.btnDownload.textContent = '下载 PNG';
    }
  });

  // 初始一次
  applyAll();
});