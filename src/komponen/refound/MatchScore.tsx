import React from 'react';
import BilahKecocokan from '../BilahKecocokan';
import { SkorPencocokan } from '@/pustaka/ai/pencocokan';

interface MatchScoreProps {
  scoreObj: SkorPencocokan;
}

export default function MatchScore({ scoreObj }: MatchScoreProps) {
  return <BilahKecocokan skor={scoreObj} />;
}
