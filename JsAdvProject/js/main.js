//Get JSON object, write to body;

window.onload = function() {

    var url = 'https://swapi.dev/api/people/';

    var init = {
        method: 'GET'
    };

    fetch(url, init).then(function(resp) {
        return resp.json();
    }).then(function(data) {
        displayResults(data);
    }).catch(function(err) {
        console.log(err)
    });

    //Display first 10 heroes after sucsessful fetch

    function displayResults(data) {

        my_div = document.getElementById("person1");

        for (var i = 0; i <= data.results.length - 1; i++) {

            my_div.insertAdjacentHTML('afterbegin',
                `<div class="3u" id="myContent">
                    <a href="#" class="bordered-feature-image">
                    <img src="images/37.jpg" alt="" /></a>
                    <a href="#" id="show-message" style="font-size: 20px">${data.results[i].name}</a>
                    <div style="display:none" id="message">
                        Name: ${data.results[i].name}</br>
                        Birth:${data.results[i].birth_year}</br>
                        Gender:${data.results[i].gender}</br>
                        Planet:${data.results[i].planet}</br>
                        Species:${data.results[i].species}</br>
                        
                        <div id="list">
                            <img src="images/01.jpg" alt="" style="border-radius: 75%;"/></a>
                            <button class="button-big" id="backToList" value="closeCard">Back to Hero list</button>
                        </div>
                    </div>                                                    
                </div>`);

            showHiddenContent();
            hideContent();
        }
    }

    var heroBtn = document.getElementById('heroList');
    heroBtn.style.display = "none";

    //Get previous list from Star wars API;

    var previousBtn = document.getElementById('previousBtn');
    previousBtn.style.display = 'none';
    previousBtn.addEventListener('click', getPreviousList);

    function getPreviousList() {

        count--;
        var newUrl = url + `?page=${count}`;
        if (count <= 0) {
            previousBtn.style.display = 'none';
            nextBtn.style.display = 'inline-block';
            return;
        }
        fetch(newUrl, init).then(function(resp) {
            return resp.json();
        }).then(function(data) {
            changeResults(data);
            previousBtn.style.display = 'inline-block';
        }).catch(function(err) {
            console.log(err)
        });
    }

    //Get next 10 heroes from API;

    var nextBtn = document.getElementById('nextBtn');
    nextBtn.addEventListener('click', getNextList);
    var count = 2;

    function getNextList() {
        count++;
        var newUrl = url + `?page=${count}`;
        if (count == 10) {
            nextBtn.style.display = 'none';
            return;
        }
        fetch(newUrl, init).then(function(resp) {
            return resp.json();
        }).then(function(data) {
            changeResults(data);
            previousBtn.style.display = 'inline-block';
        }).catch(function(err) {
            console.log(err)
        });
    }

    function changeResults(data) {
        my_div = document.getElementById("person1");
        var blocks = my_div.children;
        for (var i = blocks.length - 1; i >= 0; i--) {
            my_div.removeChild(blocks[i]);
        };

        for (var i = 0; i <= data.results.length - 1; i++) {

            my_div.insertAdjacentHTML('afterbegin',
                `<div class="3u" id="myContent">
                    <a href="#" class="bordered-feature-image">
                    <img src="images/37.jpg" alt="" /></a>
                    <a href="#" id="show-message" style="font-size: 20px">${data.results[i].name}</a>
                    <div style="display:none" id="message">
                            Name: ${data.results[i].name}</br>
                            Birth:${data.results[i].birth_year}</br>
                            Gender:${data.results[i].gender}</br>
                            Planet:${data.results[i].planet}</br>
                            Species:${data.results[i].species}</br>
                            
                            <div id="list">
                                <img src="images/01.jpg" alt="" style="border-radius: 75%;"/></a>
                                <button class="button-big" id="backToList" value="closeCard">Back to Hero list</button>
                            </div>
                    </div>                                                    
                </div>`);

            showHiddenContent();
            hideContent();
        }
    };

    function showHiddenContent() {

        var message = document.getElementById("message");
        var showMessage = document.getElementById("show-message");
        showMessage.addEventListener("click", clickHandler);

        function clickHandler() {
            if (message.style.display === "none") {
                message.style.display = "inline-block";
                document.body.style.overflowY = "hidden";

            }
        }
    }

    function hideContent() {
        var hiddenBtn = document.getElementById('backToList');
        var message = document.getElementById("message");
        hiddenBtn.addEventListener('click', function() {
            if (message.style.display === "inline-block") {
                message.style.display = "none";
                document.body.style.overflowY = "";
                document.html.style.overflowY = "";
            }
        });
    }
}