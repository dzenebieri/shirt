import { useGLTF, useTexture, AccumulativeShadows, RandomizedLight, Decal, Environment, Center } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useIsMobile } from './useIsMobile'
import { useSnapshot } from 'valtio'
import { state } from './store'
import { easing } from 'maath'
import { useRef } from 'react'

export const App = ({ position = [0, 0, 2.5], fov = 25 }) => (
  <Canvas shadows camera={{ position, fov }} gl={{ preserveDrawingBuffer: true }} eventSource={document.getElementById('root')} eventPrefix="client">
    <ambientLight intensity={0.5} />
    <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />
    <CameraRig>
      <Backdrop />
      <Center>
        <Shirt />
      </Center>
    </CameraRig>
  </Canvas>
)

function Backdrop() {
  const shadows = useRef()
  const isMobile = useIsMobile()
  useFrame((state, delta) => easing.dampC(shadows.current.getMesh().material.color, state.color, 0.25, delta))
  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={10}
      rotation={[Math.PI / 2, 0, 0]}
      position={isMobile ? [0, 0, -2.14] : [0, 0, -0.14]}>
      <RandomizedLight amount={4} radius={9} intensity={0.55} ambient={0.25} position={[5, 5, -10]} />
      <RandomizedLight amount={4} radius={5} intensity={0.25} ambient={0.55} position={[-5, 5, -9]} />
    </AccumulativeShadows>
  )
}

function CameraRig({ children }) {
  const group = useRef()
  const snap = useSnapshot(state)
  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [snap.intro ? -state.viewport.width / 4 : 0, 0, 2], 0.25, delta)
    easing.dampE(group.current.rotation, [state.pointer.y / 10, -state.pointer.x / 5, 0], 0.25, delta)
  })
  return <group ref={group}>{children}</group>
}

function Shirt(props) {
  const snap = useSnapshot(state)
  const { viewport } = useThree()
  const isMobile = innerWidth <= 1144
  const texture = useTexture(`${snap.decal}`)
  const { nodes, materials } = useGLTF('https://raw.githubusercontent.com/dzenebieri/shirt/gh-pages/shirt_baked_collapsed.glb')
  useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta))
  return (
    <mesh
      castShadow
      geometry={nodes.T_Shirt_male.geometry}
      material={materials.lambert1}
      material-roughness={1}
      {...props}
      dispose={null}
      scale={isMobile ? [0.3, 0.3, 0.3] : [1, 1, 1]}
      position={isMobile ? [-0.0003, 0, 0] : [0, 0, 0]}>
      <Decal position={[0, 0.04, 0.15]} rotation={[0, 0, 0]} scale={0.15} map={texture} map-anisotropy={16} />
    </mesh>
  )
}
