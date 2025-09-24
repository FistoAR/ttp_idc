// document.addEventListener("DOMContentLoaded", () => {
//     const lightBoxTarget = document.querySelectorAll(".lightbox-target");

//     lightBoxTarget.forEach(lb => {
//         // mapping overall variables
//         const _map = {
//             iml: lb.querySelector(".iml_button"),
//             scr_print: lb.querySelector(".screen_print_button"),
//             plain: lb.querySelector(".plain_button"),
//             model: lb.querySelector("model-viewer")
//         };

//         if (_map.iml) {
//             _map.iml.addEventListener("click", () => {
//                 console.log("button clicked");
//                 const modelImage = _map.iml.getAttribute('data-model-path');
//                 modelImage ? setModel(_map.model, modelImage) : null;

//             });
//         }

//         if (_map.scr_print) {
//             _map.scr_print.addEventListener("click", () => {
//                 console.log("button clicked");
//                 const modelImage = _map.scr_print.getAttribute('data-model-path');
//                 modelImage ? setModel(_map.model, modelImage) : null;
//             });
//         }

//         if (_map.plain) {
//             _map.plain.addEventListener("click", () => {
//                 console.log("button clicked");
//                 const modelImage = _map.plain.getAttribute('data-model-path');
//                 modelImage ? setModel(_map.model, modelImage) : null;
//             });
//         }


//     });


// });


// function setModel(model, modelSrc) {
//     if (('assets/'+modelSrc) == model.src) {return;}
//     model.src = '';
//     setTimeout(() => {
//         const modelPath = 'assets/' + modelSrc
//         console.log(`Model path: ${modelPath}`);
//         model.src = modelPath;
//     }, 1500);
// }










// document.addEventListener("DOMContentLoaded", () => {
//     const lightBoxTarget = document.querySelectorAll(".lightbox-target");

//     lightBoxTarget.forEach(lb => {
//         const _map = {
//             iml: lb.querySelector(".iml_button"),
//             scr_print: lb.querySelector(".screen_print_button"),
//             plain: lb.querySelector(".plain_button"),
//             model: lb.querySelector("model-viewer")
//         };

//         // predefine textures
//         const imlTexture = '../images/3D_models/4.300ml_Round/4.300ml_Round/300_round_label.png';
//         const scrPrintTexture = '../images/3D_models/4.300ml_Round/4.300ml_Round/300_round_pattern.png';

//         _map.model.addEventListener("load", () => {
//             const materials = _map.model.model.materials;

//             // Find the material by NAME (Material)
//             const baseMat = materials.find(m => m.name === "Material");
//             if (!baseMat) {
//                 console.error("Material not found!");
//                 return;
//             }

//             if (_map.iml) {
//                 _map.iml.addEventListener("click", async () => {
//                     console.log("IML clicked");
//                     const tex = await _map.model.createTexture(imlTexture);
//                     baseMat.pbrMetallicRoughness.baseColorTexture.setTexture(tex);
//                 });
//             }

//             if (_map.scr_print) {
//                 _map.scr_print.addEventListener("click", async () => {
//                     console.log("Screen Printing clicked");
//                     const tex = await _map.model.createTexture(scrPrintTexture);
//                     baseMat.pbrMetallicRoughness.baseColorTexture.setTexture(tex);
//                 });
//             }

//             if (_map.plain) {
//                 _map.plain.addEventListener("click", () => {
//                     console.log("Plain clicked");
//                     baseMat.pbrMetallicRoughness.baseColorTexture.setTexture(null);
//                 });
//             }
//         });
//     });
// });



document.addEventListener("DOMContentLoaded", () => {
  const lightBoxTarget = document.querySelectorAll(".lightbox-target");

  lightBoxTarget.forEach(lb => {
    const _map = {
      iml: lb.querySelector(".iml_button"),
      scr_print: lb.querySelector(".screen_print_button"),
      plain: lb.querySelector(".plain_button"),
      model: lb.querySelector("model-viewer")
    };

    _map.model.addEventListener("load", () => {
      const materials = _map.model.model.materials;
      const baseMat = materials.find(m => m.name === "material");
      
      const topMaterial = materials.find(m => m.name === "top_material");
      const bottomMaterial = materials.find(m => m.name === "bottom_material");
      

      // if (!baseMat) {
      //   console.error("Material not found!");
      //   return;
      // }

      // Generic function for all buttons
      const handleTextureChange = (button) => {
        if (!button) return;
        button.addEventListener("click", async () => {
          const texPath = button.getAttribute("data-texture");
          const topTexture = button.getAttribute("data-top-texture");
          const bottomTexture = button.getAttribute("data-bottom-texture");
          
          console.log("Clicked:", button.className, "Texture:", texPath);
            if (topTexture && bottomTexture) {
            const topTex = await _map.model.createTexture(topTexture);
            topMaterial?.pbrMetallicRoughness.baseColorTexture.setTexture(topTex);

            const bottomTex = await _map.model.createTexture(bottomTexture);
            bottomMaterial?.pbrMetallicRoughness.baseColorTexture.setTexture(bottomTex);

            // Clear baseMat to avoid overlap
            baseMat?.pbrMetallicRoughness.baseColorTexture.setTexture(null);
          }
          // Case 2: Use single base texture
          else if (texPath) {
            const tex = await _map.model.createTexture(texPath);
            baseMat?.pbrMetallicRoughness.baseColorTexture.setTexture(tex);

            // Clear top and bottom
            topMaterial?.pbrMetallicRoughness.baseColorTexture.setTexture(null);
            bottomMaterial?.pbrMetallicRoughness.baseColorTexture.setTexture(null);
          }
          // Case 3: No textures provided, clear all
          else {
            baseMat?.pbrMetallicRoughness.baseColorTexture.setTexture(null);
            topMaterial?.pbrMetallicRoughness.baseColorTexture.setTexture(null);
            bottomMaterial?.pbrMetallicRoughness.baseColorTexture.setTexture(null);
          }
          
        });
      };

      handleTextureChange(_map.iml);
      handleTextureChange(_map.scr_print);
      handleTextureChange(_map.plain);
    });
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const lightBoxTarget = document.querySelectorAll(".lightbox-target");

  lightBoxTarget.forEach(lb => {
    const imlBtn   = lb.querySelector(".iml_button");
    const scrBtn   = lb.querySelector(".screen_print_button");
    const plainBtn = lb.querySelector(".plain_button");
    const model    = lb.querySelector("model-viewer");

    model.addEventListener("load", () => {
      const materials = model.model.materials;
      const topMat = materials.find(m => m.name === "Top.004");

      if (!topMat) {
        console.error("Top.004 material not found!");
        return;
      }

      // ✅ Default → dark pink
//       topMat.pbrMetallicRoughness.baseColorTexture.setTexture(null);
//       topMat.pbrMetallicRoughness.baseColorFactor = [0.8, 0.2, 0.5, 1]; // dark pink

//       // 🟣 IML → dark pink
//       if (imlBtn) {
//         imlBtn.addEventListener("click", () => {
//           console.log("IML clicked → top dark pink");
//           topMat.pbrMetallicRoughness.baseColorTexture.setTexture(null);
//           topMat.pbrMetallicRoughness.baseColorFactor = [0.8, 0.2, 0.5, 1]; // dark pink
//         });
//       }

//       // ⚪ Screen Print → white
//       if (scrBtn) {
//         scrBtn.addEventListener("click", () => {
//           console.log("Screen Print clicked → top white");
//           topMat.pbrMetallicRoughness.baseColorTexture.setTexture(null);
//           topMat.pbrMetallicRoughness.baseColorFactor = [1, 1, 1, 1]; // white
//         });
//       }

//       // ⚪ Plain → white
//       if (plainBtn) {
//         plainBtn.addEventListener("click", () => {
//           console.log("Plain clicked → top white");
//           topMat.pbrMetallicRoughness.baseColorTexture.setTexture(null);
//           topMat.pbrMetallicRoughness.baseColorFactor = [1, 1, 1, 1]; // white
//         });
//       }
//       imlBtn.addEventListener("click", () => {
//   console.log("IML clicked → top dark pink");

//   if (topMat.pbrMetallicRoughness.baseColorTexture) {
//     topMat.pbrMetallicRoughness.baseColorTexture.setTexture(null);
//   }

//   topMat.pbrMetallicRoughness.setBaseColorFactor([0.929, 0.667, 0.639, 1]); // dark pink
// });









// // ⚪ Screen Print → white top
// if (scrBtn) {
//   scrBtn.addEventListener("click", () => {
//     console.log("Screen Print clicked → top white");

//     if (topMat.pbrMetallicRoughness.baseColorTexture) {
//       topMat.pbrMetallicRoughness.baseColorTexture.setTexture(null);
//     }

//     topMat.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 1]); // white
//   });
// }

// // ⚪ Plain → white top
// if (plainBtn) {
//   plainBtn.addEventListener("click", () => {
//     console.log("Plain clicked → top white");

//     if (topMat.pbrMetallicRoughness.baseColorTexture) {
//       topMat.pbrMetallicRoughness.baseColorTexture.setTexture(null);
//     }

//     topMat.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 1]); // white
//   });
// }
//  if (topMat.pbrMetallicRoughness.baseColorTexture) {
//         topMat.pbrMetallicRoughness.baseColorTexture.setTexture(null);
//       }
//       topMat.pbrMetallicRoughness.setBaseColorFactor([0.929, 0.667, 0.639, 1]); // dark pink

    });
  });
});
















document.addEventListener("DOMContentLoaded", () => {
  const lightBoxTarget = document.querySelectorAll(".lightbox-target");

  // Helper: hex → RGBA array
  function hexToRgbaArray(hex) {
    hex = hex.replace("#", "");
    const bigint = parseInt(hex, 16);
    const r = ((bigint >> 16) & 255) / 255;
    const g = ((bigint >> 8) & 255) / 255;
    const b = (bigint & 255) / 255;
    return [r, g, b, 1]; // full opacity
  }

  lightBoxTarget.forEach(lb => {
    const imlBtn   = lb.querySelector(".iml_button");
    const scrBtn   = lb.querySelector(".screen_print_button");
    const plainBtn = lb.querySelector(".plain_button");
    const model    = lb.querySelector("model-viewer");

    model.addEventListener("load", () => {
      const materials = model.model.materials;
      const topMat = materials.find(m => m.name === "top");

      if (!topMat) {
        console.error("Top material not found!");
        return;
      }

      // ✅ Default → use IML color (or white if none)
      if (imlBtn) {
        const defaultColor = imlBtn.getAttribute("data-color") || "#ffffff";
        topMat.pbrMetallicRoughness.baseColorTexture.setTexture(null);
        topMat.pbrMetallicRoughness.setBaseColorFactor([1,1,1,1]);
        topMat.pbrMetallicRoughness.setBaseColorFactor(defaultColor);
        // topMat.pbrMetallicRoughness.setBaseColorFactor(hexToRgbaArray(defaultColor));
      }

      // Generic handler
      function handleButton(btn) {
        if (!btn) return;
        btn.addEventListener("click", () => {
          const hex = btn.getAttribute("data-color");
          if (!hex) return;
          console.log(`${btn.className} clicked → color: ${hex}`);
          topMat.pbrMetallicRoughness.setBaseColorFactor([1,1,1,1]);
           topMat.pbrMetallicRoughness.setBaseColorFactor(hex);
          // topMat.pbrMetallicRoughness.baseColorTexture.setTexture(null);
          // topMat.pbrMetallicRoughness.setBaseColorFactor(hexToRgbaArray(hex));
              if (isIML) {
      topMat.pbrMetallicRoughness.metallicFactor = 1;
      topMat.pbrMetallicRoughness.roughnessFactor = 0.65;
    }
        });
      }

      handleButton(imlBtn);
      handleButton(scrBtn);
      handleButton(plainBtn);
    });
  });
});




// -------------------------------sweetbox texture-------------------




 _map.model.addEventListener("load", () => {
      const materials = _map.model.model.materials;
      const baseMat = materials.find(m => m.name === "material");
     
      const topMaterial = materials.find(m => m.name === "top_material");
      const bottomMaterial = materials.find(m => m.name === "bottom_material");
     
 
      // if (!baseMat) {
      //   console.error("Material not found!");
      //   return;
      // }
 
      // Generic function for all buttons
      const handleTextureChange = (button) => {
        if (!button) return;
        button.addEventListener("click", async () => {
          const texPath = button.getAttribute("data-texture");
          const topTexture = button.getAttribute("data-top-texture");
          const bottomTexture = button.getAttribute("data-bottom-texture");
         
          console.log("Clicked:", button.className, "Texture:", texPath);
            if (topTexture && bottomTexture) {
            const topTex = await _map.model.createTexture(topTexture);
            topMaterial?.pbrMetallicRoughness.baseColorTexture.setTexture(topTex);
 
            const bottomTex = await _map.model.createTexture(bottomTexture);
            bottomMaterial?.pbrMetallicRoughness.baseColorTexture.setTexture(bottomTex);
 
            // Clear baseMat to avoid overlap
            baseMat?.pbrMetallicRoughness.baseColorTexture.setTexture(null);
          }
          // Case 2: Use single base texture
          else if (texPath) {
            const tex = await _map.model.createTexture(texPath);
            baseMat?.pbrMetallicRoughness.baseColorTexture.setTexture(tex);
 
            // Clear top and bottom
            topMaterial?.pbrMetallicRoughness.baseColorTexture.setTexture(null);
            bottomMaterial?.pbrMetallicRoughness.baseColorTexture.setTexture(null);
          }
          // Case 3: No textures provided, clear all
          else {
            baseMat?.pbrMetallicRoughness.baseColorTexture.setTexture(null);
            topMaterial?.pbrMetallicRoughness.baseColorTexture.setTexture(null);
            bottomMaterial?.pbrMetallicRoughness.baseColorTexture.setTexture(null);
          }
         
        });
      };
 
      handleTextureChange(_map.iml);
      handleTextureChange(_map.scr_print);
      handleTextureChange(_map.plain);
    });















/********** BACKGROUND COLOR PICKER **********/

// Target your background container
const bgContainer = document.querySelector(".background_color");

// Brightness helper (for border contrast)
function getBrightness(hex) {
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);
  return (r * 299 + g * 587 + b * 114) / 1000;
}

// Apply background color
function applyColor(colorStr) {
  if (bgContainer) {
    bgContainer.style.backgroundColor = colorStr;
    localStorage.setItem("bgColor250mlRound", colorStr);
  }
}

// Update Pickr button border
function updatePickrBorderColor(hexColor) {
  const brightness = getBrightness(hexColor);
  const previewButton = document.querySelector(".pickr .pcr-button");
  if (previewButton) {
    previewButton.style.border = `2px solid ${
      brightness < 128 ? "white" : "black"
    }`;
  }
}

// Initialize Pickr
const pickr = Pickr.create({
  el: "#bgColorPicker",
  theme: "nano", // or 'classic', 'monolith', etc.
  default: "#9bdfd5", // same as your current bg
  components: {
    preview: true,
    opacity: true,
    hue: true,
    interaction: {
      input: true,
      save: true,
    },
  },
});

// When Pickr is ready
pickr.on("init", () => {
  const savedColor = localStorage.getItem("bgColor250mlRound") || "#9bdfd5";
  applyColor(savedColor);
  pickr.setColor(savedColor);
  updatePickrBorderColor(savedColor);
});

// On live color change
pickr.on("change", (color) => {
  const rgbaColor = color.toRGBA().toString();
  const hexColor = color.toHEXA().toString();

  applyColor(rgbaColor);
  updatePickrBorderColor(hexColor);
});

// Hide picker on save
pickr.on("save", () => {
  pickr.hide();
});
