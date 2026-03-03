---
title: "Models"
weight: 1
# bookFlatSection: false
# bookToc: true
bookHidden: true
bookCollapseSection: false
# bookComments: false
# bookSearchExclude: false
---
# Models

### Overview:

Models follow a similar design philosophy to GLTF in that there are seperate components for model descriptors, vertex buffers, textures, etc. These components are split across their respective flatbuffer files.

### Meshes

The [trmsh]({{<ref "docs/Documentation/Titan/Formats/trmsh.md">}}) mesh files describe how the vertex buffer in the [trmbf]({{<ref "docs/Documentation/Titan/Formats/trmbf.md">}}) file can be parsed. It describes the data types of each as well, and some attributes like normals and blend weights tend to be stored as packed vectors of halfs (float16).

### Materials

The [trmtr]({{<ref "docs/Documentation/Titan/Formats/trmtr.md">}}) material define the shaders, samplers/parameters and textures. Some common techniques used in pokemon models are storing half the texture, and mirroring it in the shader. In ZA, they store albedo textures as white with greyscale and use material params to blend multiple layers of color with color masks.

### Rigging

The [trskl]({{<ref "docs/Documentation/Titan/Formats/trskl.md">}}) armature files contains a bone list that both contains bones and object nodes. They contains parent and rig indicies such that the parent index defines armature hierarchy and rig index defines the node hierarchy. 

### Animations

The [tranm]({{<ref "docs/Documentation/Titan/Formats/tranm.md">}}) animation files contain bone tracks for the skeletal animations. Rotations use 48bit packed quaternions.