
/* ========================================
   ROYALBITE — JAVASCRIPT
   Interactive Website Functionality
======================================== */

document.addEventListener("DOMContentLoaded", () => {
  // ---------- MOBILE NAVBAR ----------

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navigationLinks = document.querySelectorAll(".nav-links a");

  function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Close the mobile menu when clicking outside it.

  document.addEventListener("click", (event) => {
    const clickedInsideMenu = navLinks.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
      closeMenu();
    }
  });

  // ---------- ACTIVE NAVIGATION LINK ----------

  const sections = document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navigationLinks.forEach((link) => {
            const isActive =
              link.getAttribute("href") === `#${entry.target.id}`;

            link.classList.toggle("active", isActive);
          });
        });
      },
      {
        rootMargin: "-25% 0px -60% 0px",
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // ---------- CURRENT YEAR ----------

  const yearElement = document.querySelector("#year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ---------- DISH BUTTONS ----------

  const addButtons = document.querySelectorAll(".add-btn");

  addButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const dishCard = button.closest(".menu-card");
      const dishName = dishCard.querySelector("h3").textContent.trim();

      const originalText = button.textContent;

      button.textContent = "✓";
      button.setAttribute(
        "aria-label",
        `${dishName} selected`
      );

      button.style.background = "#d7e8bd";

      window.setTimeout(() => {
        button.textContent = originalText;
        button.setAttribute(
          "aria-label",
          `Add ${dishName}`
        );
        button.style.background = "";
      }, 1400);
    });
  });

  // ---------- RESERVATION FORM ----------

  const bookingForm = document.querySelector("#booking-form");
  const bookingDate = document.querySelector("#booking-date");
  const formMessage = document.querySelector("#form-message");

  // Prevent selecting a past date.

  if (bookingDate) {
    const today = new Date();
    const localToday = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0"),
    ].join("-");

    bookingDate.min = localToday;
  }

  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(bookingForm);

    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const date = String(formData.get("date") || "");
    const guests = String(formData.get("guests") || "");

    formMessage.style.color = "#ff9b86";

    if (!name || !phone || !date || !guests) {
      formMessage.textContent =
        "Please complete all required fields.";

      return;
    }

    if (date < bookingDate.min) {
      formMessage.textContent =
        "Please choose today or a future date.";

      return;
    }

    if (phone.length < 7) {
      formMessage.textContent =
        "Please enter a valid contact number.";

      return;
    }

    formMessage.style.color = "#e9bd62";

    formMessage.textContent =
      `Thank you, ${name}! Your demo reservation request ` +
      `for ${guests} guest(s) on ${date} has been checked. ` +
      "This demo does not send a real booking.";

    // This is a frontend demo only.
    // Connect a backend or booking service for real reservations.

    bookingForm.reset();

    if (bookingDate) {
      bookingDate.min = [
        new Date().getFullYear(),
        String(new Date().getMonth() + 1).padStart(2, "0"),
        String(new Date().getDate()).padStart(2, "0"),
      ].join("-");
    }
  });

  // ---------- SMOOTH SCROLL ----------

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches
            ? "auto"
            : "smooth",
          block: "start",
        });

        history.replaceState(null, "", targetId);
      }
    });
  });

  console.log("RoyalBite website initialized successfully!");
});
