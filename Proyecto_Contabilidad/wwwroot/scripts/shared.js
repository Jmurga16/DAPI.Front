document.addEventListener("DOMContentLoaded", () => {

    user = localStorage.getItem("username");
    if (!user && location.href != url_front && !location.href.includes("Auth")) {
        window.location.href = url_front;
    }
});

