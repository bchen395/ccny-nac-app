import { ChevronLeftIcon, ChevronRightIcon } from './Icons.jsx';

export default function NavArrows({ onPrevious, onNext }) {
  return (
    <>
      <button
        className="navArrow navArrowLeft"
        type="button"
        aria-label="Previous floor"
        onClick={onPrevious}
      >
        <ChevronLeftIcon size={42} />
      </button>
      <button
        className="navArrow navArrowRight"
        type="button"
        aria-label="Next floor"
        onClick={onNext}
      >
        <ChevronRightIcon size={42} />
      </button>
    </>
  );
}
