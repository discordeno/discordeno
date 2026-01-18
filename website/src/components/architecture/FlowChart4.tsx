import type { Edge, Node } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import BaseFlowChart, { defaultNodeOptions, multiplier } from './BaseFlowChart';

const initialNodes: Node[] = [
  {
    id: 'bot',
    type: 'input',
    position: { x: 0 * multiplier, y: -50 },
    data: { label: 'Bot' },
    ...defaultNodeOptions,
  },
  {
    id: 'gateway',
    type: 'input',
    position: { x: 0 * multiplier, y: 50 },
    data: { label: 'Gateway' },
    ...defaultNodeOptions,
  },
  {
    id: 'rest',
    position: { x: 1.5 * multiplier, y: 0 },
    data: { label: 'Rest' },
    ...defaultNodeOptions,
  },
  {
    id: 'discordApi',
    type: 'output',
    position: { x: 2.75 * multiplier, y: 0 },
    data: { label: 'Discord API' },
    ...defaultNodeOptions,
  },
  {
    id: 'baseLineNode-1',
    type: 'baseLineNode',
    position: { x: 1.3 * multiplier, y: 170 },
    data: {},
  },
  {
    id: 'baseLineNode-2',
    type: 'baseLineNode',
    position: { x: 1.3 * multiplier, y: -130 },
    data: {},
  },
  {
    id: 'baseLineNode-3',
    type: 'baseLineNode',
    position: { x: 2.45 * multiplier, y: 170 },
    data: {},
  },
  {
    id: 'baseLineNode-4',
    type: 'baseLineNode',
    position: { x: 2.45 * multiplier, y: -130 },
    data: {},
  },
  {
    id: 'label-bot-gateway',
    type: 'baseLineNodeText',
    position: { x: 0 * multiplier, y: -200 },
    data: { label: 'Bot & Gateway Process' },
  },
  {
    id: 'label-rest-process',
    type: 'baseLineNodeText',
    position: { x: 1.5 * multiplier, y: -200 },
    data: { label: 'Rest Process' },
  },
  {
    id: 'label-discord',
    type: 'baseLineNodeText',
    position: { x: 2.75 * multiplier, y: -200 },
    data: { label: 'Discord' },
  },
];

const initialEdges: Edge[] = [
  { id: 'bp-rp', source: 'bot', target: 'rest' },
  { id: 'gp-rp', source: 'gateway', target: 'rest' },
  { id: 'rp-da', source: 'rest', target: 'discordApi' },
  // Blue dashed lines
  {
    id: 'baseLine-1',
    source: 'baseLineNode-1',
    target: 'baseLineNode-2',
    style: { stroke: 'blue', strokeDasharray: 20 },
    animated: false,
  },
  {
    id: 'baseLine-2',
    source: 'baseLineNode-3',
    target: 'baseLineNode-4',
    style: { stroke: 'blue', strokeDasharray: 20 },
    animated: false,
  },
  {
    id: 'baseLine-3',
    source: 'baseLineNode-5',
    target: 'baseLineNode-6',
    style: { stroke: 'blue', strokeDasharray: 20 },
    animated: false,
  },
];

export default function FlowChart4() {
  return <BaseFlowChart initialNodes={initialNodes} initialEdges={initialEdges} />;
}
