import { useMemo } from 'react';
import { garmentSvg, type GarmentSvgProps } from './garmentSvg';

export function GarmentImage(props: GarmentSvgProps & { alt: string; className?: string }) {
  const { alt, className, ...svgProps } = props;
  const html = useMemo(() => garmentSvg(svgProps), [svgProps.garment, svgProps.color, svgProps.design, svgProps.text, svgProps.placement, svgProps.view]); // eslint-disable-line react-hooks/exhaustive-deps
  return <div className={`garment ${className ?? ''}`} role="img" aria-label={alt} dangerouslySetInnerHTML={{ __html: html }} />;
}
