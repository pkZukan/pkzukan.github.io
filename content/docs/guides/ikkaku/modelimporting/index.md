---
title: "Model Importing"
weight: 1
# bookFlatSection: false
# bookToc: true
# bookHidden: false
# bookCollapseSection: false
# bookComments: false
# bookSearchExclude: false
---
# Legends Trinity Model Importing Guide (ZA Clothing Focus)

## Export from TrinityModelViewer

1. Export your selected model with export gltf through the modify button.
   ![image](c811529b-a2be-4b82-bbfa-0939e6e3893f.png)
2. Import into your software of choice, this guide will be using blender.
   ![image](0f54e172-db9d-4d35-ae13-caacd3c270ee.png)

Your model may not look the same as it does in game/in TrinityModelViewer, but thats because blender doesnt have the necessary shaders set up natively for it.
![image](f36309f8-4d13-4542-8d68-08ed0747851f.png)

## In Blender

1. Line Up your meshes and transfer weights, or manually repaint your mesh. (There are plenty of guides out there that show you how https://gamebanana.com/tuts/15580 or https://www.youtube.com/watch?v=IPQ2QVVIxLU)
2. Make sure your UV0 is called `UVMap`.
   ![image](e520de91-61d7-458f-ac39-413473352f18.png)
3. Merge or rename your New mesh to be the same as the original.
   - Example: we renamed `G_body_a` to `drs_body_mesh_shape`.
   ![image](a00fa6e3-3ac5-43e8-bd5c-948811bdb01c.png)
4. Make sure your material names only come from the ones imported (in our case its `body`) and delete the other material.
   - Materials dont matter now as we can configure them later in Trinity Model Viewer, so just make sure the names match up for now and your scene is clean and UV names are correct.
   ![image](57f6a6a7-2177-4a1a-b1d7-8be924740a1a.png)
5. If you have extra meshes, either map them to other in game body parts or merge them and their UVs and textures.
   - I may expand this guide later to show how to do so.

## Export from Blender

- On export do glb/gltf and make sure you change the format to glTF not glb.
  ![image](3d54d363-0d77-4050-90c5-d30e3a803586.png)
- In `Data -> Mesh` enable tangents on export or else your model wont shade correctly.
  ![image](29b3c905-eba9-420e-85fd-8750f5b26492.png)

## Import back into TrinityModelViewer

1. Go back to TrinityModelViewer.
2. Right click your model and hit import gltf then import your exported gltf.
   ![image](69c55c8f-4f4e-43ab-881d-b59be71e47a7.png)

## Export Trinity files

1. Go to `Materials -> body -> params`.
   ![image](9dd40d9b-bc26-46fd-85f7-af89e6619bdc.png)
2. Set Enable Normal Map and Enable AO Map to false (unless you want to make your own).
3. Set enable color table to false as well if you only want to use your (soon to be) imported albedo color only.
   ![image](393aed31-c49c-41b3-8066-d95b5541ad02.png)
4. Hit `File -> Export Trinity...` and put it in your desired spot.
