'use client'
import { useState } from 'react'
import ProductEnquiryModal from './ProductEnquiryModal'

export default function ProductActions({ product }) {
  const [modalOpen, setModalOpen] = useState(false)

  // In-stock: straight to Shopify
  if (product.link) {
    return (
      <div className="mt-4">
        <a
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-[var(--ink)] text-[var(--bg)] px-8 py-4 rounded-full font-medium tracking-wide hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
        >
          Shop on Shopify
          <span className="text-[16px]">↗</span>
        </a>
      </div>
    )
  }

  const isSold = product.status === 'sold'
  const badge = isSold ? 'Sold' : 'Commissioned work'
  const ctaLabel = isSold ? 'Commission a Similar Piece' : 'Enquire About a Commission'

  return (
    <>
      <div className="mt-4 flex flex-col gap-3">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] px-3 py-1.5 rounded-full border border-(--line) text-(--ink-soft)"
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: isSold ? 'var(--ink-soft)' : 'var(--accent)' }}
            />
            {badge}
          </span>
        </div>

        {/* Commission CTA */}
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 bg-(--ink) text-(--bg) px-8 py-4 rounded-full font-medium tracking-wide hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 border-0 cursor-pointer text-[15px]"
        >
          {ctaLabel}
          <span className="text-[16px]">→</span>
        </button>

        <p className="text-[12px] text-(--ink-soft) m-0">
          {isSold
            ? 'This piece has found a home — but Tim can create something new, just for you.'
            : 'Interested in a piece like this? Get in touch to discuss a commission.'}
        </p>
      </div>

      <ProductEnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        product={product}
      />
    </>
  )
}
