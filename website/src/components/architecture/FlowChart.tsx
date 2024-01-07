import React from 'react'
import { type Edge, type Node } from 'reactflow'
import 'reactflow/dist/style.css'
import BaseFlowChart, { defaultNodeOptions, multiplier } from './BaseFlowChart'

const initialNodes: Node[] = [
  {
    id: 'discordGateway',
    type: 'input',
    position: { x: 0 * multiplier, y: 0 },
    data: { label: 'Discord Gateway' },
    ...defaultNodeOptions,
  },
  {
    id: 'gateway',
    position: { x: 1 * multiplier, y: 0 },
    data: { label: 'Gateway' },
    ...defaultNodeOptions,
  },
  {
    id: 'baseLineNode-1',
    type: 'baseLineNode',
    position: { x: 0.85 * multiplier, y: 170 },
    data: {},
  },
  {
    id: 'baseLineNode-2',
    type: 'baseLineNode',
    position: { x: 0.85 * multiplier, y: -130 },
    data: {},
  },
  {
    id: 'baseLineNode-3',
    type: 'baseLineNode',
    position: { x: 2.85 * multiplier, y: 170 },
    data: {},
  },
  {
    id: 'baseLineNode-4',
    type: 'baseLineNode',
    position: { x: 2.85 * multiplier, y: -130 },
    data: {},
  },
  {
    id: 'baseLineNode-5',
    type: 'baseLineNode',
    position: { x: 3.85 * multiplier, y: 170 },
    data: {},
  },
  {
    id: 'baseLineNode-6',
    type: 'baseLineNode',
    position: { x: 3.85 * multiplier, y: -130 },
    data: {},
  },
  {
    id: 'baseLineNode-7',
    type: 'baseLineNode',
    position: { x: 4.85 * multiplier, y: 170 },
    data: {},
  },
  {
    id: 'baseLineNode-8',
    type: 'baseLineNode',
    position: { x: 4.85 * multiplier, y: -130 },
    data: {},
  },
  {
    id: 'baseLineNodeText-1',
    type: 'baseLineNodeText',
    position: { x: 0 * multiplier, y: -130 },
    data: { label: 'Discord' },
  },
  {
    id: 'baseLineNodeText-2',
    type: 'baseLineNodeText',
    position: { x: 1.5 * multiplier, y: -130 },
    data: { label: 'Event In' },
  },
  {
    id: 'baseLineNodeText-3',
    type: 'baseLineNodeText',
    position: { x: 3 * multiplier, y: -130 },
    data: { label: 'Event Processing' },
  },
  {
    id: 'baseLineNodeText-4',
    type: 'baseLineNodeText',
    position: { x: 4 * multiplier, y: -130 },
    data: { label: 'Event out' },
  },
  {
    id: 'baseLineNodeText-6',
    type: 'baseLineNodeText',
    position: { x: 5 * multiplier, y: -130 },
    data: { label: 'Discord' },
  },
  {
    id: 'bot',
    position: { x: 2 * multiplier, y: 0 },
    data: { label: 'Bot' },
    ...defaultNodeOptions,
  },
  {
    id: 'yourCode',
    position: { x: 3 * multiplier, y: 0 },
    data: { label: 'Your Code' },
    ...defaultNodeOptions,
  },
  {
    id: 'rest',
    position: { x: 4 * multiplier, y: 0 },
    data: { label: 'Rest' },
    ...defaultNodeOptions,
  },
  {
    id: 'discordApiGateway',
    type: 'output',
    position: { x: 5 * multiplier, y: 0 },
    data: { label: 'Discord Api' },
    ...defaultNodeOptions,
  },
]

const initialEdges: Edge[] = [
  { id: 'd-g', source: 'discordGateway', target: 'gateway' },
  { id: 'g-b', source: 'gateway', target: 'bot' },
  { id: 'b-y', source: 'bot', target: 'yourCode' },
  { id: 'y-r', source: 'yourCode', target: 'rest' },
  { id: 'r-d', source: 'rest', target: 'discordApiGateway' },
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
  {
    id: 'baseLine-4',
    source: 'baseLineNode-7',
    target: 'baseLineNode-8',
    style: { stroke: 'blue', strokeDasharray: 20 },
    animated: false,
  },
]

export default function FlowChart() {
  return (
    <BaseFlowChart initialNodes={initialNodes} initialEdges={initialEdges} />
  )
}
