import type { FC } from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  /** Warnai kata terakhir dengan pink. Matikan kalau kata terakhirnya
   *  nama brand atau kata sambung seperti "kami", karena aksennya jadi
   *  jatuh di kata yang tidak penting. */
  accent?: boolean;
  as?: 'h1' | 'h2';
}

// Judul bagian: huruf kapital renggang, kata terakhir berwarna pink.
const SectionHeading: FC<SectionHeadingProps> = ({
  title,
  subtitle,
  align = 'center',
  as: Tag = 'h2',
  accent = true,
}) => {
  const words = title.split(' ');
  const last = accent ? words.pop() : undefined;
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`${alignment} max-w-2xl`}>
      <Tag className="font-sans text-xl font-semibold uppercase tracking-[0.14em] text-ink sm:text-2xl">
        {words.join(' ')}
        {last && <span className="text-rose"> {last}</span>}
      </Tag>
      {subtitle && <p className="mt-3 text-ink/70">{subtitle}</p>}
    </div>
  );
};

export default SectionHeading;
