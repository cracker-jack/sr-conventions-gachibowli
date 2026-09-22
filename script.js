const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  siteNav.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle?.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  });
});

const hero = document.querySelector(".hero");
const floatingEnquire = document.querySelector(".floating-enquire");

if (hero && floatingEnquire) {
  const heroObserver = new IntersectionObserver(
    ([entry]) => floatingEnquire.classList.toggle("is-visible", !entry.isIntersecting),
    { threshold: 0.12 }
  );
  heroObserver.observe(hero);
}

const occasionData = {
  wedding: {
    number: "Scene 01",
    title: "A day that feels entirely yours.",
    copy: "Create a warm, beautiful setting for the rituals, welcomes, and moments you’ll remember together.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85",
    alt: "Representative wedding stage",
  },
  reception: {
    number: "Scene 02",
    title: "The evening everyone comes together.",
    copy: "Set the stage for introductions, photographs, conversation, and a joyful welcome shared with every guest.",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2000&q=85",
    alt: "Representative reception setting",
  },
  family: {
    number: "Scene 03",
    title: "Milestones deserve a room of their own.",
    copy: "Bring generations together for birthdays, anniversaries, and family occasions in a setting made for connection.",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=2000&q=85",
    alt: "Representative family celebration table setting",
  },
  corporate: {
    number: "Scene 04",
    title: "A polished setting for shared purpose.",
    copy: "Host team gatherings, company occasions, and formal events with a clear, welcoming presentation.",
    image:
      "https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=2000&q=85",
    alt: "Representative formal event setting",
  },
};

const sceneImage = document.querySelector("[data-scene-image]");
const sceneNumber = document.querySelector("[data-scene-number]");
const sceneTitle = document.querySelector("[data-scene-title]");
const sceneCopy = document.querySelector("[data-scene-copy]");
const occasionButtons = document.querySelectorAll("[data-occasion]");

occasionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const occasion = button.dataset.occasion;
    const scene = occasionData[occasion];

    occasionButtons.forEach((item) => {
      item.setAttribute("aria-selected", String(item === button));
    });

    sceneImage.classList.add("is-changing");
    window.setTimeout(() => {
      sceneImage.style.backgroundImage = `url("${scene.image}")`;
      sceneImage.setAttribute("aria-label", scene.alt);
      sceneNumber.textContent = scene.number;
      sceneTitle.textContent = scene.title;
      sceneCopy.textContent = scene.copy;
      sceneImage.classList.remove("is-changing");
    }, 220);
  });
});

const enquiryForm = document.querySelector("[data-enquiry-form]");

enquiryForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!enquiryForm.reportValidity()) {
    return;
  }

  const data = new FormData(enquiryForm);
  const name = data.get("name");
  const occasion = data.get("occasion");
  const date = data.get("date");
  const message = data.get("message");
  const dateLine = date ? `\nPreferred date: ${date}` : "";
  const messageLine = message ? `\nQuestion: ${message}` : "";
  const text = encodeURIComponent(
    `Hello SR Conventions, I’m ${name}. I’m interested in planning a ${occasion}.${dateLine}${messageLine}`
  );

  // Demo placeholder only. Replace with the venue's confirmed WhatsApp number before launch.
  window.open(`https://wa.me/919999999999?text=${text}`, "_blank", "noopener,noreferrer");
});
