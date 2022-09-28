import * as THREE from "three";
import Experience from "./Experience.js";

export default class World {
  constructor(_options) {
    this.experience = new Experience();
    this.config = this.experience.config;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.geom = new THREE.PlaneGeometry(2,2,10,10)

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
        color: "#68C3C0",
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
        let h = Math.random()*0.1  
        this.geom.attributes.position.setZ(i, h);
        
      }
  
      this.geom.computeVertexNormals();
      this.geom.attributes.position.needsUpdate = true;
  }

  destroy() {}
}
