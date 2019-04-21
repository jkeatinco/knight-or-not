var el = x => document.getElementById(x);

function showPicker(inputId) { el('file-input').click(); }

function showPicked(input) {
    fileReader.onloadend = function() {

        var exif = EXIF.readFromBinaryFile(new BinaryFile(this.result));
    
        switch(exif.Orientation){
    
            case 2:
                // horizontal flip
                ctx.translate(canvas.width, 0);
                ctx.scale(-1, 1);
                break;
            case 3:
                // 180° rotate left
                ctx.translate(canvas.width, canvas.height);
                ctx.rotate(Math.PI);
                break;
            case 4:
                // vertical flip
                ctx.translate(0, canvas.height);
                ctx.scale(1, -1);
                break;
            case 5:
                // vertical flip + 90 rotate right
                ctx.rotate(0.5 * Math.PI);
                ctx.scale(1, -1);
                break;
            case 6:
                // 90° rotate right
                ctx.rotate(0.5 * Math.PI);
                ctx.translate(0, -canvas.height);
                break;
            case 7:
                // horizontal flip + 90 rotate right
                ctx.rotate(0.5 * Math.PI);
                ctx.translate(canvas.width, -canvas.height);
                ctx.scale(-1, 1);
                break;
            case 8:
                // 90° rotate left
                ctx.rotate(-0.5 * Math.PI);
                ctx.translate(-canvas.width, 0);
                break;
    
    
        }
    };
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
            $('#exampleModal').modal('show', {
                backdrop: 'static',
                keyboard: false
            });
            if(`${response['result']}` == 'knights') {


                idArray = new Array()
                idArray [0] = "Vegas Born!"
                idArray [1] = "Go Knights Go!"
                idArray [2] = "Vegas Strong!"
                idArray [3] = "Knight Up!"
                idArray [4] = "Vegas Golden Knights!"
                idArray [5] = "VGK Worldwide!"

                randomParagraph = Math.floor(Math.random()*5);

                el('result-label').innerHTML = "<img class=\"knights-logo\" src=\"../static/img/Vegas_Golden_Knights_logo.svg\">" + idArray[randomParagraph];   

                /*el('result-label').innerHTML = `Vegas Golden Knight!`;*/

                
                $('#image-picked').clone().appendTo('#result-img');

                $( ".special-img" ).removeClass( "special-img-teal" ).addClass( "special-img-gold" );
                $("#result-label" ).removeClass( "result-label-teal" ).addClass( "result-label-gold" );

                
            }
            else if(`${response['result']}` == 'sharks'){
                idArray = new Array()
                idArray [0] = "🐟 Minnows"
                idArray [1] = "🦈 Goblin Shark"
                idArray [2] = "🐟 Sardines"
                idArray [3] = "🍣 Sushi"
                idArray [4] = "🐡 Blowfish"
                idArray [5] = "🐟 Midget Dwarfgoby"

                randomParagraph = Math.floor(Math.random()*5);

                el('result-label').innerHTML = idArray[randomParagraph];  

                /*el('result-label').innerHTML = `Minnows!`;*/ 

                $('#image-picked').clone().appendTo('#result-img')
                
                $(".special-img" ).removeClass( "special-img-gold" ).addClass( "special-img-teal" );
                $("#result-label" ).removeClass( "result-label-gold" ).addClass( "result-label-teal" );

                 
            }
        }
        el('analyze-button').innerHTML = '🕵️ Examine';
    }

    var fileData = new FormData();
    fileData.append('file', uploadFiles[0]);
    xhr.send(fileData);
}

