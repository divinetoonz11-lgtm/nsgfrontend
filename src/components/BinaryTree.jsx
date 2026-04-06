import React, { useState, useEffect, useCallback } from 'react';
import ReactFlow, { Background, Controls, MiniMap, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';
import apiServerClient from '@/lib/apiServerClient';
import { useAuth } from '@/hooks/useAuth.js';
import { Loader2, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const CustomNode = ({ data }) => {
  const getBgColor = () => {
    if (data.status === 'Active') return 'bg-[hsl(var(--success)/0.15)] border-[hsl(var(--success))]';
    if (data.status === 'Inactive') return 'bg-muted border-muted-foreground';
    return 'bg-background border-dashed border-border';
  };

  return (
    <div className={`px-4 py-2 shadow-md rounded-lg border-2 ${getBgColor()} min-w-[150px] text-center`}>
      <div className="font-bold text-sm">{data.name || 'Empty Slot'}</div>
      {data.id && <div className="text-xs text-muted-foreground mt-1">ID: {data.id}</div>}
      {data.referrals !== undefined && (
        <div className="text-xs mt-1 font-medium">Referrals: {data.referrals}</div>
      )}
    </div>
  );
};

const nodeTypes = { custom: CustomNode };

export default function BinaryTree() {
  const { user } = useAuth();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchNetwork = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const res = await apiServerClient.fetch(`/users/network/${user.id}`);
      if (res.ok) {
        const data = await res.json();
        // Transform API data to ReactFlow format
        // Assuming data returns { nodes: [], edges: [] } or similar hierarchical structure
        // For fallback, we create a simple root node if data is empty
        if (data.nodes && data.nodes.length > 0) {
          setNodes(data.nodes.map(n => ({ ...n, type: 'custom' })));
          setEdges(data.edges || []);
        } else {
          setNodes([{
            id: 'root',
            type: 'custom',
            position: { x: 250, y: 50 },
            data: { name: user.name, id: user.id, status: 'Active', referrals: 0 }
          }]);
        }
      }
    } catch (error) {
      toast.error('Failed to load network tree');
      // Fallback UI
      setNodes([{
        id: 'root',
        type: 'custom',
        position: { x: 250, y: 50 },
        data: { name: user?.name || 'You', id: user?.id, status: 'Active', referrals: 0 }
      }]);
    } finally {
      setLoading(false);
    }
  }, [user?.id, setNodes, setEdges]);

  useEffect(() => {
    fetchNetwork();
  }, [fetchNetwork]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    const foundNode = nodes.find(n => n.data.id === searchQuery || n.data.name?.toLowerCase().includes(searchQuery.toLowerCase()));
    if (foundNode) {
      // In a real app, we'd use useReactFlow hook to center on node
      toast.success(`Found user: ${foundNode.data.name}`);
    } else {
      toast.error('User not found in your network');
    }
  };

  if (loading) {
    return (
      <div className="p-8 border rounded-lg bg-card flex items-center justify-center min-h-[500px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="border rounded-lg bg-card flex flex-col min-h-[600px] relative">
      <div className="p-4 border-b flex justify-between items-center bg-muted/30">
        <h3 className="font-semibold">Network Tree</h3>
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input 
            placeholder="Search ID or Name..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64"
          />
          <Button type="submit" size="icon" variant="secondary"><Search className="w-4 h-4" /></Button>
        </form>
      </div>
      <div className="flex-1 w-full h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-right"
        >
          <Background color="#ccc" gap={16} />
          <Controls />
          <MiniMap nodeColor={(n) => n.data.status === 'Active' ? '#22c55e' : '#94a3b8'} />
        </ReactFlow>
      </div>
    </div>
  );
}