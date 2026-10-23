import type { CSSProperties, ElementType, ReactNode } from 'react';
import { useInView } from '../hooks/useInView';

/** Fades/slides children in the first time they enter the viewport. */
export function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  className = '',
  ...rest
}: { children: ReactNode; as?: ElementType; delay?: number; className?: string; [k: string]: unknown }) {
  const [ref, inView] = useInView<HTMLElement>(0.15);
  return (
    <Tag ref={ref} className={`reveal ${inView ? 'is-in' : ''} ${className}`} style={{ '--d': `${delay}ms` } as CSSProperties} {...rest}>
      {children}
    </Tag>
  );
}
