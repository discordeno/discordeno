import { useColorMode } from '@docusaurus/theme-common';
import { Background, Controls, type Edge, Handle, type Node, Position, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react';
import type React from 'react';
import { useEffect, useState } from 'react';
import '@xyflow/react/dist/style.css';
import { defaultNodeOptions, height, multiplier } from './BaseFlowChart';

const handlers: Record<
  string,
  {
    transformers: string[];
    event: string;
  }
> = {
  handleChannelCreate: {
    transformers: ['transformers.channel'],
    event: 'events.channelCreate',
  },
  handleChannelDelete: {
    transformers: ['transformers.channel', 'transformers.snowflake'],
    event: 'events.channelDelete',
  },
  handleChannelPinsUpdate: {
    transformers: ['transformers.snowflake', 'transformers.snowflake'],
    event: 'events.channelPinsUpdate',
  },
  handleChannelUpdate: {
    transformers: ['transformers.channel'],
    event: 'events.channelUpdate',
  },
};

export default function FlowChart() {
  const transformers = [];
  const events = [];
  const initialNodes: Node[] = [
    {
      id: 'baseNode-gateway',
      type: 'input',
      position: { x: 0 * multiplier, y: 0 },
      data: { label: 'gateway' },
      ...defaultNodeOptions,
    },
    {
      id: 'baseNode-yourCode',
      type: 'output',
      position: { x: 5 * multiplier, y: 0 },
      data: { label: 'Your Code' },
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
      position: { x: 4.85 * multiplier, y: 170 },
      data: {},
    },
    {
      id: 'baseLineNode-4',
      type: 'baseLineNode',
      position: { x: 4.85 * multiplier, y: -130 },
      data: {},
    },
    {
      id: 'baseLineNodeText-1',
      type: 'baseLineNodeText',
      position: { x: 0 * multiplier, y: -130 },
      data: { label: 'Gateway' },
    },
    {
      id: 'baseLineNodeText-2',
      type: 'baseLineNodeText',
      position: { x: 1 * multiplier, y: -130 },
      data: { label: 'Bot' },
    },
    {
      id: 'baseLineNodeText-3',
      type: 'baseLineNodeText',
      position: { x: 5 * multiplier, y: -130 },
      data: { label: 'Your Code' },
    },
    {
      id: 'baseNode-handleDiscordPayload',
      position: { x: 1 * multiplier, y: 0 },
      data: { label: 'Handle discord payload' },
      ...defaultNodeOptions,
    },
  ];

  const initialEdges: Edge[] = [
    {
      id: 'baseEdge-1',
      source: 'baseNode-gateway',
      target: 'baseNode-handleDiscordPayload',
    },
    { id: 'baseEdge-3', source: 'baseNode-g-1', target: 'baseNode-g-2' },
    {
      id: 'baseEdge-4',
      source: 'baseNode-g-2',
      target: 'baseNode-handleDiscordPayload',
    },
    {
      id: 'baseLine-1',
      source: 'baseLineNode-1',
      target: 'baseLineNode-2',
      style: { stroke: 'blue', strokeDasharray: 20 },
    },
    {
      id: 'baseLine-2',
      source: 'baseLineNode-3',
      target: 'baseLineNode-4',
      style: { stroke: 'blue', strokeDasharray: 20 },
    },
  ];

  const handlerKeys = Object.keys(handlers);

  for (const [index, handler] of handlerKeys.entries()) {
    initialNodes.push({
      id: handler,
      position: {
        x: 2 * multiplier,
        y: index * (height + 10) - handlerKeys.length * ((height + 10) / 2) + height / 2,
      },
      data: { label: handler },
      ...defaultNodeOptions,
    });
    initialEdges.push({
      id: `handleDiscordPayload-${handler}`,
      source: 'baseNode-handleDiscordPayload',
      target: handler,
    });
    if (!events.find((e) => e === handlers[handler].event) && handlers[handler].event) {
      events.push(handlers[handler].event);
      initialEdges.push({
        id: `${handlers[handler].event}-yourCode`,
        source: handlers[handler].event,
        target: 'baseNode-yourCode',
      });
    }
    for (const transformer of handlers[handler].transformers) {
      if (!transformers.find((t) => t === transformer) && transformer) transformers.push(transformer);
      if (!initialEdges.find((edge) => edge.id === `${handler}-${transformer}`) && transformer) {
        initialEdges.push({
          id: `${handler}-${transformer}`,
          source: handler,
          target: transformer,
        });
      }
      if (!initialEdges.find((edge) => edge.id === `${transformer}-${handlers[handler].event}`) && handlers[handler].event) {
        initialEdges.push({
          id: `${transformer}-${handlers[handler].event}`,
          source: transformer,
          target: handlers[handler].event,
        });
      }
    }
  }

  for (const [index, transformer] of transformers.entries()) {
    initialNodes.push({
      id: transformer,
      position: {
        x: 3 * multiplier,
        y: index * (height + 10) - transformers.length * ((height + 10) / 2) + height / 2,
      },
      data: { label: transformer.slice(13) },
      ...defaultNodeOptions,
    });
  }

  for (const [index, event] of events.entries()) {
    initialNodes.push({
      id: event,
      position: {
        x: 4 * multiplier,
        y: index * (height + 10) - events.length * ((height + 10) / 2) + height / 2,
      },
      data: { label: event.slice(7) },
      ...defaultNodeOptions,
    });
  }

  initialNodes.unshift(
    {
      id: 'handlers',
      type: 'group',
      position: {
        x: 1.925 * multiplier,
        y: -handlerKeys.length * ((height + 10) / 2) - 45,
      },
      data: { label: '' },
      style: {
        height: `${handlerKeys.length * (height + 10) + 75}px`,
        width: `${multiplier * 0.9}px`,
        borderColor: 'rgba(0,0,0,0.25)',
      },
      draggable: false,
    },
    {
      id: 'baseLineNodeText-4',
      type: 'baseLineNodeText',
      position: {
        x: 2 * multiplier,
        y: -handlerKeys.length * ((height + 10) / 2) - (height + 10) / 2,
      },
      data: { label: 'Handlers' },
      draggable: false,
    },
    {
      id: 'transformers',
      type: 'group',
      position: {
        x: 2.925 * multiplier,
        y: -transformers.length * ((height + 10) / 2) - 45,
      },
      data: { label: '' },
      style: {
        height: `${transformers.length * (height + 10) + 75}px`,
        width: `${multiplier * 0.9}px`,
        borderColor: 'rgba(0,0,0,0.25)',
      },
      draggable: false,
    },
    {
      id: 'baseLineNodeText-5',
      type: 'baseLineNodeText',
      position: {
        x: 3 * multiplier,
        y: -transformers.length * ((height + 10) / 2) - (height + 10) / 2,
      },
      data: { label: 'Transformers' },
      draggable: false,
    },
    {
      id: 'events',
      type: 'group',
      position: {
        x: 3.925 * multiplier,
        y: -events.length * ((height + 10) / 2) - 45,
      },
      data: { label: '' },
      style: {
        height: `${events.length * (height + 10) + 75}px`,
        width: `${multiplier * 0.9}px`,
        borderColor: 'rgba(0,0,0,0.25)',
      },
      draggable: false,
    },
    {
      id: 'baseLineNodeText-6',
      type: 'baseLineNodeText',
      position: {
        x: 4 * multiplier,
        y: -events.length * ((height + 10) / 2) - (height + 10) / 2,
      },
      data: { label: 'Event' },
      draggable: false,
    },
  );

  const [nodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);
  const [userClick, setUserClick] = useState(false);

  const nodeMouseHandler = (_: React.MouseEvent, node: Node, userTrigger = true) => {
    if (userTrigger) setUserClick(true);
    if (node.id.split('-')[0] === 'baseNode') {
      edges.forEach((e) => {
        if (e.id.startsWith('baseLine')) return;
        e.animated = true;
        e.style = { stroke: 'blue' };
      });
      setEdges([...edges]);
      return;
    }
    if (handlerKeys.find((h) => handlers[h].event === node.id)) {
      const handlerName = handlerKeys.find((h) => handlers[h].event === node.id);
      const handler = handlers[handlerName];
      edges.forEach((e) => {
        if (e.id.startsWith('baseLine')) return;
        if (e.id.split('-')[0] === 'baseEdge') {
          e.animated = true;
          e.style = { stroke: 'blue' };
          return;
        }
        if (e.id.split('-')[0] === 'handleDiscordPayload' && e.id.split('-')[1] === handlerName) {
          e.animated = true;
          e.style = { stroke: 'blue' };
          return;
        }
        if (e.id.split('-')[0] === handlerName && handler.transformers.includes(e.id.split('-')[1])) {
          e.animated = true;
          e.style = { stroke: 'blue' };
          return;
        }
        if (handler.transformers.includes(e.id.split('-')[0]) && e.id.split('-')[1] === handler.event) {
          e.animated = true;
          e.style = { stroke: 'blue' };
          return;
        }
        if (e.id.split('-')[0] === handler.event && e.id.split('-')[1] === 'yourCode') {
          e.animated = true;
          e.style = { stroke: 'blue' };
          return;
        }
        e.animated = false;
        e.style = { opacity: 0.3 };
      });
      setEdges([...edges]);
      return;
    }
    if (handlerKeys.find((h) => handlers[h].transformers.includes(node.id))) {
      edges.forEach((e) => {
        if (e.id.startsWith('baseLine')) return;
        if (e.id.split('-')[0] === 'baseEdge') {
          e.animated = true;
          e.style = { stroke: 'blue' };
          return;
        }
        if (
          e.id.split('-')[0] === 'handleDiscordPayload' &&
          handlerKeys.filter((h) => handlers[h].transformers.includes(node.id)).includes(e.id.split('-')[1])
        ) {
          e.animated = true;
          e.style = { stroke: 'blue' };
          return;
        }
        if (handlerKeys.filter((h) => handlers[h].transformers.includes(node.id)).includes(e.id.split('-')[0]) && e.id.split('-')[1] === node.id) {
          e.animated = true;
          e.style = { stroke: 'blue' };
          return;
        }
        if (e.id.split('-')[0] === node.id) {
          e.animated = true;
          e.style = { stroke: 'blue' };
          return;
        }
        e.animated = false;
        e.style = { opacity: 0.3 };
      });
      setEdges([...edges]);
      return;
    }
    if (handlers[node.id]) {
      const handler = handlers[node.id];
      edges.forEach((e) => {
        if (e.id.startsWith('baseLine')) return;
        if (e.id.split('-')[0] === 'baseEdge') {
          e.animated = true;
          e.style = { stroke: 'blue' };
          return;
        }
        if (e.id.split('-')[0] === 'handleDiscordPayload' && e.id.split('-')[1] === node.id) {
          e.animated = true;
          e.style = { stroke: 'blue' };
          return;
        }
        if (e.id.split('-')[0] === node.id && handler.transformers.includes(e.id.split('-')[1])) {
          e.animated = true;
          e.style = { stroke: 'blue' };
          return;
        }
        if (handler.transformers.includes(e.id.split('-')[0]) && e.id.split('-')[1] === handler.event) {
          e.animated = true;
          e.style = { stroke: 'blue' };
          return;
        }
        if (e.id.split('-')[0] === handler.event) {
          e.animated = true;
          e.style = { stroke: 'blue' };
          return;
        }
        e.animated = false;
        e.style = { opacity: 0.3 };
      });
      setEdges([...edges]);
      return;
    }
    edges.forEach((e) => {
      if (e.id.startsWith('baseLine')) return;
      e.animated = false;
      e.style = {};
    });
    setEdges([...edges]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.round((handlerKeys.length - 1) * Math.random());
      if (!userClick) {
        nodeMouseHandler(
          undefined,
          {
            id: handlerKeys[randomIndex],
            data: undefined,
            position: undefined,
          },
          false,
        );
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [userClick]);

  useEffect(() => {
    if (userClick) {
      const timeout = setTimeout(() => {
        setUserClick(false);
      }, 10000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [userClick]);

  const color = useColorMode();

  return (
    <>
      <div
        style={{
          height: '50vh',
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          colorMode={color.isDarkTheme ? 'dark' : 'light'}
          defaultEdgeOptions={{ focusable: false }}
          onNodeDoubleClick={nodeMouseHandler}
          onNodeClick={nodeMouseHandler}
          onClick={(e) => {
            const target = e.target as HTMLDivElement;

            if (target.className === 'react-flow__pane') {
              nodeMouseHandler(e, {
                id: ' - ',
                data: { label: ' - ' },
                position: undefined,
              });
            }
          }}
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
  );
}
