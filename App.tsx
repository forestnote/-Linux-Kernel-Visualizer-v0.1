import React, { useState, useMemo, useCallback } from 'react';
import KernelVisualizer from './components/KernelVisualizer';
import { kernelData } from './data/kernelData';
import { GithubIcon, SearchIcon, CollapseIcon, InfoIcon, FolderIcon, FileIcon, TuxIcon } from './components/Icons';
import type { KernelNode } from './types';
import HighlightText from './components/HighlightText';

/**
 * Recursively filters a tree of KernelNode objects based on a search term.
 * A node is kept if its name, summary, or description matches the term, or if any of its descendants match.
 * @param {KernelNode} node - The current node in the tree to filter.
 * @param {string} term - The search term to filter by.
 * @returns {KernelNode | null} The filtered node, or null if no part of the subtree matches.
 */
const filterTree = (node: KernelNode, term: string): KernelNode | null => {
    const lowerCaseTerm = term.toLowerCase().trim();
    if (lowerCaseTerm === '') {
      return node;
    }
  
    const filteredChildren = node.children
      ?.map(child => filterTree(child, lowerCaseTerm))
      .filter((child): child is KernelNode => child !== null);
  
    const isMatch =
      node.name.toLowerCase().includes(lowerCaseTerm) ||
      node.summary.toLowerCase().includes(lowerCaseTerm) ||
      node.description.toLowerCase().includes(lowerCaseTerm);
  
    if (isMatch || (filteredChildren && filteredChildren.length > 0)) {
      return { ...node, children: filteredChildren };
    }
  
    return null;
  };

/**
 * Finds the path from the root to a target node.
 * @param {KernelNode} root - The root of the tree to search in.
 * @param {KernelNode} targetNode - The node to find the path for.
 * @returns {KernelNode[]} An array of nodes representing the path, or an empty array if not found.
 */
const findNodePath = (root: KernelNode, targetNode: KernelNode): KernelNode[] => {
    const path: KernelNode[] = [];
  
    function search(node: KernelNode): boolean {
      path.push(node);
      if (node === targetNode) {
        return true;
      }
      if (node.children) {
        for (const child of node.children) {
          if (search(child)) {
            return true;
          }
        }
      }
      path.pop();
      return false;
    }
  
    search(root);
    return path;
};
  

interface DetailPanelProps {
  node: KernelNode | null;
  path: KernelNode[];
  onNodeSelect: (node: KernelNode) => void;
  searchTerm: string;
}

/**
 * A component that displays the detailed description of a selected kernel node.
 * If no node is selected, it shows a placeholder message.
 * @param {DetailPanelProps} props - The component props.
 * @param {KernelNode | null} props.node - The currently selected node, or null.
 * @param {KernelNode[]} props.path - The path from the root to the selected node.
 * @param {(node: KernelNode) => void} props.onNodeSelect - Callback to select a node, used for breadcrumbs.
 * @param {string} props.searchTerm - The current search term for highlighting.
 * @returns {React.ReactElement} The rendered detail panel component.
 */
const DetailPanel: React.FC<DetailPanelProps> = ({ node, path, onNodeSelect, searchTerm }) => {
  if (!node) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 sticky top-6">
        <InfoIcon className="w-12 h-12 mb-4 text-slate-400" />
        <h3 className="text-lg font-semibold text-slate-700">View Details</h3>
        <p className="mt-1 text-sm">Select an item to see its description.</p>
      </div>
    );
  }

  const isDirectory = node.children && node.children.length > 0;
  const IconComponent = isDirectory ? FolderIcon : FileIcon;

  return (
    <div className="h-full sticky top-6">
        <div className="mb-4 text-sm text-slate-500 flex flex-wrap items-center" aria-label="Breadcrumb">
            {path.map((p, index) => (
            <React.Fragment key={p.name + index}>
                <button onClick={() => onNodeSelect(p)} className="hover:text-cyan-600 hover:underline">
                    {p.name.replace(/\/$/, '') || 'linux'}
                </button>
                {index < path.length - 1 && <span className="mx-1">/</span>}
            </React.Fragment>
            ))}
      </div>
      <div className="flex items-start gap-3 mb-4">
        <IconComponent className={`w-8 h-8 flex-shrink-0 ${isDirectory ? 'text-cyan-500' : 'text-slate-400'}`} />
        <h2 className="text-2xl font-bold text-slate-900 break-all">
            <HighlightText text={node.name} highlight={searchTerm} as="span" />
        </h2>
      </div>
      <div className="text-slate-600 text-base leading-relaxed prose">
        <HighlightText text={node.description} highlight={searchTerm} />
      </div>
    </div>
  );
};


/**
 * The main application component for the Linux Kernel Visualizer.
 * It manages the state for search, node selection, and renders the main layout,
 * including the header, search bar, kernel tree visualizer, and detail panel.
 * @returns {React.ReactElement} The rendered application component.
 */
const App: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [visualizerKey, setVisualizerKey] = useState(0);
    const [selectedNode, setSelectedNode] = useState<KernelNode | null>(null);
    const [selectedNodePath, setSelectedNodePath] = useState<KernelNode[]>([]);

    const filteredData = useMemo(() => {
        if (!searchTerm) {
            return kernelData;
        }
        return filterTree(kernelData, searchTerm);
    }, [searchTerm]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setSelectedNode(null);
        setSelectedNodePath([]);
    };
    
    const handleNodeSelect = useCallback((node: KernelNode) => {
        setSelectedNode(node);
        const path = findNodePath(kernelData, node);
        setSelectedNodePath(path);
      }, []);

    const handleCollapseAll = () => {
        setSearchTerm('');
        setSelectedNode(null);
        setSelectedNodePath([]);
        setVisualizerKey(prevKey => prevKey + 1);
    };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8 md:mb-12">
            <div className="flex justify-center items-center gap-4 mb-2">
                 <TuxIcon className="h-12 w-12 text-slate-900" />
                 <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
                    Linux Kernel Visualizer v0.1
                 </h1>
            </div>
          <p className="text-slate-600 max-w-2xl mx-auto mt-4 text-lg">
            An interactive visualization of the Linux kernel's directory structure. Click on any directory to expand or collapse its contents.
          </p>
        </header>

        <main className="bg-white border border-slate-200 rounded-lg shadow-xl shadow-cyan-500/5 overflow-hidden">
            <div className="flex items-center gap-2 p-4 sm:p-6 border-b border-slate-200">
                <div className="relative flex-grow">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3" aria-hidden="true">
                        <SearchIcon className="w-5 h-5 text-slate-400" />
                    </span>
                    <input
                        type="search"
                        id="kernel-search"
                        placeholder="Search files and descriptions..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full bg-slate-100 border border-slate-300 rounded-md py-2 pl-10 pr-4 text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                        aria-label="Search kernel tree"
                    />
                </div>
                <button
                    onClick={handleCollapseAll}
                    className="flex items-center gap-2 bg-white hover:bg-slate-100 border border-slate-300 rounded-md px-3 py-2 text-slate-600 hover:text-slate-800 transition-colors"
                    aria-label="Collapse all directories"
                    title="Collapse All"
                >
                    <CollapseIcon className="w-5 h-5" />
                    <span className="hidden sm:inline text-sm font-medium">Collapse All</span>
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 min-h-[60vh]">
                <div className="md:col-span-2 p-4 sm:p-6 md:border-r border-b md:border-b-0 border-slate-200 overflow-auto">
                    {filteredData ? (
                        <KernelVisualizer 
                            key={visualizerKey} 
                            data={filteredData} 
                            searchActive={searchTerm.length > 0}
                            selectedNode={selectedNode}
                            onNodeSelect={handleNodeSelect}
                            searchTerm={searchTerm}
                        />
                    ) : (
                        <div className="text-center text-slate-500 py-8">
                            <p className="text-lg">No results found for "{searchTerm}"</p>
                            <p className="text-sm mt-2">Try a different search term.</p>
                        </div>
                    )}
                </div>
                <div className="md:col-span-1 p-4 sm:p-6 bg-slate-50/50">
                    <DetailPanel 
                        node={selectedNode} 
                        path={selectedNodePath} 
                        onNodeSelect={handleNodeSelect}
                        searchTerm={searchTerm}
                    />
                </div>
            </div>
        </main>
        
        <footer className="text-center mt-8 text-slate-500">
            <p>Built with React, TypeScript, and Tailwind CSS.</p>
             <a 
                href="https://github.com/torvalds/linux" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-cyan-500 transition-colors mt-2"
            >
                <GithubIcon className="w-5 h-5" />
                <span>View original source on GitHub</span>
            </a>
        </footer>
      </div>
    </div>
  );
};

export default App;