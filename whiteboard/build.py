"""Build public/whiteboard/index.html (OJ embedded version) from whiteboard/canvas_src.html.

Source: https://github.com/pjwang2022/trace-by-hand-whiteboard (commit c130b6b, 2026-10-06)
Changes for the OJ:
- No LeetCode problem list, no localStorage boards (school computers are shared).
- Talks to the parent problem page via postMessage (see BRIDGE below):
    parent -> iframe  {type:'oj:load', board}   load a board (null = blank)
    parent -> iframe  {type:'oj:get', reqId}    ask for the current board
    parent -> iframe  {type:'oj:saved'}         current board was saved
    iframe -> parent  {type:'oj:ready'} / {type:'oj:dirty', dirty} / {type:'oj:data', reqId, board}

Usage (from app/):  python3 whiteboard/build.py
"""
import json, os

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'public', 'whiteboard', 'index.html')
LANGS = ['zh-CN', 'en', 'ja', 'ko', 'fr', 'hi']

BRIDGE = r"""
/* ---------- OJ 嵌入：同題目頁溝通 ---------- */
var ojBase=null;
function ojPost(m){if(window.parent!==window) window.parent.postMessage(m,location.origin);}
function ojNotify(){ojPost({type:'oj:dirty',dirty:lastSnap!==ojBase});}
function ojLoad(o){
  B=(o&&Array.isArray(o.items))?o:{items:[],edges:[],strokes:[],seq:1};
  B.edges=B.edges||[]; B.strokes=B.strokes||[]; B.seq=B.seq||999;
  view={x:40,y:30,z:1}; sel=null; selEdge=null; clearMulti(); activeCell=null; hist=[]; fut=[];
  renderAll(); lastSnap=snapshot(); ojBase=lastSnap; updUndo(); ojNotify();
  if(B.items.length||B.strokes.length) setTimeout(fit,30);
}
function ojInit(){
  document.title=_T('白板');
  window.addEventListener('message',function(ev){
    if(ev.origin!==location.origin||ev.source!==window.parent) return;
    var d=ev.data||{};
    if(d.type==='oj:load') ojLoad(d.board);
    else if(d.type==='oj:get') ojPost({type:'oj:data',reqId:d.reqId,board:JSON.parse(lastSnap||snapshot())});
    else if(d.type==='oj:saved'){ojBase=lastSnap; ojNotify();}
  });
  ojLoad(null);
  ojPost({type:'oj:ready'});
}
"""

CSS = '\n#boardBtn,#lcLink{display:none!important}\n'


def patch(src, old, new):
    assert src.count(old) == 1, f'patch target not found exactly once: {old[:60]!r}'
    return src.replace(old, new)


src = open(os.path.join(HERE, 'canvas_src.html'), encoding='utf-8').read()
src = patch(src, '/*PROBLEMS*/[]', '[]')
src = patch(src, 'function persist(){\n  if(!curBoard) return;', 'function persist(){\n  ojNotify(); return;\n  if(!curBoard) return;')
src = patch(src, "  setTool('select');\n  try{BOARDS=", "  setTool('select');\n  ojInit(); return;\n  try{BOARDS=")
src = patch(src, "$('helpX').onclick=", BRIDGE + "$('helpX').onclick=")
src = patch(src, '</style>', CSS + '</style>')

keys = json.load(open(os.path.join(HERE, 'i18n', 'source_zh-TW.json'), encoding='utf-8'))
i18n = {}
for lang in LANGS:
    d = json.load(open(os.path.join(HERE, 'i18n', lang + '.json'), encoding='utf-8'))
    i18n[lang] = {k: v for k, v in d.items() if k in keys and v}
src = patch(src, '/*I18N*/{}', json.dumps(i18n, ensure_ascii=False, separators=(',', ':')))

body = src.replace('<meta charset="utf-8">\n', '')
cut = body.index('</style>') + len('</style>')
html = ('<!doctype html>\n<html lang="zh-Hant">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1">\n' + body[:cut] +
        '\n</head>\n<body>\n' + body[cut:] + '\n</body>\n</html>\n')
os.makedirs(os.path.dirname(OUT), exist_ok=True)
open(OUT, 'w', encoding='utf-8').write(html)
print(f'{round(len(html) / 1024)} KB -> public/whiteboard/index.html')
