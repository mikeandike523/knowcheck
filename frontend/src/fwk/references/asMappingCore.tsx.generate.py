# /usr/bin/env python3

import os

AS_MAPPING_ITEM_TEMPLATE = """
'{tag}': fwdRef<{tag_type}, HAttr<{tag_type}>>(
    (props, ref) => <{tag} ref={{ref}} {{...props}} />
),
"""

with open(
    os.path.join(os.path.dirname(__file__), "asMappingCore.template.tsx"), "r"
) as f:
    text = f.read()

lines = text.split("\n")

in_block = False

block_lines = []

for line in lines:
    if not in_block:
        if line.startswith("// BEGIN_AS_MAPPING"):
            in_block = True
    else:
        if line.startswith("// END_AS_MAPPING"):
            in_block = False
        else:
            block_lines.append(
                list(map(lambda x: x.strip(), line.lstrip("/").strip().split("--")))
            )

block_lines = list(
    filter(lambda x: len(x) > 0 and any([len(y) > 0 for y in x]), block_lines)
)


items = list(
    map(
        lambda x: AS_MAPPING_ITEM_TEMPLATE.format(
            tag=x[0],
            tag_type=x[1]
        ),
        block_lines,
    )
)

print(",\n".join(items))

with open(os.path.join(os.path.dirname(__file__), "asMappingCore.tsx"), "w") as f:
    f.write(text.replace("// <AS_MAPPING>", "\n".join(items)))
