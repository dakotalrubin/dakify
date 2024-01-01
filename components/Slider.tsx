// Required for client component to use React hooks
"use client";

import * as RadixSlider from "@radix-ui/react-slider";

// SliderProps interface contains an optional value and an optional
// onChange method
interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
}

// Slider component accepts an optional value and an optional onChange method
// from the SliderProps interface
const Slider: React.FC<SliderProps> = ({ value=1, onChange }) => {
  // The value passed to handleChange is an array of numbers, since the slider
  // from the Radix package deals with multiple points
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  }

  // Render the volume slider bar
  return (
    <RadixSlider.Root
      className="relative flex items-center h-10 w-full touch-none select-none"
      aria-label="Volume"
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleChange}
      max={1}
      step={0.1}
    >
      <RadixSlider.Track
        className="relative h-[3px] grow rounded-full bg-neutral-600"
      >
        <RadixSlider.Range
          className="absolute h-full rounded-full bg-white"
        />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
}

export default Slider;
