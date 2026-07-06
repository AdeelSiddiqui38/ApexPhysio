// Three.js Assessment Section 3D Anatomy Model
let assessmentScene, assessmentCamera, assessmentRenderer, anatomyModel;
const assessmentCanvas = document.getElementById('assessmentCanvas');

function initAssessmentScene() {
  // Scene setup
  assessmentScene = new THREE.Scene();
  assessmentScene.background = new THREE.Color(0x0f1535);
  
  // Camera setup
  assessmentCamera = new THREE.PerspectiveCamera(75, assessmentCanvas.clientWidth / assessmentCanvas.clientHeight, 0.1, 1000);
  assessmentCamera.position.z = 2.5;
  
  // Renderer setup
  assessmentRenderer = new THREE.WebGLRenderer({ canvas: assessmentCanvas, antialias: true, alpha: true });
  assessmentRenderer.setSize(assessmentCanvas.clientWidth, assessmentCanvas.clientHeight);
  assessmentRenderer.setPixelRatio(window.devicePixelRatio);
  assessmentRenderer.shadowMap.enabled = true;
  
  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  assessmentScene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0x00d4ff, 1);
  directionalLight.position.set(3, 4, 3);
  directionalLight.castShadow = true;
  assessmentScene.add(directionalLight);
  
  const spotLight = new THREE.SpotLight(0x0066ff, 1.5);
  spotLight.position.set(-3, 2, 3);
  assessmentScene.add(spotLight);
  
  // Create interactive anatomy model
  createAnatomyModel();
  
  // Mouse interaction for rotation
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  
  assessmentCanvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
  });
  
  assessmentCanvas.addEventListener('mousemove', (e) => {
    if (isDragging && anatomyModel) {
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;
      
      anatomyModel.rotation.y += deltaX * 0.01;
      anatomyModel.rotation.x += deltaY * 0.01;
      
      previousMousePosition = { x: e.clientX, y: e.clientY };
    }
  });
  
  assessmentCanvas.addEventListener('mouseup', () => {
    isDragging = false;
  });
  
  assessmentCanvas.addEventListener('mouseleave', () => {
    isDragging = false;
  });
  
  // Mouse wheel zoom
  assessmentCanvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    const zoomSpeed = 0.1;
    const direction = e.deltaY > 0 ? 1 : -1;
    assessmentCamera.position.z += direction * zoomSpeed;
    assessmentCamera.position.z = Math.max(1.5, Math.min(5, assessmentCamera.position.z));
  });
  
  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    
    if (anatomyModel && !isDragging) {
      anatomyModel.rotation.y += 0.002;
    }
    
    assessmentRenderer.render(assessmentScene, assessmentCamera);
  }
  animate();
  
  // Handle resize
  window.addEventListener('resize', () => {
    if (assessmentCanvas.parentElement) {
      const width = assessmentCanvas.clientWidth;
      const height = assessmentCanvas.clientHeight;
      assessmentCamera.aspect = width / height;
      assessmentCamera.updateProjectionMatrix();
      assessmentRenderer.setSize(width, height);
    }
  });
}

function createAnatomyModel() {
  const group = new THREE.Group();
  
  // Skeleton structure visualization
  const skeletonMat = new THREE.MeshStandardMaterial({
    color: 0xf5deb3,
    roughness: 0.7,
    metalness: 0.1,
    emissive: 0x333333
  });
  
  // Spine (central nervous system emphasis)
  const spineSegments = 7;
  for (let i = 0; i < spineSegments; i++) {
    const vertebraGeom = new THREE.BoxGeometry(0.2, 0.15, 0.25);
    const vertebra = new THREE.Mesh(vertebraGeom, skeletonMat);
    vertebra.position.y = 0.5 - (i * 0.15);
    vertebra.castShadow = true;
    group.add(vertebra);
  }
  
  // Pelvis structure
  const pelvisGeom = new THREE.BoxGeometry(0.5, 0.2, 0.3);
  const pelvis = new THREE.Mesh(pelvisGeom, skeletonMat);
  pelvis.position.y = -0.8;
  pelvis.castShadow = true;
  group.add(pelvis);
  
  // Ribcage
  for (let i = 0; i < 5; i++) {
    const ribGeom = new THREE.CylinderGeometry(0.05, 0.05, 0.5, 8, 8);
    const rib = new THREE.Mesh(ribGeom, skeletonMat);
    rib.position.y = 0.3 - (i * 0.12);
    rib.position.x = Math.sin(i * 0.5) * 0.15;
    rib.rotation.z = 0.3;
    rib.castShadow = true;
    group.add(rib);
  }
  
  // Shoulder joints
  const shoulderMat = new THREE.MeshStandardMaterial({
    color: 0xff6b6b,
    roughness: 0.6,
    metalness: 0.2,
    emissive: 0xff6b6b
  });
  
  const shoulderGeom = new THREE.SphereGeometry(0.12, 16, 16);
  const leftShoulder = new THREE.Mesh(shoulderGeom, shoulderMat);
  leftShoulder.position.set(-0.35, 0.6, 0);
  leftShoulder.castShadow = true;
  group.add(leftShoulder);
  
  const rightShoulder = new THREE.Mesh(shoulderGeom, shoulderMat);
  rightShoulder.position.set(0.35, 0.6, 0);
  rightShoulder.castShadow = true;
  group.add(rightShoulder);
  
  // Arms
  const armGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.7, 8, 8);
  
  const leftArmUpper = new THREE.Mesh(armGeom, skeletonMat);
  leftArmUpper.position.set(-0.35, 0.2, 0);
  leftArmUpper.castShadow = true;
  group.add(leftArmUpper);
  
  const rightArmUpper = new THREE.Mesh(armGeom, skeletonMat);
  rightArmUpper.position.set(0.35, 0.2, 0);
  rightArmUpper.castShadow = true;
  group.add(rightArmUpper);
  
  // Knees (injury-prone areas highlighted)
  const kneeGeom = new THREE.SphereGeometry(0.1, 16, 16);
  const kneeMat = new THREE.MeshStandardMaterial({
    color: 0xffa500,
    roughness: 0.5,
    metalness: 0.3,
    emissive: 0xff8800
  });
  
  const leftKnee = new THREE.Mesh(kneeGeom, kneeMat);
  leftKnee.position.set(-0.15, -0.5, 0);
  leftKnee.castShadow = true;
  group.add(leftKnee);
  
  const rightKnee = new THREE.Mesh(kneeGeom, kneeMat);
  rightKnee.position.set(0.15, -0.5, 0);
  rightKnee.castShadow = true;
  group.add(rightKnee);
  
  // Legs
  const legGeom = new THREE.CylinderGeometry(0.09, 0.09, 0.8, 8, 8);
  
  const leftLeg = new THREE.Mesh(legGeom, skeletonMat);
  leftLeg.position.set(-0.15, -1.2, 0);
  leftLeg.castShadow = true;
  group.add(leftLeg);
  
  const rightLeg = new THREE.Mesh(legGeom, skeletonMat);
  rightLeg.position.set(0.15, -1.2, 0);
  rightLeg.castShadow = true;
  group.add(rightLeg);
  
  // Add glowing aura
  const glowGeom = new THREE.SphereGeometry(2, 32, 32);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0x00d4ff,
    transparent: true,
    opacity: 0.05,
    side: THREE.BackSide
  });
  const glow = new THREE.Mesh(glowGeom, glowMat);
  group.add(glow);
  
  assessmentScene.add(group);
  anatomyModel = group;
  
  // Store body part meshes for interaction
  anatomyModel.bodyParts = {
    neck: group.children.filter(c => c.position.y > 0.4),
    shoulder: [leftShoulder, rightShoulder],
    back: group.children.filter(c => c.geometry instanceof THREE.BoxGeometry),
    knee: [leftKnee, rightKnee],
    hip: [pelvis],
    ankle: group.children.filter(c => c.position.y < -1.5)
  };
}

// Initialize assessment scene when ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAssessmentScene);
} else {
  initAssessmentScene();
}
