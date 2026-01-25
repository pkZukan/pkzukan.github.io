---
title: "Uikit"
weight: 1
# bookFlatSection: false
# bookToc: true
bookHidden: true
bookCollapseSection: false
# bookComments: false
# bookSearchExclude: false
---
# Uikit

### Overview:

The uikit system is the part of the Trinity engine that handles UI. It uses trscn files for defining UI scene hierarchies. These scenes usually contain SubScenes that reference all other scene objects that could be used in this scene. A scene object sometimes contains a layout component, which defines the bflyt layout (and the arc file its in) used for visual info, and a view component which references the related truiv file. The pe_SimpleNode references the c++ side scene object. These objects use a MVP(model-view-presenter) pattern. Trinity engine defers scene object allocation until it's needed.


### Trinity UI view (truiv)
The truiv files define the uikit component hierarchy (uikit buttons/switches/panels/etc). The truiv and bflyt pair (as defined in the trscn) are loaded into the scenegraph and the MVP object handles the functionality.