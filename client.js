fetch('https://www.omdbapi.com/?i=tt3896198&apikey=bf80773c', {method: 'GET'})
.then(response => response.json())
.then(data => {
    document.getElementById("title").textContent = data.Title;
    document.getElementById("year").textContent = data.Year;
})
