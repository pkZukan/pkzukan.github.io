---
title: "RomFS"
weight: 2
# bookFlatSection: false
# bookToc: true
# bookHidden: false
bookCollapseSection: false
# bookComments: false
bookSearchExclude: true
---
# Scarlet & Violet (RomFS)

*Titan*

------------------------------

### Romfs contents:

{{<csv-to-markdown file="data/titan/romfs.csv">}}


### General tribal knowledge:
 - Migrating models from PLA works fairly well with minor changes. The main difference being the file hierarchy (The engine hardcodes paths so this hierarchy must be followed). Some parameters for [trmtr](../trmtr) have changed as well. PLA pokemon uses a int param "CategoryLabel" of 2 whereas SV uses 6 for lighting. UV wrap enums may have changed as well.