import { FC } from 'react';
import { useBaseTheme } from 'jexity-app/baseTheme/baseTheme';

export const PinInputStyle: FC = () => {
  const { colors, fontSizes } = useBaseTheme();

  return (
    <style jsx global>{`
      .pin-input {
        max-width: 72px;
        min-height: 110px;
        border: 2px solid ${colors?.gray?.[300]};
        border-radius: 3px;
        font-weight: 700;
        font-size: ${fontSizes?.['4xl']};
        text-align: center;
        transform: scale(1);
        transition: all 0.25s;
      }

      .pin-input.-focus {
        outline: none;
        border: 1px solid ${colors?.brand?.primary?.[500]};
        transform: scale(1.05);
      }

      .pin-input-success {
        outline: none;
        border: 1px solid ${colors?.support?.success?.[500]};
        transform: scale(1.05);
        background-color: ${colors?.support?.success?.[100]};
      }

      .pin-input-error {
        outline: none;
        border: 1px solid ${colors?.support?.alert?.[500]};
        transform: scale(1.05);
        background-color: ${colors?.support?.alert?.[100]};
        color: ${colors?.support?.alert?.[500]};
      }

      input[type='text'][disabled].pin-input {
        background: rgba(${colors?.support?.alert?.[500]}, 0.1);
        opacity: 0.5;
        cursor: not-allowed;
        color: ${colors?.support?.success?.[500]};
      }
    `}</style>
  );
};
