---
title: "Onepack filesystem"
weight: 1
# bookFlatSection: false
# bookToc: true
bookHidden: true
bookCollapseSection: false
# bookComments: false
# bookSearchExclude: false
---
# Onepack filesystem

### Description:

A file system used in the trinity engine. It's comprised of [trpfs](../formats/trpfs) & [trpfd](../formats/trpfd) files.
The engine uses the trpfd (file descriptor) to find the [trpak](../formats/trpak) the file belongs to and then reads the trpfs for the trpak. 

If the file hash doesn't exist in the trpfd, it defaults to reading the file path from `data:/` which is the root of the romfs.
