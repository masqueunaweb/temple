import Button from '@/components/ui/Button';

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
      <div className="text-center">
        <div className="text-display mb-2">✓</div>
        <p className="text-body text-light-text-secondary dark:text-dark-text-secondary">
          Firma completada
        </p>
      </div>
    );
  }

  if (isFailed) {
    return (
      <div className="text-center">
        <div className="text-display mb-2">✕</div>
        <p className="text-body text-light-text-secondary dark:text-dark-text-secondary">
          Fallo registrado
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Button
        onClick={onSign}
        disabled={isLoading}
        className="w-full py-6 text-lg"
      >
        Firmar hoy
      </Button>
      <Button
        onClick={onFail}
        disabled={isLoading}
        variant="ghost"
        className="w-full py-3 text-sm"
      >
        Registrar fallo
      </Button>
    </div>
  );
}
