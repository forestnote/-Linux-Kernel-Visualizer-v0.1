import React, { useState } from 'react';
import type { KernelNode } from '../types';
import { FolderIcon, FolderOpenIcon, FileIcon } from './Icons';
import HighlightText from './HighlightText';

interface TreeNodeProps {
  node: KernelNode;
  isLast: boolean;
  isRoot?: boolean;
  startExpanded?: boolean;
  selectedNode: KernelNode | null;
  onNodeSelect: (node: KernelNode) => void;
  searchTerm: string;
}

/**
 * A recursive component that renders a single node (file or directory) in the kernel tree.
 * It handles its own expanded/collapsed state and renders its children if it's an expanded directory.
 * @param {TreeNodeProps} props - The component props.
 * @param {KernelNode} props.node - The kernel node to render.
 * @param {boolean} props.isLast - True if this is the last child of its parent, for styling tree lines.
 * @param {boolean} [props.isRoot=false] - True if this is the root node of the tree.
 * @param {boolean} [props.startExpanded=false] - True if the node should be expanded by default.
 * @param {KernelNode | null} props.selectedNode - The currently selected node in the entire tree.
 * @param {(node: KernelNode) => void} props.onNodeSelect - The callback function to execute when the node is clicked.
 * @param {string} props.searchTerm - The current search term for highlighting.
 * @returns {React.ReactElement} The rendered tree node list item.
 */
const TreeNode: React.FC<TreeNodeProps> = ({ node, isLast, isRoot = false, startExpanded = false, selectedNode, onNodeSelect, searchTerm }) => {
  const isDirectory = node.children && node.children.length > 0;
  const [isExpanded, setIsExpanded] = useState(isRoot || startExpanded);
  const isSelected = selectedNode === node;

  const handleInteraction = () => {
    onNodeSelect(node);
    if (isDirectory) {
      setIsExpanded(prev => !prev);
    }
  };

  const IconComponent = isDirectory ? (isExpanded ? FolderOpenIcon : FolderIcon) : FileIcon;

  // The item's center is at approx 14px (top-3.5) with py-1 on the div and h-5 on the icon
  const verticalLineHeight = isLast ? 'h-3.5' : 'h-full';
  
  return (
    <li className={`relative ${isRoot ? '' : 'pl-6'}`}>
      
      {/* --- Tree connection lines --- */}
      {/* This structure creates the `├` and `└` shapes using absolute positioning */}
      {!isRoot && (
        <>
          {/* Vertical line: full height for intermediate items, half height for the last item */}
          <span
            className={`absolute top-0 left-3 w-px bg-slate-400 ${verticalLineHeight}`}
            aria-hidden="true"
          />
          {/* Horizontal line */}
          <span
            className="absolute top-3.5 left-3 w-3 h-px bg-slate-400"
            aria-hidden="true"
          />
        </>
      )}

      <div
        className={`flex items-center space-x-2 py-1 group rounded transition-colors ${isDirectory ? 'cursor-pointer' : ''} ${isSelected ? 'bg-cyan-100' : 'hover:bg-slate-100'}`}
        onClick={handleInteraction}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleInteraction()}
        role={isDirectory ? 'button' : 'listitem'}
        tabIndex={0}
        aria-expanded={isDirectory ? isExpanded : undefined}
        title={node.summary}
      >
        <IconComponent className={`w-5 h-5 flex-shrink-0 ${isDirectory ? 'text-cyan-500' : 'text-slate-400'}`} />
        <div>
            <span className={`font-medium ${isDirectory ? 'text-slate-800' : 'text-slate-600'}`}>
                <HighlightText text={node.name} highlight={searchTerm} as="span" />
            </span>
            <span className="text-slate-500 group-hover:text-slate-700 transition-colors ml-2 hidden sm:inline">
                - <HighlightText text={node.summary} highlight={searchTerm} as="span" />
            </span>
        </div>
      </div>
      
      {isExpanded && isDirectory && (
        <ul role="group">
          {node.children?.map((child, index) => (
            <TreeNode
              key={`${child.name}-${index}`}
              node={child}
              isLast={index === (node.children?.length ?? 0) - 1}
              startExpanded={startExpanded}
              selectedNode={selectedNode}
              onNodeSelect={onNodeSelect}
              searchTerm={searchTerm}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TreeNode;