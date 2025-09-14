import React from 'react';
import type { KernelNode } from '../types';
import TreeNode from './TreeNode';

interface KernelVisualizerProps {
  data: KernelNode;
  searchActive?: boolean;
  selectedNode: KernelNode | null;
  onNodeSelect: (node: KernelNode) => void;
  searchTerm: string;
}

/**
 * The main component for visualizing the kernel tree structure.
 * It renders the root TreeNode and passes down necessary props for selection and expansion.
 * @param {KernelVisualizerProps} props - The component props.
 * @param {KernelNode} props.data - The root node of the kernel tree to display.
 * @param {boolean} [props.searchActive=false] - A flag indicating if a search is active, used to expand all nodes.
 * @param {KernelNode | null} props.selectedNode - The currently selected node.
 * @param {(node: KernelNode) => void} props.onNodeSelect - Callback function to handle node selection.
 * @param {string} props.searchTerm - The current search term for highlighting.
 * @returns {React.ReactElement} The rendered kernel visualizer component.
 */
const KernelVisualizer: React.FC<KernelVisualizerProps> = ({ data, searchActive = false, selectedNode, onNodeSelect, searchTerm }) => {
  return (
    <div className="font-mono text-sm sm:text-base">
      <ul>
        <TreeNode 
          node={data} 
          isLast={true} 
          isRoot={true} 
          startExpanded={searchActive}
          selectedNode={selectedNode}
          onNodeSelect={onNodeSelect}
          searchTerm={searchTerm}
        />
      </ul>
    </div>
  );
};

export default KernelVisualizer;
