export const sections = {
  motivation: [
    "ABU Robocon 2026's KFS block has two similar forms: real, with one of 15 Oracle-Bone-script glyphs on all five marked faces, and fake, with a confusable seal-script look-alike. A robot's camera must find the block, decide real or fake, and read the sign live on a laptop CPU or Jetson, from just a few hundred labelled photos.",
    "So the project inverted the problem: render them. A Blender synthetic pipeline generates thousands of labelled cube images with free ground truth; real photos close the render-to-camera gap.",
  ],
  approach: [
    "generate_kfs_real.py drives Blender headlessly: build a 20cm foam cube, stamp a glyph sticker on each marked face, place it against a randomized background, and orbit a camera across full azimuth and a 5 to 85 degree elevation range, exact label per render. With a --fake flag it renders seal-script look-alikes as explicit negatives.",
    "Every crop becomes a feature vector from a frozen, pretrained DINOv2 vision transformer, no fine-tuning, pure feature extraction. Embeddings are L2-normalized so a dot product doubles as cosine similarity, used by every downstream stage. Locating the cube stays classical: Lab-chroma colour segmentation, morphological cleanup, geometry filters, deliberately not learned.",
    "A synthetic-only kNN baseline exposes the sim-to-real gap: 63.8% on synthetic test images, only 51.7% on real photos. Few-shot enrollment closes it: a handful of real photos per (colour, sign) cell become references, kept separate from the synthetic gallery, lifting real-world accuracy to 82.3%. For real-vs-fake, swapping a single threshold for nearest-class voting between REAL and FAKE galleries was the biggest lever.",
    "The shipped classifier layers CORAL domain alignment, matching the synthetic embedding distribution to the real one, PCA down to 128 components, and a shrinkage-regularized LDA head, all a few NumPy arrays, no scikit-learn or PyTorch at inference. DINOv2 runs through ONNX for a 2 to 4x speed-up, cosine similarity above 0.999 versus the original. Deployment keeps video at full framerate via a producer/consumer split, with an IoU tracker skipping re-embedding on locked detections.",
  ],
  tradeoffs: [
    "The synthetic-only baseline's 51.7% real-world number, against a 63.8% synthetic ceiling, is a negative result: a good renderer alone doesn't close the sim-to-real gap, regardless of domain randomization. The fix that worked was cheap, a handful of enrolled real photos per class, not an expensive, photorealistic renderer, keeping real data a reference set, not a training set.",
    "Cube localization stayed classical: Lab-chroma segmentation and hand-tuned geometry filters, with no measured detection accuracy of its own, since every classification number assumes the block was already found. That is the honest weak point. Next: free synthetic bounding-box labels from the same Blender scene, training a small detector the sim-to-real way.",
  ],
  result: [
    "On a held-out set of 147 real and 155 fake photos, leakage-free between enrollment and test, switching real-vs-fake from a single threshold to nearest-class voting between real and fake galleries raised accuracy from 77.8% to 92.7% (89.1% true-positive, 96.1% true-negative). That clean before/after is the number the project treats as most defensible, since it doesn't stack CORAL, PCA, LDA, and enrollment.",
    "For the harder 15-way sign identification, accuracy moved from 51.7% (synthetic gallery only) to 82.3% with real references enrolled, and to 98.0% once the CORAL-aligned, PCA-reduced, shrinkage-LDA head was fit on the same frozen DINOv2 features, versus an 82.3% kNN baseline: per-sign accuracy from 90.0% worst case to 98.1% mean, real-vs-fake reaching 93.0%. Through ONNX it runs live off a webcam or Jetson RealSense at full framerate.",
  ],
};
