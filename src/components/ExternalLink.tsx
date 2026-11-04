import type { ReactNode } from 'react';

interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

/** Lien vers un autre site : nouvel onglet, sans transmettre window.opener ni le référent. */
export function ExternalLink({ href, children, className }: ExternalLinkProps) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (nouvel onglet)</span>
    </a>
  );
}
