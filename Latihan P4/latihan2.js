function hitungLuas(panjang, lebar) {
    return panjang * lebar;
}

const luas1 = hitungLuas(5, 8);
const luas2 = hitungLuas(10, 3);

console.log("Luas persegi panjang dengan panjang 5 dan lebar 8 adalah: " + luas1);
console.log("Luas persegi panjang dengan panjang 10 dan lebar 3 adalah: " + luas2);

const hasilElement = document.getElementById("hasil");

if (hasilElement) {
    hasilElement.innerHTML = `
        <p>Luas persegi panjang dengan panjang 5 dan lebar 8 adalah: ${luas1}</p>
        <p>Luas persegi panjang dengan panjang 10 dan lebar 3 adalah: ${luas2}</p>
    `;
}
