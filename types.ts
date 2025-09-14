
/**
 * Represents a node in the Linux kernel's file structure tree.
 * Each node can be a file or a directory.
 */
export interface KernelNode {
  /** The name of the file or directory. */
  name: string;
  /** A brief summary of the node's purpose, shown in the tree view. */
  summary: string;
  /** A detailed explanation of the node's purpose, shown in the detail panel. */
  description: string;
  /** An optional array of child nodes, present if the node is a directory. */
  children?: KernelNode[];
}