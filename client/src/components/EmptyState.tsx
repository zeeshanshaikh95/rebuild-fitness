import type { ReactNode } from 'react';

interface Props {
  title: string;
  description?: string;
  action?: ReactNode;
  tone?: 'default' | 'error';
}

export function EmptyState({ title, description, action, tone = 'default' }: Props) {
  return (
    <div
      className={`flex flex-col items-center gap-3 border px-6 py-14 text-center ${
        tone === 'error'
          ? 'border-blood-500/40 bg-blood-500/[0.08]'
          : 'border-forge-400/15 bg-steel'
      }`}
    >
      <p className="font-display text-2xl text-chalk">{title}</p>
      {description ? <p className="max-w-md text-sm leading-relaxed text-ash">{description}</p> : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
