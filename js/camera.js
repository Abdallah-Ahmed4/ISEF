// تحقق من دعم متصفح لـ getUserMedia
if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
  alert("المتصفح غير مدعوم!");
}

// العناصر اللازمة
const video = document.querySelector("#video");
const cameraFront = document.querySelector("#camera-front");
const cameraBack = document.querySelector("#camera-back");
const objectsContainer = document.querySelector("#objects");

// تبديل الكاميرا الأمامية والخلفية
cameraFront.addEventListener("click", async () => {
  await switchCamera("user");
});

cameraBack.addEventListener("click", async () => {
  await switchCamera("environment");
});

// الدالة لتبديل الكاميرا
async function switchCamera(facingMode) {
  const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: facingMode } });
  video.srcObject = stream;
  detectObjects();
}

// تحميل نموذج COCO
const loadCocoModel = async () => {
  const model = await tf.loadGraphModel("https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd");
  return model;
};

// التعرف على الأشياء في الصورة
const detectObjects = async () => {
  const model = await loadCocoModel();
  const image = tf.browser.fromPixels(video);
  const predictions = await model.executeAsync(image);

  // عرض أسماء الأشياء
  showNames(predictions);
};

// عرض أسماء الأشياء
const showNames = (objects) => {
  const objectNames = objects.map((object) => object.class);
  objectsContainer.innerHTML = "الأشياء المعترف بها: " + objectNames.join(", ");
};

// بدء التطبيق
(async () => {
  await switchCamera("user");
})();