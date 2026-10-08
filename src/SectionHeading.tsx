import type { FC } from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
}

// Judul bagian: huruf kapital renggang, kata terakhir berwarna pink.
const SectionHeading: FC<SectionHeadingProps> = ({ title, subtitle, align = 'center' }) => {
  const words = title.split(' ');
  const last = words.pop();
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`${alignment} max-w-2xl`}>
      <h2 className="text-xl font-extrabold uppercase tracking-[0.14em] text-ink sm:text-2xl">
        {words.join(' ')} <span className="text-rose">{last}</span>
      </h2>
      {subtitle && <p className="mt-3 text-ink/70">{subtitle}</p>}
    </div>
  );
};

export default SectionHeading;
