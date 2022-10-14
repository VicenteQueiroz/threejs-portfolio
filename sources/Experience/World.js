import * as THREE from "three";
import Experience from "./Experience.js";

export default class World {
  constructor(_options) {
    this.experience = new Experience();
    this.config = this.experience.config;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.geom = new THREE.PlaneGeometry(20, 20, 70, 70);
    this.signArray = Array.from(
      { length: this.geom.attributes.position.count },
      () => Math.random() - 0.5
    );

    this.resources.on("groupEnd", (_group) => {
      if (_group.name === "base") {
        this.createSea();
      }
    });
  }

  createSea() {
    this.sea = new THREE.Mesh(
      this.geom,
      new THREE.MeshPhongMaterial({
        color: "#68aec3", //"#68C3C0",
        transparent: true,
        opacity: 0.6,
        shading: THREE.FlatShading,
      })
    );
    this.scene.add(this.sea);
  }

  resize() {}

  update() {
    for (let i = 0; i < this.geom.attributes.position.count; i++) {
      let previousH = this.geom.attributes.position.getZ(i);
      let sign = this.signArray[i] > 0 ? 1 : -1;
      let h = previousH + Math.random() * 0.005 * sign;
      // If height reaches maximum, it's time to go down
      if (h > 0.05) {
        this.signArray[i] = -1;
      }
      // If height reaches minimum, it's time to go up
      if (h < -0.05) {
        this.signArray[i] = 1;
      }
      this.geom.attributes.position.setZ(i, h);
    }

    this.geom.computeVertexNormals();
    this.geom.attributes.position.needsUpdate = true;
  }

  destroy() {}
}
