import React from 'react';

/**
 * Props for SVG icon components.
 */
interface IconProps {
  /** Optional CSS classes to apply to the SVG element. */
  className?: string;
}

/**
 * Renders a closed folder icon.
 * @param {IconProps} props - The component props.
 * @returns {React.ReactElement} The rendered SVG icon.
 */
export const FolderIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path>
  </svg>
);

/**
 * Renders an open folder icon.
 * @param {IconProps} props - The component props.
 * @returns {React.ReactElement} The rendered SVG icon.
 */
export const FolderOpenIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v1"></path>
  </svg>
);

/**
 * Renders a file icon.
 * @param {IconProps} props - The component props.
 * @returns {React.ReactElement} The rendered SVG icon.
 */
export const FileIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
  </svg>
);

/**
 * Renders the GitHub logo icon.
 * @param {IconProps} props - The component props.
 * @returns {React.ReactElement} The rendered SVG icon.
 */
export const GithubIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
    </svg>
);

/**
 * Renders a search (magnifying glass) icon.
 * @param {IconProps} props - The component props.
 * @returns {React.ReactElement} The rendered SVG icon.
 */
export const SearchIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

/**
 * Renders a collapse/shrink icon.
 * @param {IconProps} props - The component props.
 * @returns {React.ReactElement} The rendered SVG icon.
 */
export const CollapseIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
    </svg>
);

/**
 * Renders an information icon.
 * @param {IconProps} props - The component props.
 * @returns {React.ReactElement} The rendered SVG icon.
 */
export const InfoIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
);

/**
 * Renders the Tux (Linux penguin) icon.
 * @param {IconProps} props - The component props.
 * @returns {React.ReactElement} The rendered SVG icon.
 */
export const TuxIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 0C6.48 0 2 4.48 2 10c0 2.45.88 4.7 2.34 6.45C2.77 17.79 2 19.6 2 21.5h20c0-1.9-.77-3.71-2.34-5.05C21.12 14.7 22 12.45 22 10 22 4.48 17.52 0 12 0zM9 8c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm6 0c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-3 10.5c-2.8 0-5.22-1.5-6.5-3.75-.52.17-1.07.25-1.64.25-.57 0-1.12-.08-1.64-.25.58 1.07 1.76 1.75 3.22 1.75s2.64-.68 3.22-1.75c.52.17 1.07.25 1.64.25.57 0 1.12-.08 1.64-.25 1.28 2.25 3.7 3.75 6.5 3.75 2.8 0 5.22-1.5 6.5-3.75-.52.17-1.07.25-1.64.25-.57 0-1.12-.08-1.64-.25-.58 1.07-1.76 1.75-3.22 1.75s-2.64-.68-3.22-1.75c-.52.17-1.07.25-1.64.25-.57 0-1.12-.08-1.64-.25-1.28 2.25-3.7 3.75-6.5 3.75z" transform="scale(1,-1) translate(0, -23)"></path>
    </svg>
);