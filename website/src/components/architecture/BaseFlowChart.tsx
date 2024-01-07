import { useEffect, useState } from 'react'
import ReactFlow, {
  Background,
  Controls,
  Handle,
  Position,
  useEdgesState,
  useNodesState,
  type Edge,
  type Node,
} from 'reactflow'
import 'reactflow/dist/style.css'

export const multiplier = 225
export const height = 40
export const widthMultiplier = 0.75

export const defaultNodeOptions = {
  targetPosition: Position.Left,
  sourcePosition: Position.Right,
  draggable: false,
  style: { width: `${multiplier * 0.75}px`, height: `${height}px` },
}

export const defaultGroupOptions = {
  draggable: false,
}

export default function BaseFlowChart({
  initialNodes = [],
  initialEdges = [],
}: {
  initialNodes: Node[]
  initialEdges: Edge[]
}) {
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window
    return {
      width,
      height,
    }
  }

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  )

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const [nodes] = useNodesState(initialNodes)
  const [edges] = useEdgesState(initialEdges)

  return (
    <>
      <div
        style={{
          width:
            windowDimensions.width >= 997
              ? `${
                  (100 *
                    ((windowDimensions.width -
                      300 -
                      (windowDimensions.width >= 1620
                        ? (windowDimensions.width - 1620) * 0.5
                        : 0)) /
                      windowDimensions.width) -
                    2) *
                  widthMultiplier
                }vw`
              : '95vw',
          height: '25vh',
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          defaultEdgeOptions={{ focusable: false, animated: true }}
          nodeTypes={{
            baseLineNode: () => (
              <div style={{ height: '1px', width: '20px' }}>
                <Handle
                  type="target"
                  position={Position.Bottom}
                  style={{
                    background: 'rgba(0,0,0,0)',
                    borderColor: 'rgba(0,0,0,0)',
                  }}
                />
                <Handle
                  type="source"
                  position={Position.Top}
                  style={{
                    background: 'rgba(0,0,0,0)',
                    borderColor: 'rgba(0,0,0,0)',
                  }}
                />
              </div>
            ),
            baseLineNodeText: n => (
              <div
                style={{
                  textAlign: 'center',
                  width: defaultNodeOptions.style.width,
                }}
              >
                <h3>{n.data.label}</h3>
              </div>
            ),
          }}
          fitView
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </>
  )
}
