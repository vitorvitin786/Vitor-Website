document.addEventListener("DOMContentLoaded", function () {
    const visitorKey = "visitor-tracked";
    let visitors = localStorage.getItem(visitorKey);

    if (!visitors) {
        fetch("https://api.countapi.xyz/hit/vitor-website/visits")
            .then(response => response.json())
            .then(data => {
                document.getElementById("visitor-counter").innerText = data.value;
                localStorage.setItem(visitorKey, "true");
            });
    } else {
        fetch("https://api.countapi.xyz/get/vitor-website/visits")
            .then(response => response.json())
            .then(data => {
                document.getElementById("visitor-counter").innerText = data.value;
            });
    }
});
