const apiBase = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=";
const imgBox = document.getElementById("imgbox");
const qrImage = document.getElementById("QR-image");
const qrInput = document.getElementById("qr-text");
const generateBtn = document.querySelector("button");
const clearBtn = document.getElementById("remove");
const downloadBtn = document.getElementById("download");

function generateQR() {
  let data = qrInput.value.trim();

  if (data.length === 0) {
    qrInput.classList.add("error");
    setTimeout(() => qrInput.classList.remove("error"), 1000);
    return;
  }

  if (!data.startsWith("http://") && !data.startsWith("https://")) {
    data = "https://" + data;
  }

  const finalURL = apiBase + encodeURIComponent(data);
  qrImage.src = finalURL;
  qrImage.classList.add("show-img");
}

generateBtn.addEventListener("click", generateQR);

clearBtn.addEventListener("click", () => {
  qrImage.src = "";
  qrImage.classList.remove("show-img");
  qrInput.value = "";
});

downloadBtn.addEventListener("click", () => {
  if (!qrImage.src) {
    alert("Please generate a QR code first.");
    return;
  }

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();

  img.crossOrigin = "anonymous";

  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "MyQR.png";
    link.click();
  };

  img.src = qrImage.src;
});
