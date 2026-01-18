---
title: "Materials / Textures"
weight: 3
# bookFlatSection: false
# bookToc: true
# bookHidden: false
# bookCollapseSection: false
# bookComments: false
# bookSearchExclude: false
---
# TrinityModelViewer Materials / Textures (Guide)

Picking up from the model importing guide we can now configure our textures.

If you want the “what does this texture do?” part, see `/docs/guides/ikkaku/materials/`.

## Quick path (if you only want recolors)

If you only want to edit base colors for a pokemon or item of clothing you only need to go to the variations tab and edit from there then export your edited materials.
![image](7481bd02-e8ea-4744-9cb4-bc86cbd82db7.png)

## Replacing textures (workflow)

Continuing our model importing guide, you can start replacing your desired textures.

- If you only want one color for your model no matter what color options there may be in game you should fill in the basecolormap with your colored texture. (Make sure your NormalMaps, AO, and EnableColorTableMap are set to False)
  ![image](7aff9597-01ba-4ffb-a7a6-8ceb0afe6a32.png)
- If you want colors to be driven by the games layermask then color things by grayscale gradient where white is fully influenced by color and black is not.
  ![image](c8b7241b-1c6b-4397-950b-47727e6c12f1.png)
  ![image](40240165-08db-44d1-b6c3-b3277403a10d.png)
- You can also go ahead and import your models normal and occlusion maps if you so choose.
  ![image](2b8053c4-f0f7-4fd9-ada7-45e6537ad356.png)

Remember TrinityModelViewer doesn't export bntx yet so our texture changes wont apply if we just export straight away.

## Exporting textures (important)

You must replace the actual textures through switch toolbox. (https://github.com/KillzXGaming/Switch-Toolbox)
![image](e4fee338-9d51-48a9-8072-f58dfc528176.png)
![image](3780cbb1-52b3-4430-a967-c1c6a096cd2e.png)
![image](9f2ce757-8260-4124-b686-0fd6e8dc2543.png)
I advise you to set up the textures and export them through TMV because toolbox has an issue with its channel replacement system.
![image](d2264d0d-27f2-4baa-91a0-0fd7b643f897.png)
![image](2eac8905-1cb2-4a32-ab3b-67879ba3d50b.png)

## Example: using LayerMaskMap correctly

Heres an example for using the layer mask map correctly:

Lets say we want to drive the overalls color with a layer mask through base color index 1.

1. Find where the specific UVs overlap in the material for the overalls.
   ![image](7b76c313-4308-4773-9840-dd282b181000.png)
2. Color those parts white and make the rest of the material black.
   ![image](38a3f9c8-da94-4298-b28d-afb7654ad438.png)
3. Change the color channel to red and import my newly made texture.
   ![image](85151a60-5fe0-4022-aba7-ab9448bb0d88.png)

This will update the model and the 1st colorlayer will only be applied to that part of the mesh.

Please make sure your mask layers arent overlapping.

## Exporting back to the game

Whenever youre done making your model look nice, go ahead and click the Export Trinity... Button to export to your correct directory.
![image](6657c722-0f5e-4264-b00a-d26e7c55837b.png)

Either use the TrinityModLoader or TrinityBypass to load your mod.

Look at it in game and tweak your materials based on what you want.

## Notes / future improvements

This guide may need expanding, if any individual wants to go through and document which values in the params tab change what please reach out on the pokemodding discord.

Quick info on Variations: Trmmts may refer to different material sets the model may use for colors in game, go through your material sets and color_*_rep and color_*_con until the colors line up with whats in game, once youre sure they line up you can sucessfully edit them and export back to the game.

If you'd rather perform these actions on the json converted binaries, feel free to use the Json Editor to do so!
