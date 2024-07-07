import ReactFlow, { Background, Controls, Edge, Node, Position } from 'reactflow'
import 'reactflow/dist/style.css'

export const defaultNodeOptions = {
  targetPosition: Position.Top,
  sourcePosition: Position.Bottom,
  draggable: false,
  style: { width: '70px', height: '50px', padding: '10px 0' },
}

const genServer = (x: number, id: number) => {
  const server: Node<any, string>[] = [
    {
      id: `s${id + 1}`,
      data: { label: `Server ${id + 1}` },
      position: { x: x - 42.5, y: 100 },
    },
  ]

  for (let i = 0; i < 4; i++) {
    if (i == 2) {
      server.push(
        {
          id: `baseLineNodeText-${id}-${i}`,
          type: 'baseLineNodeText',
          position: { x: x - 130, y: 307.5 },
          data: {
            label: '.....',
          },
        },
        {
          id: `baseLineNodeText-${id}-${i}s`,
          type: 'baseLineNodeText',
          position: { x: x - 130, y: 200 },
          data: {
            label: '.....',
          },
        },
      )
      continue
    }
    server.push(
      ...[
        {
          id: `w${id * 50 + (i == 3 ? 49 : i) + 1}`,
          data: { label: `Worker ${id * 50 + (i == 3 ? 49 : i)}` },
          position: { x: x - 112.5 + 75 * i, y: 200 },
          ...defaultNodeOptions,
          ...{ style: { ...defaultNodeOptions.style, padding: '5px 10px' } },
        },
        {
          id: `w${id * 50 + (i == 3 ? 49 : i) + 1}s`,
          data: {
            label: `Shard ${id * 500 + (i == 3 ? 49 : i) * 10}-${id * 500 + (i == 3 ? 49 : i) * 10 + 9}`,
          },
          position: { x: x - 112.5 + 75 * i, y: 300 },
          type: 'output',
          ...defaultNodeOptions,
          ...{
            style: {
              ...defaultNodeOptions.style,
              ...(id == 1 || (id == 0 && i == 3) ? { padding: '5px 10px' } : { padding: `5px 5px` }),
              ...(id == 0 && i != 3 ? { padding: '5px 15px' } : {}),
            },
          },
        },
      ],
    )
  }

  return server
}

const nodes = [
  {
    id: 'gwm',
    data: { label: 'Gateway Manager' },
    position: { x: -42.5, y: 0 },
    type: 'input',
  },
  ...genServer(-300, 0),
  ...genServer(0, 1),
  ...genServer(300, 9),
  {
    id: 'baseLineNodeText-6',
    type: 'baseLineNodeText',
    position: { x: -15, y: 100 },
    data: {
      label: '...............',
    },
  },
]

const edges: Edge<any>[] = [
  { id: 'gwm-s1', source: 'gwm', target: 's1', type: 'step' },
  { id: 'gwm-s2', source: 'gwm', target: 's2', type: 'step' },
  { id: 'gwm-s10', source: 'gwm', target: 's10', type: 'step' },
  { id: 's1-w1', source: 's1', target: 'w1', type: 'step' },
  { id: 's1-w2', source: 's1', target: 'w2', type: 'step' },
  { id: 's1-w50', source: 's1', target: 'w50', type: 'step' },
  { id: 's2-w51', source: 's2', target: 'w51', type: 'step' },
  { id: 's2-w52', source: 's2', target: 'w52', type: 'step' },
  { id: 's2-w100', source: 's2', target: 'w100', type: 'step' },
  { id: 's10-w451', source: 's10', target: 'w451', type: 'step' },
  { id: 's10-w452', source: 's10', target: 'w452', type: 'step' },
  { id: 's10-w500', source: 's10', target: 'w500', type: 'step' },
  { id: 'w1-w1s', source: 'w1', target: 'w1s', type: 'step' },
  { id: 'w2-w2s', source: 'w2', target: 'w2s', type: 'step' },
  { id: 'w50-w50s', source: 'w50', target: 'w50s', type: 'step' },
  { id: 'w51-w51s', source: 'w51', target: 'w51s', type: 'step' },
  { id: 'w52-w52s', source: 'w52', target: 'w52s', type: 'step' },
  { id: 'w100-w100s', source: 'w100', target: 'w100s', type: 'step' },
  { id: 'w451-w451s', source: 'w451', target: 'w451s', type: 'step' },
  { id: 'w452-w452s', source: 'w452', target: 'w452s', type: 'step' },
  { id: 'w500-w500s', source: 'w500', target: 'w500s', type: 'step' },
]

function Flow() {
  return (
    <div style={{ height: '40vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={{
          baseLineNodeText: (n) => (
            <div
              style={{
                textAlign: 'center',
                width: '400px',
              }}
            >
              <h3>{n.data.label}</h3>
            </div>
          ),
        }}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default Flow
