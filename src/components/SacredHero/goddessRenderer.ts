import { GODDESS_ART, GODDESS_RIG, GoddessPose } from './goddessRig';
import { FRAGMENT_SHADER, VERTEX_SHADER } from './goddessShader';

export interface GoddessRenderer {
  setArtwork(image: TexImageSource): void;
  /** Backing-store size in device pixels. */
  resize(width: number, height: number): void;
  /** `fabricShift` is the fabric's extra parallax, in source-image pixels. */
  render(pose: GoddessPose, fabricShift: { x: number; y: number }): void;
  dispose(): void;
}

function compile(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn('[SacredHero] shader compile failed:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function link(gl: WebGL2RenderingContext): WebGLProgram | null {
  const vs = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  const program = gl.createProgram();
  if (!vs || !fs || !program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn('[SacredHero] program link failed:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

const vec = (values: ReadonlyArray<number>) => new Float32Array(values);
const flat = (items: ReadonlyArray<ReadonlyArray<number>>) => new Float32Array(items.flat());

/** Returns null when WebGL2 is unavailable, so the caller can fall back to a static image. */
export function createGoddessRenderer(canvas: HTMLCanvasElement): GoddessRenderer | null {
  const gl = canvas.getContext('webgl2', {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: 'low-power',
  });
  if (!gl) return null;

  const program = link(gl);
  if (!program) return null;
  gl.useProgram(program);

  // One oversized triangle covers the viewport.
  const vao = gl.createVertexArray();
  const buffer = gl.createBuffer();
  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'a_position');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const uniform = (name: string) => gl.getUniformLocation(program, name);

  // Static rig geometry — uploaded once.
  const { head, crown, hair, weapons, fabric, jewels, shimmer, edgeFade } = GODDESS_RIG;
  gl.uniform1i(uniform('u_art'), 0);
  gl.uniform2f(uniform('u_artSize'), GODDESS_ART.width, GODDESS_ART.height);
  gl.uniform2fv(uniform('u_headPivot'), vec(head.pivot));
  gl.uniform4fv(uniform('u_headRegion'), vec(head.region));
  gl.uniform2fv(uniform('u_crownPivot'), vec(crown.pivot));
  gl.uniform4fv(uniform('u_crownRegion'), vec(crown.region));
  gl.uniform2fv(uniform('u_crownRamp'), vec(crown.ramp));
  gl.uniform4fv(uniform('u_hairRegions'), flat(hair.masses));
  gl.uniform4fv(uniform('u_weaponSegments'), flat(weapons.map((w) => [...w.pivot, ...w.tip])));
  gl.uniform4fv(uniform('u_weaponHeads'), flat(weapons.map((w) => w.head)));
  gl.uniform1fv(uniform('u_weaponWidths'), new Float32Array(weapons.map((w) => w.width)));
  gl.uniform4f(uniform('u_fabricBands'), ...fabric.left, ...fabric.right);
  gl.uniform2fv(uniform('u_fabricTop'), vec(fabric.top));
  gl.uniform2fv(uniform('u_fabricAmp'), vec(fabric.amplitude));
  gl.uniform1f(uniform('u_fabricWavelength'), fabric.wavelength);
  gl.uniform4f(uniform('u_fabricPeriods'), ...fabric.periods, ...fabric.swellPeriods);
  gl.uniform4fv(uniform('u_skirtRegion'), vec(fabric.skirt.region));
  gl.uniform4fv(uniform('u_jewels'), flat(jewels));
  gl.uniform1f(uniform('u_shimmerWidth'), shimmer.width);
  gl.uniform1f(uniform('u_shimmerGain'), shimmer.gain);
  gl.uniform2f(uniform('u_edgeFade'), edgeFade.side, edgeFade.bottom);

  // Per-frame uniforms.
  const u = {
    time: uniform('u_time'),
    headAngle: uniform('u_headAngle'),
    crownAngle: uniform('u_crownAngle'),
    crownLift: uniform('u_crownLift'),
    hairOffsets: uniform('u_hairOffsets'),
    skirtShift: uniform('u_skirtShift'),
    weaponAngles: uniform('u_weaponAngles'),
    fabricStrength: uniform('u_fabricStrength'),
    fabricShift: uniform('u_fabricShift'),
    shimmer: uniform('u_shimmer'),
  };
  const weaponAngles = new Float32Array(weapons.length);
  const hairOffsets = new Float32Array(4);

  const texture = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  gl.clearColor(0, 0, 0, 0);

  return {
    setArtwork(image) {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      // Premultiplied texels filter cleanly at the cut-out edges.
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      // Mip levels provide the blurred lookup used to find hair.
      gl.generateMipmap(gl.TEXTURE_2D);
    },

    resize(width, height) {
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, width, height);
    },

    render(pose, fabricShift) {
      pose.weaponAngles.forEach((angle, i) => (weaponAngles[i] = angle));
      gl.uniform1f(u.time, pose.time);
      gl.uniform1f(u.headAngle, pose.headAngle);
      gl.uniform1f(u.crownAngle, pose.crownAngle);
      gl.uniform1f(u.crownLift, pose.crownLift);
      hairOffsets.set([...pose.hairOffsets[0], ...pose.hairOffsets[1]]);
      gl.uniform2fv(u.hairOffsets, hairOffsets);
      gl.uniform2f(u.skirtShift, pose.skirtShift[0], pose.skirtShift[1]);
      gl.uniform1fv(u.weaponAngles, weaponAngles);
      gl.uniform1f(u.fabricStrength, pose.fabricStrength);
      gl.uniform2f(u.fabricShift, fabricShift.x, fabricShift.y);
      gl.uniform2f(u.shimmer, pose.shimmerCenter, pose.shimmerStrength);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },

    dispose() {
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(program);
    },
  };
}
