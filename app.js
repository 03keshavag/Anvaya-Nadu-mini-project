import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {
  DESTINATIONS,
  MONUMENTS,
  getDestination,
  getMonument,
  getMonumentsForDestination,
  getAllAvailableMonuments
} from './catalog.js';

// ============================================================================
// 1. THREE.JS 3D VIEWPORT STATE & ENGINE
// ============================================================================
let scene = null;
let camera = null;
let renderer = null;
let controls = null;
let currentModel = null;
let currentGround = null;
let initialCameraState = null;
let isResetting = false;
let resetStartTime = 0;
const RESET_DURATION = 650;
const resetStartPos = new THREE.Vector3();
const resetStartTarget = new THREE.Vector3();
let animationFrameId = null;
let activeLoadedPath = null;

const canvas = document.getElementById('webgl-canvas');
const viewportContainer = document.getElementById('canvas-viewport');

function initThreeEngine() {
  if (renderer || !canvas || !viewportContainer) return;

  scene = new THREE.Scene();

  const width = viewportContainer.clientWidth || 800;
  const height = viewportContainer.clientHeight || 600;

  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = true;
  controls.minPolarAngle = 0;
  controls.maxPolarAngle = Math.PI;
  controls.autoRotate = false;
  controls.autoRotateSpeed = 1.2;

  controls.addEventListener('start', () => {
    isResetting = false;
    if (controls.autoRotate) setAutoRotate(false);
  });

  // Lighting matching warm ivory courtyard environment
  const hemiLight = new THREE.HemisphereLight(0xfff7ee, 0xd0c2aa, 1.4);
  hemiLight.position.set(0, 50, 0);
  scene.add(hemiLight);

  const ambientLight = new THREE.AmbientLight(0xfffaf0, 0.6);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffeed6, 2.6);
  keyLight.name = 'keyLight';
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 2048;
  keyLight.shadow.mapSize.height = 2048;
  keyLight.shadow.bias = -0.0003;
  keyLight.shadow.normalBias = 0.02;
  keyLight.shadow.radius = 2;
  scene.add(keyLight);
  scene.add(keyLight.target);

  const fillLight = new THREE.DirectionalLight(0xdbe6f0, 0.9);
  fillLight.name = 'fillLight';
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0xffebd2, 0.8);
  rimLight.name = 'rimLight';
  scene.add(rimLight);

  window.addEventListener('resize', handleCanvasResize);

  animate();
}

function handleCanvasResize() {
  if (!viewportContainer || !camera || !renderer) return;
  const width = viewportContainer.clientWidth;
  const height = viewportContainer.clientHeight;
  if (width === 0 || height === 0) return;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

function animate(currentTime = performance.now()) {
  animationFrameId = requestAnimationFrame(animate);

  if (isResetting && initialCameraState) {
    const elapsed = currentTime - resetStartTime;
    const progress = Math.min(elapsed / RESET_DURATION, 1.0);
    const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;

    camera.position.lerpVectors(resetStartPos, initialCameraState.position, ease);
    controls.target.lerpVectors(resetStartTarget, initialCameraState.target, ease);

    if (progress >= 1.0) {
      isResetting = false;
      camera.position.copy(initialCameraState.position);
      controls.target.copy(initialCameraState.target);
    }
  }

  controls.update();
  renderer.render(scene, camera);
}

function setAutoRotate(active) {
  if (!controls) return;
  controls.autoRotate = active;
  const btn = document.getElementById('btn-auto-rotate');
  if (btn) {
    if (active) btn.classList.add('active');
    else btn.classList.remove('active');
  }
}

function disposeMaterial(mat) {
  if (!mat) return;
  const textureKeys = [
    'map', 'roughnessMap', 'metalnessMap', 'normalMap', 'bumpMap',
    'aoMap', 'displacementMap', 'emissiveMap', 'lightMap', 'alphaMap', 'envMap'
  ];
  for (const key of textureKeys) {
    if (mat[key] && typeof mat[key].dispose === 'function') {
      mat[key].dispose();
    }
  }
  mat.dispose();
}

function clearCurrentSceneModel() {
  if (currentModel && scene) {
    scene.remove(currentModel);
    currentModel.traverse((child) => {
      if (child.isMesh) {
        if (child.geometry) child.geometry.dispose();
        if (Array.isArray(child.material)) child.material.forEach(disposeMaterial);
        else if (child.material) disposeMaterial(child.material);
      }
    });
    currentModel = null;
  }

  if (currentGround && scene) {
    scene.remove(currentGround);
    if (currentGround.geometry) currentGround.geometry.dispose();
    if (currentGround.material) currentGround.material.dispose();
    currentGround = null;
  }

  initialCameraState = null;
  isResetting = false;
  setAutoRotate(false);
  activeLoadedPath = null;
}

function loadModelAsset(modelAssetPath, monumentName) {
  initThreeEngine();

  if (activeLoadedPath === modelAssetPath) {
    return; // Already loaded
  }

  clearCurrentSceneModel();
  activeLoadedPath = modelAssetPath;

  const loadingOverlay = document.getElementById('viewer-loading-overlay');
  const loadingMsg = document.getElementById('viewer-loading-msg');
  const errorOverlay = document.getElementById('viewer-error-overlay');
  const errorMsg = document.getElementById('viewer-error-msg');

  if (loadingOverlay) loadingOverlay.classList.remove('hidden');
  if (errorOverlay) errorOverlay.classList.add('hidden');
  if (loadingMsg) loadingMsg.textContent = `Loading ${monumentName}...`;

  handleCanvasResize();

  const loader = new GLTFLoader();
  loader.load(
    modelAssetPath,
    (gltf) => {
      if (activeLoadedPath !== modelAssetPath) {
        // Discard if user navigated away during download
        gltf.scene.traverse((c) => {
          if (c.isMesh) {
            if (c.geometry) c.geometry.dispose();
            if (c.material) disposeMaterial(c.material);
          }
        });
        return;
      }

      const model = gltf.scene;
      currentModel = model;

      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      scene.add(model);
      model.updateMatrixWorld(true);

      // Center geometry around scene origin (0, 0, 0)
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.x -= center.x;
      model.position.y -= center.y;
      model.position.z -= center.z;
      model.updateMatrixWorld(true);

      const centeredBox = new THREE.Box3().setFromObject(model);
      const sphere = centeredBox.getBoundingSphere(new THREE.Sphere());
      const radius = sphere.radius;

      // Fit distance
      const fovInRad = (camera.fov * Math.PI) / 180;
      const aspect = (viewportContainer.clientWidth || 800) / (viewportContainer.clientHeight || 600);
      const hFov = 2 * Math.atan(Math.tan(fovInRad / 2) * aspect);
      const effectiveFov = Math.min(fovInRad, hFov);
      const fitDistance = (radius / Math.sin(effectiveFov / 2)) * 0.95;

      // Adjust dynamic light positions based on model scale
      const keyLight = scene.getObjectByName('keyLight');
      const fillLight = scene.getObjectByName('fillLight');
      const rimLight = scene.getObjectByName('rimLight');

      if (keyLight) {
        keyLight.position.set(fitDistance * 0.8, fitDistance * 1.2, fitDistance * 0.8);
        keyLight.target.position.set(0, 0, 0);
        const shadowBound = radius * 1.35;
        keyLight.shadow.camera.left = -shadowBound;
        keyLight.shadow.camera.right = shadowBound;
        keyLight.shadow.camera.top = shadowBound;
        keyLight.shadow.camera.bottom = -shadowBound;
        keyLight.shadow.camera.near = 0.1;
        keyLight.shadow.camera.far = fitDistance * 4;
        keyLight.shadow.camera.updateProjectionMatrix();
      }

      if (fillLight) fillLight.position.set(-fitDistance * 0.8, fitDistance * 0.6, -fitDistance * 0.7);
      if (rimLight) rimLight.position.set(0, fitDistance * 0.8, -fitDistance * 1.0);

      // Shadow receiver ground plane with subtle stone tone
      const groundY = centeredBox.min.y - 0.001;
      const groundGeo = new THREE.PlaneGeometry(radius * 12, radius * 12);
      const groundMat = new THREE.ShadowMaterial({ opacity: 0.28, transparent: true });
      currentGround = new THREE.Mesh(groundGeo, groundMat);
      currentGround.rotation.x = -Math.PI / 2;
      currentGround.position.y = groundY;
      currentGround.receiveShadow = true;
      scene.add(currentGround);

      camera.near = Math.max(0.01, fitDistance / 100);
      camera.far = fitDistance * 100;
      camera.updateProjectionMatrix();

      const viewDir = new THREE.Vector3(1.0, 0.52, 1.0).normalize();
      const initialPos = viewDir.multiplyScalar(fitDistance);
      camera.position.copy(initialPos);

      controls.target.set(0, 0, 0);
      controls.minDistance = radius * 0.2;
      controls.maxDistance = fitDistance * 6;
      controls.update();

      initialCameraState = {
        position: initialPos.clone(),
        target: new THREE.Vector3(0, 0, 0)
      };

      if (loadingOverlay) loadingOverlay.classList.add('hidden');
    },
    (xhr) => {
      if (xhr.lengthComputable && xhr.total > 0 && loadingMsg) {
        const pct = Math.round((xhr.loaded / xhr.total) * 100);
        loadingMsg.textContent = `Loading ${monumentName}... ${pct}%`;
      }
    },
    (err) => {
      console.error('Error loading GLB:', err);
      if (loadingOverlay) loadingOverlay.classList.add('hidden');
      if (errorOverlay) errorOverlay.classList.remove('hidden');
      if (errorMsg) errorMsg.textContent = err?.message || `Unable to load 3D file for ${monumentName}.`;
    }
  );
}

// 3D Viewer Toolbar Event Listeners
const btnResetView = document.getElementById('btn-reset-view');
if (btnResetView) {
  btnResetView.addEventListener('click', () => {
    if (!initialCameraState || !controls) return;
    if (controls.autoRotate) setAutoRotate(false);
    isResetting = true;
    resetStartTime = performance.now();
    resetStartPos.copy(camera.position);
    resetStartTarget.copy(controls.target);
  });
}

const btnAutoRotate = document.getElementById('btn-auto-rotate');
if (btnAutoRotate) {
  btnAutoRotate.addEventListener('click', () => {
    if (!controls) return;
    setAutoRotate(!controls.autoRotate);
  });
}

const btnFullscreen = document.getElementById('btn-fullscreen');
if (btnFullscreen) {
  btnFullscreen.addEventListener('click', () => {
    if (!viewportContainer) return;
    if (!document.fullscreenElement) {
      viewportContainer.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen().catch(console.error);
    }
  });
}

const viewerRetryBtn = document.getElementById('viewer-retry-btn');
if (viewerRetryBtn) {
  viewerRetryBtn.addEventListener('click', () => {
    if (activeLoadedPath) {
      loadModelAsset(activeLoadedPath, 'Monument');
    }
  });
}

// Global Keyboard Shortcuts
window.addEventListener('keydown', (e) => {
  if (e.key === 'r' || e.key === 'R') {
    if (btnResetView) btnResetView.click();
  } else if (e.key === ' ' || e.code === 'Space') {
    if (btnAutoRotate && document.activeElement.tagName !== 'INPUT') {
      e.preventDefault();
      btnAutoRotate.click();
    }
  } else if (e.key === 'Escape') {
    const modal = document.getElementById('info-modal');
    if (modal && !modal.classList.contains('hidden')) {
      modal.classList.add('hidden');
    }
  }
});

// ============================================================================
// 2. CLIENT-SIDE ROUTER & VIEW CONTROLLERS
// ============================================================================
const views = {
  home: document.getElementById('view-home'),
  explore: document.getElementById('view-explore'),
  world: document.getElementById('view-3d-world'),
  destination: document.getElementById('view-destination'),
  monument: document.getElementById('view-monument'),
  module: document.getElementById('view-module')
};

const siteHeader = document.getElementById('site-header');

function switchActiveView(viewName) {
  Object.keys(views).forEach((key) => {
    const el = views[key];
    if (!el) return;
    if (key === viewName) {
      el.classList.remove('hidden');
    } else {
      el.classList.add('hidden');
    }
  });

  // Dynamic header appearance
  if (viewName === 'home') {
    if (siteHeader) siteHeader.classList.add('hero-transparent');
  } else {
    if (siteHeader) siteHeader.classList.remove('hero-transparent');
  }

  // Update navigation highlighting
  document.querySelectorAll('.nav-item').forEach((item) => {
    const target = item.getAttribute('data-nav');
    if (target === viewName) item.classList.add('active');
    else item.classList.remove('active');
  });

  window.scrollTo({ top: 0, behavior: 'instant' });
}

function handleRoute() {
  const hash = window.location.hash || '#/';
  const cleanPath = hash.replace(/^#\/?/, '').replace(/\/$/, '');
  const segments = cleanPath.split('/').filter(Boolean);

  if (segments.length === 0) {
    // #/ -> Home
    renderHomeView();
  } else if (segments[0] === 'explore') {
    // #/explore -> Heritage Destination Index
    renderExploreView();
  } else if (segments[0] === '3d-world') {
    if (segments.length === 1) {
      // #/3d-world -> Main 3D World Catalogue
      render3DWorldView();
    } else if (segments.length === 2) {
      // #/3d-world/:destination
      renderDestinationView(segments[1]);
    } else if (segments.length === 3) {
      // #/3d-world/:destination/:monument
      renderMonumentView(segments[1], segments[2]);
    } else {
      render3DWorldView();
    }
  } else if (segments[0] === 'modules') {
    renderModuleView(segments[1] || 'overview');
  } else {
    // Fallback
    renderHomeView();
  }
}

// Window Navigation Listeners
window.addEventListener('hashchange', handleRoute);
window.addEventListener('DOMContentLoaded', handleRoute);

// Back Button Navigation Helper
function navigateBack(fallbackRoute = '#/3d-world') {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.hash = fallbackRoute;
  }
}

// ============================================================================
// 3. VIEW: HOME VIEW (#/)
// ============================================================================
function renderHomeView() {
  switchActiveView('home');

  // Video autoplay ensure
  const heroVideo = document.getElementById('hero-video');
  if (heroVideo && heroVideo.paused) {
    heroVideo.play().catch(() => {
      console.log('Video autoplay restrained by browser policy.');
    });
  }
}

// Header scroll behavior for homepage
window.addEventListener('scroll', () => {
  const hash = window.location.hash || '#/';
  if (hash === '#/' || hash === '#' || hash === '') {
    if (window.scrollY > 80) {
      if (siteHeader) siteHeader.classList.remove('hero-transparent');
    } else {
      if (siteHeader) siteHeader.classList.add('hero-transparent');
    }
  }
});

// ============================================================================
// 4. VIEW: HERITAGE DESTINATION INDEX (#/explore)
// ============================================================================
let currentExploreRegion = 'all';
let currentExploreSearch = '';

function renderExploreView() {
  switchActiveView('explore');
  filterAndRenderExploreDestinations();
}

function filterAndRenderExploreDestinations() {
  const grid = document.getElementById('explore-destinations-grid');
  if (!grid) return;

  const q = currentExploreSearch.toLowerCase().trim();

  const filtered = DESTINATIONS.filter((d) => {
    // Region match
    const matchRegion = currentExploreRegion === 'all' || d.region === currentExploreRegion;

    // Search query match (name, kannadaName, district, tradition, or stone)
    const matchQuery = !q ||
      d.name.toLowerCase().includes(q) ||
      d.kannadaName.includes(q) ||
      d.district.toLowerCase().includes(q) ||
      d.traditionName.toLowerCase().includes(q) ||
      d.stone.toLowerCase().includes(q);

    return matchRegion && matchQuery;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state-box">
        <h3 class="empty-state-title">No Heritage Destinations Found</h3>
        <p class="empty-state-desc">No destinations match "${currentExploreSearch}". Try selecting "All Regions" or clearing your search term.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map((d) => {
    const destMonuments = getMonumentsForDestination(d.slug);
    const availableCount = destMonuments.filter(m => m.modelStatus === 'available').length;

    return `
      <article class="dest-card">
        <div class="dest-card-media">
          <img src="${d.thumbnail}" alt="${d.name}" class="dest-card-img" loading="lazy">
          ${d.unesco ? `
            <div class="dest-card-overlay-badge">
              <span class="tag-pill tag-terracotta">UNESCO WORLD HERITAGE</span>
            </div>
          ` : ''}
        </div>
        <div class="dest-card-body">
          <span class="dest-card-tradition">${d.traditionName} • ${d.period}</span>
          <h3 class="dest-card-title">${d.name} <span class="dest-card-kannada">${d.kannadaName}</span></h3>
          <p class="dest-card-desc">${d.description}</p>
          <div class="dest-card-footer">
            <span>${d.district} District • ${d.stone}</span>
            <a href="#/3d-world/${d.slug}" class="btn btn-sm btn-outline">
              Explore ${availableCount > 0 ? `(${availableCount} 3D)` : ''} &rarr;
            </a>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// Search and Filter Listeners for Explore
const exploreSearchInput = document.getElementById('explore-search-input');
if (exploreSearchInput) {
  exploreSearchInput.addEventListener('input', (e) => {
    currentExploreSearch = e.target.value;
    filterAndRenderExploreDestinations();
  });
}

document.querySelectorAll('#explore-region-filters .filter-pill').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#explore-region-filters .filter-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentExploreRegion = btn.getAttribute('data-region') || 'all';
    filterAndRenderExploreDestinations();
  });
});

// ============================================================================
// 5. VIEW: MAIN 3D HERITAGE WORLD (#/3d-world)
// ============================================================================
let currentWorldAvailability = 'all';
let currentWorldSearch = '';

function render3DWorldView() {
  switchActiveView('world');
  filterAndRender3DMonuments();
}

function filterAndRender3DMonuments() {
  const grid = document.getElementById('world-monuments-grid');
  if (!grid) return;

  const q = currentWorldSearch.toLowerCase().trim();

  const filtered = MONUMENTS.filter((m) => {
    // Availability
    const matchAvail = currentWorldAvailability === 'all' || m.modelStatus === currentWorldAvailability;

    // Search query
    const matchQuery = !q ||
      m.name.toLowerCase().includes(q) ||
      m.kannadaName.includes(q) ||
      m.destinationName.toLowerCase().includes(q) ||
      m.category.toLowerCase().includes(q);

    return matchAvail && matchQuery;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state-box">
        <h3 class="empty-state-title">No Monuments Found</h3>
        <p class="empty-state-desc">No monuments matched your current filter criteria.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map((m) => {
    const isAvail = m.modelStatus === 'available';

    return `
      <article class="monument-card">
        <div class="monument-card-media">
          <img src="${m.thumbnail}" alt="${m.name}" class="monument-card-img" loading="lazy">
          <div class="monument-card-badge">
            <span class="${isAvail ? 'badge-available' : 'badge-coming-soon'}">
              ${isAvail ? '3D AVAILABLE' : 'IN ARCHIVAL PROGRESS'}
            </span>
          </div>
        </div>
        <div class="monument-card-body">
          <span class="monument-card-dest">${m.destinationName} • ${m.category}</span>
          <h3 class="monument-card-title">${m.name}</h3>
          <p class="monument-card-desc">${m.description}</p>
          <div class="monument-card-footer">
            <span style="font-size: 0.8rem; color: var(--color-muted-grey);">${m.tradition}</span>
            ${isAvail ? `
              <a href="#/3d-world/${m.destinationSlug}/${m.slug}" class="btn btn-sm btn-terracotta">
                Inspect 3D &rarr;
              </a>
            ` : `
              <button class="btn btn-sm btn-stone" data-modal-monument="${m.name}" data-modal-slug="${m.slug}">
                Archival Details
              </button>
            `}
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Attach modal trigger listeners
  grid.querySelectorAll('[data-modal-monument]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-modal-monument');
      const slug = btn.getAttribute('data-modal-slug');
      openArchivalModal(name, slug);
    });
  });
}

// Search and Filter Listeners for 3D World
const worldSearchInput = document.getElementById('world-search-input');
if (worldSearchInput) {
  worldSearchInput.addEventListener('input', (e) => {
    currentWorldSearch = e.target.value;
    filterAndRender3DMonuments();
  });
}

document.querySelectorAll('#world-availability-filters .filter-pill').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#world-availability-filters .filter-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentWorldAvailability = btn.getAttribute('data-availability') || 'all';
    filterAndRender3DMonuments();
  });
});

// ============================================================================
// 6. VIEW: DESTINATION-SPECIFIC PAGE (#/3d-world/:destination)
// ============================================================================
function renderDestinationView(destSlug) {
  const dest = getDestination(destSlug);
  if (!dest) {
    window.location.hash = '#/3d-world';
    return;
  }

  switchActiveView('destination');

  // Breadcrumbs
  const breadcrumbCurrent = document.getElementById('dest-breadcrumb-name');
  if (breadcrumbCurrent) breadcrumbCurrent.textContent = dest.name;

  // Hero fields
  const titleEl = document.getElementById('dest-page-title');
  const kannadaEl = document.getElementById('dest-page-kannada');
  const traditionEl = document.getElementById('dest-page-tradition');
  const descEl = document.getElementById('dest-page-desc');
  const districtEl = document.getElementById('dest-page-district');
  const stoneEl = document.getElementById('dest-page-stone');
  const imgEl = document.getElementById('dest-page-img');

  if (titleEl) titleEl.childNodes[0].nodeValue = `${dest.name} `;
  if (kannadaEl) kannadaEl.textContent = dest.kannadaName;
  if (traditionEl) traditionEl.textContent = `${dest.traditionName} • ${dest.period}`;
  if (descEl) descEl.textContent = dest.description;
  if (districtEl) districtEl.textContent = `${dest.district} District`;
  if (stoneEl) stoneEl.textContent = dest.stone;
  if (imgEl) imgEl.src = dest.thumbnail;

  // Monuments grid for this destination
  const destMonuments = getMonumentsForDestination(destSlug);
  const grid = document.getElementById('dest-monuments-grid');
  if (!grid) return;

  grid.innerHTML = destMonuments.map((m) => {
    const isAvail = m.modelStatus === 'available';

    return `
      <article class="monument-card">
        <div class="monument-card-media">
          <img src="${m.thumbnail}" alt="${m.name}" class="monument-card-img">
          <div class="monument-card-badge">
            <span class="${isAvail ? 'badge-available' : 'badge-coming-soon'}">
              ${isAvail ? '3D AVAILABLE' : 'IN ARCHIVAL PROGRESS'}
            </span>
          </div>
        </div>
        <div class="monument-card-body">
          <span class="monument-card-dest">${m.category}</span>
          <h3 class="monument-card-title">${m.name}</h3>
          <p class="monument-card-desc">${m.description}</p>
          <div class="monument-card-footer">
            <span style="font-size: 0.8rem; color: var(--color-muted-grey);">${m.period}</span>
            ${isAvail ? `
              <a href="#/3d-world/${m.destinationSlug}/${m.slug}" class="btn btn-sm btn-terracotta">
                Inspect 3D &rarr;
              </a>
            ` : `
              <button class="btn btn-sm btn-stone" data-modal-monument="${m.name}" data-modal-slug="${m.slug}">
                Archival Details
              </button>
            `}
          </div>
        </div>
      </article>
    `;
  }).join('');

  grid.querySelectorAll('[data-modal-monument]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-modal-monument');
      const slug = btn.getAttribute('data-modal-slug');
      openArchivalModal(name, slug);
    });
  });
}

// ============================================================================
// 7. VIEW: INDIVIDUAL MONUMENT & 3D MODEL PAGE (#/3d-world/:destination/:monument)
// ============================================================================
function renderMonumentView(destSlug, monumentSlug) {
  const dest = getDestination(destSlug);
  const monument = getMonument(destSlug, monumentSlug);

  if (!dest || !monument) {
    window.location.hash = `#/3d-world/${destSlug || ''}`;
    return;
  }

  switchActiveView('monument');

  // Breadcrumbs
  const breadcrumbDest = document.getElementById('monument-breadcrumb-dest');
  const breadcrumbName = document.getElementById('monument-breadcrumb-name');
  if (breadcrumbDest) {
    breadcrumbDest.innerHTML = `<a href="#/3d-world/${dest.slug}">${dest.name}</a>`;
  }
  if (breadcrumbName) {
    breadcrumbName.textContent = monument.name;
  }

  // Back button functionality
  const backBtn = document.getElementById('monument-back-btn');
  if (backBtn) {
    backBtn.onclick = () => navigateBack(`#/3d-world/${dest.slug}`);
  }

  const unavailBackBtn = document.getElementById('unavailable-back-btn');
  if (unavailBackBtn) {
    unavailBackBtn.onclick = () => navigateBack(`#/3d-world/${dest.slug}`);
  }

  // Header metadata
  const titleEl = document.getElementById('monument-page-title');
  const kannadaEl = document.getElementById('monument-page-kannada');
  const categoryEl = document.getElementById('monument-page-category');
  const metaEl = document.getElementById('monument-page-meta');

  if (titleEl) titleEl.childNodes[0].nodeValue = `${monument.name} `;
  if (kannadaEl) kannadaEl.textContent = monument.kannadaName;
  if (categoryEl) categoryEl.textContent = monument.category;
  if (metaEl) metaEl.textContent = `${dest.name} (${dest.district} District) • ${monument.tradition} • ${monument.period}`;

  const container3D = document.getElementById('monument-3d-container');
  const containerUnavailable = document.getElementById('monument-unavailable-container');

  if (monument.modelStatus === 'available' && monument.modelAssetPath) {
    if (container3D) container3D.classList.remove('hidden');
    if (containerUnavailable) containerUnavailable.classList.add('hidden');

    // Populate anatomical drawer
    const anatomyDesc = document.getElementById('monument-anatomy-desc');
    const anatomyPoints = document.getElementById('monument-anatomy-points');
    if (anatomyDesc) anatomyDesc.textContent = monument.description;
    if (anatomyPoints && monument.points) {
      anatomyPoints.innerHTML = monument.points.map(p => `
        <div class="anatomy-point-card">
          <h5>${p.title}</h5>
          <p>${p.text}</p>
        </div>
      `).join('');
    }

    // Launch Three.js Model
    loadModelAsset(monument.modelAssetPath, monument.name);
  } else {
    // Missing model fallback
    clearCurrentSceneModel();
    if (container3D) container3D.classList.add('hidden');
    if (containerUnavailable) containerUnavailable.classList.remove('hidden');

    const unavailDesc = document.getElementById('monument-unavailable-desc');
    if (unavailDesc) {
      unavailDesc.textContent = `The digital 3D model for ${monument.name} is currently in archival preparation. Once the authentic .glb file is captured, it will be rendered here with full orbit and daylight inspection controls.`;
    }
  }
}

// ============================================================================
// 8. VIEW: FUTURE TEAMMATE MODULE INTEGRATION VIEW (#/modules/:name)
// ============================================================================
function renderModuleView(moduleKey) {
  clearCurrentSceneModel();
  switchActiveView('module');

  const titleEl = document.getElementById('module-integration-title');
  const descEl = document.getElementById('module-integration-desc');

  const moduleMeta = {
    stories: {
      title: 'Historical & Documentary Timelines',
      desc: 'This module is reserved for our teammate’s upcoming historical chronicles, in-depth architectural essays on chloritic schist and granite masonry, and chronological timeline experiences.'
    },
    roadmap: {
      title: 'AI Heritage Travel Roadmap',
      desc: 'This module is reserved for our teammate’s upcoming AI travel planning engine, featuring origin routing, day-wise expedition itineraries, photography golden-hour windows, and transit calculations.'
    },
    budget: {
      title: 'Expedition Budget Planning',
      desc: 'This module is reserved for our teammate’s upcoming budget calculator, offering transparent cost estimates, travel tiers (Backpacker to Luxury), and printable bilingual expedition itineraries.'
    },
    overview: {
      title: 'Platform Architecture & Modular Expansion',
      desc: 'The current scope focuses exclusively on the core 3D Virtual Heritage Explorer and Heritage Index. Specialized travel and documentary modules are being authored by our teammates.'
    }
  };

  const meta = moduleMeta[moduleKey] || moduleMeta.overview;
  if (titleEl) titleEl.textContent = meta.title;
  if (descEl) descEl.textContent = meta.desc;
}

// ============================================================================
// 9. ARCHIVAL INFO MODAL
// ============================================================================
const infoModal = document.getElementById('info-modal');
const infoModalTitle = document.getElementById('info-modal-title');
const infoModalText = document.getElementById('info-modal-text');
const infoModalCloseBtn = document.getElementById('info-modal-close-btn');

function openArchivalModal(monumentName, slug) {
  if (!infoModal) return;
  if (infoModalTitle) infoModalTitle.textContent = `${monumentName} — 3D Expansion`;
  if (infoModalText) {
    infoModalText.innerHTML = `
      The architectural 3D model for <strong>${monumentName}</strong> is in archival preparation.<br><br>
      To link an authentic 3D asset for this monument, simply place the corresponding <code>.glb</code> file in the project folder and update its path in <code>catalog.js</code>.
    `;
  }
  infoModal.classList.remove('hidden');
}

if (infoModalCloseBtn) {
  infoModalCloseBtn.addEventListener('click', () => {
    if (infoModal) infoModal.classList.add('hidden');
  });
}

if (infoModal) {
  infoModal.addEventListener('click', (e) => {
    if (e.target === infoModal) {
      infoModal.classList.add('hidden');
    }
  });
}

// ============================================================================
// 10. EXPOSE GLOBALS FOR AUTOMATED CDP TESTING & VERIFICATION
// ============================================================================
window.DESTINATIONS = DESTINATIONS;
window.MONUMENTS = MONUMENTS;
window.getActiveLoadedPath = () => activeLoadedPath;
window.getCurrentModel = () => currentModel;
window.navigateBack = navigateBack;
