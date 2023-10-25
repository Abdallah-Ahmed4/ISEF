// استيراد مكتبة TensorFlow.js
import * as tf from "@tensorflow/tfjs";

// تصدير دالة لتحميل نموذج COCO SSD
export async function loadCocoModel() {
  const model = await tf.loadGraphModel("https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd");
  return model;
}