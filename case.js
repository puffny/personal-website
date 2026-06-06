const caseBackLink = document.querySelector(".case-back-link");

if (caseBackLink) {
  caseBackLink.addEventListener("click", (event) => {
    event.preventDefault();

    const fallbackHref = caseBackLink.getAttribute("href");
    const cameFromHome = document.referrer.includes("index.html");

    if (cameFromHome && window.history.length > 1) {
      window.history.back();
      return;
    }

    window.location.href = fallbackHref;
  });
}
