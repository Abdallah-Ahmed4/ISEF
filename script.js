// استخراج الصورة من الفيديو
var image = document.querySelector("#video").capture();

// التعرف على الأشياء في الصورة
var objects = tf.image.objectDetection(image, coco.model);

// عرض أسماء الأشياء
for (var object of objects) {
  console.log(object.name);
}