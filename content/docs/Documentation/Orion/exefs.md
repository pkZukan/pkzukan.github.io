---
title: "ExeFS"
weight: 1
# bookFlatSection: false
# bookToc: true
# bookHidden: false
bookCollapseSection: true
# bookComments: false
bookSearchExclude: true
---
# Sword & Shield (ExeFS)

*Orion*

------------------------------

### Notable facts:
 - stub

### Notable offsets:

{{<csv-to-markdown file="data/orion/exefs.csv">}}

### Notes:

1. An array of `DexEntry`s that are as follows:
    ```
    struct {
        ushort GalarNum;
        ushort ArmorNum;
        ushort TundraNum;
        ushort unused;
    } DexEntry;
    ```
2. test