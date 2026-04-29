interface SignButtonProps {
  isSigned: boolean;
  isFailed: boolean;
  onSign: () => void;
  onFail: () => void;
  isLoading?: boolean;
}

export default function SignButton({
  isSigned,
  isFailed,
  onSign,
  onFail,
  isLoading = false,
}: SignButtonProps) {
  if (isSigned) {
    return (
      <div className="text-center space-y-2">
        <p className="font-satoshi text-display font-bold tracking-tight">
          Firmado.
        </p>
        <p className="font-satoshi text-body text-temple-text-secondary">
          Hasta mañana.
        </p>
      </div>
    );
  }

  if (isFailed) {
    return (
      <div className="text-center space-y-2">
        <p className="font-satoshi text-display font-bold tracking-tight text-temple-error">
          Fallo.
        </p>
        <p className="font-satoshi text-body text-temple-text-secondary">
          Mañana es otro día.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button
        onClick={onSign}
        disabled={isLoading}
        className="w-full h-14 sm:h-12 font-satoshi text-label font-semibold tracking-wider uppercase bg-temple-text-primary text-temple-bg hover:bg-temple-accent hover:text-temple-accent-text rounded-md transition-colors duration-150 disabled:opacity-50"
      >
        FIRMA
      </button>
      <button
        onClick={onFail}
        disabled={isLoading}
        className="w-full font-satoshi text-body text-temple-text-secondary hover:text-temple-text-primary transition-colors disabled:opacity-50"
      >
        FALLO
      </button>
    </div>
  );
}
