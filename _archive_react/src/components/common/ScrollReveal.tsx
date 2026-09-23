/**
 * @intent Reusable scroll-triggered entrance animation wrapper with Apple/BI Matrix cubic-bezier curve
 * @agent  manager-develop
 * @branch feat/homepage-skeleton
 * @author @goobit-dev
 * @date   2026-09-23
 */

import React, { CSSProperties } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export type AnimationType = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in';

export interface ScrollRevealProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  as?: React.ElementType;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 700,
  className = '',
  as: Component = 'div',
  threshold = 0.15,
  rootMargin = '0px 0px -40px 0px',
  triggerOnce = true,
  style,
  ...restProps
}) => {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({
    threshold,
    rootMargin,
    triggerOnce,
  });

  const getHiddenTransform = (): string => {
    switch (animation) {
      case 'fade-up':
        return 'translate3d(0, 28px, 0)';
      case 'fade-down':
        return 'translate3d(0, -28px, 0)';
      case 'fade-left':
        return 'translate3d(28px, 0, 0)';
      case 'fade-right':
        return 'translate3d(-28px, 0, 0)';
      case 'zoom-in':
        return 'scale3d(0.94, 0.94, 1)';
      default:
        return 'translate3d(0, 28px, 0)';
    }
  };

  const getVisibleTransform = (): string => {
    return animation === 'zoom-in' ? 'scale3d(1, 1, 1)' : 'translate3d(0, 0, 0)';
  };

  const animationStyle: CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? getVisibleTransform() : getHiddenTransform(),
    transitionProperty: 'opacity, transform',
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: isVisible ? 'auto' : 'transform, opacity',
    ...style,
  };

  return (
    <Component
      ref={ref}
      style={animationStyle}
      className={className}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export default ScrollReveal;
