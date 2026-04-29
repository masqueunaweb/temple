'use client';

import { motion } from 'framer-motion';
import { Dimension } from '@/lib/types';

interface DimensionCardProps {
  dimension: {
    id: Dimension;
    num: string;
    name: string;
    desc: string;
  };
  index: number;
  onSelect: (dimension: Dimension) => void;
}

export default function DimensionCard({ dimension, index, onSelect }: DimensionCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      onClick={() => onSelect(dimension.id)}
      className="w-full border border-temple-border rounded-md p-6 text-left transition-all duration-200 hover:border-temple-accent group"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="font-satoshi text-label font-semibold tracking-wider uppercase text-temple-text-secondary mb-2 group-hover:text-temple-accent transition-colors duration-200">
        {dimension.num}
      </div>
      <h3 className="font-satoshi text-heading font-bold tracking-tight mb-2">
        {dimension.name}
      </h3>
      <p className="font-satoshi text-body text-temple-text-secondary">
        {dimension.desc}
      </p>
    </motion.button>
  );
}
