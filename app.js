const tools = {
  writer: {kicker:"WRITE WITH CLARITY", title:"AI Writer", label:"What would you like to write about?", placeholder:"Example: Write a friendly introduction for my new online store that sells handmade candles...", hint:"Be specific for a more useful result."},
  caption: {kicker:"CAPTURE ATTENTION", title:"Caption Generator", label:"Describe your post, product or photo.", placeholder:"Example: A cozy Sunday morning coffee setup with a new ceramic mug...", hint:"Add the platform or audience if you have one."},
  business: {kicker:"NAME YOUR NEXT IDEA", title:"Business Name Generator", label:"Describe your business or project.", placeholder:"Example: An eco-friendly skincare brand for busy young professionals...", hint:"Mention your audience, style and keywords."},
  email: {kicker:"SAY IT PROFESSIONALLY", title:"Email Writer", label:"What does your email need to communicate?", placeholder:"Example: Ask a supplier for an updated price list and delivery estimate...", hint:"Include the recipient and desired outcome, without private details."}
};
let activeTool = "writer";
const promptEl = document.querySelector("#prompt");
const statusEl = document.querySelector("#status");
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelectorAll(".tool-tab").forEach(button => button.addEventListener("click", () => {
  activeTool = button.dataset.tool;
  document.querySelectorAll(".tool-tab").forEach(b => { b.classList.toggle("active", b === button); b.setAttribute("aria-selected", String(b === button)); });
  const t = tools[activeTool];
  document.querySelector("#tool-kicker").textContent = t.kicker;
  document.querySelector("#tool-title").textContent = t.title;
  document.querySelector("#prompt-label").textContent = t.label;
  promptEl.placeholder = t.placeholder;
  document.querySelector("#hint").textContent = t.hint;
  document.querySelector("#result-wrap").hidden = true;
  statusEl.textContent = "";
}));
promptEl.addEventListener("input", () => document.querySelector("#counter").textContent = `${promptEl.value.length} / 1800`);
document.querySelector("#generate").addEventListener("click", async () => {
  const prompt = promptEl.value.trim();
  if (prompt.length < 8) { statusEl.textContent = "Please enter a little more detail (at least 8 characters)."; return; }
  const button = document.querySelector("#generate");
  
  if (!window.turnstile || turnstileWidgetId === null) {
    statusEl.textContent = "Verification is not ready. Please refresh.";
    return;
  }

  const turnstileToken = window.turnstile.getResponse(turnstileWidgetId);

  if (!turnstileToken) {
    statusEl.textContent = "Please complete verification before generating.";
    return;
  }

  button.disabled = true; button.textContent = "Generating…"; statusEl.textContent = "Creating your draft. This may take a few seconds.";
  document.querySelector("#result-wrap").hidden = true;
  try {
    
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tool: activeTool,
        prompt,
        tone: document.querySelector("#tone").value,
        turnstileToken
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Something went wrong. Please try again.");
    document.querySelector("#result").textContent = data.text;
    document.querySelector("#result-wrap").hidden = false;
    statusEl.textContent = "";
  } catch (error) { statusEl.textContent = error.message; }
  
  finally {
    button.disabled = false;
    button.innerHTML = 'Generate <span>✦</span>';

    if (window.turnstile && turnstileWidgetId !== null) {
      window.turnstile.reset(turnstileWidgetId);
    }
  }

});
document.querySelector("#copy").addEventListener("click", async () => {
  await navigator.clipboard.writeText(document.querySelector("#result").textContent);
  document.querySelector("#copy").textContent = "Copied!";
  setTimeout(() => document.querySelector("#copy").textContent = "Copy text", 1500);
});

let turnstileWidgetId = null;

window.addEventListener("load", () => {
  if (!window.turnstile) {
    statusEl.textContent = "Verification could not load. Please refresh.";
    return;
  }

  turnstileWidgetId = window.turnstile.render(
    "#turnstile-container",
    {
      sitekey: "0x4AAAAAAF_WfVRO61WotOaI",
      theme: "dark",
      callback: () => {
        statusEl.textContent = "";
      },
      "expired-callback": () => {
        statusEl.textContent = "Verification expired. Please verify again.";
      },
      "error-callback": () => {
        statusEl.textContent = "Verification failed. Please refresh.";
      }
    }
  );
});
