from pathlib import Path
import json
root = Path(__file__).resolve().parent
data = json.loads((root / 'data.json').read_text(encoding='utf-8'))
assert len({row['id'] for row in data}) == len(data)
for row in data:
    assert row['cpu'] == row['s'] + row['p'] + row['e']
    assert row['memory'] == sorted(set(row['memory']))
    assert all(value is None or value > 0 for value in row['bench'].values())
encoded = json.dumps(data, ensure_ascii=False, indent=2).replace('<', '\\u003c')
template = (root / 'template.html').read_text(encoding='utf-8')
assert template.count('__DATA__') == 1
(root / 'index.html').write_text(template.replace('__DATA__', encoded), encoding='utf-8')
print(f'Generated index.html with {len(data)} configurations')
