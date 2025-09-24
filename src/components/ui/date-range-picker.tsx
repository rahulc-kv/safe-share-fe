import React from 'react';
import { Calendar } from 'lucide-react';
import { Button } from './button';

interface DatePickerWithRangeProps {
  className?: string;
}

export function DatePickerWithRange({ className }: DatePickerWithRangeProps) {
  return (
    <Button variant="outline" className={className}>
      <Calendar className="mr-2 h-4 w-4" />
      Pick a date range
    </Button>
  );
}