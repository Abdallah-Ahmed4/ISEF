// استيراد مكتبة TensorFlow
import * as tf from "tensorflow";

// استيراد نموذج COCO
import coco from "tfjs-models/coco";

// فتح الكاميرا الأمامية
const cameraFront = document.querySelector("#camera-front");
cameraFront.addEventListener("click", () => {
  navigator.mediaDevices.getUserMedia({
    video: true,
    facingMode: "user",
  }).then((stream) => {
    const video = document.querySelector("#video");
    video.srcObject = stream;
    video.play();
  });
});

// فتح الكاميرا الخلفية
const cameraBack = document.querySelector("#camera-back");
cameraBack.addEventListener("click", () => {
  navigator.mediaDevices.getUserMedia({
    video: true,
    facingMode: "back",
  }).then((stream) => {
    const video = document.querySelector("#video");
    video.srcObject = stream;
    video.play();
  });
});

// التعرف على الأشياء في الصورة
const recognizeObjects = (image) => {
  // استخراج إطارات من الصورة
  const frames = image.split(/\n/);

  // التعرف على الأشياء في كل إطار
  const objects = [];
  for (const frame of frames) {
    objects.push(tf.image.objectDetection(frame, coco.model));
  }

  // إرجاع قائمة بالأشياء
  return objects;
};

// عرض أسماء الأشياء
const showNames = (objects) => {
  for (const object of objects) {
    const name = object.name[0];
    const text = document.createElement("p");
    text.textContent = name;
    document.body.appendChild(text);
  }
};

// استدعاء دالة التعرف على الأشياء عند تغيير الفيديو
const video = document.querySelector("#video");
video.addEventListener("change", () => {
  // استخراج الصورة من الفيديو
  const image = video.capture();

  // التعرف على الأشياء في الصورة
  const objects = recognizeObjects(image);

  // عرض أسماء الأشياء
  showNames(objects);
});
