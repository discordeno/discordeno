import { useColorMode } from '@docusaurus/theme-common'
import { Background, Controls, type Edge, Handle, type Node, Position, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react'
import '@xyflow/react/dist/style.css'

export const multiplier = 225
export const height = 40

export const defaultNodeOptions = {
  targetPosition: Position.Left,
  sourcePosition: Position.Right,
  draggable: false,
  style: { width: `${multiplier * 0.75}px`, height: `${height}px` },
}

export const defaultGroupOptions = {
  draggable: false,
}

export default function BaseFlowChart({ initialNodes = [], initialEdges = [] }: { initialNodes: Node[]; initialEdges: Edge[] }) {
  const [nodes] = useNodesState(initialNodes)
  const [edges] = useEdgesState(initialEdges)

  const color = useColorMode()

  return (
    <>
      <div
        style={{
          height: '25vh',
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          defaultEdgeOptions={{ focusable: false, animated: true }}
          colorMode={color.isDarkTheme ? 'dark' : 'light'}
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
            baseLineNodeText: (n) => (
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
