(function () {
    const STYLE_ID = "romfs-tree-style";
    const style =
        document.getElementById(STYLE_ID) || document.createElement("style");
    if (!style.id) style.id = STYLE_ID;
    style.textContent = `
      .romfs-tree {
        --rt-bg: var(--body-background, transparent);
        --rt-panel: var(--body-background, #0f1620);
        --rt-border: rgba(127,127,127,.25);
        --rt-muted: rgba(127,127,127,.85);
        --rt-hover: rgba(127,127,127,.12);
        --rt-accent: var(--color-link, #6aa9ff);
        --rt-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        margin: 1rem 0;
        border: 1px solid var(--rt-border);
        border-radius: 10px;
        overflow: hidden;
        background: var(--rt-panel);
      }
      .romfs-tree__header {
        display: flex;
        gap: .75rem;
        align-items: center;
        justify-content: space-between;
        padding: .75rem .9rem;
        border-bottom: 1px solid var(--rt-border);
      }
      .romfs-tree__title {
        font-weight: 650;
        font-size: .95rem;
        margin: 0;
      }
      .romfs-tree__meta {
        font-size: .85rem;
        color: var(--rt-muted);
        font-family: var(--rt-mono);
        white-space: nowrap;
      }
      .romfs-tree__toolbar {
        display: flex;
        gap: .5rem;
        align-items: center;
        flex-wrap: wrap;
      }
      .romfs-tree__search {
        width: min(520px, 70vw);
        padding: .5rem .6rem;
        border: 1px solid var(--rt-border);
        border-radius: 8px;
        background: transparent;
        color: inherit;
      }
      .romfs-tree__content {
        padding: .6rem .7rem 1rem;
      }
      .romfs-tree details {
        margin: .2rem 0 !important;
        padding: 0;
      }
      .romfs-tree summary {
        cursor: pointer;
        list-style: none;
        padding: .78rem 1rem !important;
        border-radius: 6px;
        display: flex !important;
        gap: .5rem;
        align-items: baseline;
        line-height: 1.5 !important;
        min-height: 2.6rem;
      }
      .romfs-tree summary::-webkit-details-marker { display: none; }
      .romfs-tree summary:hover { background: var(--rt-hover); }
      .romfs-tree__folder-name {
        font-family: var(--rt-mono);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: 1;
      }
      .romfs-tree__badge {
        font-family: var(--rt-mono);
        font-size: .78rem;
        color: var(--rt-muted);
      }
      .romfs-tree__children {
        padding-left: 1rem;
        border-left: 1px dashed var(--rt-border);
        margin-left: .5rem;
        margin-top: .15rem !important;
      }
      .romfs-tree__files {
        margin: .4rem 0 .7rem;
        border: 1px solid var(--rt-border);
        border-radius: 8px;
        overflow: hidden;
      }
      .romfs-tree__files table {
        width: 100%;
        border-collapse: collapse;
        font-size: .9rem;
      }
      .romfs-tree__files th,
      .romfs-tree__files td {
        padding: .45rem .6rem;
        border-bottom: 1px solid var(--rt-border);
        vertical-align: top;
      }
      .romfs-tree__files th {
        text-align: left;
        font-size: .8rem;
        color: var(--rt-muted);
      }
      .romfs-tree__files code {
        font-family: var(--rt-mono);
        background: transparent;
        padding: 0;
      }
      .romfs-tree__status {
        padding: .6rem .9rem;
        color: var(--rt-muted);
        font-size: .9rem;
        font-family: var(--rt-mono);
      }
    `;
    if (!style.parentNode) document.head.appendChild(style);

    function parseCsvLine(line) {
        const fields = [];
        let field = "";
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
            const ch = line[i];
            if (inQuotes) {
                if (ch === '"') {
                    if (line[i + 1] === '"') {
                        field += '"';
                        i++;
                    } else {
                        inQuotes = false;
                    }
                } else {
                    field += ch;
                }
            } else {
                if (ch === ",") {
                    fields.push(field);
                    field = "";
                } else if (ch === '"') {
                    inQuotes = true;
                } else {
                    field += ch;
                }
            }
        }
        fields.push(field);
        return fields;
    }

    function splitPath(path) {
        const trimmed = String(path).replace(/^\/+/, "").replace(/\/+$/, "");
        if (!trimmed) return [];
        return trimmed.split("/");
    }

    function joinPath(parts) {
        return "/" + parts.join("/");
    }

    function escapeHtml(s) {
        const div = document.createElement("div");
        div.textContent = String(s);
        return div.innerHTML;
    }

    function ensureDir(state, dirPath) {
        if (!state.dirToDirs.has(dirPath))
            state.dirToDirs.set(dirPath, new Set());
        if (!state.dirToFiles.has(dirPath)) state.dirToFiles.set(dirPath, []);
    }

    function buildIndexFromCsv(state, csvText) {
        const lines = csvText.split(/\r?\n/).filter(Boolean);
        if (lines.length === 0) return;

        const header = parseCsvLine(lines[0]);
        const pathIdx = header.indexOf("Path");
        const typeIdx = header.indexOf("File Type");
        const notesIdx = header.indexOf("Notes");
        if (pathIdx === -1) throw new Error("CSV missing Path column");

        ensureDir(state, "/");

        for (let i = 1; i < lines.length; i++) {
            const row = parseCsvLine(lines[i]);
            const fullPath = row[pathIdx];
            if (!fullPath || !String(fullPath).startsWith("/")) continue;
            const parts = splitPath(fullPath);
            if (parts.length === 0) continue;

            // Build directory chain
            for (let j = 0; j < parts.length - 1; j++) {
                const parent = joinPath(parts.slice(0, j));
                const child = parts[j];
                const current = joinPath(parts.slice(0, j + 1));
                ensureDir(state, parent === "/" ? "/" : parent);
                ensureDir(state, current);
                state.dirToDirs.get(parent === "/" ? "/" : parent).add(child);
            }

            const dirPath = joinPath(parts.slice(0, -1));
            const fileName = parts[parts.length - 1];
            ensureDir(state, dirPath === "/" ? "/" : dirPath);
            state.dirToFiles.get(dirPath === "/" ? "/" : dirPath).push({
                name: fileName,
                type: typeIdx === -1 ? "" : row[typeIdx] || "",
                notes: notesIdx === -1 ? "" : row[notesIdx] || "",
                path: fullPath,
            });
            state.fileCount++;
        }

        // Sort once for stable UI
        for (const [dir, set] of state.dirToDirs.entries()) {
            state.dirToDirs.set(dir, new Set(Array.from(set).sort()));
        }
        for (const [dir, files] of state.dirToFiles.entries()) {
            files.sort((a, b) => a.name.localeCompare(b.name));
        }
    }

    function renderFilesTable(state, dirPath, filter) {
        const files = state.dirToFiles.get(dirPath) || [];
        const filtered = filter
            ? files.filter((f) => f.name.toLowerCase().includes(filter))
            : files;
        if (filtered.length === 0) return null;

        const wrap = document.createElement("div");
        wrap.className = "romfs-tree__files";

        const rowsHtml = filtered
            .map(
                (f) => `
          <tr>
            <td><code>${escapeHtml(f.name)}</code></td>
            <td>${escapeHtml(f.type || "—")}</td>
            <td>${escapeHtml(f.notes || "—")}</td>
          </tr>
        `,
            )
            .join("");

        wrap.innerHTML = `
      <table>
        <thead>
          <tr>
            <th style="width: 34%;">Filename</th>
            <th style="width: 16%;">Type</th>
            <th style="width: 50%;">Notes</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    `;
        return wrap;
    }

    function createFolderNode(state, dirPath, folderName, filter) {
        const details = document.createElement("details");
        details.dataset.path = dirPath;
        details.dataset.loaded = "0";

        const fileCount = (state.dirToFiles.get(dirPath) || []).length;
        const dirCount = (state.dirToDirs.get(dirPath) || new Set()).size;
        details.innerHTML = `
      <summary>
        <span class="romfs-tree__folder-name">${escapeHtml(folderName)}</span>
        <span class="romfs-tree__badge">${dirCount} dir · ${fileCount} file</span>
      </summary>
      <div class="romfs-tree__children"></div>
    `;

        details.addEventListener("toggle", () => {
            if (!details.open) return;
            if (details.dataset.loaded === "1") {
                // Update file table on filter changes (if present)
                const children = details.querySelector(".romfs-tree__children");
                const existingFiles = children.querySelector("[data-files]");
                if (existingFiles) {
                    existingFiles.remove();
                    const filesWrap = renderFilesTable(
                        state,
                        dirPath,
                        filter(),
                    );
                    if (filesWrap) {
                        filesWrap.dataset.files = "1";
                        children.insertBefore(filesWrap, children.firstChild);
                    }
                }
                return;
            }
            const children = details.querySelector(".romfs-tree__children");
            children.textContent = "";

            const filesWrap = renderFilesTable(state, dirPath, filter());
            if (filesWrap) {
                filesWrap.dataset.files = "1";
                children.appendChild(filesWrap);
            }

            const dirs = state.dirToDirs.get(dirPath) || new Set();
            for (const childName of dirs) {
                const childPathParts = splitPath(dirPath);
                if (dirPath === "/") childPathParts.length = 0;
                const childPath = joinPath([...childPathParts, childName]);
                const child = createFolderNode(
                    state,
                    childPath,
                    childName,
                    filter,
                );
                children.appendChild(child);
            }

            details.dataset.loaded = "1";
        });

        return details;
    }

    async function init(el) {
        const csvUrl = el.getAttribute("data-romfs-csv");
        const title = el.getAttribute("data-romfs-title") || "RomFS Browser";
        if (!csvUrl) return;

        el.innerHTML = `
      <div class="romfs-tree__header">
        <div>
          <div class="romfs-tree__title">${escapeHtml(title)}</div>
          <div class="romfs-tree__meta">${escapeHtml(csvUrl)}</div>
        </div>
        <div class="romfs-tree__toolbar">
          <input class="romfs-tree__search" type="search" placeholder="Filter filenames in opened folders…" />
        </div>
      </div>
      <div class="romfs-tree__content"></div>
      <div class="romfs-tree__status">Loading CSV…</div>
    `;

        const content = el.querySelector(".romfs-tree__content");
        const status = el.querySelector(".romfs-tree__status");
        const search = el.querySelector(".romfs-tree__search");

        const state = {
            dirToDirs: new Map(),
            dirToFiles: new Map(),
            fileCount: 0,
        };

        const getFilter = () => (search.value || "").trim().toLowerCase();
        search.addEventListener("input", () => {
            // Trigger refresh for any already-open nodes by toggling re-render logic.
            content
                .querySelectorAll("details[open]")
                .forEach((d) => d.dispatchEvent(new Event("toggle")));
        });

        try {
            const res = await fetch(csvUrl, { cache: "no-store" });
            if (!res.ok) throw new Error(`Failed to fetch CSV (${res.status})`);
            const csvText = await res.text();
            buildIndexFromCsv(state, csvText);

            status.textContent = `${state.fileCount.toLocaleString()} files indexed. Expand folders to browse.`;
            const rootDirs = state.dirToDirs.get("/") || new Set();
            for (const name of rootDirs) {
                const node = createFolderNode(
                    state,
                    "/" + name,
                    name,
                    getFilter,
                );
                content.appendChild(node);
            }
            if (rootDirs.size === 0) {
                content.textContent = "No folders found.";
            }
        } catch (err) {
            status.textContent = String(err);
        }
    }

    function boot() {
        document.querySelectorAll("[data-romfs-tree]").forEach((el) => {
            if (el.dataset.romfsTreeInit === "1") return;
            el.dataset.romfsTreeInit = "1";
            init(el);
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }
})();
