from __future__ import annotations

import re
from pathlib import Path

import fitz


ROOT = Path(__file__).resolve().parents[1]
STATEMENTS_DIR = ROOT / "statements"

PROBLEMS = [
    {"slug": "p-gaps", "title": "gaps", "level": "P", "pdf": "P-gaps.pdf"},
    {"slug": "p-letters", "title": "letters", "level": "P", "pdf": "P-letters.pdf"},
    {"slug": "p-round", "title": "round", "level": "P", "pdf": "P-round.pdf"},
    {"slug": "p-sort", "title": "sort", "level": "P", "pdf": "P-sort.pdf"},
    {"slug": "p-stairs", "title": "stairs", "level": "P", "pdf": "P-stairs.pdf"},
    {"slug": "p-islands", "title": "islands", "level": "P", "pdf": "P-islands.pdf"},
    {"slug": "p-steps", "title": "steps", "level": "P", "pdf": "P-steps.pdf"},
    {"slug": "p-grade", "title": "grade", "level": "P", "pdf": "P-grade.pdf"},
    {"slug": "p-coin", "title": "coin", "level": "P", "pdf": "P-coin.pdf"},
    {"slug": "j-partner", "title": "partner", "level": "J", "pdf": "J-partner.pdf"},
    {"slug": "j-parttime", "title": "parttime", "level": "J", "pdf": "J-parttime.pdf"},
    {"slug": "j-exchange", "title": "exchange", "level": "J", "pdf": "J-exchange.pdf"},
    {"slug": "j-sortrank", "title": "sortrank", "level": "J", "pdf": "J-sortrank.pdf"},
    {"slug": "j-lis", "title": "lis", "level": "J", "pdf": "J-lis.pdf"},
    {"slug": "j-components", "title": "components", "level": "J", "pdf": "J-components.pdf"},
    {"slug": "j-spread", "title": "spread", "level": "J", "pdf": "J-spread.pdf"},
    {"slug": "j-inversions", "title": "inversions", "level": "J", "pdf": "J-inversions.pdf"},
    {"slug": "j-schedule", "title": "schedule", "level": "J", "pdf": "J-schedule.pdf"},
    {"slug": "s-balls", "title": "balls", "level": "S", "pdf": "S-balls.pdf"},
    {"slug": "s-climb", "title": "climb", "level": "S", "pdf": "S-climb.pdf"},
    {"slug": "s-comm", "title": "comm", "level": "S", "pdf": "S-comm.pdf"},
]


REPLACEMENTS = {
    "輸人格式": "輸入格式",
    "輸入樣列": "輸入樣例",
    "輸出樣列": "輸出樣例",
    "數据": "數據",
    "數據數⽬": "測試數據數目",
    "其上今有": "其上有",
    "⼀": "一",
    "⼆": "二",
    "三": "三",
    "⽬": "目",
    "⾏": "行",
    "⼊": "入",
    "⼤": "大",
    "⼩": "小",
    "⾮": "非",
    "⼯": "工",
    "⼦": "子",
    "⼒": "力",
    "⽽": "而",
    "⽤": "用",
    "⽣": "生",
    "⽰": "示",
    "⽐": "比",
    "⽅": "方",
    "⼝": "口",
    "⻑": "長",
    "⽀格": "資格",
}


def clean_text(text: str) -> str:
    text = text.replace("\u200b", "")
    for source, target in REPLACEMENTS.items():
        text = text.replace(source, target)

    lines = []
    for raw_line in text.replace("\r", "").split("\n"):
        line = raw_line.strip()
        if not line:
            continue
        if re.fullmatch(r"[\uf000-\uf8ff•]+", line):
            continue
        if re.fullmatch(r"lines:\s*\d+.*", line):
            continue
        if re.fullmatch(r"words:\s*\d+.*", line):
            continue
        if re.fullmatch(r"\d+:\d+", line):
            continue
        if "MOI 2026 競賽系統" in line:
            continue
        lines.append(line)
    return "\n".join(lines).strip()


def get_blocks(pdf_path: Path):
    doc = fitz.open(pdf_path)
    blocks = []
    for page_index, page in enumerate(doc):
        page_blocks = page.get_text("blocks")
        page_blocks.sort(key=lambda item: (round(item[1], 1), round(item[0], 1)))
        for block in page_blocks:
            text = clean_text(block[4])
            if not text:
                continue
            blocks.append(
                {
                    "page": page_index,
                    "x0": float(block[0]),
                    "y0": float(block[1]),
                    "text": text,
                }
            )
    return blocks


def find_block_index(blocks, predicate):
    for index, block in enumerate(blocks):
        if predicate(block["text"]):
            return index
    return None


def join_blocks(blocks) -> str:
    return "\n\n".join(block["text"] for block in blocks if block["text"]).strip()


SECTION_MAP = {
    "【題目說明】": "題目說明",
    "【輸入說明】": "輸入格式",
    "【輸出說明】": "輸出格式",
    "【範例輸入】": "輸入樣例",
    "【範例輸出】": "輸出樣例",
    "【說明】": "說明",
    "## 輸入格式": "輸入格式",
    "## 輸出格式": "輸出格式",
    "## 輸入樣例": "輸入樣例",
    "## 輸出樣例": "輸出樣例",
    "## 特殊條件": "特殊條件",
    "## 限制": "限制",
    "Input": "輸入格式",
    "Output": "輸出格式",
    "Sample Input": "輸入樣例",
    "Sample Output": "輸出樣例",
    "Constraints": "限制",
    "Special Conditions": "特殊條件",
    "Notes": "補充說明",
}


def get_heading_name(text: str) -> str | None:
    if text in SECTION_MAP:
        return SECTION_MAP[text]
    if text.startswith("## "):
        return text[3:].strip()
    if text in {"輸入格式", "輸出格式", "輸入樣例", "輸出樣例", "特殊條件", "限制", "補充說明"}:
        return text
    return None


def normalize_title(title_text: str, problem) -> str:
    if title_text.startswith("# "):
        return title_text
    if title_text.upper().endswith(problem["title"].upper()):
        return f"# {problem['title'].upper()} ({problem['title']})"
    return f"# {title_text} ({problem['title']})"


def block_quality_score(text: str) -> int:
    return len(text) + text.count("$") * 8 + text.count("|") * 6 + sum(ch.isdigit() for ch in text)


def block_fuzzy_key(text: str) -> str:
    alpha_words = [word for word in re.findall(r"[A-Za-z]+", text) if len(word) >= 2]
    chinese = re.findall(r"[\u4e00-\u9fff]+", text)
    key = "".join(chinese + alpha_words)
    return key or text


def dedupe_text_blocks(blocks: list[str]) -> list[str]:
    chosen: dict[str, str] = {}
    order: list[str] = []

    for text in blocks:
        stripped = text.strip()
        if not stripped:
            continue
        if re.fullmatch(r"(?:[A-Z0-9≤≥, .()\-\[\]]|\n)+", stripped):
            continue
        if re.fullmatch(r"\d+(?:\n[\d \-^A-Za-z<>=.,()[\]]+)*", stripped):
            continue

        key = block_fuzzy_key(stripped)
        if key not in chosen:
            chosen[key] = stripped
            order.append(key)
            continue

        if block_quality_score(stripped) > block_quality_score(chosen[key]):
            chosen[key] = stripped

    return [chosen[key] for key in order]


def guess_title_index(blocks, problem) -> int:
    for index, block in enumerate(blocks):
        if block["text"].startswith("# "):
            return index

    section_indices = [index for index, block in enumerate(blocks) if get_heading_name(block["text"])]
    search_limit = section_indices[0] if section_indices else len(blocks)
    preface = blocks[:search_limit]

    for index, block in enumerate(preface):
        if block["text"].startswith("Problem: "):
            return index

    meaningful_indices = []
    for index, block in enumerate(preface):
        text = block["text"]
        if text == "English primary; Chinese support.":
            continue
        if re.fullmatch(r"I+", text):
            continue
        if "MOI 2026" in text:
            continue
        if re.fullmatch(r"[A-Z][A-Z\- ]+", text):
            continue
        if len(text.replace("\n", "")) <= 40:
            meaningful_indices.append(index)

    if meaningful_indices:
        return meaningful_indices[-1]

    return 0


def read_sample(problem):
    data_dir = ROOT / "data" / problem["level"] / problem["title"]
    input_path = data_dir / f'{problem["title"]}-0.in'
    output_path = data_dir / f'{problem["title"]}-0.out'
    return input_path.read_text(encoding="utf8").strip(), output_path.read_text(encoding="utf8").strip()


def build_markdown(problem):
    blocks = get_blocks(ROOT / problem["pdf"])
    title_index = guess_title_index(blocks, problem)

    title = normalize_title(blocks[title_index]["text"], problem)
    preface_blocks = []
    sections: dict[str, list[str]] = {}
    current_section: str | None = None

    for block in blocks[title_index + 1 :]:
        text = block["text"]
        heading = get_heading_name(text)
        if heading:
            current_section = heading
            sections.setdefault(heading, [])
            continue

        if current_section is None:
            preface_blocks.append(block)
        else:
            sections[current_section].append(text)

    if "輸入格式" not in sections or "輸出格式" not in sections:
        raise RuntimeError(f"Unable to extract core sections from {problem['pdf']}")

    metadata_lines: list[str] = []
    preface_notes: list[str] = []
    description_lines: list[str] = []
    in_description = False
    title_plain = title.removeprefix("# ").strip()
    metadata_table_present = any("|" in block["text"] for block in preface_blocks)

    for block in preface_blocks:
        for line in block["text"].split("\n"):
            if re.fullmatch(r"I+", line):
                continue
            if line.startswith("Problem: "):
                continue
            if line == "English primary; Chinese support.":
                continue
            if line == "<hr>":
                in_description = True
                continue
            if metadata_table_present and line in {
                title_plain,
                problem["title"],
                problem["level"],
                "任務名稱",
                "組別",
                "時限",
                "測試數據數目",
                "記憶限制",
            }:
                continue
            if metadata_table_present and (
                re.fullmatch(r"\d+(?:\.\d+)?\s*秒", line)
                or re.fullmatch(r"\d+(?:\s*\(.+\))?", line)
                or re.fullmatch(r"256M", line)
            ):
                continue
            if line.startswith("|") and not in_description:
                metadata_lines.append(line)
                continue
            if not in_description and not line.startswith("|"):
                preface_notes.append(line)
                continue
            description_lines.append(line)

    preface_notes = dedupe_text_blocks(preface_notes)
    description_lines = dedupe_text_blocks(description_lines)
    for heading, lines in list(sections.items()):
        sections[heading] = dedupe_text_blocks(lines)

    sample_input, sample_output = read_sample(problem)
    metadata_lines = metadata_lines[:]
    if not metadata_lines:
        metadata_lines.extend(
            [
                "|項目|內容|",
                "|---|---|",
                f'|任務名稱|`{problem["title"]}`|',
                f'|組別|`{problem["level"]}`|',
            ]
        )
    metadata_lines.extend(
        [
            "|測資目錄|`data/%s/%s`|" % (problem["level"], problem["title"]),
            "|原始 PDF|`%s`|" % problem["pdf"],
            "|對齊範例|`%s-0.in` / `%s-0.out`|" % (problem["title"], problem["title"]),
        ]
    )

    parts = [
        title,
        "",
        "> 此網站版本改用 Markdown 題面，範例輸入 / 輸出直接對齊 `data` 內的 `*-0.in` / `*-0.out`，避免題面與測資不一致。",
        "",
        *metadata_lines,
    ]

    if preface_notes:
        parts.extend(["", "## 題目前置說明", "", *preface_notes])

    main_description = description_lines[:]
    if not main_description and sections.get("題目說明"):
        main_description = sections["題目說明"]

    if main_description:
        parts.extend(["", "## 題目說明", "", *main_description])
    parts.extend(["", "## 輸入格式", "", "\n\n".join(sections.get("輸入格式", [])).strip()])
    parts.extend(["", "## 輸出格式", "", "\n\n".join(sections.get("輸出格式", [])).strip()])
    parts.extend(["", "## 範例輸入", "", "```text", sample_input, "```"])
    parts.extend(["", "## 範例輸出", "", "```text", sample_output, "```"])

    for heading, lines in sections.items():
        if heading in {"題目說明", "輸入格式", "輸出格式", "輸入樣例", "輸出樣例"}:
            continue

        body = "\n\n".join(lines).strip().strip("`").strip()
        if body:
            parts.extend(["", f"## {heading}", "", body])

    content = "\n".join(parts).strip() + "\n"
    content = re.sub(r"\n{3,}", "\n\n", content)
    return content


def main():
    STATEMENTS_DIR.mkdir(exist_ok=True)

    for problem in PROBLEMS:
        content = build_markdown(problem)
        output_path = STATEMENTS_DIR / f'{problem["slug"]}.md'
        output_path.write_text(content, encoding="utf8")
        print(output_path.relative_to(ROOT))


if __name__ == "__main__":
    main()
