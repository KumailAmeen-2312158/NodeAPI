


    const Link = "https://effective-rotary-phone-v6w9p6w5gv55hpj9r-5005.app.github.dev/assign1";

    fetch(Link)
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById("Count");
        const counts = data[0];

        for (let key in counts) {
          const box = document.createElement("div");
          box.className = "box";
          box.innerHTML = key + "<br><strong>" + counts[key] + "</strong>";
          container.appendChild(box);
        }
      })
      .catch(error => {
        console.log("Error:", error.message);
      });
