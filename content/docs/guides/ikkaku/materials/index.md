---
title: "Materials"
weight: 2
# bookFlatSection: false
# bookToc: true
# bookHidden: false
# bookCollapseSection: false
# bookComments: false
# bookSearchExclude: false
---
# TrinityModelViewer Materials (Info)

This is the “what does this texture/slot do?” part of the materials docs.

If you want the step-by-step workflow, see `/docs/guides/ikkaku/materialstextures/`.

## Common texture slots

### BaseColorMap

Drives the base color (impressive right?). On a lot of Pokemon/clothing models the BaseColorMap is shaded pretty “plain” (often white/gray), then the actual colors are driven by the LayerMaskMap + variations.
![image](7623f64d-a036-47c2-a1f0-4f4127b30ce0.png)

### NormalMap

Standard PBR normals.
![image](2de733a9-b82a-4494-90fb-c07c8320d256.png)

### OcclusionMap / Specular maps

Occlusion provides baked in shading while specular maps help drive reflections. Usually they both use the same texture if present.
![image](2777b958-cd95-4986-8aaf-dda4deadbee0.png)

### ShadowingColor / ShadowingColorMaskMap

Provide a flat color to be subtly applied to the model at runtime (TrinityModelViewer currently doesnt apply this).
![image](2923fea8-41fb-43ab-a647-046144be425e.png)

### RimLightMaskMap / LocalReflectionMap

Help with reflections.
![image](cea71d3d-fdc6-4dc0-86b5-d79c98056acc.png)

## LayerMaskMap (the important one for recolors)

LayerMaskMap has four different channels which decide what colors fill in on what parts of the mesh.

For example the Red channel white parts show the BaseColorLayer1 or BaseColorIndex1 that is applied to the mesh.

- Red channel drives BaseColorLayer1 / BaseColorIndex1
  ![image](dbb8ff2c-f417-4922-9e95-af33b73eba8f.png)
- Green channel drives BaseColorLayer2 / BaseColorIndex2
  ![image](6c1669b3-dd3c-466e-9b08-99bcf9712081.png)
- Blue channel drives BaseColorLayer3 / BaseColorIndex3
  ![image](c4450568-5d35-44ec-8606-9b0582eb5375.png)
- Alpha channel drives BaseColorLayer4 / BaseColorIndex4
  ![image](7cfde15b-c975-40f8-9555-531a85ef9308.png)

You can observe the parts which use the red channel layermask through the shader debug options along with the ikcharacter backup shader. Opening the UV tab is also useful in showing what colors go where.

## Base color index vs base color layer

You may be wondering what the difference between base color index and base color layer is:

- Base color index pulls from an index on a colortablemap texture which you can see on a texture map.
  - They usually have 32 indices which correspond to the different colors on that color table from left to right.
  - The top part drives the actual color while the bottom drives the shadowing.
  - If youre not content with the provided colortablemap feel free to switch it out.
  - By clicking the value column for your desired column you can edit which index is used for that specific material/set.
  ![image](51efe367-c64b-42cc-835a-2ed220d158f8.png)
- Basecolorlayer refers to an actual color value set in the material which is applied to the respective channel mask.
  - You can change it by clicking the color swatch next to the value.
  ![image](fd71b5b8-d6d2-48dd-a8d0-3d9282335ee6.png)
