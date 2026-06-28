import { useEffect } from "react";

export function useContactCopy() {
  useEffect(() => {
    const contactItems = Array.from(
      document.querySelectorAll(".contact-grid > a, .contact-grid > p, .final-contact-list p"),
    ).filter((item) => !item.closest(".hero-scope-note"));
    if (!contactItems.length) return;

    const toast = document.createElement("div");
    toast.className = "copy-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.textContent = "已复制";
    document.body.appendChild(toast);

    let toastTimer;
    const showToast = () => {
      window.clearTimeout(toastTimer);
      toast.classList.add("is-visible");
      toastTimer = window.setTimeout(() => {
        toast.classList.remove("is-visible");
      }, 1600);
    };

    const fallbackCopy = (text) => {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    };

    const copyText = async (text) => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
        } else {
          fallbackCopy(text);
        }
        showToast();
      } catch {
        fallbackCopy(text);
        showToast();
      }
    };

    const cleanups = [];
    contactItems.forEach((item) => {
      if (item.tagName === "P") {
        item.tabIndex = 0;
        item.setAttribute("role", "button");
      }

      const handleCopy = (event) => {
        event.preventDefault();
        copyText(item.textContent.trim().replace(/\s+/g, " "));
      };

      const handleKeydown = (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        handleCopy(event);
      };

      item.addEventListener("click", handleCopy);
      item.addEventListener("keydown", handleKeydown);
      cleanups.push(() => {
        item.removeEventListener("click", handleCopy);
        item.removeEventListener("keydown", handleKeydown);
      });
    });

    return () => {
      window.clearTimeout(toastTimer);
      cleanups.forEach((cleanup) => cleanup());
      toast.remove();
    };
  }, []);
}
