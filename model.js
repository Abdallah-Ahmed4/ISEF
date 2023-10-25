// استيراد مكتبة TensorFlow
import * as tf from "tensorflow";

// تحميل نموذج COCO
const coco = tf.loadModel("https://cdnjs.cloudflare.com/ajax/libs/tfjs-models/4.0.0/coco.min.js");

// إرجاع نموذج COCO
export default coco;
