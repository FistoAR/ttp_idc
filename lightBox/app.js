document.addEventListener("DOMContentLoaded", () => {
    const lightBoxTarget = document.querySelectorAll(".lightbox-target");

    lightBoxTarget.forEach(lb => {
        // mapping overall variables
        const _map = {
            iml: lb.querySelector(".iml_button"),
            scr_print: lb.querySelector(".screen_print_button"),
            plain: lb.querySelector(".plain_button"),
            model: lb.querySelector("model-viewer")
        };

        if (_map.iml) {
            _map.iml.addEventListener("click", () => {
                const modelImage = _map.iml.getAttribute('data-model-path');
                modelImage ? setModel(_map.model, modelImage) : null;

            });
        }

        if (_map.scr_print) {
            _map.scr_print.addEventListener("click", () => {
                const modelImage = _map.scr_print.getAttribute('data-model-path');
                modelImage ? setModel(_map.model, modelImage) : null;
            });
        }

        if (_map.plain) {
            _map.plain.addEventListener("click", () => {
                const modelImage = _map.plain.getAttribute('data-model-path');
                modelImage ? setModel(_map.model, modelImage) : null;
            });
        }


    });


});


function setModel(model, modelSrc) {
    if (('assets/'+modelSrc) == model.src) {return;}
    model.src = '';
    setTimeout(() => {
        const modelPath = 'assets/' + modelSrc
        console.log(`Model path: ${modelPath}`);
        model.src = modelPath;
    }, 1500);
}