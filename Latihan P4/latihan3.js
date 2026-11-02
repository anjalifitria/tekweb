const outputDiv = document.getElementById("output3");

if (outputDiv) {
    const btnBackground = document.createElement("button");
    btnBackground.textContent = "Ubah Latar Belakang";
    btnBackground.type = "button";
    btnBackground.addEventListener("click", function () {
        document.body.style.backgroundColor = "#e8f4fc";
    });

    const btnTextColor = document.createElement("button");
    btnTextColor.textContent = "Ubah Warna Teks";
    btnTextColor.type = "button";
    btnTextColor.addEventListener("click", function () {
        document.body.style.color = "#2c3e50";
    });

    const btnIncreaseFont = document.createElement("button");
    btnIncreaseFont.textContent = "Perbesar Font";
    btnIncreaseFont.type = "button";
    btnIncreaseFont.addEventListener("click", function () {
        const currentSize = parseInt(getComputedStyle(document.body).fontSize, 10) || 16;
        document.body.style.fontSize = (currentSize + 1) + "px";
    });

    outputDiv.appendChild(btnBackground);
    outputDiv.appendChild(btnTextColor);
    outputDiv.appendChild(btnIncreaseFont);
}