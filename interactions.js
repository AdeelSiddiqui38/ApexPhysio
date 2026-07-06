// Three.js Hero Section 3D Model Setup
let heroScene, heroCamera, heroRenderer, heroModel;
const heroCanvas = document.getElementById('canvas');

function initHeroScene() {
  // Scene setup
  heroScene = new THREE.Scene();
  heroScene.background = new THREE.Color(0x0a0e27);
  
  // Camera setup
  heroCamera = new THREE.PerspectiveCamera(75, heroCanvas.clientWidth / heroCanvas.clientHeight, 0.1, 1000);
  heroCamera.position.z = 3;
  
  // Renderer setup
  heroRenderer = new THREE.WebGLRenderer({ canvas: heroCanvas, antialias: true, alpha: true });
  heroRenderer.setSize(heroCanvas.clientWidth, heroCanvas.clientHeight);
  heroRenderer.setPixelRatio(window.devicePixelRatio);
  heroRenderer.shadowMap.enabled = true;
  heroRenderer.shadowMap.type = THREE.PCFShadowShadowMap;
  
  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  heroScene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0x0066ff, 1);
  directionalLight.position.set(5, 5, 5);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  heroScene.add(directionalLight);
  
  const pointLight = new THREE.PointLight(0x00d4ff, 0.8);
  pointLight.position.set(-5, 3, 3);
  heroScene.add(pointLight);
  
  // Create 3D Body Model (stylized)
  createBodyModel();
  
  // Mouse movement for dynamic lighting
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    directionalLight.position.x = x * 8;
    directionalLight.position.y = y * 8 + 5;
  });
  
  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    
    if (heroModel) {
      heroModel.rotation.y += 0.004;
      heroModel.position.y = Math.sin(Date.now() * 0.0005) * 0.3;
    }
    
    heroRenderer.render(heroScene, heroCamera);
  }
  animate();
  
  // Handle resize
  window.addEventListener('resize', () => {
    const width = heroCanvas.clientWidth;
    const height = heroCanvas.clientHeight;
    heroCamera.aspect = width / height;
    heroCamera.updateProjectionMatrix();
    heroRenderer.setSize(width, height);
  });
}

function createBodyModel() {
  const group = new THREE.Group();
  
  // Head
  const headGeom = new THREE.SphereGeometry(0.3, 32, 32);
  const headMat = new THREE.MeshStandardMaterial({ color: 0xe8c4a0, roughness: 0.5, metalness: 0.1 });
  const head = new THREE.Mesh(headGeom, headMat);
  head.position.y = 1.5;
  head.castShadow = true;
  group.add(head);
  
  // Body/Torso
  const torsoGeom = new THREE.CylinderGeometry(0.25, 0.25, 0.8, 16, 32);
  const torsoMat = new THREE.MeshStandardMaterial({ color: 0xff6b6b, roughness: 0.6, metalness: 0.05 });
  const torso = new THREE.Mesh(torsoGeom, torsoMat);
  torso.castShadow = true;
  group.add(torso);
  
  // Left Arm
  const armGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.8, 16, 32);
  const armMat = new THREE.MeshStandardMaterial({ color: 0xe8c4a0, roughness: 0.5 });
  
  const leftArm = new THREE.Mesh(armGeom, armMat);
  leftArm.position.x = -0.5;
  leftArm.position.y = 0.5;
  leftArm.rotation.z = 0.3;
  leftArm.castShadow = true;
  group.add(leftArm);
  
  // Right Arm
  const rightArm = new THREE.Mesh(armGeom, armMat);
  rightArm.position.x = 0.5;
  rightArm.position.y = 0.5;
  rightArm.rotation.z = -0.3;
  rightArm.castShadow = true;
  group.add(rightArm);
  
  // Left Leg
  const legGeom = new THREE.CylinderGeometry(0.13, 0.13, 1, 16, 32);
  const legMat = new THREE.MeshStandardMaterial({ color: 0xe8c4a0, roughness: 0.5 });
  
  const leftLeg = new THREE.Mesh(legGeom, legMat);
  leftLeg.position.x = -0.2;
  leftLeg.position.y = -0.9;
  leftLeg.castShadow = true;
  group.add(leftLeg);
  
  // Right Leg
  const rightLeg = new THREE.Mesh(legGeom, legMat);
  rightLeg.position.x = 0.2;
  rightLeg.position.y = -0.9;
  rightLeg.castShadow = true;
  group.add(rightLeg);
  
  // Add glow effect
  const glowGeom = new THREE.SphereGeometry(2.5, 32, 32);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0x0066ff,
    transparent: true,
    opacity: 0.1,
    side: THREE.BackSide
  });
  const glow = new THREE.Mesh(glowGeom, glowMat);
  group.add(glow);
  
  heroScene.add(group);
  heroModel = group;
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  item.querySelector('.faq-question').addEventListener('click', () => {
    faqItems.forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove('active');
      }
    });
    item.classList.toggle('active');
  });
});

// Body Part Selection with recommendations
let selectedBodyPart = null;

const bodyPartData = {
  neck: {
    title: 'Neck Pain',
    symptoms: 'Stiffness, headaches, reduced range of motion. Often caused by posture strain, whiplash, or disc issues.',
    treatments: ['Physiotherapy', 'Chiropractic', 'Massage Therapy']
  },
  shoulder: {
    title: 'Shoulder Pain',
    symptoms: 'Pain with overhead movement, weakness, clicking. Common causes: rotator cuff strain, frozen shoulder, impingement.',
    treatments: ['Physiotherapy', 'Shockwave Therapy', 'Sports Rehab']
  },
  back: {
    title: 'Back Pain',
    symptoms: 'Lower back ache, sciatica, muscle spasms. Often from disc herniation, poor posture, or lifting injuries.',
    treatments: ['Chiropractic', 'Physiotherapy', 'Kinesiology']
  },
  elbow: {
    title: 'Elbow Pain',
    symptoms: 'Pain with gripping, tenderness on the outer/inner elbow. Typically tennis or golfer\'s elbow.',
    treatments: ['Shockwave Therapy', 'Physiotherapy', 'Massage Therapy']
  },
  wrist: {
    title: 'Wrist Pain',
    symptoms: 'Numbness, tingling, weakness with gripping. Common causes: carpal tunnel, repetitive strain, sprains.',
    treatments: ['Physiotherapy', 'Workplace Injury Treatment']
  },
  hip: {
    title: 'Hip Pain',
    symptoms: 'Groin ache, pain when walking or sitting. Causes include bursitis, arthritis, and labral strain.',
    treatments: ['Physiotherapy', 'Kinesiology', 'Chronic Pain Management']
  },
  knee: {
    title: 'Knee Pain',
    symptoms: 'Swelling, instability, pain on stairs. Common: ACL/meniscus injuries, runner\'s knee, arthritis.',
    treatments: ['Sports Rehab', 'Physiotherapy', 'Shockwave Therapy']
  },
  ankle: {
    title: 'Ankle Pain',
    symptoms: 'Swelling, instability, pain with weight-bearing. Usually sprains, Achilles strain, or plantar fasciitis.',
    treatments: ['Physiotherapy', 'Sports Rehab', 'Massage Therapy']
  }
};

function selectBodyPart(part) {
  const buttons = document.querySelectorAll('.body-part-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  if (window.event && window.event.target) window.event.target.classList.add('active');
  selectedBodyPart = part;

  const data = bodyPartData[part];
  if (data) {
    document.getElementById('recTitle').textContent = data.title;
    document.getElementById('recSymptoms').textContent = data.symptoms;
    const tags = document.getElementById('recTags');
    tags.innerHTML = '';
    data.treatments.forEach(t => {
      const span = document.createElement('span');
      span.className = 'recommendation-tag';
      span.textContent = t;
      tags.appendChild(span);
    });
    document.getElementById('recommendationPanel').classList.add('visible');
  }
}

// Cinematic intro overlay
window.addEventListener('load', () => {
  setTimeout(() => {
    const overlay = document.getElementById('introOverlay');
    if (overlay) overlay.classList.add('hidden');
  }, 1600);
});

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initHeroScene);
