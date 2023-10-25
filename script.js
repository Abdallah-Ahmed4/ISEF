const video = document.getElementById('video');
const startButton = document.getElementById('startButton');
const switchCameraButton = document.getElementById('switchCameraButton');
let stream;
let currentCamera = 'user'; // الكاميرا الأمامية

startButton.addEventListener('click', async () => {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: currentCamera } });
        video.srcObject = stream;
    } catch (error) {
        console.error('Error accessing camera:', error);
    }
});

switchCameraButton.addEventListener('click', () => {
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        video.srcObject = null;
    }
    if (currentCamera === 'user') {
        currentCamera = 'environment'; // الكاميرا الخلفية
    } else {
        currentCamera = 'user'; // الكاميرا الأمامية
    }
    startButton.click();
});


// استخراج الصورة من الفيديو
var image = document.querySelector("#video").capture();

// التعرف على الأشياء في الصورة
var objects = tf.image.objectDetection(image, coco.model);

// عرض أسماء الأشياء
for (var object of objects) {
  console.log(object.name);
}
// عرض أسماء الأشياء في موقع الويب
for (var object of objects) {
  var text = document.createElement("p");
  text.textContent = object.name;
  document.body.appendChild(text);
}
