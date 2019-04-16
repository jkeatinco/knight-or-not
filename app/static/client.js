var el = x => document.getElementById(x);

function showPicker(inputId) { el('file-input').click(); }

function showPicked(input) {
    el('upload-label').innerHTML = input.files[0].name;
    var reader = new FileReader();
    reader.onload = function (e) {
        el('image-picked').src = e.target.result;
        el('image-picked').className = 'special-img';
    }
    reader.readAsDataURL(input.files[0]);
}

function analyze() {
    var uploadFiles = el('file-input').files;
    if (uploadFiles.length != 1) alert('Please select 1 file to examine!');

    el('analyze-button').innerHTML = 'Examining...';
    var xhr = new XMLHttpRequest();
    var loc = window.location
    xhr.open('POST', `${loc.protocol}//${loc.hostname}:${loc.port}/analyze`, true);
    xhr.onerror = function() {alert (xhr.responseText);}
    xhr.onload = function(e) {
        if (this.readyState === 4) {
            var response = JSON.parse(e.target.responseText);
            $('#exampleModal').modal('show');
            if(`${response['result']}` == 'knights') {


                idArray = new Array()
                idArray [1] = "First paragraph text"
                idArray [2] = "Second paragraph text"
                idArray [3] = "Third paragraph text"
                idArray [4] = "Fourth paragraph text"
                idArray [5] = "Fifth paragraph text"

                randomParagraph = Math.floor(Math.random()*5);

                document.getElementById("result-label").innerHTML = idArray[randomParagraph + 1];   

                /*el('result-label').innerHTML = `Vegas Golden Knight!`;*/



                
                $('#image-picked').clone().appendTo('#result-img');

                
            }
            else if(`${response['result']}` == 'sharks'){
                el('result-label').innerHTML = `Minnows!`; 

                $('#image-picked').clone().appendTo('#result-img')
                

                 
            }
        }
        el('analyze-button').innerHTML = '🕵️ Examine';
    }

    var fileData = new FormData();
    fileData.append('file', uploadFiles[0]);
    xhr.send(fileData);
}

