var el = x => document.getElementById(x);

function showPicker(inputId) { el('file-input').click(); }



function showPicked(input) {
    el('upload-label').innerHTML = input.files[0].name;
    var reader = new FileReader();
    reader.onload = function (e) {
        el('image-picked').src = e.target.result;
        el('image-picked').className = 'special-img';
    }
    EXIF.getData(input,function() {
        var orientation = EXIF.getTag(this,"Orientation");
        var can = document.createElement("canvas");
        var ctx = can.getContext('2d');
        var thisImage = new Image;
        thisImage.onload = function() {
          can.width  = thisImage.width;
          can.height = thisImage.height;
          ctx.save();
          var width  = can.width;  var styleWidth  = can.style.width;
          var height = can.height; var styleHeight = can.style.height;
          if (orientation) {
            if (orientation > 4) {
              can.width  = height; can.style.width  = styleHeight;
              can.height = width;  can.style.height = styleWidth;
            }
            switch (orientation) {
            case 2: ctx.translate(width, 0);     ctx.scale(-1,1); break;
            case 3: ctx.translate(width,height); ctx.rotate(Math.PI); break;
            case 4: ctx.translate(0,height);     ctx.scale(1,-1); break;
            case 5: ctx.rotate(0.5 * Math.PI);   ctx.scale(1,-1); break;
            case 6: ctx.rotate(0.5 * Math.PI);   ctx.translate(0,-height); break;
            case 7: ctx.rotate(0.5 * Math.PI);   ctx.translate(width,-height); ctx.scale(-1,1); break;
            case 8: ctx.rotate(-0.5 * Math.PI);  ctx.translate(-width,0); break;
            }
          }
      
          ctx.drawImage(thisImage,0,0);
          ctx.restore();
          var dataURL = can.toDataURL();
      
          // at this point you can save the image away to your back-end using 'dataURL'
        }
      
        // now trigger the onload function by setting the src to your HTML5 file object (called 'file' here)
        thisImage.src = URL.createObjectURL(input);
      
      });
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

