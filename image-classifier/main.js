const img = document.getElementById('img');
const img2 = document.getElementById('img2');
        const button = document.getElementById('submit_button');
        const button2 = document.getElementById('submit_button2');
        const input = document.getElementById('image_url');
        const input2 = document.getElementById('image2_url');
        const result = document.getElementById('prediction');

        let model;
        let model2;

        button.onclick = () => {
            const url = input.value;
            
            img.src = url;
            
            result.innerText = "Loading...";
            img2.src = null;
            img2.style.display = 'none'
            img.style.display = 'block'
            input2.value = "";
        }

        image2_url.addEventListener("change", function(){
            const file = this.files[0];

            if(file){
                const reader = new FileReader();

                img2.style.display = "block";
                result.innerText = "Loading...";
                img.src = null;
                img.style.display = 'none'
                input.value = "";

                reader.addEventListener("load", function(){
                    img2.setAttribute('src',this.result);
                })

                reader.readAsDataURL(file);
            }else{
                img2.style.display = null;

            }
        })
       

        img.onload = () => {
            doPrediction();
        }

        img2.onload = () =>{
            doPrediction();

        }

        function doPrediction() {
            if( model ) {
                model.classify(img).then(predictions => {
                    showPrediction(predictions);
                });
            } else {
                mobilenet.load().then(_model => {
                    model = _model;
                    model.classify(img).then(predictions => {
                        showPrediction(predictions);
                    });
                });
            }

            if( model2 ) {
                model2.classify(img2).then(predictions => {
                    showPrediction(predictions);
                });
            } else {
                mobilenet.load().then(_model2 => {
                    model2 = _model2;
                    model2.classify(img2).then(predictions => {
                        showPrediction(predictions);
                    });
                });
            }
        }

        function showPrediction(predictions) {
            result.innerText = "This might be a " + predictions[0].className;
        }