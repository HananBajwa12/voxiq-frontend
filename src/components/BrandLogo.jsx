export default function BrandLogo({ compact = false, style = {} }) {
  return (
    <img
      src={compact ? '/logo-icon.svg' : '/logo.svg'}
      alt="Voxiq"
      width={compact ? 475 : 1942}
      height="468"
      draggable="false"
      style={{ display: 'block', height: 36, width: 'auto', maxWidth: '100%', objectFit: 'contain', imageRendering: 'auto', flexShrink: 0, ...style }}
    />
  );
}
