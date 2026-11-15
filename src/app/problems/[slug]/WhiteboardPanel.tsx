'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type Version = { id: string; createdAt: string };
type Owner = { userId: string; name: string; count: number };
type BoardData = { items: unknown[] } & Record<string, unknown>;

const SELF = '';
const MIN_WIDTH = 360;

function formatTime(iso: string) {
  return new Date(iso).toLocaleString('zh-Hant', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function WhiteboardPanel({ problemId, isAdmin }: { problemId: string; isAdmin: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [full, setFull] = useState(false);
  const [width, setWidth] = useState(0);
  const [ready, setReady] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [versions, setVersions] = useState<Version[]>([]);
  const [versionId, setVersionId] = useState('');
  const [owners, setOwners] = useState<Owner[]>([]);
  const [viewUser, setViewUser] = useState(SELF);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const pending = useRef(new Map<string, (board: BoardData) => void>());
  const currentBoard = useRef<BoardData | null>(null);
  const readOnly = viewUser !== SELF;

  const post = useCallback((msg: object) => {
    frameRef.current?.contentWindow?.postMessage(msg, window.location.origin);
  }, []);

  const loadBoard = useCallback((board: BoardData | null) => {
    currentBoard.current = board;
    post({ type: 'oj:load', board });
  }, [post]);

  const fetchVersions = useCallback(async (userId: string) => {
    const query = new URLSearchParams({ problemId });
    if (userId) query.set('userId', userId);
    const res = await fetch(`/api/whiteboards?${query}`);
    const json = await res.json();
    if (!json.ok) throw new Error(json.error || '讀取失敗');
    setVersions(json.versions);
    return json.versions as Version[];
  }, [problemId]);

  const openVersion = useCallback(async (id: string) => {
    setBusy(true);
    setMessage('');
    try {
      if (!id) {
        loadBoard(null);
      } else {
        const res = await fetch(`/api/whiteboards/${id}`);
        const json = await res.json();
        if (!json.ok) throw new Error(json.error || '讀取失敗');
        loadBoard(json.version.data);
      }
      setVersionId(id);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '讀取失敗');
    } finally {
      setBusy(false);
    }
  }, [loadBoard]);

  const showUser = useCallback(async (userId: string) => {
    setViewUser(userId);
    try {
      const list = await fetchVersions(userId);
      await openVersion(list[0]?.id ?? '');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '讀取失敗');
    }
  }, [fetchVersions, openVersion]);

  // Messages from the whiteboard iframe
  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin || event.source !== frameRef.current?.contentWindow) return;
      const data = event.data ?? {};
      if (data.type === 'oj:ready') {
        if (!ready) {
          setReady(true);
          void showUser(SELF);
        } else {
          post({ type: 'oj:load', board: currentBoard.current });
        }
      } else if (data.type === 'oj:dirty') {
        setDirty(Boolean(data.dirty));
      } else if (data.type === 'oj:data') {
        pending.current.get(data.reqId)?.(data.board);
        pending.current.delete(data.reqId);
      }
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [ready, showUser, post]);

  // Warn before leaving with unsaved changes
  useEffect(() => {
    if (!dirty || readOnly) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty, readOnly]);

  // Make room for the side panel
  useEffect(() => {
    const root = document.documentElement;
    const show = open && !full;
    root.classList.toggle('wb-open', show);
    root.style.setProperty('--wb-width', `${width}px`);
    return () => root.classList.remove('wb-open');
  }, [open, full, width]);

  function toggle() {
    if (!mounted) {
      setWidth(Math.max(MIN_WIDTH, Math.round(window.innerWidth * 0.5)));
      setMounted(true);
      if (isAdmin) {
        fetch(`/api/whiteboards?problemId=${encodeURIComponent(problemId)}&owners=1`)
          .then((res) => res.json())
          .then((json) => { if (json.ok) setOwners(json.owners); })
          .catch(() => undefined);
      }
    }
    setOpen((value) => !value);
  }

  function confirmDiscard() {
    return readOnly || !dirty || window.confirm('白板有未存檔的修改，確定要放棄？');
  }

  async function save() {
    setBusy(true);
    setMessage('');
    try {
      const reqId = Math.random().toString(36).slice(2);
      const board = await new Promise<BoardData>((resolve, reject) => {
        pending.current.set(reqId, resolve);
        post({ type: 'oj:get', reqId });
        setTimeout(() => reject(new Error('白板沒有回應，請再試一次')), 5000);
      });
      const res = await fetch('/api/whiteboards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problemId, data: board }),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || '存檔失敗');
      currentBoard.current = board;
      post({ type: 'oj:saved' });
      await fetchVersions(SELF);
      setVersionId(json.version.id);
      setMessage(`已存檔 ${formatTime(json.version.createdAt)}`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '存檔失敗');
    } finally {
      setBusy(false);
    }
  }

  function startResize(event: React.PointerEvent) {
    event.preventDefault();
    const frame = frameRef.current;
    if (frame) frame.style.pointerEvents = 'none';
    const move = (e: PointerEvent) => {
      setWidth(Math.min(window.innerWidth - 240, Math.max(MIN_WIDTH, window.innerWidth - e.clientX)));
    };
    const up = () => {
      if (frame) frame.style.pointerEvents = '';
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  }

  return (
    <>
      <button type="button" className="wb-toggle" onClick={toggle} aria-expanded={open}>
        {open ? '收起白板' : '📝 白板筆記'}
      </button>

      {mounted ? (
        <aside
          className={`wb-panel${full ? ' wb-full' : ''}`}
          style={{ width: full ? undefined : width, display: open ? 'flex' : 'none' }}
          aria-label="白板筆記"
        >
          {!full ? <div className="wb-resize" onPointerDown={startResize} title="拖曳調整寬度" /> : null}
          <div className="wb-bar">
            <strong>白板筆記</strong>
            {isAdmin ? (
              <select
                value={viewUser}
                onChange={(e) => { if (confirmDiscard()) void showUser(e.target.value); }}
                aria-label="查看邊位學生"
              >
                <option value={SELF}>我自己</option>
                {owners.map((owner) => (
                  <option key={owner.userId} value={owner.userId}>{owner.name}（{owner.count}）</option>
                ))}
              </select>
            ) : null}
            <select
              value={versionId}
              onChange={(e) => { if (confirmDiscard()) void openVersion(e.target.value); }}
              disabled={!ready || busy}
              aria-label="版本"
            >
              {!readOnly ? <option value="">新白板（未存檔）</option> : null}
              {readOnly && !versions.length ? <option value="">（未有白板）</option> : null}
              {versions.map((version, index) => (
                <option key={version.id} value={version.id}>
                  {index === 0 ? '最新 · ' : ''}{formatTime(version.createdAt)}
                </option>
              ))}
            </select>
            {!readOnly ? (
              <>
                <button type="button" className="secondary" disabled={!ready || busy} onClick={() => { if (confirmDiscard()) void openVersion(''); }}>
                  新白板
                </button>
                <button type="button" disabled={!ready || busy || !dirty} onClick={save}>
                  {busy ? '處理中…' : '存檔'}
                </button>
              </>
            ) : null}
            <span className="wb-spacer" />
            <button type="button" className="secondary" onClick={() => setFull((v) => !v)}>{full ? '並排' : '全螢幕'}</button>
            <button type="button" className="secondary" onClick={() => setOpen(false)} aria-label="收起白板">✕</button>
          </div>
          <div className="wb-status">
            {readOnly
              ? '唯讀檢視：這是學生的白板，你的修改不會儲存。'
              : message || (dirty ? '有未存檔的修改' : '每次存檔都會保留一個新版本，可在上方選回舊版本。')}
          </div>
          <iframe ref={frameRef} src="/whiteboard/index.html?lang=zh-TW" title="白板" className="wb-frame" />
        </aside>
      ) : null}
    </>
  );
}
