import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Model from "./model";

/*------------------------------
Renderer
------------------------------*/
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/*------------------------------
Scene & Camera
------------------------------*/
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);
camera.position.z = 6;
camera.position.y = 0;

/*------------------------------
Mesh
------------------------------*/
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
});
const cube = new THREE.Mesh(geometry, material);
//scene.add(cube);

/*------------------------------
OrbitControls
------------------------------*/
const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = false;

/*------------------------------
Helpers
------------------------------*/
// const gridHelper = new THREE.GridHelper(10, 10);
// scene.add(gridHelper);
// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

/*------------------------------
Models
------------------------------*/

const skull = new Model({
    name: "skull",
    file: "./models/skull.glb",
    scene: scene,
    color1: "red",
    color2: "yellow",
    background: "#47001b",
    titre: "Bienvenue sur mon portfolio",
    presentation : "Je suis Cadetto Cyril Developpeur Front End diplome en developpement web et web mobile.",
    prez: "",
    projet: "",
    placeOnLoad: true,
});

const cerveau = new Model({
    name: "cerveau",
    file: "./models/cerveau.glb",
    color1: "#007c04",
    color2: "#aefa00",
    background: "#041536",
    titre: "Mes competences",
    presentation : "J'ai appris les languages HTML, CSS, Js par le biais de ma formation.",
    prez: "j'apprends actuellement : THREE.js, React / Redux, Blender depuis environs 6 mois en autodidacte",
    projet: "",
    scene: scene,
});

const telephone = new Model({
    name: "telephone",
    file: "./models/ab.glb",
    color1: "#ffe100",
    color2: "#f4e04b",
    background: "#1f232a",
    titre: "Me contacter",
    presentation : "Je suis joignable sur cyril.cadetto@gmail.com ",
    prez: "par mobile au 06.58.68.09.22 et sur les reseaux ci-dessous ",
    projet: "Notre projet",
    scene: scene,
});
/*------------------------------
Controlleur
------------------------------*/
const bouton = document.querySelectorAll(".bouton");
bouton[0].addEventListener("click", () => {
    skull.add();
    cerveau.remove();
    telephone.remove();
});
bouton[1].addEventListener("click", () => {
    skull.remove();
    cerveau.add();
    telephone.remove();
});
bouton[2].addEventListener("click", () => {
    skull.remove();
    cerveau.remove();
    telephone.add();
});
/*------------------------------
Temps
------------------------------*/

const clock = new THREE.Clock();

/*------------------------------
Loop
------------------------------*/
const animate = function() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    if (skull.isActive) {
        skull.particlesMaterial.uniforms.uTime.value = clock.getElapsedTime();
    }
    if (cerveau.isActive) {
        cerveau.particlesMaterial.uniforms.uTime.value = clock.getElapsedTime();
    }
        if (telephone.isActive) {
        telephone.particlesMaterial.uniforms.uTime.value = clock.getElapsedTime();
    }
};
animate();

/*------------------------------
Resize
------------------------------*/
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onWindowResize, false);

/*------------------------------
Mouse mouve bloc
------------------------------*/
function onMouseMove(e) {
    const x = e.clientX;
    const y = e.clientY;

    gsap.to(scene.rotation, {
        y: gsap.utils.mapRange(0, window.innerHeight, -0.2, 0.2, x),
        x: gsap.utils.mapRange(0, window.innerWidth, -0.2, 0.2, y),
    });
}
window.addEventListener("mousemove", onMouseMove);